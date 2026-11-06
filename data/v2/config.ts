export type Track = { name: string; artist: string }

export const LINKS = {
  github:     'https://github.com/timothyouu',
  linkedin:   'https://www.linkedin.com/in/timothy-ou/',
  x:          'https://x.com/timothyouuu',
  email:      'mailto:timothyou02@gmail.com',
  resume:     '/uploads/Timothy_Ou_Resume-25802081.pdf',
  web:        'https://timothyou.dev',
  figma:      'https://www.instagram.com/figmaatcsuf/',
  openai:     'https://chatgpt.com/use-cases/students/',
  acm:        'https://acmcsuf.com/',
  fullyhacks: 'https://fullyhacks.acmcsuf.com/',
  caltech:    'http://minerals.gps.caltech.edu/',
} as const

// The committed top-tracks.json is the built-in fallback. The About page uses
// Vercel Blob data when NEXT_PUBLIC_MUSIC_DATA_URL is configured. The GitHub
// Action refreshes that Blob daily without changing this repository.
