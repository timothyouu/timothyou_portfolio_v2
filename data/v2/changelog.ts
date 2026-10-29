export type ChangelogEntry = {
  version: string
  date: string
  changes: string[]
}

// Newest first. CURRENT_VERSION is derived from the top entry, so bumping the
// site version is just a matter of adding a new entry here.
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '2.0.5',
    date: '2026-10-29',
    changes: [
      "replaced AI Recipe Assistant with Ender's Bench and Encore, and reordered featured projects",
      "updated project descriptions, tech stacks, and links, including Ender's Bench's 4th-place SpacetimeDB award",
      "added Encore's glasses preview and both Ender's Bench simulation previews on hover or tap",
      "updated Ender's Bench and Tenet hardware details to DGX Spark",
      'updated whoami for OpenAI Product Lab and split Product Lab and ChatGPT Student Lab into separate experience entries',
      'updated my IEMs to SIMGOT SuperMix 4',
      'replaced my resume across both portfolio versions',
      'terminal: help now lists every command, with current project details, tech stacks, and experience/gear shortcuts',
      'terminal: improved project-name matching and autocomplete, and updated whoami',
    ],
  },
  {
    version: '2.0.4',
    date: '2026-07-27',
    changes: [
      'featured projects now include Policy Intelligence Assistant and Oculi',
      'updated community roles — FullyHacks title is now Director · Marketing · Operations',
      'reordered the experience timeline',
      'updated resume',
      'whoami now notes I\'m Director of FullyHacks, working on bringing it to life',
    ],
  },
  {
    version: '2.0.3',
    date: '2026-07-27',
    changes: [
      'added Policy Intelligence Assistant and Oculi to featured projects',
      'reordered the experience timeline and retitled the FullyHacks role',
    ],
  },
  {
    version: '2.0.2',
    date: '2026-05-31',
    changes: [
      'music column now auto-updates daily with my real top tracks (via last.fm)',
      'added `untimmy` and `unmatcha` to leave the easter-egg themes and return to your light/dark theme',
      'tidied `help` so every command fits on one line; shortened `disconnect network` to `disc network`',
      'mobile: terminal now shrinks with the on-screen keyboard so the input line stays visible',
      'mobile: centered the footer — webring, copyright, and socials',
    ],
  },
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
