'use client'

import type { Tweaks } from './useTweaks'

type Props = {
  t: Tweaks
  setTweak: <K extends keyof Tweaks>(k: K, v: Tweaks[K]) => void
  onClose: () => void
}

const fonts = ['JetBrains Mono', 'IBM Plex Mono', 'Fira Code', 'Space Mono']

export default function SettingsPanel({ t, setTweak, onClose }: Props) {
  const cur = t.hoverReveal === 'ascii' ? 'ascii' : 'realistic'
  return (
    <div className="settings-panel settings-panel--topright">
      <div className="settings-header">
        <span>settings</span>
        <button className="settings-close" onClick={onClose}>✕</button>
      </div>
      <div className="settings-row">
        <span className="settings-label">theme</span>
        <div className="settings-seg">
          {(['light', 'dark'] as const).map((v) => (
            <button key={v} className={t.theme === v ? 'active' : ''} onClick={() => setTweak('theme', v)}>{v}</button>
          ))}
        </div>
      </div>
      <div className="settings-row">
        <span className="settings-label">font</span>
        <select className="settings-select" value={t.font} onChange={(e) => setTweak('font', e.target.value)}>
          {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <div className="settings-row">
        <span className="settings-label">photo reveal</span>
        <div className="settings-seg">
          {(['ascii', 'realistic'] as const).map((v) => (
            <button key={v} className={cur === v ? 'active' : ''} onClick={() => setTweak('hoverReveal', v)}>{v}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
