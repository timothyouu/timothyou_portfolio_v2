import { renderHook, act } from '@testing-library/react'
import { useTweaks, TWEAK_DEFAULTS } from '@/components/v2/useTweaks'

const STORAGE_KEY = 'portfolio-tweaks'

beforeEach(() => {
  localStorage.clear()
})

describe('useTweaks', () => {
  it('returns defaults on first render', () => {
    const { result } = renderHook(() => useTweaks())
    const [tweaks] = result.current
    expect(tweaks).toEqual(TWEAK_DEFAULTS)
  })

  it('setTweak updates a single tweak value', () => {
    const { result } = renderHook(() => useTweaks())

    act(() => {
      const setTweak = result.current[1]
      setTweak('theme', 'dark')
    })

    expect(result.current[0].theme).toBe('dark')
    // other fields remain default
    expect(result.current[0].font).toBe(TWEAK_DEFAULTS.font)
    expect(result.current[0].asciiSize).toBe(TWEAK_DEFAULTS.asciiSize)
  })

  it('persists tweaks to localStorage', () => {
    const { result } = renderHook(() => useTweaks())

    act(() => {
      result.current[1]('font', 'Fira Code')
    })

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored.font).toBe('Fira Code')
  })

  it('hydrates from localStorage on mount', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme: 'dark', asciiSize: 10 }))
    const { result } = renderHook(() => useTweaks())

    // After the useEffect runs, it should merge persisted values
    expect(result.current[0].theme).toBe('dark')
    expect(result.current[0].asciiSize).toBe(10)
    // Non-persisted fields keep their default
    expect(result.current[0].font).toBe(TWEAK_DEFAULTS.font)
  })

  it('TWEAK_DEFAULTS has all expected keys', () => {
    expect(TWEAK_DEFAULTS).toHaveProperty('font')
    expect(TWEAK_DEFAULTS).toHaveProperty('asciiSize')
    expect(TWEAK_DEFAULTS).toHaveProperty('theme')
    expect(TWEAK_DEFAULTS).toHaveProperty('cursorBlink')
    expect(TWEAK_DEFAULTS).toHaveProperty('hoverReveal')
  })

  it('default theme is light', () => {
    expect(TWEAK_DEFAULTS.theme).toBe('light')
  })

  it('default font is JetBrains Mono', () => {
    expect(TWEAK_DEFAULTS.font).toBe('JetBrains Mono')
  })
})
