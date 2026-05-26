# React Portfolio Rewrite — Design Spec
**Date:** 2026-05-26

## Overview

Rewrite the existing SvelteKit portfolio into a Next.js (App Router) + TypeScript + Tailwind CSS application. The visual design, color palette, fonts, and page content are preserved exactly. The current Svelte deployment remains live so users can navigate between v1 and v2.

## Decisions

| Decision | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Pages | Same 4: Home, About, Projects, Skills |
| Design | Identical to current Svelte version |

## File Structure

```
app/
  layout.tsx          # Root layout — Nav + Footer (replaces per-page duplication)
  page.tsx            # Home page
  about/page.tsx      # About page
  projects/page.tsx   # Projects page
  skills/page.tsx     # Skills page

components/
  Nav.tsx             # 'use client' — sidebar toggle, active route highlight
  Footer.tsx          # Webring links, copyright
  Gallery.tsx         # 'use client' — reusable prev/next gallery (About + Projects)
  TextCycler.tsx      # 'use client' — animated fade text loop (Home)
  SkillGrid.tsx       # Server component — renders skill tile grid

data/
  photos.ts           # Gallery image list for About page
  projects.ts         # Project entries for Projects page
  skills.ts           # Skill arrays for Skills page
```

## Styling

Custom Tailwind tokens in `tailwind.config.ts`:

```ts
colors: {
  bg:           '#16142A',  // page background
  'bg-dark':    '#0A081D',  // nav/footer background
  accent:       '#7D73EC',  // purple links/titles
  lavender:     '#D5B8E2',  // nav links, body text
  mauve:        '#BC95D1',  // subtitles
  light:        '#E0E1DD',  // fun fact text
  'skill-tile': '#1E1B3A',  // skill card background
}
```

Fonts via Google Fonts in `app/layout.tsx`:
- **Titan One** — headings
- **Poppins** — text cycler, body
- **Gill Sans** — nav/footer (system font)

## Component Behavior

### Nav.tsx — `'use client'`
- `useState<boolean>` for sidebar open/closed
- `usePathname()` from `next/navigation` to highlight active link
- Responsive at 1050px breakpoint: desktop = full nav, mobile = hamburger + sidebar overlay

### TextCycler.tsx — `'use client'`
- `useState` for current index and opacity value
- `useEffect` runs 3s interval, cleans up on unmount
- CSS `transition: opacity` replaces Svelte's `tweened` easing

### Gallery.tsx — `'use client'`
- Generic component accepting typed item arrays as props
- `useState<number>` for current index, prev/next handlers
- About passes `{ path: string; location: string }[]`
- Projects passes `{ path: string; project: string; date: string; tech: string; description: string }[]`
- Renders caption fields conditionally based on which props are present

### SkillGrid.tsx — server component
- Accepts skill category arrays as props
- No hooks, pure render

## Svelte → React Translation Map

| Svelte | React / Next.js |
|---|---|
| `$app/stores` `page` | `usePathname()` from `next/navigation` |
| `tweened` opacity | `useState` + CSS `transition: opacity` |
| `onMount` / `onDestroy` | `useEffect` with cleanup return |
| `$:` reactive declarations | Regular variables or `useMemo` |
| Scoped `<style>` | Tailwind classes in JSX |
| `+page.svelte` file routing | `app/*/page.tsx` file routing |
| `src/lib/index.js` | `data/*.ts` constants |

## Branch Strategy

- Work happens on a new `react-rewrite` branch
- Current `main` branch stays deployed as v1
- React version deployed separately as v2 once complete
