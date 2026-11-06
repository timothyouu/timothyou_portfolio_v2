import { useRef, type PointerEvent } from 'react'

type Stroke = {
  id: number
  x: number
  y: number
  started: number
  moved: boolean
}
type BoardEvent = PointerEvent<SVGSVGElement>

export function useBoardGesture(track: (stroke: Stroke, event: BoardEvent, released: boolean) => void) {
  const active = useRef<Stroke | null>(null)
  function sample(event: BoardEvent, released: boolean) {
    const stroke = active.current
    if (!stroke || stroke.id !== event.pointerId) return
    track(stroke, event, released)
    if (released) active.current = null
  }
  function cancel(event: BoardEvent) {
    if (active.current?.id === event.pointerId) active.current = null
  }
  return {
    onPointerDown(event: BoardEvent) {
      if (!event.isPrimary || event.pointerType === 'mouse' || event.button !== 0) return
      event.preventDefault()
      event.currentTarget.setPointerCapture(event.pointerId)
      active.current = { id: event.pointerId, x: event.clientX, y: event.clientY, started: event.timeStamp, moved: false }
    },
    onPointerMove: (event: BoardEvent) => sample(event, false),
    onPointerUp: (event: BoardEvent) => sample(event, true),
    onPointerCancel: cancel,
    onLostPointerCapture: cancel,
  }
}
