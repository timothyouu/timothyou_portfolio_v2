'use client'

import { useState, useEffect } from 'react'
import { HOME_PROJECTS } from '@/data/v2/projects'
import { LINKS } from '@/data/v2/config'
import AsciiImage from './AsciiImage'
import TopBar from './TopBar'

export default function Home({ goTo, setSettingsOpen }: { goTo: (p: string) => void; setSettingsOpen: (fn: (o: boolean) => boolean) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const L = LINKS;

  useEffect(() => {
    const onOpen = (e: Event) => {
      const title = (e as CustomEvent).detail && (e as CustomEvent).detail.title;
      const idx = HOME_PROJECTS.findIndex((p) => p.title === title);
      if (idx >= 0) {
        setOpen(idx);
        setTimeout(() => {
          const el = document.getElementById('projects');
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 24, behavior: 'smooth' });
        }, 40);
      }
    };
    window.addEventListener('portfolio:open-project', onOpen);
    return () => window.removeEventListener('portfolio:open-project', onOpen);
  }, []);

  return (
    <div className="shell">
      <TopBar current="home" goTo={goTo} setSettingsOpen={setSettingsOpen} />

      <section className="hero">
        <div className="eyebrow">portfolio / v2.0.0 / 2026</div>
        <h1>
          Timothy<br />Ou<span className="caret"></span>
        </h1>
        <div className="identity">
          a <em>full-stack engineer</em><br />&amp; <em>AI builder</em>.
        </div>
      </section>

      <section className="intro">
        <p><span className="prompt">$</span>whoami</p>
        <p>I'm Timothy, a junior CS student at Cal State Fullerton, building full-stack apps and AI-powered tools.</p>
        <p>I'm a <a className="link" href={L.figma} target="_blank" rel="noopener">Figma Campus Leader</a> and a member of the <a className="link" href={L.openai} target="_blank" rel="noopener">OpenAI ChatGPT Student Lab</a>, a 50-person national cohort exploring how students actually use AI.</p>
        <p>Previously at CSUF I served as Open Source Officer for <a className="link" href={L.acm} target="_blank" rel="noopener">ACM</a>, ran sponsorships &amp; ops for <a className="link" href={L.fullyhacks} target="_blank" rel="noopener">FullyHacks</a>, and supported technical research with a professor at <a className="link" href={L.caltech} target="_blank" rel="noopener">Caltech</a>.</p>
        <p>Reach me via <a className="link" href={L.x} target="_blank" rel="noopener">X</a>, <a className="link" href={L.linkedin} target="_blank" rel="noopener">LinkedIn</a>, or <a className="link" href={L.email}>email</a>. This is my <a className="link" href={L.resume} target="_blank" rel="noopener">resume</a>.</p>
      </section>

      <section id="projects">
        <div className="section-h">
          <h2>Featured Projects</h2>
          <div className="count">{String(HOME_PROJECTS.length).padStart(2, '0')} / {String(HOME_PROJECTS.length).padStart(2, '0')}</div>
        </div>
        <div className="projects">
          {HOME_PROJECTS.map((p, i) =>
          <div
            key={p.n}
            className={`project ${open === i ? 'expanded' : ''}`}
            onClick={() => setOpen(open === i ? null : i)}>

              <div className="project-num">{p.n}</div>
              <div className="project-title">
                {p.title}
                <span className="blurb">{p.blurb}</span>
              </div>
              <div className="project-meta">
                {p.meta.map((m) => <span key={m}>{m}</span>)}
              </div>
              <div className="project-arrow">{open === i ? '−' : '→'}</div>

              {open === i &&
            <div className="project-detail">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="project-screenshot" onClick={(e) => e.stopPropagation()} />
                  ) : p.image === null ? (
                    <div className="project-coming-soon">coming soon</div>
                  ) : (
                    <AsciiImage ascii={p.ascii} caption={p.title} label={p.label} width={320} height={160} />
                  )}
                  <div>{p.detail}</div>
                  {p.links && p.links.length > 0 && (
                    <div className="project-links">
                      {p.links.map((lk) => lk.url
                        ? <a key={lk.label} className="project-link" href={lk.url} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>{lk.label} ↗</a>
                        : <span key={lk.label} className="project-link disabled">{lk.label}</span>
                      )}
                    </div>
                  )}
                </div>
            }
            </div>
          )}
        </div>
      </section>

      <footer className="foot">
        <div className="webring">
          <a href="https://webring-1.vercel.app/?from=timothyouu&dir=prev" aria-label="Previous site in webring">←</a>
          <span>© 2026 Timothy Ou · built with matcha & love</span>
          <a href="https://webring-1.vercel.app/?from=timothyouu&dir=next" aria-label="Next site in webring">→</a>
        </div>
        <div className="socials">
          <a href={L.github} target="_blank" rel="noopener">github</a>
          <a href={L.linkedin} target="_blank" rel="noopener">linkedin</a>
          <a href={L.x} target="_blank" rel="noopener">x</a>
          <a href={L.email}>email</a>
        </div>
      </footer>
    </div>);
}
