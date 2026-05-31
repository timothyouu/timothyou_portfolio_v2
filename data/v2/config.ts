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
