'use client'

import { useState, useEffect } from 'react'
import { HOME_PROJECTS, type HomeProject } from '@/data/v2/projects'
import { LINKS } from '@/data/v2/config'
import { CURRENT_VERSION } from '@/data/v2/changelog'
import AsciiImage from './AsciiImage'
import TopBar from './TopBar'
import Footer from './Footer'
import { scrollToElement } from '@/lib/utils'

const PAGE_SIZE = 5;

function ProjectImage({ project }: { project: HomeProject }) {
  const [preview, setPreview] = useState(false);
  const [hovered, setHovered] = useState(false);
  const visible = preview || hovered;

  if (!project.previews?.length) {
    return <img src={project.image!} alt={project.title} className="project-screenshot" onClick={(e) => e.stopPropagation()} />;
  }

  return (
    <button
      type="button"
      className="project-image-preview"
      aria-label={`${project.title}: toggle ${project.previews.map((item) => item.label).join(' and ')} preview`}
      aria-pressed={visible}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); setPreview(!preview); }}
      onKeyDown={(e) => { if (e.key === 'Escape') { setPreview(false); setHovered(false); } }}
      data-preview={visible}
    >
      <img src={project.image!} alt={project.label} className="project-preview-cover" />
      <span className={`project-preview-images ${project.previews.length > 1 ? 'multiple' : ''}`} aria-hidden={!visible}>
        {project.previews.map((item) => (
          <span className="project-preview-item" key={item.src}>
            <img src={item.src} alt={`${item.label} mockup`} />
            <span className="project-preview-caption">{item.label}</span>
          </span>
        ))}
      </span>
      <span className="project-preview-hint">{preview ? 'Tap to unpin preview' : visible ? 'Tap to keep preview' : 'Hover or tap to preview'}</span>
    </button>
  );
}
export default function Home({ goTo, setSettingsOpen }: { goTo: (p: string) => void; setSettingsOpen: (fn: (o: boolean) => boolean) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const L = LINKS;

  const pageCount = Math.max(1, Math.ceil(HOME_PROJECTS.length / PAGE_SIZE));
  const pageStart = page * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, HOME_PROJECTS.length);
  const pageProjects = HOME_PROJECTS.slice(pageStart, pageEnd);

  const goToPage = (next: number) => {
    setPage(Math.max(0, Math.min(pageCount - 1, next)));
    setOpen(null);
  };

  useEffect(() => {
    const onOpen = (e: Event) => {
      const title = (e as CustomEvent).detail && (e as CustomEvent).detail.title;
      const idx = HOME_PROJECTS.findIndex((p) => p.title === title);
      if (idx >= 0) {
        setPage(Math.floor(idx / PAGE_SIZE));
        setOpen(idx % PAGE_SIZE);
        setTimeout(() => scrollToElement('projects'), 40);
      }
    };
    window.addEventListener('portfolio:open-project', onOpen);
    return () => window.removeEventListener('portfolio:open-project', onOpen);
  }, []);

  return (
    <div className="shell">
      <TopBar current="home" goTo={goTo} setSettingsOpen={setSettingsOpen} />

      <section className="hero">
        <div className="eyebrow">portfolio / v{CURRENT_VERSION} / 2026</div>
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
        <p>I'm a <a className="link" href={L.figma} target="_blank" rel="noopener">Figma Campus Leader</a> and a member of the <a className="link" href={L.openai} target="_blank" rel="noopener">OpenAI Product Lab</a>, where I test the latest OpenAI features. I'm also Director of <a className="link" href={L.fullyhacks} target="_blank" rel="noopener">FullyHacks</a>, working on bringing it to life.</p>
        <p>Previously at CSUF I served as Open Source Officer for <a className="link" href={L.acm} target="_blank" rel="noopener">ACM</a> and supported technical research with a professor at <a className="link" href={L.caltech} target="_blank" rel="noopener">Caltech</a>.</p>
        <p>Reach me via <a className="link" href={L.x} target="_blank" rel="noopener">X</a>, <a className="link" href={L.linkedin} target="_blank" rel="noopener">LinkedIn</a>, or <a className="link" href={L.email}>email</a>. This is my <a className="link" href={L.resume} target="_blank" rel="noopener">resume</a>.</p>
      </section>

      <section id="projects">
        <div className="section-h">
          <h2>Featured Projects</h2>
          <div className="count-nav">
            <button
              type="button"
              className="page-btn"
              aria-label="previous projects"
              disabled={page === 0}
              onClick={() => goToPage(page - 1)}>
              &larr;
            </button>
            <div className="count">{String(pageEnd).padStart(2, '0')} / {String(HOME_PROJECTS.length).padStart(2, '0')}</div>
            <button
              type="button"
              className="page-btn"
              aria-label="next projects"
              disabled={page >= pageCount - 1}
              onClick={() => goToPage(page + 1)}>
              &rarr;
            </button>
          </div>
        </div>
        <div className="projects">
          {pageProjects.map((p, i) =>
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
                    <ProjectImage project={p} />
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

      <Footer />
    </div>);
}
