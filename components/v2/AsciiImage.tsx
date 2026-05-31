'use client'

import { useEffect, useRef, useState } from 'react'
import { ASCII_DATA } from '@/data/v2/ascii-data'

type Props = {
  ascii: string
  caption?: string
  label?: string
  height?: number | string
  width?: number | string
  className?: string
  revealUrl?: string
  revealPosition?: string
  defaultUrl?: string
}

export default function AsciiImage({
  ascii, caption, label, height, width, className = '', revealUrl, revealPosition, defaultUrl,
}: Props) {
  const [easterTheme, setEasterTheme] = useState<string>(
    () => (typeof window !== 'undefined' && (window as any).PORTFOLIO_EASTER) || 'none',
  )
  const frameRef = useRef<HTMLDivElement>(null)
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    const handler = (e: Event) => setEasterTheme((e as CustomEvent).detail.theme)
    window.addEventListener('portfolio:easter', handler)
    return () => window.removeEventListener('portfolio:easter', handler)
  }, [])

  useEffect(() => {
    const frame = frameRef.current
    const pre = preRef.current
    if (!frame || !pre) return
    const fit = () => {
      pre.style.transform = 'none'
      pre.style.left = '0'
      const fw = frame.clientWidth, fh = frame.clientHeight
      const pw = pre.scrollWidth, ph = pre.scrollHeight
      if (!fw || !fh || !pw || !ph) return
      const isWide = frame.classList.contains('wide')
      let s: number
      if (isWide) {
        s = fh / ph
        pre.style.left = ((fw - pw * s) / 2) + 'px'
      } else {
        s = Math.min(fw / pw, fh / ph)
      }
      pre.style.transform = `scale(${s})`
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(frame)
    ro.observe(pre)
    return () => ro.disconnect()
  }, [ascii])

  const displayAscii = easterTheme === 'matcha' ? (ASCII_DATA.matcha_cup || ascii) : ascii
  const style: React.CSSProperties = {}
  if (height) style.height = typeof height === 'number' ? `${height}px` : height
  if (width) style.width = typeof width === 'number' ? `${width}px` : width

  const buildPlaceholder = (txt?: string) => {
    const safe = (txt || 'placeholder').toUpperCase()
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice"><defs><pattern id="s" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="14" height="14" fill="#e8e8e6"/><line x1="0" y1="0" x2="0" y2="14" stroke="#c8c8c6" stroke-width="6"/></pattern></defs><rect width="400" height="400" fill="url(#s)"/><rect x="20" y="20" width="360" height="360" fill="none" stroke="#0a0a0a" stroke-width="1" stroke-dasharray="4 4"/><text x="200" y="200" text-anchor="middle" dominant-baseline="middle" font-family="JetBrains Mono, monospace" font-size="20" font-weight="600" fill="#0a0a0a">${safe}</text><text x="200" y="226" text-anchor="middle" dominant-baseline="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#5a5a5a">[ drop-in image ]</text></svg>`
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
  }

  const revealBg = revealUrl ? `url("${revealUrl}")` : buildPlaceholder(label || caption)
  const bgPos = revealPosition || 'center 50%'

  return (
    <div className={`ascii-frame ${className}${defaultUrl ? ' has-default' : ''}`} style={style} ref={frameRef}>
      <pre ref={preRef}>{displayAscii}</pre>
      {defaultUrl && <div className="default-img" style={{ backgroundImage: `url("${defaultUrl}")`, backgroundPosition: bgPos }} />}
      <div className="reveal" style={{ backgroundImage: revealBg, backgroundPosition: bgPos }} />
      {caption && <div className="caption">{caption}</div>}
    </div>
  )
}
