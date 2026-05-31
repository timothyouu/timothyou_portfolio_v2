'use client'

import { LINKS } from '@/data/v2/config'

type Props = {
  current: 'home' | 'about'
  goTo: (p: string) => void
  setSettingsOpen: (fn: (o: boolean) => boolean) => void
}

export default function TopBar({ current, goTo, setSettingsOpen }: Props) {
  return (
    <div className="topbar">
      <div className="brand">
        <span className="dot"></span>
        <span>timothy_ou</span>
        <span style={{ color: 'var(--fg-dim)' }}>~/ portfolio</span>
      </div>
      <nav className="nav">
        <button className={current === 'home' ? 'active' : ''} onClick={() => goTo('home')}>home</button>
        <button className={current === 'about' ? 'active' : ''} onClick={() => goTo('about')}>about</button>
        <a href={LINKS.resume} target="_blank" rel="noopener" style={{ color: 'var(--fg-muted)', alignSelf: 'center' }}>resume ↗</a>
        <button className="theme-toggle" onClick={() => setSettingsOpen((o) => !o)} title="settings" aria-label="open settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </nav>
    </div>
  )
}
