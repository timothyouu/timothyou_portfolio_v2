# Terminal Portfolio (v2) — Design Spec

**Date:** 2026-05-31

## Overview

Build the terminal/monospace portfolio ("v2") as a real React/Next.js app, ported faithfully from the Claude Design prototype (`timothy-ou-s-resume-v2`). The existing purple portfolio becomes the archived "v1," reachable through an in-app version toggle. All features, easter eggs, and interactions from the prototype are preserved exactly.

**Source of truth:** the prototype source (`app.jsx`, `home.jsx`, `about.jsx`, `terminal.jsx`, `ascii-image.jsx`, `dino-game.jsx`, `spotify.js`, `config.js`, `ascii-data.js`, `styles.css`) plus the `CLAUDE_CODE_HANDOFF.md` brief. Where the brief and the final prototype differ, the prototype wins (it is where the user landed after iterating).

## Decisions

| Decision | Choice |
|---|---|
| v1/v2 coexistence | v2 at root `/`; v1 moved to `app/(v1)/` route group → `/v1`, `/v1/about`, `/v1/projects`, `/v1/skills` |
| v2 internal routing | Single client component at `/` swapping Home/About via state + hash URLs (`#about`), matching the prototype |
| CSS isolation | Port `styles.css` → `app/v2.css`; scope only the global `:root` + `html,body` blocks under `body.v2`; all other selectors stay global (unique names). Import `v2.css` in root `layout.tsx`; import `globals.css` (Tailwind) only in `(v1)/layout.tsx` so Tailwind preflight is route-scoped to `/v1` and never resets v2 |
| Spotify | PKCE helpers ported but **dormant**; RAM "music" renders manual `TOP_TRACKS` (top-tracks endpoint needs Premium). OAuth callback handler stays wired, no connect button — matches final prototype |
| tweaks-panel.jsx | NOT ported (it is Claude Design's editing harness). Reimplement `useTweaks` as a localStorage hook; the real `SettingsPanel` drives tweaks |
| Fonts | 4 mono fonts via `next/font/google` exposed as CSS variables; `useTweaks` effect points `--mono`/`--display` at the chosen font |
| Assets | 45 referenced files copied to `public/uploads/` (exact names); paths rewritten `uploads/…` → `/uploads/…` |

## File Structure

```
app/
  layout.tsx              # minimal: 4 mono fonts (next/font), imports v2.css, Analytics
  page.tsx                # renders <TerminalPortfolio/>
  globals.css             # Tailwind — imported ONLY by (v1)/layout.tsx (route-scoped)
  v2.css                  # ported terminal styles (root + html,body scoped to body.v2)
  (v1)/
    layout.tsx            # imports globals.css; Titan/Poppins fonts; purple Nav + Footer + bg + back-to-v2 toggle
    v1/page.tsx           # purple Home
    v1/about/page.tsx     # purple About
    v1/projects/page.tsx  # purple Projects
    v1/skills/page.tsx    # purple Skills

components/
  v1/                     # existing purple components: Nav, Footer, Gallery, SkillGrid, TextCycler
  v2/
    TerminalPortfolio.tsx # 'use client' root app (App logic from app.jsx)
    TopBar.tsx
    VersionToggle.tsx
    SettingsPanel.tsx
    Home.tsx
    About.tsx
    AsciiImage.tsx
    Terminal.tsx          # includes buildCommands + WelcomeBanner
    DinoGame.tsx
    useTweaks.ts          # localStorage-backed tweaks hook

data/
  photos.ts, projects.ts, skills.ts   # existing v1 data (unchanged; consumed by /v1)
  v2/
    ascii-data.ts         # ASCII_DATA object (~301 KB)
    config.ts             # LINKS (+ web), TOP_TRACKS
    projects.ts           # HOME_PROJECTS (image paths → /uploads/…)

lib/
  v2/spotify.ts           # PKCE helpers (dormant; callback handler used)

public/
  uploads/                # 45 v2 assets + resume PDF
  …                       # existing v1 images untouched
```

## Component Behavior

### TerminalPortfolio.tsx (`'use client'`)
Ports the prototype `App`. Holds: `useTweaks` state; `page` (`home`/`about`) + hash sync; `termOpen`; `settingsOpen`. Adds `v2` class to `document.body` on mount (removes on unmount) so the scoped CSS applies. Builds the terminal `api` object (`goTo`, `navigate`, `setTheme`, `setVersion`, `setTweak`, `getState`, `openProject`, `scrollTo`, `close`). Runs the Spotify callback effect (`?code=…`) and the ⌘K / backtick keyboard shortcut. Flipping version to `v1` calls `router.push('/v1')`. Renders Home or About, `VersionToggle`, the terminal launch button, `SettingsPanel`, and `Terminal`.

### useTweaks.ts
`useTweaks(defaults)` → `[t, setTweak]`, persisted to localStorage (one JSON blob). An effect in `TerminalPortfolio` applies tweaks to the document: sets `--mono`/`--display` to the chosen font variable, `--ascii-size`, toggles `body.dark`, `body.no-blink`, `body.reveal-realistic`. Defaults: `{ font: 'JetBrains Mono', asciiSize: 7, theme: 'light', cursorBlink: true, hoverReveal: 'ascii' }`.

### Terminal.tsx
Faithful port: draggable (title-bar mousedown) + CSS-resizable window, ghost-text autocomplete (Tab / →), command history (↑/↓), virtual filesystem (`navPath`) for `cd`/`ls`/`pwd`, rich React-node output. `buildCommands(api, getNavPath, setNavPath)` returns the full command map including hidden ones. `ASCII_DATA`, `HOME_PROJECTS`, `LINKS` come from module imports instead of `window`.

### AsciiImage.tsx
Port: `ResizeObserver` scaling of the `<pre>` to contain-fit (or fill-height for `.wide`), hover reveal, optional `defaultUrl`/`revealUrl`, caption, and the matcha sprite swap driven by the `portfolio:easter` event + `window.PORTFOLIO_EASTER`.

### DinoGame.tsx
Port verbatim: canvas runner, sprite physics, day/night every 700, birds after score 280, `dino-hi` localStorage high score, Space/↑/↓/Q + tap controls, theme-aware colors read from CSS vars.

### Home.tsx / About.tsx
Direct ports of `home.jsx` / `about.jsx`. Home: hero, `$whoami` intro, 5 accordion projects, `portfolio:open-project` listener. About: bio + portrait AsciiImage, experience timeline, community cards, RAM grid (games / manual music / peripherals), 19-tile lore grid, footer.

### v1 layout + toggle
`app/(v1)/layout.tsx` wraps the purple pages with the existing `Nav`/`Footer` and dark-purple background. Includes a minimal version toggle that links to `/` (back to v2). Purple `Nav` links updated from `/`,`/about`,… to `/v1`,`/v1/about`,….

## Data Flow

- Tweaks: `SettingsPanel`/`Terminal` → `setTweak` → localStorage + `document` CSS vars / body classes.
- Terminal → `api` → page state changes, scroll, project expansion (`portfolio:open-project`), version routing.
- Easter eggs: terminal command → `window.PORTFOLIO_EASTER` + `CustomEvent('portfolio:easter')` + `body` class → `AsciiImage` listeners swap sprite, CSS recolors.
- Spotify (dormant): `?code=…` on load → `lib/v2/spotify.handleCallback` → cache. No UI entry point; music column reads `TOP_TRACKS`.

## localStorage Keys (preserved)

`portfolio-version`, `dino-hi`, tweaks blob, and (dormant) `spotify_tokens`, `spotify_top_tracks`, `spotify_verifier`, `spotify_state`, `spotify_return_hash`.

## Error Handling

- Terminal: unknown command → `command not found`; per-command `try/catch` → `error: <message>` line; bad args → usage hints (all from the prototype).
- Spotify: callback errors logged, non-fatal; missing token → manual tracks remain.
- Assets: project rows with `image: null` show "coming soon"; AsciiImage falls back to a generated SVG placeholder when no `revealUrl`.

## Testing / Verification

Interactive visual port — no unit tests (no isolated business logic warranting TDD). Verification:
1. `next build` passes (TypeScript + lint clean).
2. Dev server smoke test (manual or Playwright): load `/`; toggle v1↔v2; `/v1/*` pages render purple site; open terminal (⌘K); run `help`, `cd about`, `open tenet`, `theme dark`, `font fira`, `reveal realistic`, `matcha`, `disconnect network`; verify accordion expand, ASCII↔photo hover reveal, terminal drag, ghost autocomplete, dino game playable.

## Out of Scope

- `tweaks-panel.jsx` host protocol (design-tool only).
- Live Spotify connect UI (Premium-gated; manual tracks instead).
- Changes to v1 visual design (only its routes/links move).
```
