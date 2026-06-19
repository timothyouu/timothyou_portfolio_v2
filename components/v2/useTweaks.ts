'use client'

import { useEffect, useState, useCallback } from 'react'

export type Tweaks = {
  font: string
  asciiSize: number
  theme: 'light' | 'dark'
  cursorBlink: boolean
  hoverReveal: 'ascii' | 'realistic'
}

export const TWEAK_DEFAULTS: Tweaks = {
  font: 'JetBrains Mono',
  asciiSize: 7,
  theme: 'light',
  cursorBlink: true,
  hoverReveal: 'ascii',
}

const KEY = 'portfolio-tweaks'

export function useTweaks(): [Tweaks, <K extends keyof Tweaks>(k: K, v: Tweaks[K]) => void] {
  const [t, setT] = useState<Tweaks>(TWEAK_DEFAULTS)

  // hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        setT((prev) => ({ ...prev, ...parsed }))
      }
    } catch (e) {
      console.warn('[tweaks] failed to parse saved preferences, using defaults:', e)
      try { localStorage.removeItem(KEY) } catch {}
    }
  }, [])

  const setTweak = useCallback(<K extends keyof Tweaks>(k: K, v: Tweaks[K]) => {
    setT((prev) => {
      const next = { ...prev, [k]: v }
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch (e) {
        console.warn('[tweaks] failed to persist preferences:', e)
      }
      return next
    })
  }, [])

  return [t, setTweak]
}
