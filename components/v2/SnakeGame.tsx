'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useGameHighScore } from './useGameHighScore'
import styles from './TerminalGame.module.css'

const COLS = 28
const ROWS = 14
const STEP = 160
const BEST_KEY = 'portfolio.snake.highScore'
const keys: Record<string, number> = {
  w: -COLS, arrowup: -COLS, s: COLS, arrowdown: COLS,
  a: -1, arrowleft: -1, d: 1, arrowright: 1,
}

type Game = {
  body: number[]
  food: number
  direction: number
  turn: number
  phase: 'ready' | 'playing' | 'over' | 'won'
}

function initialGame(): Game {
  const head = 7 * COLS + 10
  return { body: [head, head - 1, head - 2], food: head + 6, direction: 1, turn: 1, phase: 'ready' }
}

function advance(game: Game, sample: number): Game {
  if (game.phase !== 'playing') return game
  const head = game.body[0]
  const next = head + game.turn
  const crossedEdge = (game.turn === 1 && head % COLS === COLS - 1)
    || (game.turn === -1 && head % COLS === 0)
  const eating = next === game.food
  const remaining = eating ? game.body : game.body.slice(0, -1)
  if (crossedEdge || next < 0 || next >= ROWS * COLS || remaining.includes(next)) {
    return { ...game, phase: 'over' }
  }

  const body = [next, ...remaining]
  let food = game.food
  if (eating) {
    const occupied = new Set(body)
    const empty = Array.from({ length: ROWS * COLS }, (_, i) => i).filter(i => !occupied.has(i))
    if (!empty.length) return { ...game, body, food: -1, phase: 'won' }
    food = empty[Math.floor(sample * empty.length)]
  }
  return { ...game, body, food, direction: game.turn }
}

export default function SnakeGame({ onExit }: { onExit: () => void }) {
  const [game, setGame] = useState(initialGame)
  const [focused, setFocused] = useState(true)
  const score = game.body.length - 3
  const best = useGameHighScore(BEST_KEY, score)
  const panel = useRef<HTMLDivElement>(null)
  useEffect(() => { panel.current?.focus() }, [])
  useEffect(() => {
    if (game.phase !== 'playing' || !focused) return
    const timer = window.setInterval(() => {
      const sample = Math.random()
      setGame(current => advance(current, sample))
    }, STEP)
    return () => window.clearInterval(timer)
  }, [game.phase, focused])

  const finished = game.phase === 'over' || game.phase === 'won'
  function steer(turn: number) {
    panel.current?.focus()
    setGame(current => {
      if (finished || turn === -current.direction) return current
      return { ...current, turn, phase: 'playing' }
    })
  }
  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.ctrlKey || event.metaKey || event.altKey) return
    const key = event.key.toLowerCase()
    if (key === 'escape') {
      event.preventDefault()
      event.stopPropagation()
      onExit()
    } else if (finished && key === 'enter' && event.target === panel.current) {
      event.preventDefault()
      setGame(initialGame())
    } else if (keys[key]) {
      event.preventDefault()
      steer(keys[key])
    }
  }

  return (
    <div className={styles.panel} tabIndex={0} ref={panel} onKeyDown={handleKey}
      onMouseDown={event => event.stopPropagation()}
      onFocus={() => setFocused(true)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
      aria-label="Snake game">
      <header><strong>S N A K E</strong><span>SCORE {String(score).padStart(3, '0')}{' · HI '}{String(best).padStart(3, '0')}</span></header>
      <div className={styles.field}>
        <svg viewBox={`0 0 ${COLS * 10} ${ROWS * 10}`} role="img" aria-label="Snake playfield" shapeRendering="crispEdges">
          {game.body.map((cell, index) => (
            <g key={cell} transform={`translate(${cell % COLS * 10}, ${Math.floor(cell / COLS) * 10})`}>
              <rect x="1" y="1" width="8" height="8" fill="currentColor" />
              {index === 0 && <rect x="4" y="4" width="2" height="2" fill="var(--paper)" />}
            </g>
          ))}
          {game.food >= 0 && <path fill="currentColor" transform={`translate(${game.food % COLS * 10}, ${Math.floor(game.food / COLS) * 10})`} d="M3 1h4v2h2v4H7v2H3V7H1V3h2z" />}
        </svg>
        {finished && <button className={styles.result} onClick={() => { setGame(initialGame()); panel.current?.focus() }}>
          <strong>{game.phase === 'won' ? 'YOU WIN' : 'GAME OVER'}</strong>Play again
        </button>}
      </div>
      <div className={styles.touchControls} role="group" aria-label="Steer snake">
        {([['Left', '←', -1], ['Up', '↑', -COLS], ['Down', '↓', COLS], ['Right', '→', 1]] as const).map(([name, icon, turn]) =>
          <button key={name} aria-label={name} disabled={finished} onClick={() => steer(turn)}>{icon}</button>
        )}
      </div>
      <footer><span className={styles.keyboardHint}>{!focused ? 'Click board to resume' : game.phase === 'ready' ? 'WASD / arrows to start' : 'WASD / arrows to steer'}</span><button onClick={onExit}><span className={styles.keyboardHint}>Esc · </span>Quit</button></footer>
    </div>
  )
}
