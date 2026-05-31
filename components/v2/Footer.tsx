import { LINKS } from '@/data/v2/config'

// Single source of truth for the v2 footer — rendered on both Home and About
// so the webring, copyright, and socials stay identical app-wide.
export default function Footer() {
  return (
    <footer className="foot">
      <div className="webring">
        <a href="https://webring-1.vercel.app/?from=timothyouu&dir=prev" aria-label="Previous site in webring">←</a>
        <span>© 2026 Timothy Ou · built with matcha & love</span>
        <a href="https://webring-1.vercel.app/?from=timothyouu&dir=next" aria-label="Next site in webring">→</a>
      </div>
      <div className="socials">
        <a href={LINKS.github} target="_blank" rel="noopener">github</a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener">linkedin</a>
        <a href={LINKS.x} target="_blank" rel="noopener">x</a>
        <a href={LINKS.email}>email</a>
      </div>
    </footer>
  )
}
