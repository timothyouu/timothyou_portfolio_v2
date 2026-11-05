import { useEffect, useState } from 'react'

function readBest(key: string): number {
  try {
    const score = Number(localStorage.getItem(key))
    return Number.isSafeInteger(score) && score > 0 ? score : 0
  } catch {
    return 0
  }
}

export function useGameHighScore(key: string, score: number): number {
  const [best, setBest] = useState(() => readBest(key))
  useEffect(() => {
    if (score <= best) return
    const record = Math.max(score, readBest(key))
    setBest(record)
    try { localStorage.setItem(key, String(record)) } catch { /* Keep the session record if storage is unavailable. */ }
  }, [score, best, key])
  return best
}
