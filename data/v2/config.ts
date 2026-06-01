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

// Top tracks live in ./top-tracks.json, refreshed daily by the Last.fm
// GitHub Action (scripts/update_top_tracks.py). About.tsx imports that file
// directly. See scripts/LASTFM_SETUP.md for the one-time setup.
