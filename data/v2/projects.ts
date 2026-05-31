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
