import { fetchStoredTopTracks } from '@/lib/v2/top-tracks'

describe('fetchStoredTopTracks', () => {
  function mockFetch(result: Promise<unknown>) {
    const fetchMock = jest.fn().mockReturnValue(result)
    Object.defineProperty(global, 'fetch', { configurable: true, value: fetchMock })
    return fetchMock
  }

  afterEach(() => {
    jest.restoreAllMocks()
    delete (global as { fetch?: typeof fetch }).fetch
  })

  it('returns up to five valid tracks from storage', async () => {
    const tracks = Array.from({ length: 6 }, (_, index) => ({
      name: `Song ${index}`,
      artist: `Artist ${index}`,
    }))
    const fetchMock = mockFetch(Promise.resolve({
      ok: true,
      json: async () => tracks,
    }))

    await expect(fetchStoredTopTracks('https://example.test/top-tracks.json')).resolves.toEqual(tracks.slice(0, 5))
    expect(fetchMock).toHaveBeenCalledWith('https://example.test/top-tracks.json', { cache: 'no-store' })
  })

  it.each([
    [500, [{ name: 'Song', artist: 'Artist' }]],
    [200, [{ name: 'Song' }]],
    [200, []],
  ])('uses the fallback signal for unusable data (%s)', async (status, body) => {
    mockFetch(Promise.resolve({
      ok: status >= 200 && status < 300,
      json: async () => body,
    }))

    await expect(fetchStoredTopTracks('https://example.test/top-tracks.json')).resolves.toBeNull()
  })

  it('uses the fallback signal when the request fails', async () => {
    mockFetch(Promise.reject(new Error('offline')))

    await expect(fetchStoredTopTracks('https://example.test/top-tracks.json')).resolves.toBeNull()
  })
})
