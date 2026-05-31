export type ChangelogEntry = {
  version: string
  date: string
  changes: string[]
}

// Newest first. CURRENT_VERSION is derived from the top entry, so bumping the
// site version is just a matter of adding a new entry here.
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '2.0.1',
    date: '2026-05-31',
    changes: [
      'fixed font switching — settings dropdown and the `font` command now actually change the typeface',
      'restyled the terminal launcher button and made the settings toggles more compact',
      'moved the webring into the footer; unified the v1 nav colors',
      'renamed the `tim` command to `timmy` and tidied `disconnect network`',
      'added the site favicon',
      'mobile: terminal now opens full-screen with a close button',
      'mobile: navbar collapses into a burger menu',
    ],
  },
  {
    version: '2.0.0',
    date: '2026-05-31',
    changes: [
      'launched the terminal portfolio (v2)',
      'interactive shell with cd/ls navigation, autocomplete, history, and easter eggs',
      'home and about pages with ascii ↔ photo hover reveals',
      'light/dark themes plus selectable mono fonts',
      'matcha and lavender easter-egg themes',
      '`disconnect network` hides a playable dino game',
      'v1 ↔ v2 version toggle',
    ],
  },
]

export const CURRENT_VERSION = CHANGELOG[0].version
