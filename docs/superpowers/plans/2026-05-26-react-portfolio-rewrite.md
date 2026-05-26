# React Portfolio Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the SvelteKit portfolio as a Next.js 15 + TypeScript + Tailwind v4 App Router app on a `react-rewrite` branch, preserving the exact same design and content.

**Architecture:** Root `app/layout.tsx` holds the shared Nav and Footer, eliminating the per-page duplication from the Svelte version. Interactive components (Nav sidebar, TextCycler, Gallery) are `'use client'` components; data files are plain TypeScript constants.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, next/font/google

---

### Task 1: Create branch and remove Svelte files

**Files:**
- Delete: `svelte.config.js`, `vite.config.js`, `jsconfig.json`
- Delete: `src/` directory
- Rename: `static/` → `public/`

- [ ] **Step 1: Create react-rewrite branch**

```bash
git checkout -b react-rewrite
```

Expected: Switched to a new branch 'react-rewrite'

- [ ] **Step 2: Remove Svelte-specific files**

```bash
rm svelte.config.js vite.config.js jsconfig.json
rm -rf src/
```

- [ ] **Step 3: Rename static/ to public/ (Next.js convention)**

```bash
mv static public
```

- [ ] **Step 4: Commit cleanup**

```bash
git add -A
git commit -m "chore: remove svelte files, rename static to public for Next.js"
```

---

### Task 2: Scaffold Next.js project files

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "timothyou-portfolio-v2",
  "private": true,
  "version": "0.0.1",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4"
  }
}
```

- [ ] **Step 2: Create next.config.ts**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {}

export default nextConfig
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create postcss.config.mjs**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
export default config
```

- [ ] **Step 5: Install dependencies**

```bash
npm install
```

Expected: node_modules created, no errors.

- [ ] **Step 6: Commit scaffold**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 + TypeScript + Tailwind v4"
```

---

### Task 3: Create data files

**Files:**
- Create: `data/photos.ts`
- Create: `data/projects.ts`
- Create: `data/skills.ts`

- [ ] **Step 1: Create data/photos.ts**

```ts
export type Photo = {
  path: string
  location: string
}

export const photos: Photo[] = [
  { path: '/mono_lake.jpg', location: 'Mono Lake, California' },
  { path: '/gum_wall.jpg', location: 'Gum Wall, Washington' },
  { path: '/farmers_market.jpg', location: 'Pike Place, Washington' },
  { path: '/light_jellyfish.jpg', location: 'Sensorio, California' },
  { path: '/light_field.jpg', location: 'Sensorio, California' },
  { path: '/tokyo_tower.jpg', location: 'Tokyo Tower, Japan' },
  { path: '/shrine.jpg', location: 'Meiji Jingu Shrine, Japan' },
  { path: '/sumida_river.jpg', location: 'Sumida River, Japan' },
  { path: '/bixby.JPEG', location: 'Bixby Bridge, California' },
  { path: '/waves.JPEG', location: 'Pebble Beach, California' },
  { path: '/lone_cypress.JPEG', location: 'Lone Cypress, California' },
  { path: '/mcway_falls.JPEG', location: 'Mcway Falls, California' },
  { path: '/zion.JPEG', location: 'Zion National Park, Utah' },
  { path: '/snoqualmie_falls.jpg', location: 'Snoqualmie Falls, Washington' },
  { path: '/space_needle.jpg', location: 'Space Needle, Washington' },
  { path: '/palace1.jpg', location: 'Palace of Fine Arts, California' },
  { path: '/palace2.jpg', location: 'Palace of Fine Arts, California' },
]
```

- [ ] **Step 2: Create data/projects.ts**

```ts
export type Project = {
  path: string
  project: string
  date: string
  tech: string
  description: string
}

export const projects: Project[] = [
  {
    path: '/os_stats.png',
    project: 'Open Source Stats',
    date: 'October 2024 - Present',
    tech: 'Python, GitHub API',
    description: 'Contributed to Python CLI tool that retrieves commits and pull requests from acmcsufoss GitHub organization',
  },
  {
    path: '/global_city_explorer.png',
    project: 'Global City Explorer - FullyHacks Project',
    date: 'April 2025 - April 2025',
    tech: 'Javascript, HTML, CSS, SvelteKit',
    description: 'Developed a real-time global city information app using SvelteKit, enabling users to search and view key data',
  },
  {
    path: '/geometric_calculator.png',
    project: 'Geometric Shapes Calculator',
    date: 'March 2024 - May 2024',
    tech: 'JavaScript, HTML, CSS',
    description: 'Developed a web application to calculate the area and volume of 2D and 3D geometric shapes',
  },
  {
    path: '/password.png',
    project: 'Secure Password Generator',
    date: 'February 2024 - April 2024',
    tech: 'JavaScript, HTML, CSS',
    description: 'Developed a robust JavaScript application for generating secure passwords based on user-defined strength levels',
  },
]
```

- [ ] **Step 3: Create data/skills.ts**

```ts
export const programmingLanguages = ['C++', 'Javascript', 'Python', 'HTML', 'CSS', 'R']

export const programmingTools = [
  'Git', 'GitHub', 'Linux', 'Visual Studio Code',
  'React Native Expo', 'Firebase', 'AWS S3', 'Crow', 'SvelteKit', 'RStudio',
]

export const otherSkills = [
  'Problem Solving', 'Leadership', 'Teamwork', 'Communication',
  'Collaboration', 'Adaptability', 'Mentoring', 'Marketing',
]
```

- [ ] **Step 4: Commit data files**

```bash
git add data/
git commit -m "feat: add typed data files for photos, projects, skills"
```

---

### Task 4: Create global CSS and root layout

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`

- [ ] **Step 1: Create app/globals.css**

```css
@import "tailwindcss";

@theme {
  --color-bg: #16142A;
  --color-bg-dark: #0A081D;
  --color-accent: #7D73EC;
  --color-lavender: #D5B8E2;
  --color-mauve: #BC95D1;
  --color-light: #E0E1DD;
  --color-skill-tile: #1E1B3A;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background-color: #16142A;
  overflow-x: hidden;
}
```

- [ ] **Step 2: Create app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Titan_One, Poppins } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const titanOne = Titan_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-titan-one',
})

const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Timothy Ou',
  description: 'Portfolio of Timothy Ou — CS Student @ CSUF',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${titanOne.variable} ${poppins.variable} flex flex-col min-h-screen bg-[#16142A]`}>
        <Nav />
        <main className="flex-1 flex justify-center items-center w-full pt-[136px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit layout**

```bash
git add app/
git commit -m "feat: add global CSS with Tailwind v4 theme tokens and root layout"
```

---

### Task 5: Create Nav component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create components/Nav.tsx**

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
]

export default function Nav() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] bg-[#0A081D] shadow-md">
      {sidebarOpen && (
        <ul className="fixed top-0 right-0 h-screen w-[250px] z-[999] bg-[#16142A] shadow-[-10px_0_10px_rgba(0,0,0,0.1)] flex flex-col items-start justify-start list-none p-0 m-0 opacity-95 backdrop-blur-sm">
          <li className="w-full">
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation menu"
              className="flex items-center w-full px-5 h-[70px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="#D5B8E2">
                <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
              </svg>
            </button>
          </li>
          {links.map(({ href, label }) => (
            <li key={href} className="w-full">
              <Link
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center w-full h-[70px] px-5 text-2xl font-semibold no-underline transition-colors duration-300 font-[family-name:var(--font-titan-one)] ${pathname === href ? 'text-[#7D73EC]' : 'text-[#D5B8E2] hover:bg-[#16142A]'}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <ul className="flex items-center justify-end w-full list-none p-0 m-0 h-[136px] max-[1050px]:h-[70px]">
        <li className="mr-auto">
          <Link href="/" className="flex items-center h-full px-8 text-4xl font-semibold no-underline text-[#7D73EC] whitespace-nowrap font-[family-name:var(--font-titan-one)] transition-colors duration-300">
            Timothy Ou
          </Link>
        </li>
        {links.map(({ href, label }) => (
          <li key={href} className="hidden min-[1050px]:flex h-[136px]">
            <Link
              href={href}
              className={`flex items-center h-full px-8 text-4xl font-semibold no-underline transition-colors duration-300 font-[family-name:var(--font-titan-one)] ${pathname === href ? 'text-[#7D73EC]' : 'text-[#D5B8E2] hover:bg-[#16142A]'}`}
            >
              {label}
            </Link>
          </li>
        ))}
        <li className="flex min-[1050px]:hidden h-[70px] items-center px-5">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            className="flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="#D5B8E2">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  )
}
```

- [ ] **Step 2: Commit Nav**

```bash
git add components/Nav.tsx
git commit -m "feat: add responsive Nav component with mobile sidebar"
```

---

### Task 6: Create Footer component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create components/Footer.tsx**

```tsx
export default function Footer() {
  return (
    <footer className="bg-[#0A081D] text-[#D5B8E2] py-5 text-center font-semibold text-lg w-full shrink-0">
      <p className="my-1">
        <a href="https://webring-1.vercel.app/?from=timothyouu&dir=prev" className="text-[#D5B8E2] no-underline transition-all duration-300 text-xl hover:text-[#BC95D1] hover:opacity-80">←</a>
        <span className="inline-flex items-center gap-2 mx-2">Made with Timmy&apos;s ❤️</span>
        <a href="https://webring-1.vercel.app/?from=timothyouu&dir=next" className="text-[#D5B8E2] no-underline transition-all duration-300 text-xl hover:text-[#BC95D1] hover:opacity-80">→</a>
      </p>
      <p className="my-1">&copy; 2025 Timothy Ou</p>
    </footer>
  )
}
```

- [ ] **Step 2: Commit Footer**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component with webring links"
```

---

### Task 7: Create TextCycler component

**Files:**
- Create: `components/TextCycler.tsx`

- [ ] **Step 1: Create components/TextCycler.tsx**

```tsx
'use client'

import { useState, useEffect } from 'react'

const items = [
  'Timmy!', '2nd Year', 'Aspiring SWE/PM', 'Figma Campus Leader',
  'Open Source Board', 'Marketing Team Lead', 'Eagle Scout', 'Leetcoder',
  'Valorant Player', 'Arsenal Sweat', 'Peripheral Enthusiast', 'Photographer',
  'Smiski Collector 🤓', 'Matcha Enjoyer ☕', 'Silly 🪿', 'Shrimp 🦐', 'Famirry 🫶',
]

export default function TextCycler() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % items.length)
        setVisible(true)
      }, 200)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <p
      className="text-[#e0cbff] text-5xl font-semibold h-[100px] flex items-center overflow-hidden transition-opacity duration-300 font-[family-name:var(--font-poppins)]"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {items[index]}
    </p>
  )
}
```

- [ ] **Step 2: Commit TextCycler**

```bash
git add components/TextCycler.tsx
git commit -m "feat: add TextCycler component with fade animation"
```

---

### Task 8: Create Gallery component

**Files:**
- Create: `components/Gallery.tsx`

- [ ] **Step 1: Create components/Gallery.tsx**

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Photo } from '@/data/photos'
import type { Project } from '@/data/projects'

type GalleryProps =
  | { variant: 'photos'; items: Photo[] }
  | { variant: 'projects'; items: Project[] }

export default function Gallery(props: GalleryProps) {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex(i => (i - 1 + props.items.length) % props.items.length)
  const next = () => setIndex(i => (i + 1) % props.items.length)

  const current = props.items[index]

  return (
    <div className="flex items-center justify-center w-full gap-4">
      <button onClick={prev} aria-label="Previous" className="text-[#D5B8E2] text-4xl px-4 py-8 bg-[#1E1B3A] rounded-xl hover:bg-[#2a2650] transition-colors">‹</button>

      <div className="flex flex-col items-center gap-4 flex-1 max-w-3xl">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-[#0A081D]">
          <Image
            src={current.path}
            alt={'location' in current ? current.location : current.project}
            fill
            className="object-cover"
          />
        </div>

        {props.variant === 'photos' && 'location' in current && (
          <p className="text-[#D5B8E2] text-lg font-semibold bg-[#1E1B3A] px-6 py-2 rounded-full">
            Location: {current.location}
          </p>
        )}

        {props.variant === 'projects' && 'project' in current && (
          <div className="text-left w-full px-2">
            <h2 className="text-[#7D73EC] text-2xl font-bold font-[family-name:var(--font-titan-one)]">{current.project}</h2>
            <p className="text-[#D5B8E2] font-semibold text-sm mt-1">{current.date}</p>
            <h3 className="text-[#7D73EC] font-bold mt-2">Technologies Used:</h3>
            <p className="text-[#D5B8E2] text-sm">{current.tech}</p>
            <h3 className="text-[#7D73EC] font-bold mt-2">Description</h3>
            <p className="text-[#D5B8E2] text-sm">{current.description}</p>
          </div>
        )}
      </div>

      <button onClick={next} aria-label="Next" className="text-[#D5B8E2] text-4xl px-4 py-8 bg-[#1E1B3A] rounded-xl hover:bg-[#2a2650] transition-colors">›</button>
    </div>
  )
}
```

- [ ] **Step 2: Commit Gallery**

```bash
git add components/Gallery.tsx
git commit -m "feat: add generic Gallery component for photos and projects"
```

---

### Task 9: Create SkillGrid component

**Files:**
- Create: `components/SkillGrid.tsx`

- [ ] **Step 1: Create components/SkillGrid.tsx**

```tsx
type SkillGridProps = {
  title: string
  skills: string[]
}

export default function SkillGrid({ title, skills }: SkillGridProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <h2 className="text-[#BC95D1] text-4xl font-bold text-center mb-8 font-[family-name:var(--font-titan-one)]">{title}</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map(skill => (
          <div
            key={skill}
            className="bg-[#1E1B3A] text-[#e0cbff] font-bold text-lg rounded-2xl w-36 h-36 flex items-center justify-center text-center px-3 shadow-[0_4px_8px_rgba(0,0,0,0.3)] font-[family-name:var(--font-poppins)]"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit SkillGrid**

```bash
git add components/SkillGrid.tsx
git commit -m "feat: add SkillGrid component"
```

---

### Task 10: Create Home page

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Create app/page.tsx**

```tsx
import Image from 'next/image'
import TextCycler from '@/components/TextCycler'

export default function Home() {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center w-full max-w-[1400px] px-5 gap-[120px] max-[1050px]:flex-col max-[1050px]:gap-[60px]">
      <div className="flex flex-col flex-1 min-w-[280px] max-w-[500px] gap-5 box-border max-[1050px]:w-full max-[1050px]:max-w-[600px] max-[1050px]:min-w-0">
        <h1 className="text-[#7D73EC] text-7xl font-normal leading-tight m-0 whitespace-nowrap [-webkit-text-stroke:2px_rgba(0,0,0,0.5)] font-[family-name:var(--font-titan-one)] max-[1050px]:text-6xl max-[500px]:text-5xl max-[500px]:whitespace-normal">
          Hello, I&apos;m Timothy!!
        </h1>
        <h2 className="text-[#BC95D1] text-6xl font-normal leading-tight m-0 -mt-5 font-[family-name:var(--font-titan-one)] max-[1050px]:text-5xl max-[500px]:text-4xl">
          <span className="whitespace-nowrap">Computer Science</span><br />Student @CSUF
        </h2>
        <TextCycler />
        <div className="flex flex-col gap-3 w-full">
          <p className="text-[#E0E1DD] text-5xl font-semibold leading-tight m-0 font-[family-name:var(--font-titan-one)] max-[1050px]:text-4xl">🤝 I&apos;m an Open Source and Marketing Board member @acmcsuf</p>
          <p className="text-[#E0E1DD] text-5xl font-semibold leading-tight m-0 font-[family-name:var(--font-titan-one)] max-[1050px]:text-4xl">🖥️ I play Valorant and Roblox in my free time</p>
          <p className="text-[#E0E1DD] text-5xl font-semibold leading-tight m-0 font-[family-name:var(--font-titan-one)] max-[1050px]:text-4xl">📸 I love taking pictures</p>
        </div>
      </div>
      <Image
        src="/timothyou1.png"
        alt="Timothy Ou"
        width={532}
        height={532}
        className="flex-1 min-w-[250px] max-w-[532px] rounded-full border-[10px] border-[#0A081D] object-cover max-[1050px]:w-[80%] max-[1050px]:max-w-[400px]"
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit Home page**

```bash
git add app/page.tsx
git commit -m "feat: add Home page"
```

---

### Task 11: Create About page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create app/about/page.tsx**

```tsx
import Image from 'next/image'
import Gallery from '@/components/Gallery'
import { photos } from '@/data/photos'

export default function About() {
  return (
    <div className="flex flex-row flex-wrap justify-center items-start w-full max-w-[1400px] px-5 gap-8 py-8 max-[1050px]:flex-col max-[1050px]:items-center">
      <div className="flex flex-col items-center gap-4 min-w-[160px]">
        <Image
          src="/timothyou2.png"
          alt="Timothy Ou"
          width={160}
          height={160}
          className="rounded-xl border-4 border-[#0A081D] object-cover"
        />
        <a
          href="/timothy_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1E1B3A] text-[#D5B8E2] font-bold text-xl px-6 py-3 rounded-xl no-underline hover:bg-[#2a2650] transition-colors font-[family-name:var(--font-titan-one)]"
        >
          Resume 📄
        </a>
        <div className="flex gap-3 mt-2">
          <a href="https://www.linkedin.com/in/timothyou/" target="_blank" rel="noopener noreferrer">
            <Image src="/linkedin.png" alt="LinkedIn" width={40} height={40} />
          </a>
          <a href="https://www.instagram.com/timothyou_/" target="_blank" rel="noopener noreferrer">
            <Image src="/instagram.png" alt="Instagram" width={40} height={40} />
          </a>
        </div>
      </div>
      <div className="flex-1 min-w-[300px]">
        <Gallery variant="photos" items={photos} />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit About page**

```bash
git add app/about/
git commit -m "feat: add About page with photo gallery and social links"
```

---

### Task 12: Create Projects page

**Files:**
- Create: `app/projects/page.tsx`

- [ ] **Step 1: Create app/projects/page.tsx**

```tsx
import Gallery from '@/components/Gallery'
import { projects } from '@/data/projects'

export default function Projects() {
  return (
    <div className="flex flex-col items-center w-full max-w-[1400px] px-5 py-8">
      <Gallery variant="projects" items={projects} />
    </div>
  )
}
```

- [ ] **Step 2: Commit Projects page**

```bash
git add app/projects/
git commit -m "feat: add Projects page with project gallery"
```

---

### Task 13: Create Skills page

**Files:**
- Create: `app/skills/page.tsx`

- [ ] **Step 1: Create app/skills/page.tsx**

```tsx
import SkillGrid from '@/components/SkillGrid'
import { programmingLanguages, programmingTools, otherSkills } from '@/data/skills'

export default function Skills() {
  return (
    <div className="flex flex-col items-center w-full max-w-[1400px] px-5 py-8">
      <SkillGrid title="Programming Languages & Frameworks" skills={programmingLanguages} />
      <SkillGrid title="Programming Tools" skills={programmingTools} />
      <SkillGrid title="Other Skills" skills={otherSkills} />
    </div>
  )
}
```

- [ ] **Step 2: Commit Skills page**

```bash
git add app/skills/
git commit -m "feat: add Skills page with skill grids"
```

---

### Task 14: Verify in browser

- [ ] **Step 1: Run dev server**

```bash
npm run dev
```

Expected: Server running at http://localhost:3000

- [ ] **Step 2: Check each page visually**

Navigate to:
- http://localhost:3000 — Home: hero text, text cycler animating, profile photo
- http://localhost:3000/about — About: photo gallery with prev/next, resume button, social icons
- http://localhost:3000/projects — Projects: project gallery with descriptions
- http://localhost:3000/skills — Skills: three skill grids

- [ ] **Step 3: Check mobile nav**

Resize browser below 1050px — hamburger menu should appear, sidebar should open/close.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete React portfolio rewrite on react-rewrite branch"
```
