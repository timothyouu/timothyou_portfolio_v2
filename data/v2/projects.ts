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
  previews?: { src: string; label: string }[]
  links: ProjectLink[]
}

export const HOME_PROJECTS: HomeProject[] = [
  {
    n: '01', title: "Ender's Bench",
    blurb: 'Observe AI decisions under pressure in survival and finance simulations',
    meta: ['react', 'typescript', 'spacetimedb', 'LoRA', 'vLLM', 'DGX Spark'],
    ascii: '', label: "Ender's Bench app mockup",
    detail: "Built at Cal Hacks 13.0, where it won 4th place in the SpacetimeDB track. Tests how AI agents share limited resources in The Clearing and follow financial rules in Ledger Street. Lets users choose models, watch simulations live, and inspect recorded decisions through replay and run history.",
    image: '/uploads/proj-enders-bench.png',
    previews: [
      { src: '/uploads/proj-enders-bench.png', label: 'The Clearing' },
      { src: '/uploads/proj-ledger-street.png', label: 'Ledger Street' },
    ],
    links: [
      { label: 'github', url: 'https://github.com/BeanyZoldyck/endersbench' },
      { label: 'devpost', url: 'https://devpost.com/software/ender-s-bench' },
    ],
  },
  {
    n: '02', title: 'Encore',
    blurb: 'Piano-practice feedback with Gemini coaching and Even Realities G2 glasses',
    meta: ['typescript', 'python', 'gemini', 'strands agents', 'basic pitch', 'even hub sdk'],
    ascii: '', label: 'Encore product mockup',
    detail: 'Built for the Even Realities LAHacks AI Hackathon, Encore is a piano-practice prototype with a phone companion and an Even Realities G2 glasses interface. Combines Basic Pitch audio analysis with Gemini coaching to turn recordings into note and timing feedback, helping players review mistakes and decide what to practice next.',
    image: '/uploads/proj-encore.png',
    previews: [{ src: '/uploads/proj-encore-glasses.png', label: 'Through the glasses' }],
    links: [
      { label: 'github', url: 'https://github.com/timothyouu/encore' },
      { label: 'devpost', url: 'https://devpost.com/software/encore-u2ijry' },
    ],
  },
  {
    n: '03', title: 'Tenet',
    blurb: 'Branch, merge, and rollback AI chat states on the NVIDIA DGX Spark',
    meta: ['react', 'typescript', 'fastapi', 'mongodb', 'd3.js', 'ollama', 'NVIDIA DGX Spark'],
    ascii: ASCII_DATA.tenet, label: 'Tenet UI',
    detail: 'Built on an NVIDIA DGX Spark, Tenet lets you branch, merge, and rollback AI chat states using Directed Acyclic Graphs. Four local LLMs run on Blackwell GPUs orchestrated via Fetch.ai agents, with real-time hardware telemetry so you always know what the machine is doing.',
    image: '/uploads/proj-tenet.png',
    links: [
      { label: 'github', url: 'https://github.com/Yd025/Tenet' },
      { label: 'devpost', url: 'https://devpost.com/software/tenet' },
    ],
  },
  {
    n: '04', title: 'Policy Intelligence Assistant',
    blurb: 'AI policy search assistant with cited, conflict-aware answers for CSUB',
    meta: ['react', 'typescript', 'fastapi', 'python', 'aws bedrock', 'dynamodb'],
    ascii: '', label: 'Policy Intelligence Assistant',
    detail: 'Built for the AI Summer Camp hackathon (Academic Affairs / Senate Resolution track), where it placed 2nd. Lets CSUB employees ask a policy chatbot for cited, conflict-aware answers, and lets reviewers check draft resolutions against the existing policy corpus from a persistent drafting workspace. A six-agent pipeline traces every conflict check, running locally by default or AWS-backed via Bedrock and DynamoDB.',
    image: '/uploads/proj-policy-intel.png',
    links: [
      { label: 'github', url: 'https://github.com/timothyouu/AI-Summer-Camp-Academicaffairs-Senateresolution' },
    ],
  },
  {
    n: '05', title: 'WalkBack',
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
    n: '06', title: 'Oculi',
    blurb: 'Map-first photo-spot discovery with timed shoot-route planning',
    meta: ['nextjs', 'react', 'typescript', 'tailwind', 'mapbox', 'supabase'],
    ascii: '', label: 'Oculi',
    detail: "Oculi is a map-first photo-spot discovery product: browse a discover feed, drop into a live Mapbox map, and save places you want to shoot. The Saved page turns favorites into a shoot-planning workspace, recommending a morning or sunset route with arrival times, shoot notes, and one-tap links into Google or Apple Maps.",
    image: '/uploads/proj-oculi.png',
    links: [
      { label: 'github', url: 'https://github.com/timothyouu/oculi' },
    ],
  },
  {
    n: '07', title: 'OSS Stats',
    blurb: 'Python CLI auditing PRs, commits, and velocity for the ACM CSUF org',
    meta: ['python', 'github-api'],
    ascii: ASCII_DATA.oss, label: 'OSS Stats CLI',
    detail: 'A CLI tool that audits pull requests, commits, and contribution velocity across the acmcsufoss GitHub org. Cut API latency 50% with in-memory JSON caching and refactored calls to eliminate redundant requests.',
    image: '/uploads/proj-oss.png',
    links: [{ label: 'github', url: 'https://github.com/acmcsufoss/oss-stats' }],
  },
  {
    n: '08', title: 'FigPals Bubble Blast!',
    blurb: 'A nostalgic water hoop game built in 6 hours for FullyHacks',
    meta: ['react', 'typescript', 'figma-make', 'claude-code'],
    ascii: ASCII_DATA.figpals, label: 'FigPals Bubble Blast',
    detail: 'Inspired by the nostalgic physical water hoop games from childhood, this was built in just 6 hours before FullyHacks kicked off. Used Figma Make for rapid UI generation and Claude Code for the heavy lifting — from memory to functional project in a single afternoon. Hold the buttons down for more power, just like the real thing.',
    image: '/uploads/proj-figpals.png',
    links: [{ label: 'play it', url: 'https://figma-water-hoop-challenge.vercel.app/' }],
  },
]
