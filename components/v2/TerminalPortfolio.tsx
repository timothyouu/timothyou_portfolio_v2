'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useTweaks, type Tweaks } from './useTweaks'
import Home from './Home'
import About from './About'
import Terminal, { type TerminalApi } from './Terminal'
import SettingsPanel from './SettingsPanel'
import VersionToggle from './VersionToggle'
import { handleCallback, fetchTopTracks } from '@/lib/v2/spotify'
import { scrollToElement } from '@/lib/utils'

const FONT_STACKS: Record<string, string> = {
  'JetBrains Mono': 'var(--font-jetbrains-mono), ui-monospace, Menlo, monospace',
  'IBM Plex Mono': 'var(--font-ibm-plex-mono), ui-monospace, Menlo, monospace',
  'Fira Code': 'var(--font-fira-code), ui-monospace, Menlo, monospace',
  'Space Mono': 'var(--font-space-mono), ui-monospace, Menlo, monospace',
}

export default function TerminalPortfolio() {
  const [t, setTweak] = useTweaks()

  // Add v2 body class for scoped CSS
  useEffect(() => {
    document.body.classList.add('v2')
    return () => document.body.classList.remove('v2')
  }, [])

  // Apply tweaks to the document
  useEffect(() => {
    // Write to <body>, not <html>: the theme/font CSS vars are declared on
    // `body.v2`, and a value set directly on body shadows anything inherited
    // from <html>. Setting these on the documentElement had no effect.
    const root = document.body
    const stack = FONT_STACKS[t.font] || FONT_STACKS['JetBrains Mono']
    root.style.setProperty('--mono', stack)
    root.style.setProperty('--display', stack)
    root.style.setProperty('--ascii-size', t.asciiSize + 'px')
    document.body.classList.toggle('dark', t.theme === 'dark')
    document.body.classList.toggle('no-blink', !t.cursorBlink)
    const revealMode = t.hoverReveal === 'ascii' ? 'ascii' : 'realistic'
    document.body.classList.toggle('reveal-realistic', revealMode === 'realistic')
    document.body.classList.remove('no-reveal')
  }, [t.font, t.asciiSize, t.theme, t.cursorBlink, t.hoverReveal])

  const [version, setVersion] = useState<'v1' | 'v2'>('v2')
  const [page, setPage] = useState<string>('home')

  // Read persisted version + URL hash after mount (avoids SSR hydration mismatch)
  useEffect(() => {
    const h = window.location.hash || ''
    if (h.includes('v1')) {
      setVersion('v1')
    } else {
      try {
        const stored = localStorage.getItem('portfolio-version')
        if (stored === 'v1' || stored === 'v2') setVersion(stored)
      } catch {}
      if (h.replace('#', '') === 'about') setPage('about')
    }
  }, [])

  const [termOpen, setTermOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Navigate to v1 when version switches
  const router = useRouter()
  useEffect(() => {
    if (version === 'v1') router.push('/v1')
  }, [version, router])

  // Command API the terminal talks to
  const api: TerminalApi = useMemo(() => ({
    goTo: (p) => setPage(p === 'about' ? 'about' : 'home'),
    navigate: (p, id) => {
      setPage(p === 'about' ? 'about' : 'home')
      setTimeout(() => {
        if (id) { scrollToElement(id); return }
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 90)
    },
    setTheme: (th) => setTweak('theme', th === 'dark' ? 'dark' : 'light'),
    setVersion: (v) => setVersion(v === 'v1' ? 'v1' : 'v2'),
    setTweak: (k, v) => setTweak(k as keyof Tweaks, v as never),
    getState: () => ({ page, theme: t.theme, version, font: t.font, asciiSize: t.asciiSize, hoverReveal: t.hoverReveal }),
    openProject: (title) => {
      setPage('home')
      setTimeout(() => window.dispatchEvent(new CustomEvent('portfolio:open-project', { detail: { title } })), 60)
    },
    scrollTo: (id) => {
      setTimeout(() => scrollToElement(id), 60)
    },
    close: () => setTermOpen(false),
  }), [page, version, t.theme, t.font, t.asciiSize, t.hoverReveal, setTweak])

  // Handle Spotify OAuth callback (?code=... in URL)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code  = params.get('code')
    const state = params.get('state')
    const error = params.get('error')
    if (!code && !error) return

    // Clean URL immediately
    let returnHash = '#about'
    try {
      returnHash = localStorage.getItem('spotify_return_hash') || '#about'
      localStorage.removeItem('spotify_return_hash')
    } catch {}
    history.replaceState(null, '', window.location.pathname + returnHash)

    if (code) {
      setPage('about')
      handleCallback(code, state)
        .then(() => fetchTopTracks(true))
        .then(() => window.dispatchEvent(new CustomEvent('spotify:connected')))
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : 'Unknown error'
          console.error('[spotify] auth callback failed:', message)
          window.dispatchEvent(new CustomEvent('spotify:error', { detail: { message } }))
        })
    }
  }, [])

  // Keyboard shortcut: Cmd/Ctrl+K or backtick to toggle the terminal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target && (e.target as HTMLElement).tagName) || ''
      const typing = tag === 'INPUT' || tag === 'TEXTAREA'
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); setTermOpen((o) => !o); return
      }
      if (e.key === '`' && !typing) {
        e.preventDefault(); setTermOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Sync hash and localStorage with current version/page
  useEffect(() => {
    try { localStorage.setItem('portfolio-version', version) } catch {}
    const base = page === 'about' ? 'about' : 'home'
    if (window.location.hash.replace('#', '') !== base) {
      history.replaceState(null, '', '#' + base)
    }
  }, [version, page])

  return (
    <>
      {version === 'v1' ? null : page === 'about'
        ? <About goTo={setPage} setSettingsOpen={setSettingsOpen} />
        : <Home goTo={setPage} setSettingsOpen={setSettingsOpen} />}
      <VersionToggle version={version} setVersion={setVersion} />
      {version !== 'v1' && (
        <div className="bottom-buttons">
          <button className="term-launch" onClick={() => setTermOpen(true)} title="open terminal">
            <span className="glyph">&gt;_</span>
            <span>terminal</span>
            <span className="kbd">⌘K</span>
          </button>
        </div>
      )}
      {settingsOpen && <SettingsPanel t={t} setTweak={setTweak} onClose={() => setSettingsOpen(false)} />}
      <Terminal open={termOpen} onClose={() => setTermOpen(false)} api={api} />
    </>
  )
}
