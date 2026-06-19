// Spotify PKCE OAuth helpers — no client secret needed. Dormant in v2 (no connect
// button); only handleCallback runs if the app loads with ?code=. Top-tracks needs
// Premium, so the RAM "music" column renders the manual TOP_TRACKS list instead.
const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || ''
const SCOPE = 'user-top-read'
const TOKEN_KEY = 'spotify_tokens'
const CACHE_KEY = 'spotify_top_tracks'
const CACHE_TTL = 60 * 60 * 1000

function redirectUri() { return window.location.origin + window.location.pathname }

function rand(n: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from(crypto.getRandomValues(new Uint8Array(n)), (v) => chars[v % chars.length]).join('')
}

async function sha256b64url(plain: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(plain))
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export async function authorize() {
  const verifier = rand(64)
  const challenge = await sha256b64url(verifier)
  const state = rand(16)
  try {
    localStorage.setItem('spotify_verifier', verifier)
    localStorage.setItem('spotify_state', state)
    localStorage.setItem('spotify_return_hash', window.location.hash || '#about')
  } catch (e) {
    throw new Error('Cannot save auth state — localStorage unavailable')
  }
  window.location.href = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
    client_id: CLIENT_ID, response_type: 'code', redirect_uri: redirectUri(),
    scope: SCOPE, code_challenge_method: 'S256', code_challenge: challenge, state,
  })
}

export async function handleCallback(code: string, state: string | null) {
  if (state !== localStorage.getItem('spotify_state')) throw new Error('State mismatch — try connecting again.')
  const verifier = localStorage.getItem('spotify_verifier') || ''
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID, grant_type: 'authorization_code', code,
      redirect_uri: redirectUri(), code_verifier: verifier,
    }),
  })
  if (!res.ok) throw new Error(`Token request failed (${res.status})`)
  const tokens = await res.json()
  if (tokens.error) throw new Error(tokens.error_description || tokens.error)
  tokens.expires_at = Date.now() + tokens.expires_in * 1000
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens))
  localStorage.removeItem('spotify_verifier')
  localStorage.removeItem('spotify_state')
  return tokens
}

async function getToken(): Promise<string | null> {
  const raw = localStorage.getItem(TOKEN_KEY)
  if (!raw) return null
  let t: any
  try {
    t = JSON.parse(raw)
  } catch {
    console.warn('[spotify] corrupt token data in localStorage, clearing')
    localStorage.removeItem(TOKEN_KEY)
    return null
  }
  if (Date.now() > t.expires_at - 300_000) {
    if (!t.refresh_token) { localStorage.removeItem(TOKEN_KEY); return null }
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: CLIENT_ID, grant_type: 'refresh_token', refresh_token: t.refresh_token }),
    })
    if (!res.ok) { localStorage.removeItem(TOKEN_KEY); return null }
    const refreshed = await res.json()
    if (refreshed.error) { localStorage.removeItem(TOKEN_KEY); return null }
    t = { ...t, ...refreshed, expires_at: Date.now() + refreshed.expires_in * 1000 }
    localStorage.setItem(TOKEN_KEY, JSON.stringify(t))
  }
  return t.access_token
}

export async function fetchTopTracks(force = false) {
  if (!force) {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        const { tracks, ts } = JSON.parse(cached)
        if (Date.now() - ts < CACHE_TTL) return tracks
      } catch {
        console.warn('[spotify] corrupt cache data in localStorage, refetching')
        localStorage.removeItem(CACHE_KEY)
      }
    }
  }
  const token = await getToken()
  if (!token) return null
  const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term', {
    headers: { Authorization: 'Bearer ' + token },
  })
  if (!res.ok) return null
  const data = await res.json()
  if (data.error) return null
  const tracks = data.items.map((t: any) => ({
    name: t.name, artist: t.artists.map((a: any) => a.name).join(', '), url: t.external_urls.spotify,
  }))
  localStorage.setItem(CACHE_KEY, JSON.stringify({ tracks, ts: Date.now() }))
  return tracks
}

export function isConnected() { return !!localStorage.getItem(TOKEN_KEY) }
export function disconnect() { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(CACHE_KEY) }
