import type { Track } from '@/data/v2/config'

function isTrack(value: unknown): value is Track {
  if (!value || typeof value !== 'object') return false
  const track = value as Record<string, unknown>
  return typeof track.name === 'string' && track.name.length > 0
    && typeof track.artist === 'string' && track.artist.length > 0
}

/** Fetch externally refreshed tracks, returning null so callers can retain a fallback. */
export async function fetchStoredTopTracks(url: string): Promise<Track[] | null> {
  try {
    const response = await fetch(url, { cache: 'no-store' })
    if (!response.ok) return null

    const data: unknown = await response.json()
    if (!Array.isArray(data) || data.length === 0 || !data.every(isTrack)) return null

    return data.slice(0, 5)
  } catch {
    return null
  }
}
