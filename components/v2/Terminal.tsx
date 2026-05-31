'use client'

import { useState, useEffect, useRef, Fragment } from 'react'
import { LINKS } from '@/data/v2/config'
import { HOME_PROJECTS } from '@/data/v2/projects'
import DinoGame from './DinoGame'

export type TerminalApi = {
  goTo: (p: string) => void
  navigate: (p: string, id: string | null) => void
  setTheme: (t: string) => void
  setVersion: (v: string) => void
  setTweak: (k: string, v: unknown) => void
  getState: () => { page: string; theme: string; version: string; font: string; asciiSize: number; hoverReveal: string | boolean }
  openProject: (title: string) => void
  scrollTo: (id: string) => void
  close: () => void
}

function WelcomeBanner() {
  return (
    <div className="term-block">
      <div className="term-line out"><span className="accent">timothy_ou</span> :: interactive shell</div>
      <div className="term-line out" style={{ color: 'var(--fg-dim)' }}>
        <span className="accent">ls</span> to look around &middot; <span className="accent">cd</span> to navigate &middot; <span className="accent">help</span> for all commands &middot; <span className="accent">tab</span> autocompletes
      </div>
    </div>
  );
}

function buildCommands(api: TerminalApi, getNavPath: () => string[], setNavPath: (p: string[]) => void) {
  const L = LINKS;
  const projects = (HOME_PROJECTS).map((p) => ({
    key: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: p.title,
    blurb: p.blurb,
    meta: p.meta,
  }));
  const projectKeys = projects.map((p) => p.key);

  const open = (url: any) => { if (url) window.open(url, '_blank', 'noopener'); };

  // navigable filesystem: dir -> { page, section id }
  const DESTS: Record<string, { page: string; id: string | null }> = {
    home:       { page: 'home', id: null },
    about:      { page: 'about', id: 'about-top' },
    projects:   { page: 'home', id: 'projects' },
    experience: { page: 'about', id: 'experience' },
    community:  { page: 'about', id: 'community' },
    ram:        { page: 'about', id: 'ram' },
    lore:       { page: 'about', id: 'lore' },
  };

  const CMD_GROUPS = [
    { name: 'navigation', cmds: ['cd', 'ls', 'pwd'] },
    { name: 'settings  — cd settings', cmds: ['theme', 'font', 'reveal'] },
    { name: 'info', cmds: ['whoami', 'contact', 'resume'] },
    { name: 'socials', cmds: ['github', 'linkedin', 'x', 'email', 'web'] },
    { name: 'misc', cmds: ['echo', 'clear', 'exit'] },
    { name: 'secrets 🤫', cmds: ['sudo', 'rm', 'coffee', 'matcha', 'tim', 'disconnect'], showHidden: true },
  ];

  const cmds: Record<string, any> = {
    help: {
      desc: 'list commands by category',
      run: (args: any, ctx: any) => {
        ctx.node(
          <div className="term-block">
            <div className="term-line out" style={{ marginBottom: 8 }}>hit <span className="accent">tab</span> to autocomplete &middot; <span className="accent">cd settings</span> for appearance tweaks</div>
            {CMD_GROUPS.map((g) => (
              <div key={g.name} style={{ marginBottom: 10 }}>
                <div className="term-line out" style={{ color: 'var(--fg-dim)', marginBottom: 3, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11 }}>{g.name}</div>
                <div className="term-cols">
                  {g.cmds.filter((n) => cmds[n] && (g.showHidden || !cmds[n].hidden)).map((n) => (
                    <Fragment key={n}>
                      <div className="k">{n}{cmds[n].usage ? ' ' + cmds[n].usage : ''}</div>
                      <div className="v">{cmds[n].desc}</div>
                    </Fragment>
                  ))}
                </div>
                {g.showHidden && (
                  <div className="term-line out" style={{ color: 'var(--fg-dim)', fontSize: 11, marginTop: 4 }}>also try typing &apos;tim&apos; on the keyboard</div>
                )}
              </div>
            ))}
          </div>
        );
      },
    },

    cd: {
      desc: 'change directory',
      usage: '<dir>',
      args: () => Object.keys(DESTS).concat(['settings', '~', '..']),
      run: (args: any, ctx: any) => {
        let dest = (args[0] || '').toLowerCase().replace(/^\.?\/+/, '').replace(/\/+$/, '');
        // back / root
        if (!dest || dest === '~') {
          setNavPath([]); api.navigate('home', null); ctx.ok('cd ~/'); return;
        }
        if (dest === '..') {
          const cur = getNavPath();
          if (cur.length === 0) { ctx.ok('cd ~/'); return; }
          const parent = cur.slice(0, -1);
          setNavPath(parent);
          if (parent.length === 0) { api.navigate('home', null); }
          else { const pk = parent[parent.length - 1]; const d = DESTS[pk]; if (d) api.navigate(d.page, d.id); }
          ctx.ok('cd ~/' + (parent.length ? parent.join('/') : ''));
          return;
        }
        // settings
        if (dest === 'settings') { setNavPath(['settings']); ctx.ok('cd ~/settings'); return; }
        // navigate destinations
        const d = DESTS[dest];
        if (!d) return ctx.err(`cd: no such directory: ${dest} — run ls`);
        const subDirs = ['experience', 'community', 'ram', 'lore'];
        const newPath = dest === 'home' ? [] : subDirs.includes(dest) ? ['about', dest] : [dest];
        setNavPath(newPath);
        api.navigate(d.page, d.id);
        ctx.ok('cd ~/' + newPath.join('/'));
      },
    },
    ls: {
      desc: 'list contents of current directory',
      usage: '[projects]',
      args: ['projects'],
      run: (args: any, ctx: any) => {
        const cwd = getNavPath();
        // settings directory listing
        if (cwd[0] === 'settings' && (args[0] || '') !== 'projects') {
          ctx.node(
            <div className="term-block">
              <div className="term-line out" style={{ marginBottom: 4 }}><span className="accent">~/settings/</span></div>
              <div className="term-cols">
                <div className="k">theme [light|dark]</div><div className="v">switch color theme</div>
                <div className="k">font &lt;name&gt;</div><div className="v">change mono font</div>
                <div className="k">reveal [ascii|realistic]</div><div className="v">photo reveal mode</div>
                <div className="k">cd ..</div><div className="v">back to ~/</div>
              </div>
            </div>
          );
          return;
        }
        if ((args[0] || '').toLowerCase() === 'projects') {
          ctx.node(
            <div className="term-block">
              {projects.map((p) => (
                <div className="term-line out" key={p.key}>
                  <span className="accent">{p.key}</span>{'  '}{p.blurb}
                </div>
              ))}
              <div className="term-line out" style={{ marginTop: 6, color: 'var(--fg-dim)' }}>
                {projects.length} projects &middot; run <span className="accent">open &lt;name&gt;</span> to view
              </div>
            </div>
          );
          return;
        }
        ctx.node(
          <div className="term-block">
            <div className="term-line out"><span className="accent">home/</span></div>
            <div className="term-line out"><span className="accent">about/</span></div>
            <div className="term-line out" style={{ paddingLeft: 18, color: 'var(--fg-muted)' }}>experience  community  ram  lore</div>
            <div className="term-line out"><span className="accent">projects/</span> <span style={{ color: 'var(--fg-dim)' }}>({projects.length} items &mdash; ls projects)</span></div>
            <div className="term-line out"><span className="accent">settings/</span> <span style={{ color: 'var(--fg-dim)' }}>appearance &amp; tweaks</span></div>
            <div className="term-line out" style={{ marginTop: 6, color: 'var(--fg-dim)' }}>cd into any of these</div>
          </div>
        );
      },
    },
    pwd: {
      desc: 'show current location',
      run: (a: any, ctx: any) => {
        const p = getNavPath();
        ctx.out('~/' + (p.length ? p.join('/') : ''));
      },
    },

    resume: {
      desc: 'open my resume (pdf)',
      run: (a: any, ctx: any) => { open(L.resume); ctx.ok('opening resume.pdf in a new tab'); },
    },

    theme: {
      desc: 'switch color theme',
      usage: '[light|dark]',
      args: ['light', 'dark', 'toggle'],
      run: (args: any, ctx: any) => {
        const cur = api.getState().theme;
        let next = args[0];
        if (!next || next === 'toggle') next = cur === 'dark' ? 'light' : 'dark';
        if (next !== 'light' && next !== 'dark') return ctx.err(`unknown theme "${next}" — try light or dark`);
        api.setTheme(next);
        ctx.ok(`theme set to ${next}`);
      },
    },


    v1: { desc: 'view portfolio v1 (archive)', run: (a: any, ctx: any) => { api.setVersion('v1'); ctx.ok('rolling back to v1'); ctx.close(); } },
    v2: { desc: 'view portfolio v2 (current)', run: (a: any, ctx: any) => { api.setVersion('v2'); ctx.ok('back to v2'); ctx.close(); } },

    open: {
      desc: 'open a featured project',
      usage: '<project>',
      args: () => projectKeys,
      run: (args: any, ctx: any) => {
        const key = (args[0] || '').toLowerCase();
        if (!key) return ctx.err('usage: open <project> — try "open ' + (projectKeys[0] || 'tenet') + '"');
        const p = projects.find((x) => x.key === key || x.key.startsWith(key));
        if (!p) return ctx.err(`no project "${key}" — run ls projects`);
        api.openProject(p.title);
        ctx.ok(`opening ${p.title}`);
      },
    },

    whoami: {
      desc: 'a quick intro',
      run: (a: any, ctx: any) => {
        ctx.node(
          <div className="term-block">
            <div className="term-line out"><span className="accent">Timothy Ou</span> — full-stack engineer &amp; AI builder</div>
            <div className="term-line out">junior cs @ cal state fullerton</div>
            <div className="term-line out">figma campus leader · openai chatgpt student lab</div>
            <div className="term-line out" style={{ color: 'var(--fg-dim)' }}>interests: full-stack · ai/ml · product</div>
          </div>
        );
      },
    },

    contact: {
      desc: 'how to reach me',
      run: (a: any, ctx: any) => {
        ctx.node(
          <div className="term-block term-cols">
            <div className="k">email</div><div className="v">timothyou02@gmail.com</div>
            <div className="k">github</div><div className="v">github.com/timothyouu</div>
            <div className="k">linkedin</div><div className="v">linkedin.com/in/timothy-ou</div>
            <div className="k">web</div><div className="v">timothyou.dev</div>
          </div>
        );
      },
    },
    socials: {
      desc: 'list my links',
      run: (a: any, ctx: any) => {
        ctx.node(
          <div className="term-block">
            <div className="term-line out">run <span className="accent">github</span>, <span className="accent">linkedin</span>, <span className="accent">x</span>, <span className="accent">email</span>, or <span className="accent">web</span> to open</div>
          </div>
        );
      },
    },
    github: { desc: 'open github', run: (a: any, ctx: any) => { open(L.github); ctx.ok('opening github'); } },
    linkedin: { desc: 'open linkedin', run: (a: any, ctx: any) => { open(L.linkedin); ctx.ok('opening linkedin'); } },
    x: { desc: 'open x / twitter', run: (a: any, ctx: any) => { open(L.x); ctx.ok('opening x'); } },
    email: { desc: 'compose an email', run: (a: any, ctx: any) => { open(L.email); ctx.ok('opening mail client'); } },
    web: { desc: 'open timothyou.dev', run: (a: any, ctx: any) => { open(L.web); ctx.ok('opening timothyou.dev'); } },

    reveal: {
      desc: 'set photo reveal mode',
      usage: '[ascii|realistic]',
      args: ['ascii', 'realistic'],
      run: (args: any, ctx: any) => {
        const s = api.getState();
        const cur = (s.hoverReveal === true || s.hoverReveal === 'ascii') ? 'ascii' : 'realistic';
        let next = (args[0] || '').toLowerCase();
        if (!next) next = cur === 'ascii' ? 'realistic' : 'ascii';
        if (next !== 'ascii' && next !== 'realistic') return ctx.err('usage: reveal ascii | realistic');
        api.setTweak('hoverReveal', next);
        ctx.ok(`photo reveal → ${next} (${next === 'ascii' ? 'hover to see photo' : 'hover to see ascii'})`);
      },
    },

    font: {
      desc: 'change the mono font',
      usage: '<name>',
      args: ['JetBrains', 'IBM', 'Fira', 'Space'],
      run: (args: any, ctx: any) => {
        const map: Record<string, string> = { jetbrains: 'JetBrains Mono', ibm: 'IBM Plex Mono', fira: 'Fira Code', space: 'Space Mono' };
        const k = (args[0] || '').toLowerCase();
        if (!map[k]) return ctx.err('try: font jetbrains | ibm | fira | space');
        api.setTweak('font', map[k]);
        ctx.ok(`font set to ${map[k]}`);
      },
    },
    echo: { desc: 'print text', usage: '<text>', run: (args: any, ctx: any) => ctx.out(args.join(' ') || '') },
    clear: { desc: 'clear the screen', run: (a: any, ctx: any) => { ctx.clear(); ctx.node(<WelcomeBanner />); } },
    exit: { desc: 'close the terminal', run: (a: any, ctx: any) => ctx.close() },

    sudo: { hidden: true, desc: 'try to escalate privileges', run: (a: any, ctx: any) => ctx.err("nice try. you don't have root here :)") },
    matcha: { hidden: true, desc: 'replenish caffeine levels', run: (a: any, ctx: any) => {
      const current = (window as any).PORTFOLIO_EASTER || 'none';
      const next = current === 'matcha' ? 'none' : 'matcha';
      (window as any).PORTFOLIO_EASTER = next;
      window.dispatchEvent(new CustomEvent('portfolio:easter', { detail: { theme: next } }));
      document.body.classList.toggle('matcha', next === 'matcha');
      document.body.classList.remove('lavender');
      ctx.ok(next === 'matcha' ? 'matcha mode on 🍵 brewing...' : 'matcha mode off. back to terminal.');
    } },
    coffee: { hidden: true, desc: 'wrong drink', run: (a: any, ctx: any) => ctx.out('we use matcha in this house. try `matcha`.') },
    disconnect: { hidden: true, desc: 'kill the wifi (you know what happens)', usage: '<network>', args: ['network'], run: (args: any, ctx: any) => {
      if ((args[0] || '').toLowerCase() !== 'network') return ctx.err('usage: disconnect network');
      ctx.err('✕ network connection lost.');
      ctx.out('no internet — but here is something to do:');
      ctx.node(<DinoGame />);
    } },
    rm: { hidden: true, desc: 'delete something', run: (a: any, ctx: any) => ctx.err('absolutely not.') },
    tim: { hidden: true, desc: 'toggle lavender mode', run: (a: any, ctx: any) => {
      const current = (window as any).PORTFOLIO_EASTER || 'none';
      const next = current === 'lavender' ? 'none' : 'lavender';
      (window as any).PORTFOLIO_EASTER = next;
      window.dispatchEvent(new CustomEvent('portfolio:easter', { detail: { theme: next } }));
      document.body.classList.toggle('lavender', next === 'lavender');
      document.body.classList.remove('matcha');
      ctx.ok(next === 'lavender' ? 'lavender mode on 💜' : 'lavender mode off.');
    } },
    ll: { hidden: true, run: (a: any, ctx: any) => cmds.ls.run([], ctx) },
  };
  return cmds;
}

export default function Terminal({ open, onClose, api }: { open: boolean; onClose: () => void; api: TerminalApi }) {
  const [lines, setLines] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [pos, setPos] = useState(() => {
    if (typeof window === 'undefined') return { x: 20, y: 20 }
    return {
      x: Math.max(20, (window.innerWidth - 580) / 2),
      y: Math.max(20, (window.innerHeight - 360) / 2),
    }
  });
  const [isDragging, setIsDragging] = useState(false);
  const [navPath, setNavPath] = useState<string[]>([]);
  const dragOffset = useRef<{ active: boolean; dx: number; dy: number }>({ active: false, dx: 0, dy: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cmds = useRef<Record<string, any> | null>(null);
  if (!cmds.current) cmds.current = buildCommands(api, () => navPath, setNavPath);
  useEffect(() => { cmds.current = buildCommands(api, () => navPath, setNavPath); });

  const commandNames = Object.keys(cmds.current).filter((n) => !cmds.current![n].hidden);

  // Drag handlers
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragOffset.current.active) return;
      setPos({ x: Math.max(0, e.clientX - dragOffset.current.dx), y: Math.max(0, e.clientY - dragOffset.current.dy) });
    };
    const onUp = (e: MouseEvent) => {
      if (!dragOffset.current.active) return;
      dragOffset.current.active = false;
      setIsDragging(false);
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  const onBarMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    dragOffset.current = { active: true, dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    setIsDragging(true);
    document.body.style.userSelect = 'none';
  };

  // welcome banner on first open
  useEffect(() => {
    if (open && lines.length === 0) {
      setLines([{ kind: 'node', node: <WelcomeBanner /> }]);
    }
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, open]);

  // ---- completion ----
  const getCompletion = (val: string) => {
    const lead = val.replace(/^\s+/, '');
    if (!lead) return null;
    const trailingSpace = /\s$/.test(val);
    const tokens = lead.split(/\s+/);
    if (tokens.length === 1 && !trailingSpace) {
      const tok = tokens[0].toLowerCase();
      const match = commandNames.find((c) => c.startsWith(tok) && c !== tok);
      if (match) return { full: match, suffix: match.slice(tok.length), isCmd: true };
      return null;
    }
    const cmd = cmds.current![tokens[0].toLowerCase()];
    if (!cmd || !cmd.args) return null;
    const opts = typeof cmd.args === 'function' ? cmd.args() : cmd.args;
    const argTok = trailingSpace ? '' : (tokens[1] || '');
    const match = opts.find((o: string) => o.toLowerCase().startsWith(argTok.toLowerCase()) && o.toLowerCase() !== argTok.toLowerCase());
    if (match) return { full: tokens[0] + ' ' + match, suffix: match.slice(argTok.length), isCmd: false };
    return null;
  };
  const completion = getCompletion(input);

  const acceptCompletion = () => {
    if (!completion) return;
    let next = completion.full;
    const cmd = cmds.current![next.split(/\s+/)[0]];
    if (completion.isCmd && cmd && cmd.args) next += ' ';
    setInput(next);
  };

  // ---- run ----
  const ctxFor = () => {
    const push = (kind: string, payload: any) => setLines((ls) => [...ls, kind === 'node' ? { kind, node: payload } : { kind, text: payload }]);
    return {
      out: (t: any) => push('out', t),
      ok: (t: any) => push('ok', t),
      err: (t: any) => push('err', t),
      node: (n: any) => push('node', n),
      clear: () => setLines([]),
      close: () => setTimeout(onClose, 120),
    };
  };

  const submit = () => {
    const raw = input.trim();
    const pathStr = navPath.length ? '~/' + navPath.join('/') : '~/';
    setLines((ls) => [...ls, { kind: 'cmd', text: input, path: pathStr }]);
    if (raw) {
      setHistory((h) => [...h, raw]);
      setHistIdx(-1);
      const tokens = raw.split(/\s+/);
      const name = tokens[0].toLowerCase();
      const cmd = cmds.current![name];
      const ctx = ctxFor();
      if (cmd) {
        try { cmd.run(tokens.slice(1), ctx); }
        catch (e: any) { ctx.err('error: ' + e.message); }
      } else {
        ctx.err(`command not found: ${name} — type help`);
      }
    }
    setInput('');
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') { e.preventDefault(); acceptCompletion(); return; }
    if (e.key === 'ArrowRight') {
      const el = e.target as HTMLInputElement;
      if (completion && el.selectionStart === input.length) { e.preventDefault(); acceptCompletion(); return; }
    }
    if (e.key === 'Enter') { e.preventDefault(); submit(); return; }
    if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx); setInput(history[idx]);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) { setHistIdx(-1); setInput(''); }
      else { setHistIdx(idx); setInput(history[idx]); }
      return;
    }
  };

  if (!open) return null;

  const focusEnd = () => {
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    const len = el.value.length;
    try { el.setSelectionRange(len, len); } catch (e) {}
  };

  return (
    <div
      className="term-win"
      role="dialog"
      aria-label="terminal"
      style={{ left: pos.x, top: pos.y }}
    >
      <div
        className={`term-bar${isDragging ? ' dragging' : ''}`}
        onMouseDown={onBarMouseDown}
      >
        <div className="lights"><span></span><span></span><span></span></div>
        <div className="title">timothy_ou — zsh</div>
        <div className="hint">close<span className="kbd" style={{cursor:'pointer'}} onClick={onClose}>esc</span></div>
      </div>
      <div className="term-body" ref={bodyRef} onMouseDown={(e) => { e.preventDefault(); focusEnd(); }}>
        {lines.map((l, i) => {
          if (l.kind === 'node') return <div key={i}>{l.node}</div>;
          if (l.kind === 'cmd') return <div key={i} className="term-line cmd"><span className="ps">{l.path || '~/'} $</span> {l.text}</div>;
          return <div key={i} className={`term-line ${l.kind}`}>{l.text}</div>;
        })}
      </div>
      <div className="term-inputrow">
        <span className="ps">{(navPath.length ? '~/' + navPath.join('/') : '~/') + ' $'}</span>
        <div className="term-inputwrap">
          <input
            ref={inputRef}
            className="term-input"
            value={input}
            spellCheck={false}
            autoComplete="off"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            onMouseDown={(e) => { e.preventDefault(); focusEnd(); }}
          />
          {completion && (
            <div className="term-ghost" aria-hidden="true">
              <span className="typed">{input}</span><span>{completion.suffix}</span>
              <span className="tabhint">tab</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
