'use client'

import { useEffect, useReducer, useRef, type KeyboardEvent } from 'react'
import { useGameHighScore } from './useGameHighScore'
import styles from './TerminalGame.module.css'

const WIDTH = 10
const HEIGHT = 20
// NTSC NES Tetris gravity, in frames per row at roughly 60 frames per second.
const FRAMES_PER_ROW = [
  48, 43, 38, 33, 28, 23, 18, 13, 8, 6, // Levels 0–9
  5, 5, 5, 4, 4, 4, 3, 3, 3,            // Levels 10–18
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,      // Levels 19–29+
]
const shapes = [
  ['1111'], ['11', '11'], ['010', '111'], ['011', '110'],
  ['110', '011'], ['100', '111'], ['001', '111'],
]
type Piece = { index: number; rows: string[]; x: number; y: number }
type State = { board: boolean[][]; piece: Piece; held: number | null; canHold: boolean; lines: number; score: number; over: boolean }
type Move = 'left' | 'right' | 'rotate' | 'down' | 'drop' | 'restart' | 'hold'
type Action = { move: Move; next: number }

const emptyRow = (): boolean[] => Array(WIDTH).fill(false)
const pick = () => Math.floor(Math.random() * shapes.length)
function spawn(index: number): Piece {
  const rows = shapes[index]
  return { index, rows, x: Math.floor((WIDTH - rows[0].length) / 2), y: 0 }
}
function start(index: number): State {
  return { board: Array.from({ length: HEIGHT }, emptyRow), piece: spawn(index), held: null, canHold: true, lines: 0, score: 0, over: false }
}
function cells(piece: Piece): { x: number; y: number }[] {
  return piece.rows.flatMap((row, dy) => Array.from(row).flatMap((cell, dx) =>
    cell === '1' ? [{ x: piece.x + dx, y: piece.y + dy }] : []))
}
function fits(board: boolean[][], piece: Piece): boolean {
  return cells(piece).every(({ x, y }) => x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT && !board[y][x])
}
function update(state: State, { move, next }: Action): State {
  if (move === 'restart') return start(next)
  if (state.over) return state
  let piece = state.piece
  if (move === 'hold') {
    if (!state.canHold) return state
    const incoming = spawn(state.held ?? next)
    return { ...state, held: piece.index, canHold: false, piece: incoming, over: !fits(state.board, incoming) }
  }
  if (move === 'left' || move === 'right') {
    const shifted = { ...piece, x: piece.x + (move === 'left' ? -1 : 1) }
    return fits(state.board, shifted) ? { ...state, piece: shifted } : state
  }
  if (move === 'rotate') {
    const rows = Array.from(piece.rows[0], (_, i) => piece.rows.map(row => row[i]).reverse().join(''))
    for (const shift of [0, -1, 1, -2, 2]) {
      const rotated = { ...piece, rows, x: piece.x + shift }
      if (fits(state.board, rotated)) return { ...state, piece: rotated }
    }
    return state
  }
  while (fits(state.board, { ...piece, y: piece.y + 1 })) {
    piece = { ...piece, y: piece.y + 1 }
    if (move === 'down') return { ...state, piece }
  }
  const board = state.board.map(row => [...row])
  for (const { x, y } of cells(piece)) board[y][x] = true
  const remaining = board.filter(row => !row.every(Boolean))
  const cleared = HEIGHT - remaining.length
  const packed = [...Array.from({ length: cleared }, emptyRow), ...remaining]
  const incoming = spawn(next)
  const dropPoints = move === 'drop' ? 2 * (piece.y - state.piece.y) : 0
  return { held: state.held, canHold: true, board: packed, piece: incoming, over: !fits(packed, incoming),
    lines: state.lines + cleared, score: state.score + dropPoints + [0, 100, 300, 500, 800][cleared] }
}

const controls: Record<string, Move> = {
  c: 'hold', a: 'left', arrowleft: 'left', d: 'right', arrowright: 'right',
  w: 'rotate', arrowup: 'rotate', s: 'down', arrowdown: 'down', ' ': 'drop',
}
export default function Tetris({ onExit }: { onExit: () => void }) {
  const [state, dispatch] = useReducer(update, null, () => start(pick()))
  const best = useGameHighScore('portfolio.tetris.highScore', state.score)
  const level = Math.floor(state.lines / 10)
  const frames = FRAMES_PER_ROW[Math.min(level, FRAMES_PER_ROW.length - 1)]
  const gravityMs = Math.round(frames * 1000 / 60.1)
  const panel = useRef<HTMLDivElement>(null)
  useEffect(() => { panel.current?.focus() }, [])
  useEffect(() => {
    if (state.over) return
    const timer = window.setInterval(() => dispatch({ move: 'down', next: pick() }), gravityMs)
    return () => window.clearInterval(timer)
  }, [state.over, gravityMs])

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.ctrlKey || event.altKey || event.metaKey) return
    const key = event.key.toLowerCase()
    if (key === 'escape') { event.stopPropagation(); onExit(); return }
    if (event.target !== panel.current) return
    const move = state.over && key === 'enter' ? 'restart' : controls[key]
    if (!move) return
    event.preventDefault()
    if (!event.repeat || (move !== 'drop' && move !== 'hold')) dispatch({ move, next: pick() })
  }

  const blocks = state.board.flatMap((row, y) => row.flatMap((solid, x) => solid ? [{ x, y }] : []))
  if (!state.over) blocks.push(...cells(state.piece))
  return <div className={styles.panel} tabIndex={0} ref={panel} onKeyDown={handleKey} aria-label="Tetris game">
    <header><strong>TETRIS</strong><span>LEVEL {level} · LINES {state.lines} · SCORE {state.score} · HI {best}</span></header>
    <div className={styles.field}>
      <svg className={styles.well} viewBox="0 0 100 200" role="img" aria-label="Tetris playfield">
        {blocks.map(({ x, y }) => <rect key={y * WIDTH + x} x={10 * x + 0.5} y={10 * y + 0.5} width="9" height="9" fill="currentColor" />)}
      </svg>
      <button className={styles.hold} aria-label="Hold piece" disabled={!state.canHold || state.over}
        onClick={() => { dispatch({ move: 'hold', next: pick() }); panel.current?.focus() }}>
        HOLD<span className={styles.keyboardHint}> [C]</span>
        <svg viewBox="0 0 48 36" role="img" aria-label={state.held === null ? 'Empty hold slot' : 'Held ' + ['I','O','T','S','Z','J','L'][state.held] + ' piece'}>
          {state.held !== null && shapes[state.held].map((row, y, rows) => Array.from(row, (cell, x) =>
            cell === '1' && <rect key={y * 4 + x} x={24 - row.length * 4 + x * 8} y={18 - rows.length * 4 + y * 8} width="7" height="7" fill="currentColor" />))}
        </svg>
      </button>
      {state.over && <button className={styles.result} onClick={() => { dispatch({ move: 'restart', next: pick() }); panel.current?.focus() }}>
        <strong>GAME OVER</strong>Play again
      </button>}
    </div>
    <div className={styles.touchControls} role="group" aria-label="Move falling piece">
      {([['left', '←', 'Move left'], ['right', '→', 'Move right'], ['rotate', '↻', 'Rotate'], ['down', '↓', 'Lower'], ['drop', 'Drop', 'Hard drop']] as const).map(([move, label, name]) =>
        <button key={move} aria-label={name} disabled={state.over}
          onClick={() => { dispatch({ move, next: pick() }); panel.current?.focus() }}>{label}</button>
      )}
    </div>
    <footer><span className={styles.keyboardHint}>A/D or ←/→ move · W/↑ rotate · S/↓ lower · Space drop</span><button onClick={onExit}><span className={styles.keyboardHint}>Esc · </span>Quit</button></footer>
  </div>
}
