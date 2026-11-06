'use client'

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import GameQuitButton from './GameQuitButton'
import styles from './TerminalGame.module.css'

const WIDTH = 120
const HEIGHT = 60
const center = { x: WIDTH / 2, y: HEIGHT / 2 }
const blank = { ...center, path: 'M60 30' }
const moves: Record<string, [number, number]> = {
  w: [0, -1], arrowup: [0, -1], s: [0, 1], arrowdown: [0, 1],
  a: [-1, 0], arrowleft: [-1, 0], d: [1, 0], arrowright: [1, 0],
}

export default function EtchSketch({ onExit }: { onExit: () => void }) {
  const panel = useRef<HTMLDivElement>(null)
  const [drawing, setDrawing] = useState(blank)
  useEffect(() => { panel.current?.focus() }, [])

  function clearPad() {
    setDrawing(blank)
    panel.current?.focus()
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.ctrlKey || event.altKey || event.metaKey) return
    const key = event.key.toLowerCase()
    if (key === 'escape') { event.stopPropagation(); onExit(); return }
    if (key === 'c') { setDrawing(blank); return }
    const move = moves[key]
    if (!move) return
    event.preventDefault()
    setDrawing(previous => {
      const x = Math.max(1, Math.min(WIDTH - 1, previous.x + move[0]))
      const y = Math.max(1, Math.min(HEIGHT - 1, previous.y + move[1]))
      if (x === previous.x && y === previous.y) return previous
      return { x, y, path: previous.path + ` L${x} ${y}` }
    })
  }

  function drawAt(event: PointerEvent<SVGSVGElement>, start: boolean) {
    if (!event.isPrimary) return
    const svg = event.currentTarget
    if (start) {
      if (event.button !== 0) return
      panel.current?.focus()
      svg.setPointerCapture(event.pointerId)
    } else if (!svg.hasPointerCapture(event.pointerId)) return
    const matrix = svg.getScreenCTM()
    if (!matrix) return
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
    const x = Math.max(1, Math.min(WIDTH - 1, Math.round(point.x)))
    const y = Math.max(1, Math.min(HEIGHT - 1, Math.round(point.y)))
    setDrawing(previous => ({ x, y, path: previous.path + ` ${start ? 'M' : 'L'}${x} ${y}` }))
  }

  return <div className={styles.panel} tabIndex={0} ref={panel} onKeyDown={handleKey} aria-label="Etch Sketch">
    <header><strong>ETCH SKETCH</strong><button onClick={clearPad}
      onPointerUp={event => { if (event.pointerType === 'touch' && event.isPrimary) clearPad() }}>Clear<span className={styles.keyboardHint}> [C]</span></button></header>
    <div className={styles.field}>
      <svg className={styles.sketch} viewBox="0 0 120 60" role="img" aria-label="Sketch pad"
        onPointerDown={e => drawAt(e, true)} onPointerMove={e => drawAt(e, false)}>
        <path d={drawing.path} fill="none" stroke="currentColor" strokeWidth=".65" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={drawing.x} cy={drawing.y} r="1.1" fill="var(--paper)" stroke="currentColor" strokeWidth=".5" />
      </svg>
    </div>
    <footer><span><span className={styles.keyboardHint}>WASD / arrows or </span>Drag to draw</span><GameQuitButton onExit={onExit} /></footer>
  </div>
}
