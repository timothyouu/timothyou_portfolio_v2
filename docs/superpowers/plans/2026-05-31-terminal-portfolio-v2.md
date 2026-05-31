# Terminal Portfolio (v2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the Claude Design terminal-portfolio prototype into the existing Next.js 15 app as "v2" at `/`, moving the current purple portfolio to `/v1`, preserving every feature/easter-egg/interaction.

**Architecture:** Root layout is a minimal mono-font shell that renders a single client component `<TerminalPortfolio/>` (Home/About swapped via state + hash). The existing purple app moves into an `app/(v1)/` route group with its own layout (Tailwind + Titan/Poppins). v2 styles are ported into `app/v2.css` with only the `:root`/`html,body` blocks scoped under `body.v2`; Tailwind's `globals.css` is imported only by the v1 layout so its preflight stays route-scoped.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, `next/font/google`, plain CSS (ported), HTML canvas (dino game).

**Source of truth:** prototype files at `/tmp/design_extract/timothy-ou-s-resume-v2/project/` — `app.jsx`, `home.jsx`, `about.jsx`, `terminal.jsx`, `ascii-image.jsx`, `dino-game.jsx`, `spotify.js`, `config.js`, `ascii-data.js`, `styles.css`. If `/tmp` was cleared, re-extract: `curl -sL "https://api.anthropic.com/v1/design/h/CdYZzQETfOc3ZRCewdkyCQ" -o /tmp/design.tgz && mkdir -p /tmp/design_extract && tar xzf /tmp/design.tgz -C /tmp/design_extract` (uploads included).

**Branch:** `terminal-portfolio-v2` (already created; spec already committed).

---

## File Structure (created/modified)

```
app/
  layout.tsx              MODIFY  → minimal: 4 mono fonts, import ./v2.css, Analytics
  page.tsx                MODIFY  → renders <TerminalPortfolio/>
  v2.css                  CREATE  → ported terminal styles
  globals.css             KEEP    → now imported only by (v1)/layout.tsx
  about/                  DELETE  → moves under (v1)
  projects/               DELETE  → moves under (v1)
  skills/                 DELETE  → moves under (v1)
  (v1)/
    layout.tsx            CREATE  → Titan/Poppins, import globals.css, Nav+Footer+bg, BackToV2
    v1/page.tsx           CREATE  → purple Home (from old app/page.tsx)
    v1/about/page.tsx     CREATE  → from old app/about/page.tsx
    v1/projects/page.tsx  CREATE  → from old app/projects/page.tsx
    v1/skills/page.tsx    CREATE  → from old app/skills/page.tsx
components/
  v1/{Nav,Footer,Gallery,SkillGrid,TextCycler}.tsx  MOVE from components/
  v1/BackToV2.tsx         CREATE  → small toggle linking to /
  v2/
    TerminalPortfolio.tsx CREATE
    TopBar.tsx            CREATE
    VersionToggle.tsx     CREATE
    SettingsPanel.tsx     CREATE
    Home.tsx             CREATE
    About.tsx            CREATE
    AsciiImage.tsx       CREATE
    Terminal.tsx         CREATE
    DinoGame.tsx         CREATE
    useTweaks.ts         CREATE
data/
  v2/ascii-data.ts        CREATE  (port ascii-data.js)
  v2/config.ts            CREATE
  v2/projects.ts          CREATE
lib/
  v2/spotify.ts           CREATE
public/uploads/           CREATE  (45 assets)
```

---

### Task 1: Move the purple portfolio into the `(v1)` route group

**Files:**
- Move: `components/{Nav,Footer,Gallery,SkillGrid,TextCycler}.tsx` → `components/v1/`
- Create: `app/(v1)/layout.tsx`, `app/(v1)/v1/page.tsx`, `app/(v1)/v1/about/page.tsx`, `app/(v1)/v1/projects/page.tsx`, `app/(v1)/v1/skills/page.tsx`
- Delete: `app/about/`, `app/projects/`, `app/skills/` (after moving content)

- [ ] **Step 1: Move v1 components into `components/v1/`**

```bash
mkdir -p components/v1
git mv components/Nav.tsx components/v1/Nav.tsx
git mv components/Footer.tsx components/v1/Footer.tsx
git mv components/Gallery.tsx components/v1/Gallery.tsx
git mv components/SkillGrid.tsx components/v1/SkillGrid.tsx
git mv components/TextCycler.tsx components/v1/TextCycler.tsx
```

- [ ] **Step 2: Move the four page files into `app/(v1)/v1/`**

```bash
mkdir -p "app/(v1)/v1/about" "app/(v1)/v1/projects" "app/(v1)/v1/skills"
git mv app/page.tsx "app/(v1)/v1/page.tsx"
git mv app/about/page.tsx "app/(v1)/v1/about/page.tsx"
git mv app/projects/page.tsx "app/(v1)/v1/projects/page.tsx"
git mv app/skills/page.tsx "app/(v1)/v1/skills/page.tsx"
rmdir app/about app/projects app/skills
```

- [ ] **Step 3: Update component imports in the moved pages**

In each of `app/(v1)/v1/page.tsx`, `app/(v1)/v1/about/page.tsx`, `app/(v1)/v1/projects/page.tsx`, `app/(v1)/v1/skills/page.tsx`, rewrite component imports to the `v1` folder. Replace:
- `@/components/TextCycler` → `@/components/v1/TextCycler`
- `@/components/Gallery` → `@/components/v1/Gallery`
- `@/components/SkillGrid` → `@/components/v1/SkillGrid`

(Data imports `@/data/photos`, `@/data/projects`, `@/data/skills` stay unchanged.) The resume link `href="/timothy_resume.pdf"` and image `src="/timothyou2.png"` etc. stay (v1 assets remain in `public/`).

- [ ] **Step 4: Update Gallery import in `components/v1/Gallery.tsx`**

`Gallery.tsx` imports `@/data/projects` and `@/data/photos` — these are unchanged. No edit needed unless it imported another moved component (it does not). Confirm with: `grep -n "@/components" components/v1/*.tsx` → only matches should be ones you will fix; expected none remaining.

- [ ] **Step 5: Update Nav links to `/v1/*` in `components/v1/Nav.tsx`**

Change the `links` array hrefs and the brand link:

```tsx
const links = [
  { href: '/v1', label: 'Home' },
  { href: '/v1/about', label: 'About' },
  { href: '/v1/projects', label: 'Projects' },
  { href: '/v1/skills', label: 'Skills' },
]
```

And the brand `<Link href="/">` → `<Link href="/v1">`. (Active-route highlight via `usePathname()` keeps working.)

- [ ] **Step 6: Create `components/v1/BackToV2.tsx`**

```tsx
'use client'

import Link from 'next/link'

export default function BackToV2() {
  return (
    <Link
      href="/"
      className="fixed bottom-5 left-5 z-[100] flex items-center gap-2 rounded-full border border-[#3f3b79] bg-[#0A081D] px-3 py-1.5 text-[11px] uppercase tracking-wider text-[#D5B8E2] no-underline hover:bg-[#16142A]"
      aria-label="Switch to v2 portfolio"
    >
      <span className="font-semibold text-[#7D73EC]">v1</span>
      <span className="relative h-4 w-7 rounded-full bg-[#7D73EC]">
        <span className="absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-[#0A081D]" />
      </span>
      <span>v2 ↗</span>
    </Link>
  )
}
```

- [ ] **Step 7: Create `app/(v1)/layout.tsx`**

```tsx
import { Titan_One, Poppins } from 'next/font/google'
import '../globals.css'
import Nav from '@/components/v1/Nav'
import Footer from '@/components/v1/Footer'
import BackToV2 from '@/components/v1/BackToV2'

const titanOne = Titan_One({ weight: '400', subsets: ['latin'], variable: '--font-titan-one' })
const poppins = Poppins({ weight: ['400', '600'], subsets: ['latin'], variable: '--font-poppins' })

export default function V1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${titanOne.variable} ${poppins.variable} flex min-h-screen flex-col bg-[#16142A]`}>
      <Nav />
      <main className="flex w-full flex-1 items-center justify-center pt-[136px] pb-8 max-[1050px]:pt-[70px]">
        {children}
      </main>
      <Footer />
      <BackToV2 />
    </div>
  )
}
```

- [ ] **Step 8: Type-check (build will still fail until root layout is fixed in Task 7 — type-check only)**

Run: `npx tsc --noEmit`
Expected: no errors referencing `components/v1/*` or `app/(v1)/*`. (Root `app/layout.tsx` still imports the old `@/components/Nav` — that error is expected and fixed in Task 7. If you want a clean check now, temporarily skip; it is resolved later.)

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "refactor: move purple portfolio into (v1) route group"
```

---

### Task 2: Port assets and data files

**Files:**
- Create: `public/uploads/` (45 files), `data/v2/ascii-data.ts`, `data/v2/config.ts`, `data/v2/projects.ts`, `lib/v2/spotify.ts`

- [ ] **Step 1: Copy the 45 referenced upload assets into `public/uploads/`**

The bundle's `uploads/` was excluded from the first extraction. Extract just the referenced files. Run:

```bash
mkdir -p public/uploads
SRC=/tmp/design_extract/timothy-ou-s-resume-v2/project
# Re-extract uploads from the bundle if not present:
[ -d "$SRC/uploads" ] || tar xzf /tmp/design.tgz -C /tmp/design_extract 'timothy-ou-s-resume-v2/project/uploads' 2>/dev/null || \
  curl -sL "https://api.anthropic.com/v1/design/h/CdYZzQETfOc3ZRCewdkyCQ" -o /tmp/design.tgz && tar xzf /tmp/design.tgz -C /tmp/design_extract
# Copy every path the code references:
grep -rho "uploads/[^\"')]*" "$SRC"/*.jsx "$SRC"/config.js | sort -u | while IFS= read -r rel; do
  cp "$SRC/$rel" "public/uploads/"
done
ls public/uploads | wc -l   # expect 45
```

Expected: `45` files in `public/uploads/`, including the spaced `ChatGPT Image May 30, 2026, 10_08_52 PM.png` and `Timothy_Ou_Resume-1028b77d.pdf`.

- [ ] **Step 2: Create `data/v2/ascii-data.ts` from `ascii-data.js`**

The source defines `window.ASCII_DATA = {…}`. Convert to a module export. Run:

```bash
mkdir -p data/v2
SRC=/tmp/design_extract/timothy-ou-s-resume-v2/project
# Replace the leading "window.ASCII_DATA =" with "export const ASCII_DATA =" and strip any trailing "window.* =" lines.
sed 's/^window\.ASCII_DATA\s*=/export const ASCII_DATA =/' "$SRC/ascii-data.js" > data/v2/ascii-data.ts
```

Then open `data/v2/ascii-data.ts`, confirm the first non-comment line is `export const ASCII_DATA = {` and the file ends with the closing `};` (remove any stray `window.ASCII_DATA = ASCII_DATA;` re-assignment at the end if present). Add at the very top:

```ts
// ASCII art data ported from the design prototype. Each value is a multi-line string.
```

- [ ] **Step 3: Create `data/v2/config.ts`**

```ts
export type Track = { name: string; artist: string }

export const LINKS = {
  github:     'https://github.com/timothyouu',
  linkedin:   'https://www.linkedin.com/in/timothy-ou/',
  x:          'https://x.com/timothyouuu',
  email:      'mailto:timothyou02@gmail.com',
  resume:     '/uploads/Timothy_Ou_Resume-1028b77d.pdf',
  web:        'https://timothyou.dev',
  figma:      'https://www.instagram.com/figmaatcsuf/',
  openai:     'https://chatgpt.com/use-cases/students/',
  acm:        'https://acmcsuf.com/',
  fullyhacks: 'https://fullyhacks.acmcsuf.com/',
  caltech:    'http://minerals.gps.caltech.edu/',
} as const

export const TOP_TRACKS: Track[] = [
  { name: 'Hit the Wall',                    artist: 'Gracie Abrams' },
  { name: 'the cure',                        artist: 'Olivia Rodrigo' },
  { name: 'drop dead',                       artist: 'Olivia Rodrigo' },
  { name: 'I Thought I Saw Your Face Today', artist: 'She & Him' },
  { name: 'Superficial Love',                artist: 'Ruth B.' },
]
```

- [ ] **Step 4: Create `data/v2/projects.ts`**

Port `HOME_PROJECTS` from `home.jsx`. Replace `window.ASCII_DATA.X` references with imports from `ascii-data`, and rewrite `image:` paths from `uploads/…` to `/uploads/…`. Full content:

```ts
import { ASCII_DATA } from './ascii-data'

export type ProjectLink = { label: string; url: string | null }
export type HomeProject = {
  n: string
  title: string
  blurb: string
  meta: string[]
  ascii: string
  label: string
  detail: string
  image: string | null
  links: ProjectLink[]
}

export const HOME_PROJECTS: HomeProject[] = [
  {
    n: '01', title: 'Tenet',
    blurb: 'Branch, merge, and rollback AI chat states on the ASUS Ascent GX10',
    meta: ['react', 'typescript', 'fastapi', 'mongodb', 'd3.js', 'ollama', 'ASUS GX10'],
    ascii: ASCII_DATA.tenet, label: 'Tenet UI',
    detail: 'Built on an ASUS Ascent GX10, Tenet lets you branch, merge, and rollback AI chat states using Directed Acyclic Graphs. Four local LLMs run on Blackwell GPUs orchestrated via Fetch.ai agents, with real-time hardware telemetry so you always know what the machine is doing.',
    image: '/uploads/proj-tenet.png',
    links: [
      { label: 'github', url: 'https://github.com/Yd025/Tenet' },
      { label: 'devpost', url: 'https://devpost.com/software/tenet' },
    ],
  },
  {
    n: '02', title: 'WalkBack',
    blurb: 'Mobile safety navigator with real-time safety-scored routing',
    meta: ['react-native', 'fastapi', 'supabase', 'graphhopper'],
    ascii: ASCII_DATA.walkback, label: 'WalkBack app',
    detail: 'Built with React Native and react-native-maps to surface safety-scored routes and live GPS positioning. FastAPI endpoints sync user data and power the Buddy System group-matching feature so you never walk back alone.',
    image: '/uploads/proj-walkback.png',
    links: [
      { label: 'github', url: 'https://github.com/galacticaledge/diamondhacks2026-map' },
      { label: 'devpost', url: 'https://devpost.com/software/walkback-zctpik' },
    ],
  },
  {
    n: '03', title: 'AI Recipe Assistant',
    blurb: 'Meal planning powered by persistent pantry memory and Gemini',
    meta: ['react', 'tailwind', 'supabase', 'clerk', 'letta', 'gemini'],
    ascii: ASCII_DATA.recipe, label: 'Recipe assistant',
    detail: 'Integrates Letta and Gemini 2.5 Flash for persistent pantry memory and structured JSON recipe generation. Tracks what you actually have, plans around it, and keeps a running profile of what you liked.',
    image: null,
    links: [
      { label: 'prd', url: 'https://www.notion.so/PRD-Smart-AI-Recipe-Assistant-338f8be3ccbe44fdaf189d19ec45be98?source=copy_link' },
      { label: 'github — soon', url: null },
    ],
  },
  {
    n: '04', title: 'OSS Stats',
    blurb: 'Python CLI auditing PRs, commits, and velocity for the ACM CSUF org',
    meta: ['python', 'github-api'],
    ascii: ASCII_DATA.oss, label: 'OSS Stats CLI',
    detail: 'A CLI tool that audits pull requests, commits, and contribution velocity across the acmcsufoss GitHub org. Cut API latency 50% with in-memory JSON caching and refactored calls to eliminate redundant requests.',
    image: '/uploads/proj-oss.png',
    links: [{ label: 'github', url: 'https://github.com/acmcsufoss/oss-stats' }],
  },
  {
    n: '05', title: 'FigPals Bubble Blast!',
    blurb: 'A nostalgic water hoop game built in 6 hours for FullyHacks',
    meta: ['react', 'typescript', 'figma-make', 'claude-code'],
    ascii: ASCII_DATA.figpals, label: 'FigPals Bubble Blast',
    detail: 'Inspired by the nostalgic physical water hoop games from childhood, this was built in just 6 hours before FullyHacks kicked off. Used Figma Make for rapid UI generation and Claude Code for the heavy lifting — from memory to functional project in a single afternoon. Hold the buttons down for more power, just like the real thing.',
    image: '/uploads/proj-figpals.png',
    links: [{ label: 'play it', url: 'https://figma-water-hoop-challenge.vercel.app/' }],
  },
]
```

- [ ] **Step 5: Create `lib/v2/spotify.ts`** (ported PKCE helpers, dormant)

Port `spotify.js` (the IIFE body) into a typed module. Replace the `(function(){ … window.SpotifyAuth = {…} })()` wrapper with named `export`s. Full content:

```ts
// Spotify PKCE OAuth helpers — no client secret needed. Dormant in v2 (no connect
// button); only handleCallback runs if the app loads with ?code=. Top-tracks needs
// Premium, so the RAM "music" column renders the manual TOP_TRACKS list instead.
const CLIENT_ID = '932f971de9dd4076af84d7d118bf165b'
const SCOPE = 'user-top-read'
const TOKEN_KEY = 'spotify_tokens'
const CACHE_KEY = 'spotify_top_tracks'
const CACHE_TTL = 60 * 60 * 1000

function redirectUri() { return window.location.origin + window.location.pathname }

function rand(n: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from(crypto.getRandomValues(new Uint8Array(n)), (v) => chars[v % chars.length]).join('')
}

async function sha256b64url(plain: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(plain))
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export async function authorize() {
  const verifier = rand(64)
  const challenge = await sha256b64url(verifier)
  const state = rand(16)
  localStorage.setItem('spotify_verifier', verifier)
  localStorage.setItem('spotify_state', state)
  localStorage.setItem('spotify_return_hash', window.location.hash || '#about')
  window.location.href = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
    client_id: CLIENT_ID, response_type: 'code', redirect_uri: redirectUri(),
    scope: SCOPE, code_challenge_method: 'S256', code_challenge: challenge, state,
  })
}

export async function handleCallback(code: string, state: string | null) {
  if (state !== localStorage.getItem('spotify_state')) throw new Error('State mismatch — try connecting again.')
  const verifier = localStorage.getItem('spotify_verifier') || ''
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID, grant_type: 'authorization_code', code,
      redirect_uri: redirectUri(), code_verifier: verifier,
    }),
  })
  const tokens = await res.json()
  if (tokens.error) throw new Error(tokens.error_description || tokens.error)
  tokens.expires_at = Date.now() + tokens.expires_in * 1000
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens))
  localStorage.removeItem('spotify_verifier')
  localStorage.removeItem('spotify_state')
  return tokens
}

async function getToken(): Promise<string | null> {
  const raw = localStorage.getItem(TOKEN_KEY)
  if (!raw) return null
  let t = JSON.parse(raw)
  if (Date.now() > t.expires_at - 300_000) {
    if (!t.refresh_token) { localStorage.removeItem(TOKEN_KEY); return null }
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: CLIENT_ID, grant_type: 'refresh_token', refresh_token: t.refresh_token }),
    })
    const refreshed = await res.json()
    if (refreshed.error) { localStorage.removeItem(TOKEN_KEY); return null }
    t = { ...t, ...refreshed, expires_at: Date.now() + refreshed.expires_in * 1000 }
    localStorage.setItem(TOKEN_KEY, JSON.stringify(t))
  }
  return t.access_token
}

export async function fetchTopTracks(force = false) {
  if (!force) {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const { tracks, ts } = JSON.parse(cached)
      if (Date.now() - ts < CACHE_TTL) return tracks
    }
  }
  const token = await getToken()
  if (!token) return null
  const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term', {
    headers: { Authorization: 'Bearer ' + token },
  })
  const data = await res.json()
  if (data.error) return null
  const tracks = data.items.map((t: any) => ({
    name: t.name, artist: t.artists.map((a: any) => a.name).join(', '), url: t.external_urls.spotify,
  }))
  localStorage.setItem(CACHE_KEY, JSON.stringify({ tracks, ts: Date.now() }))
  return tracks
}

export function isConnected() { return !!localStorage.getItem(TOKEN_KEY) }
export function disconnect() { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(CACHE_KEY) }
```

- [ ] **Step 6: Type-check and commit**

Run: `npx tsc --noEmit` (expect: no errors in `data/v2/*` or `lib/v2/*`; root layout error from Task 1 may persist — ignore until Task 7).

```bash
git add data/v2 lib/v2 public/uploads
git commit -m "feat(v2): port ascii data, config, projects, spotify lib, and assets"
```

---

### Task 3: Port the v2 stylesheet

**Files:**
- Create: `app/v2.css`

- [ ] **Step 1: Copy `styles.css` to `app/v2.css`**

```bash
cp /tmp/design_extract/timothy-ou-s-resume-v2/project/styles.css app/v2.css
```

- [ ] **Step 2: Scope the two global blocks under `body.v2`**

In `app/v2.css`, change the opening `:root { … }` selector (the light-theme token block, lines starting `:root {`) to `body.v2 {`. Then change the base reset selector `html, body {` (the block setting `margin/padding/background/color/font-family/font-size/line-height`) to `body.v2 {`. Leave `body.dark`, `body.matcha`, `body.lavender`, `body.no-blink`, `body.reveal-realistic`, and all `*`, `.shell`, `.topbar`, `.term-*`, `.lore-grid`, etc. selectors unchanged. (The `* { box-sizing: border-box; }` rule stays global — harmless.)

Verify both replacements landed:

Run: `grep -n "^body.v2 {" app/v2.css`
Expected: two matches (the former `:root` and the former `html, body`).

Run: `grep -n "^:root {" app/v2.css`
Expected: no matches.

- [ ] **Step 3: Commit**

```bash
git add app/v2.css
git commit -m "feat(v2): port terminal stylesheet scoped under body.v2"
```

**Contingency:** The element-level rules in `v2.css` (`a`, `a.link`, `button`, `::selection`, and the `::-webkit-scrollbar*` rules) remain global. Tailwind's class-based styles on `/v1` have higher specificity and win, so this is normally harmless. If, during Task 8 smoke testing, v1 links/buttons look wrong (e.g. lost color or underline), scope those element rules under `body.v2` too — e.g. `a` → `body.v2 a`, `button` → `body.v2 button`, `::selection` → `body.v2 ::selection`. Do this only if needed.

---

### Task 4: Port leaf components — useTweaks, AsciiImage, DinoGame

**Files:**
- Create: `components/v2/useTweaks.ts`, `components/v2/AsciiImage.tsx`, `components/v2/DinoGame.tsx`

- [ ] **Step 1: Create `components/v2/useTweaks.ts`**

Replaces the Claude Design `tweaks-panel` harness with a minimal localStorage-backed hook.

```ts
'use client'

import { useEffect, useState, useCallback } from 'react'

export type Tweaks = {
  font: string
  asciiSize: number
  theme: 'light' | 'dark'
  cursorBlink: boolean
  hoverReveal: 'ascii' | 'realistic'
}

export const TWEAK_DEFAULTS: Tweaks = {
  font: 'JetBrains Mono',
  asciiSize: 7,
  theme: 'light',
  cursorBlink: true,
  hoverReveal: 'ascii',
}

const KEY = 'portfolio-tweaks'

export function useTweaks(): [Tweaks, <K extends keyof Tweaks>(k: K, v: Tweaks[K]) => void] {
  const [t, setT] = useState<Tweaks>(TWEAK_DEFAULTS)

  // hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setT((prev) => ({ ...prev, ...JSON.parse(raw) }))
    } catch {}
  }, [])

  const setTweak = useCallback(<K extends keyof Tweaks>(k: K, v: Tweaks[K]) => {
    setT((prev) => {
      const next = { ...prev, [k]: v }
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  return [t, setTweak]
}
```

- [ ] **Step 2: Create `components/v2/AsciiImage.tsx`**

Port `ascii-image.jsx`. Transforms: add `'use client'`; convert to TS with a props type; `React.useState/useEffect/useRef` → named imports; `window.ASCII_DATA.matcha_cup` → import `ASCII_DATA`; keep the `window.PORTFOLIO_EASTER` global + `portfolio:easter` event listener (guard `window` access in the initial state with a typeof check). Full content:

```tsx
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
```

- [ ] **Step 3: Create `components/v2/DinoGame.tsx`**

Port `dino-game.jsx` verbatim into TS. Transforms: add `'use client'`; `import { useEffect, useRef, useState } from 'react'`; `React.useRef/useState` → named; keep the module-level `let DINO_SEQ = 0`, all sprite arrays, and `window.__activeDinoId`. Add light types: `canvasRef = useRef<HTMLCanvasElement>(null)`, annotate `spriteSize(sprite: string[], px: number)`, and `(window as any).__activeDinoId`. Everything else (physics, draw, listeners, cleanup) copies unchanged. The default export is `DinoGame`.

Copy the source to read alongside:

```bash
sed -n '1,380p' /tmp/design_extract/timothy-ou-s-resume-v2/project/dino-game.jsx
```

Key signatures that must match the original exactly: `groundY = 124`, `px = 3`, `GRAVITY = 0.75`, `JUMP_V = 13.2`, score thresholds (`> 280` birds, `/ 700` night), `localStorage` key `'dino-hi'`, canvas `width={640} height={150}`.

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors in `components/v2/{useTweaks,AsciiImage,DinoGame}`. (Root layout error from Task 1 may persist.)

- [ ] **Step 5: Commit**

```bash
git add components/v2/useTweaks.ts components/v2/AsciiImage.tsx components/v2/DinoGame.tsx
git commit -m "feat(v2): port useTweaks hook, AsciiImage, and DinoGame"
```

---

### Task 5: Port the Terminal

**Files:**
- Create: `components/v2/Terminal.tsx`

- [ ] **Step 1: Read the source**

```bash
sed -n '1,515p' /tmp/design_extract/timothy-ou-s-resume-v2/project/terminal.jsx
```

- [ ] **Step 2: Create `components/v2/Terminal.tsx`**

Port `terminal.jsx`. Transforms:
- Add `'use client'`; `import { useState, useEffect, useRef } from 'react'`; replace the `useTermState/useTermRef/useTermEffect` aliases with these named hooks (the source aliases them — just use the real names).
- Replace globals with imports: `window.PORTFOLIO_LINKS` → `import { LINKS } from '@/data/v2/config'` (use `LINKS`); `window.HOME_PROJECTS` → `import { HOME_PROJECTS } from '@/data/v2/projects'`; `window.PORTFOLIO_EASTER` stays a `window` global; `<DinoGame/>` → `import DinoGame from './DinoGame'`.
- Add a TS type for the api prop:

```tsx
export type TerminalApi = {
  goTo: (p: string) => void
  navigate: (p: string, id: string | null) => void
  setTheme: (t: string) => void
  setVersion: (v: string) => void
  setTweak: (k: string, v: unknown) => void
  getState: () => { page: string; theme: string; version: string; font: string; asciiSize: number; hoverReveal: string | boolean }
  openProject: (title: string) => void
  scrollTo: (id: string) => void
  close: () => void
}
```
- `Terminal({ open, onClose, api }: { open: boolean; onClose: () => void; api: TerminalApi })`.
- `buildCommands(api, getNavPath, setNavPath)`: type as `buildCommands(api: TerminalApi, getNavPath: () => string[], setNavPath: (p: string[]) => void)`. The `ctx` object methods return via `push`; type `ctx` loosely as `any` to keep the port faithful (the command bodies use `ctx.out/ok/err/node/clear/close`).
- The `cmds` ref: `useRef<Record<string, any> | null>(null)`.
- Keep `web` command working — it reads `L.web`, now present in `LINKS`.
- Everything else (completion, history, drag, submit, render JSX with `className` already) copies unchanged. Note: source already uses `className` (it was written for Babel/React), so no `class`→`className` work needed.
- Default export `Terminal`.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no new errors in `components/v2/Terminal.tsx`.

- [ ] **Step 4: Commit**

```bash
git add components/v2/Terminal.tsx
git commit -m "feat(v2): port terminal with autocomplete, history, and commands"
```

---

### Task 6: Port pages and chrome — TopBar, VersionToggle, SettingsPanel, Home, About

**Files:**
- Create: `components/v2/TopBar.tsx`, `components/v2/VersionToggle.tsx`, `components/v2/SettingsPanel.tsx`, `components/v2/Home.tsx`, `components/v2/About.tsx`

- [ ] **Step 1: Create `components/v2/TopBar.tsx`**

Port the `TopBar` function from `app.jsx`. Transforms: `'use client'`; props typed; `window.PORTFOLIO_LINKS` → `import { LINKS } from '@/data/v2/config'`. Full content:

```tsx
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
```

- [ ] **Step 2: Create `components/v2/VersionToggle.tsx`**

```tsx
'use client'

type Props = { version: 'v1' | 'v2'; setVersion: (v: 'v1' | 'v2') => void }

export default function VersionToggle({ version, setVersion }: Props) {
  const isV1 = version === 'v1'
  return (
    <div className={`vtoggle ${version}`}>
      <button className={isV1 ? 'active' : ''} onClick={() => setVersion('v1')}>v1</button>
      <div className="switch" onClick={() => setVersion(isV1 ? 'v2' : 'v1')}>
        <div className="knob"></div>
      </div>
      <button className={!isV1 ? 'active' : ''} onClick={() => setVersion('v2')}>v2</button>
    </div>
  )
}
```

- [ ] **Step 3: Create `components/v2/SettingsPanel.tsx`**

Port the `SettingsPanel` from `app.jsx`. Props typed against `Tweaks`. Full content:

```tsx
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
```

- [ ] **Step 4: Create `components/v2/Home.tsx`**

Port `home.jsx`'s `Home` component (NOT the `HOME_PROJECTS` array — that now lives in `data/v2/projects.ts`). Transforms: `'use client'`; `import { useState, useEffect } from 'react'`; `import { HOME_PROJECTS } from '@/data/v2/projects'`; `import { LINKS } from '@/data/v2/config'`; `import AsciiImage from './AsciiImage'`; `import TopBar from './TopBar'`. Props: `{ goTo, setSettingsOpen }` typed. The JSX (hero, intro, projects accordion, footer) copies unchanged (already uses `className`). Replace `useStateHome` alias with `useState`. Keep the `portfolio:open-project` listener effect. Default export `Home`.

Read source: `sed -n '77,179p' /tmp/design_extract/timothy-ou-s-resume-v2/project/home.jsx`

- [ ] **Step 5: Create `components/v2/About.tsx`**

Port `about.jsx`. Transforms: `'use client'`; `import { LINKS, TOP_TRACKS } from '@/data/v2/config'`; `import { ASCII_DATA } from '@/data/v2/ascii-data'`; `import AsciiImage from './AsciiImage'`; `import TopBar from './TopBar'`. Replace `window.ASCII_DATA.X` → `ASCII_DATA.X`, `window.TOP_TRACKS` → `TOP_TRACKS`, `window.PORTFOLIO_LINKS` → `LINKS`. Rewrite every `defaultUrl="uploads/…"` and `revealUrl="uploads/…"` to `/uploads/…` (leading slash). Props `{ goTo, setSettingsOpen }`. JSX copies otherwise unchanged. Default export `About`.

Read source: `sed -n '1,174p' /tmp/design_extract/timothy-ou-s-resume-v2/project/about.jsx`

To rewrite the upload paths in bulk after pasting, you can run:
`sed -i 's#="uploads/#="/uploads/#g' components/v2/About.tsx` then verify `grep -c '"uploads/' components/v2/About.tsx` returns `0` and `grep -c '"/uploads/' components/v2/About.tsx` returns `40` (portrait: 1 defaultUrl + 1 revealUrl; lore: 19 tiles × 2 = 38).

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit`
Expected: no new errors in the five new files.

- [ ] **Step 7: Commit**

```bash
git add components/v2/TopBar.tsx components/v2/VersionToggle.tsx components/v2/SettingsPanel.tsx components/v2/Home.tsx components/v2/About.tsx
git commit -m "feat(v2): port TopBar, VersionToggle, SettingsPanel, Home, About"
```

---

### Task 7: Root composition — TerminalPortfolio, page, layout

**Files:**
- Create: `components/v2/TerminalPortfolio.tsx`
- Modify: `app/page.tsx`, `app/layout.tsx`

- [ ] **Step 1: Create `components/v2/TerminalPortfolio.tsx`**

Port the `App` component from `app.jsx`. Transforms:
- `'use client'`; `import { useState, useEffect, useMemo, useCallback } from 'react'`; `import { useRouter } from 'next/navigation'`.
- Imports: `useTweaks, TWEAK_DEFAULTS, type Tweaks` from `./useTweaks`; `Home`, `About`, `Terminal`, `SettingsPanel`, `VersionToggle` from siblings; `handleCallback, fetchTopTracks` from `@/lib/v2/spotify`.
- Replace `ReactDOM.createRoot(...)` at the bottom — DELETE it; the default export is the `TerminalPortfolio` component.
- `FONT_STACKS` maps each font name to its `next/font` CSS variable:

```tsx
const FONT_STACKS: Record<string, string> = {
  'JetBrains Mono': 'var(--font-jetbrains-mono), ui-monospace, Menlo, monospace',
  'IBM Plex Mono': 'var(--font-ibm-plex-mono), ui-monospace, Menlo, monospace',
  'Fira Code': 'var(--font-fira-code), ui-monospace, Menlo, monospace',
  'Space Mono': 'var(--font-space-mono), ui-monospace, Menlo, monospace',
}
```
- Add a `body.v2` class effect:

```tsx
useEffect(() => {
  document.body.classList.add('v2')
  return () => document.body.classList.remove('v2')
}, [])
```
- The tweaks-applying effect: same as `app.jsx` lines 117–128 (set `--mono`/`--display`/`--ascii-size`, toggle `dark`/`no-blink`/`reveal-realistic`).
- `version` state: initialize from `localStorage.getItem('portfolio-version')` / hash, default `'v2'`. **Change:** when `version === 'v1'`, do `router.push('/v1')` in an effect instead of rendering `<V1/>`:

```tsx
const router = useRouter()
useEffect(() => { if (version === 'v1') router.push('/v1') }, [version, router])
```
  Render `null` for the main content while `version === 'v1'` (the push navigates away). Do NOT import a V1 component.
- `setVersion` passed to `VersionToggle` and used by the terminal `api.setVersion`: `(v) => setVersion(v === 'v1' ? 'v1' : 'v2')`. Setting `'v1'` triggers the redirect effect above.
- `page` state, `termOpen`, `settingsOpen`, `toggleTheme`, the `api` useMemo, the Spotify callback effect (use imported `handleCallback`/`fetchTopTracks` instead of `window.SpotifyAuth`), the ⌘K/backtick effect, and the hash-sync effect all copy from `app.jsx` (drop the `v1` branch in hash-sync; base is `page === 'about' ? 'about' : 'home'`).
- Render tree (replace the `<TweaksPanel>…</TweaksPanel>` block — that harness is NOT ported):

```tsx
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
```
- The terminal `api` object: copy from `app.jsx` (`goTo`, `navigate`, `setTheme`, `setVersion`, `setTweak`, `getState`, `openProject`, `scrollTo`, `close`). Cast `setTweak` where the api type expects `(k: string, v: unknown)` — wrap: `setTweak: (k, v) => setTweak(k as keyof Tweaks, v as never)`.

Read source: `sed -n '112,295p' /tmp/design_extract/timothy-ou-s-resume-v2/project/app.jsx`

- [ ] **Step 2: Replace `app/page.tsx`**

```tsx
import TerminalPortfolio from '@/components/v2/TerminalPortfolio'

export default function Page() {
  return <TerminalPortfolio />
}
```

- [ ] **Step 3: Replace `app/layout.tsx`** (minimal mono-font shell)

```tsx
import type { Metadata } from 'next'
import { JetBrains_Mono, IBM_Plex_Mono, Fira_Code, Space_Mono } from 'next/font/google'
import './v2.css'
import { Analytics } from '@vercel/analytics/next'

const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })
const ibmPlex = IBM_Plex_Mono({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'], variable: '--font-ibm-plex-mono' })
const fira = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' })
const space = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-space-mono' })

export const metadata: Metadata = {
  title: 'Timothy Ou — Portfolio',
  description: 'Full-stack engineer & AI builder. Junior CS @ Cal State Fullerton.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jetbrains.variable} ${ibmPlex.variable} ${fira.variable} ${space.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

Note: the root `<body>` no longer hard-codes a background or font — those come from `body.v2` (set by TerminalPortfolio) and the `(v1)` layout's wrapper div. This keeps Tailwind's preflight (imported only under `(v1)`) from touching v2.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: compiles successfully; routes shown include `/`, `/v1`, `/v1/about`, `/v1/projects`, `/v1/skills`. Fix any TS errors surfaced.

- [ ] **Step 5: Commit**

```bash
git add components/v2/TerminalPortfolio.tsx app/page.tsx app/layout.tsx
git commit -m "feat(v2): compose TerminalPortfolio root, wire page and minimal layout"
```

---

### Task 8: Smoke test and finalize

- [ ] **Step 1: Start the dev server**

Run: `npm run dev` (background) and open `http://localhost:3000`.

- [ ] **Step 2: Verify v2 home**

- Hero "Timothy Ou" with blinking caret; `$whoami` intro; 5 project rows.
- Click a project row → expands with detail + tech tags + links (screenshot or "coming soon").
- Footer socials render.

- [ ] **Step 3: Verify terminal**

- Press `⌘K` (or backtick) → terminal opens with welcome banner.
- Type `help` → grouped command list. Type `cd ab` then Tab → completes to `cd about`; Enter → navigates to About.
- `open tenet` → returns home, expands Tenet. `theme dark` → dark mode. `font fira` → font changes. `reveal realistic` → photos show at rest.
- `matcha` → green tint + ascii sprites swap; `tim` → lavender. `sudo` → "nice try"; `rm` → "absolutely not."
- `disconnect network` → dino game canvas; Space jumps, score climbs, `q` quits.
- Drag the title bar → window moves. Drag the bottom-right corner → resizes.

- [ ] **Step 4: Verify About + hover reveals**

- Navigate to About (nav "about" or `cd about`). Portrait + experience timeline + community + RAM (games / 5 manual tracks / peripherals) + 19-tile lore grid.
- Hover a lore tile → ASCII transitions to the real photo; tile scales up.

- [ ] **Step 5: Verify version toggle + v1**

- Click the bottom-left toggle to `v1` → routes to `/v1`, purple portfolio renders with its own Nav/Footer.
- Navigate `/v1/about`, `/v1/projects`, `/v1/skills` → all render purple, unchanged.
- Click the v1 BackToV2 toggle → returns to `/` (v2).

- [ ] **Step 6: Settings panel**

- Click the gear in the v2 top bar → panel opens top-right; theme/font/reveal controls work and persist across reload (localStorage `portfolio-tweaks`).

- [ ] **Step 7: Stop dev server and do a final production build**

Run: `npm run build`
Expected: clean build, no type errors.

- [ ] **Step 8: Final commit**

```bash
git add -A
git commit -m "test: verify v2 terminal portfolio end-to-end" --allow-empty
```

---

## Notes for the implementer

- **`'use client'` everywhere in `components/v2/`** — the whole v2 tree is interactive (state, refs, browser APIs).
- **Spaces in asset filenames** (`ChatGPT Image …png`) are fine as CSS `url("/uploads/ChatGPT Image ….png")` and in `<img>` — keep them exact; do not rename (the data/code references the exact names).
- **Do not port `tweaks-panel.jsx` or `v1.jsx`** from the prototype — `useTweaks` replaces the former; the real purple portfolio replaces the latter.
- **If `tsc --noEmit` complains** about implicit `any` in the ported terminal command bodies, that is expected for the faithful port — type the `ctx`/`cmds` containers as `any` as noted in Task 5; do not rewrite command logic.
