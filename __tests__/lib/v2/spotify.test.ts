/**
 * Tests for lib/v2/spotify.ts — Spotify PKCE OAuth helpers.
 *
 * We mock localStorage, fetch, and crypto.subtle so the tests run without
 * a real browser or network.
 */

const TOKEN_KEY = 'spotify_tokens'
const CACHE_KEY = 'spotify_top_tracks'

// Polyfill TextEncoder for jsdom
import { TextEncoder } from 'util'
if (typeof globalThis.TextEncoder === 'undefined') {
  (globalThis as any).TextEncoder = TextEncoder
}

let mockStorage: Record<string, string> = {}
const storageMock = {
  getItem: jest.fn((k: string) => mockStorage[k] ?? null),
  setItem: jest.fn((k: string, v: string) => { mockStorage[k] = v }),
  removeItem: jest.fn((k: string) => { delete mockStorage[k] }),
}
Object.defineProperty(window, 'localStorage', { value: storageMock, writable: true })

// Provide crypto.getRandomValues (jsdom may not have it)
Object.defineProperty(globalThis, 'crypto', {
  value: {
    getRandomValues: (buf: Uint8Array) => {
      for (let i = 0; i < buf.length; i++) buf[i] = i % 62
      return buf
    },
    subtle: {
      digest: jest.fn().mockResolvedValue(new ArrayBuffer(32)),
    },
  },
  writable: true,
})

// Patch location for redirectUri() — delete first since jsdom's location is non-configurable
delete (window as any).location
window.location = { origin: 'http://localhost:3000', pathname: '/', hash: '', href: '' } as any

// We import after mocks so the module picks them up
import { isConnected, disconnect, handleCallback, fetchTopTracks, authorize } from '@/lib/v2/spotify'

beforeEach(() => {
  mockStorage = {}
  jest.clearAllMocks()
})

describe('isConnected', () => {
  it('returns false when no token is stored', () => {
    expect(isConnected()).toBe(false)
  })

  it('returns true when a token is stored', () => {
    mockStorage[TOKEN_KEY] = JSON.stringify({ access_token: 'abc' })
    expect(isConnected()).toBe(true)
  })
})

describe('disconnect', () => {
  it('removes token and cache keys from localStorage', () => {
    mockStorage[TOKEN_KEY] = JSON.stringify({ access_token: 'abc' })
    mockStorage[CACHE_KEY] = JSON.stringify({ tracks: [], ts: 0 })
    disconnect()
    expect(storageMock.removeItem).toHaveBeenCalledWith(TOKEN_KEY)
    expect(storageMock.removeItem).toHaveBeenCalledWith(CACHE_KEY)
  })
})

describe('handleCallback', () => {
  it('throws on state mismatch', async () => {
    mockStorage['spotify_state'] = 'expected-state'
    await expect(handleCallback('code123', 'wrong-state')).rejects.toThrow('State mismatch')
  })

  it('fetches token and stores it on success', async () => {
    mockStorage['spotify_state'] = 'my-state'
    mockStorage['spotify_verifier'] = 'my-verifier'

    const mockTokens = {
      access_token: 'tok',
      refresh_token: 'ref',
      expires_in: 3600,
    }

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(mockTokens),
    })

    const result = await handleCallback('code123', 'my-state')
    expect(result.access_token).toBe('tok')
    expect(result.expires_at).toBeGreaterThan(Date.now() - 1000)
    expect(storageMock.setItem).toHaveBeenCalledWith(TOKEN_KEY, expect.any(String))
    expect(storageMock.removeItem).toHaveBeenCalledWith('spotify_verifier')
    expect(storageMock.removeItem).toHaveBeenCalledWith('spotify_state')
  })

  it('throws when the API returns an error', async () => {
    mockStorage['spotify_state'] = 'my-state'
    mockStorage['spotify_verifier'] = 'v'

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ error: 'invalid_grant', error_description: 'bad code' }),
    })

    await expect(handleCallback('bad-code', 'my-state')).rejects.toThrow('bad code')
  })
})

describe('authorize', () => {
  it('stores verifier, state, and return hash in localStorage', async () => {
    await authorize()
    expect(storageMock.setItem).toHaveBeenCalledWith('spotify_verifier', expect.any(String))
    expect(storageMock.setItem).toHaveBeenCalledWith('spotify_state', expect.any(String))
    expect(storageMock.setItem).toHaveBeenCalledWith('spotify_return_hash', expect.any(String))
  })

  it('generates a verifier of length 64 and state of length 16', async () => {
    await authorize()
    const calls = storageMock.setItem.mock.calls
    const verifier = calls.find((c: string[]) => c[0] === 'spotify_verifier')?.[1]
    const state = calls.find((c: string[]) => c[0] === 'spotify_state')?.[1]
    expect(verifier).toHaveLength(64)
    expect(state).toHaveLength(16)
    expect(verifier).toMatch(/^[A-Za-z0-9]+$/)
  })
})

describe('fetchTopTracks', () => {
  it('returns cached tracks when cache is fresh', async () => {
    const cached = { tracks: [{ name: 'Song', artist: 'Artist', url: 'u' }], ts: Date.now() }
    mockStorage[CACHE_KEY] = JSON.stringify(cached)

    const result = await fetchTopTracks()
    expect(result).toEqual(cached.tracks)
  })

  it('returns null when no token is available', async () => {
    // No token, no cache
    const result = await fetchTopTracks(true)
    expect(result).toBeNull()
  })

  it('fetches from API when cache is stale and token exists', async () => {
    const staleCache = { tracks: [], ts: Date.now() - 2 * 60 * 60 * 1000 }
    mockStorage[CACHE_KEY] = JSON.stringify(staleCache)
    // Token that is still valid
    mockStorage[TOKEN_KEY] = JSON.stringify({
      access_token: 'valid-tok',
      expires_at: Date.now() + 3600_000,
    })

    const apiTracks = {
      items: [
        {
          name: 'Track1',
          artists: [{ name: 'ArtistA' }],
          external_urls: { spotify: 'https://open.spotify.com/track/1' },
        },
      ],
    }

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(apiTracks),
    })

    const result = await fetchTopTracks()
    expect(result).toEqual([{ name: 'Track1', artist: 'ArtistA', url: 'https://open.spotify.com/track/1' }])
    expect(storageMock.setItem).toHaveBeenCalledWith(CACHE_KEY, expect.any(String))
  })

  it('refreshes the token when it is about to expire', async () => {
    // Token expires within 5 minutes — triggers refresh path
    mockStorage[TOKEN_KEY] = JSON.stringify({
      access_token: 'old-tok',
      refresh_token: 'ref-tok',
      expires_at: Date.now() + 100_000, // within 5 min window
    })

    // First call: refresh token endpoint
    const refreshedTokens = {
      access_token: 'new-tok',
      expires_in: 3600,
    }
    // Second call: Spotify top tracks API
    const apiTracks = {
      items: [
        { name: 'NewTrack', artists: [{ name: 'ArtistX' }], external_urls: { spotify: 'url' } },
      ],
    }

    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: () => Promise.resolve(refreshedTokens) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(apiTracks) })

    const result = await fetchTopTracks(true)
    expect(result).toEqual([{ name: 'NewTrack', artist: 'ArtistX', url: 'url' }])
    // Should have stored the refreshed token
    const stored = JSON.parse(mockStorage[TOKEN_KEY])
    expect(stored.access_token).toBe('new-tok')
  })

  it('returns null when token refresh fails', async () => {
    mockStorage[TOKEN_KEY] = JSON.stringify({
      access_token: 'old-tok',
      refresh_token: 'ref-tok',
      expires_at: Date.now() + 100_000,
    })

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ error: 'invalid_grant' }),
    })

    const result = await fetchTopTracks(true)
    expect(result).toBeNull()
    // Token should have been removed
    expect(mockStorage[TOKEN_KEY]).toBeUndefined()
  })

  it('returns null when token is expired and has no refresh token', async () => {
    mockStorage[TOKEN_KEY] = JSON.stringify({
      access_token: 'expired-tok',
      expires_at: Date.now() + 100_000, // within 5 min window
      // no refresh_token
    })

    const result = await fetchTopTracks(true)
    expect(result).toBeNull()
    expect(mockStorage[TOKEN_KEY]).toBeUndefined()
  })

  it('returns null when API returns error', async () => {
    mockStorage[TOKEN_KEY] = JSON.stringify({
      access_token: 'valid-tok',
      expires_at: Date.now() + 3600_000,
    })

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ error: { status: 401 } }),
    })

    const result = await fetchTopTracks(true)
    expect(result).toBeNull()
  })
})
