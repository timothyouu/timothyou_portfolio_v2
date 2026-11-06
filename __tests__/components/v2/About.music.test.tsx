import { act, render, screen, waitFor } from '@testing-library/react'
import About from '@/components/v2/About'
import fallback from '@/data/v2/top-tracks.json'
import { titleCase } from '@/lib/utils'

jest.mock('@/components/v2/AsciiImage', () => () => null)
jest.mock('@/components/v2/TopBar', () => () => null)
jest.mock('@/components/v2/Footer', () => () => null)

const previousUrl = process.env.NEXT_PUBLIC_MUSIC_DATA_URL
const previousFetch = global.fetch
const props = { goTo: jest.fn(), setSettingsOpen: jest.fn() }

afterEach(() => {
  if (previousUrl === undefined) delete process.env.NEXT_PUBLIC_MUSIC_DATA_URL
  else process.env.NEXT_PUBLIC_MUSIC_DATA_URL = previousUrl
  global.fetch = previousFetch
})

it('shows the embedded list without fetching when storage is not configured', () => {
  delete process.env.NEXT_PUBLIC_MUSIC_DATA_URL
  global.fetch = jest.fn()
  render(<About {...props} />)
  expect(screen.getByText(titleCase(fallback[0].name))).toBeInTheDocument()
  expect(global.fetch).not.toHaveBeenCalled()
})

it('replaces the fallback with remotely refreshed tracks', async () => {
  process.env.NEXT_PUBLIC_MUSIC_DATA_URL = 'https://example.invalid/music/top-tracks.json'
  let resolve!: (value: unknown) => void
  global.fetch = jest.fn().mockReturnValue(new Promise(r => { resolve = r }))
  render(<About {...props} />)
  expect(screen.getByText(titleCase(fallback[0].name))).toBeInTheDocument()
  await act(async () => resolve({ ok: true, json: async () => [{ name: 'updated song', artist: 'new artist' }] }))
  await waitFor(() => expect(screen.getByText('Updated Song')).toBeInTheDocument())
  expect(screen.queryByText(titleCase(fallback[0].name))).not.toBeInTheDocument()
  expect(global.fetch).toHaveBeenCalledWith(process.env.NEXT_PUBLIC_MUSIC_DATA_URL, { cache: 'no-store' })
})

it.each(['offline', 'invalid-json', 'invalid-tracks', 'missing-object'])('keeps fallback for %s', async (failure) => {
  process.env.NEXT_PUBLIC_MUSIC_DATA_URL = 'https://example.invalid/music/top-tracks.json'
  global.fetch = jest.fn().mockImplementation(async () => {
    if (failure === 'offline') throw new Error('offline')
    return { ok: failure !== 'missing-object', json: async () => {
      if (failure === 'invalid-json') throw new SyntaxError('invalid JSON')
      return [{ name: 'invalid' }]
    } }
  })
  await act(async () => { render(<About {...props} />) })
  expect(screen.getByText(titleCase(fallback[0].name))).toBeInTheDocument()
  expect(screen.queryByText('Invalid')).not.toBeInTheDocument()
})
