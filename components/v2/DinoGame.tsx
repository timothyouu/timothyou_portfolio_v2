'use client'

import { useEffect, useRef, useState } from 'react'

// dino-game.jsx — terminal offline runner. Original pixel art + physics.
// Triggered by the secret `disconnect network` command. High score is saved
// to localStorage. Plays with Space/↑ (jump), ↓ (duck), Q (quit), or tap.

let DINO_SEQ = 0;

// ---- pixel sprites ('█' = filled, '▒' = eye/hole, ' ' = empty) ----
const DINO_A = [
  "      ███████",
  "      █▒█████",
  "      ███████",
  "      ████   ",
  "      ████   ",
  "█     █████  ",
  "██   ██████  ",
  "███ ███████  ",
  "████████████ ",
  " ███████████ ",
  "  ██████████ ",
  "  ███   ██   ",
  "  ██     █   ",
];
const DINO_B = [
  "      ███████",
  "      █▒█████",
  "      ███████",
  "      ████   ",
  "      ████   ",
  "█     █████  ",
  "██   ██████  ",
  "███ ███████  ",
  "████████████ ",
  " ███████████ ",
  "  ██████████ ",
  "  ██     █   ",
  "  █     ██   ",
];
const DINO_DEAD = [
  "      ███████",
  "      █████▒█",
  "      ███████",
  "      ████   ",
  "      ████   ",
  "█     █████  ",
  "██   ██████  ",
  "███ ███████  ",
  "████████████ ",
  " ███████████ ",
  "  ██████████ ",
  "  ███   ██   ",
  "  ██     █   ",
];
const DUCK_A = [
  "             ███████",
  "  ███████████▒█████ ",
  "  █████████████████ ",
  "  ████████████████  ",
  "  ███████████████   ",
  "   ██    ██         ",
  "   █     █          ",
];
const DUCK_B = [
  "             ███████",
  "  ███████████▒█████ ",
  "  █████████████████ ",
  "  ████████████████  ",
  "  ███████████████   ",
  "    ██    ██        ",
  "    █     █         ",
];
const C_SMALL = [
  "  █  ",
  "█ █  ",
  "█ █ █",
  "███ █",
  "  ███",
  "  █  ",
  "  █  ",
  "  █  ",
];
const C_BIG = [
  "  █   █  ",
  "█ █   █ █",
  "█ █ █ █ █",
  "███ █ ███",
  "  ███  █ ",
  "   █   █ ",
  "   █   █ ",
  "   █   █ ",
  "   █   █ ",
];
const BIRD_1 = [
  "█       ",
  "██   ██ ",
  "████████",
  " ███    ",
  "  ██    ",
];
const BIRD_2 = [
  "  ██    ",
  " ███    ",
  "████████",
  "██   ██ ",
  "█       ",
];

function spriteSize(sprite: string[], px: number) {
  const cols = Math.max(...sprite.map((r) => r.length));
  return { w: cols * px, h: sprite.length * px };
}

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hi, setHi] = useState(() => parseInt(localStorage.getItem('dino-hi') || '0', 10));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const groundY = 124;
    const px = 3;

    const cs = getComputedStyle(document.body);
    const FG = (cs.getPropertyValue('--fg') || '#111').trim();
    const BG = (cs.getPropertyValue('--bg') || '#fff').trim();
    const DIM = (cs.getPropertyValue('--fg-dim') || '#999').trim();

    const dinoSize = spriteSize(DINO_A, px);
    const duckSize = spriteSize(DUCK_A, px);

    const myId = ++DINO_SEQ;
    (window as any).__activeDinoId = myId;

    const G: any = {
      id: myId,
      raf: 0,
      running: true,
      gameOver: false,
      quit: false,
      t: 0,
      y: 0,          // jump height above ground (px)
      vy: 0,
      ducking: false,
      onGround: true,
      obstacles: [],
      speed: 5.2,
      scoreF: 0,
      score: 0,
      hi: parseInt(localStorage.getItem('dino-hi') || '0', 10),
      spawnTimer: 50,
      pebbles: Array.from({ length: 18 }, () => ({ x: Math.random() * W, s: Math.random() < 0.5 ? 1 : 2 })),
      flap: 0,
      flashT: 0,
    };

    const GRAVITY = 0.75;
    const JUMP_V = 13.2;

    function reset() {
      G.gameOver = false; G.quit = false; G.running = true;
      G.t = 0; G.y = 0; G.vy = 0; G.ducking = false; G.onGround = true;
      G.obstacles = []; G.speed = 5.2; G.scoreF = 0; G.score = 0;
      G.spawnTimer = 50; G.flashT = 0;
    }

    function jump() {
      if (G.gameOver) { reset(); return; }
      if (G.onGround) { G.vy = JUMP_V; G.onGround = false; G.ducking = false; }
    }

    function spawn() {
      const allowBird = G.score > 280 && Math.random() < 0.32;
      if (allowBird) {
        const offsets = [18, 40, 58];
        const off = offsets[Math.floor(Math.random() * offsets.length)];
        const sz = spriteSize(BIRD_1, px);
        G.obstacles.push({ kind: 'bird', x: W + 10, y: groundY - off - sz.h, w: sz.w, h: sz.h });
      } else {
        const big = Math.random() < 0.4;
        const sprite = big ? C_BIG : C_SMALL;
        const sz = spriteSize(sprite, px);
        G.obstacles.push({ kind: big ? 'cbig' : 'csmall', x: W + 10, y: groundY - sz.h, w: sz.w, h: sz.h });
      }
    }

    function dinoBox() {
      const top = groundY - (G.ducking ? duckSize.h : dinoSize.h) - G.y;
      if (G.ducking) {
        return { x: 28 + 9, y: top + 3, w: duckSize.w - 18, h: duckSize.h - 4 };
      }
      return { x: 28 + 18, y: top + 4, w: dinoSize.w - 26, h: dinoSize.h - 6 };
    }

    function hits(a: any, o: any) {
      const b = { x: o.x + 4, y: o.y + 3, w: o.w - 8, h: o.h - 5 };
      return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }

    function update(ts: number) {
      G.t += ts;
      G.flap += ts;
      // physics
      if (!G.onGround) {
        G.y += G.vy * ts;
        G.vy -= GRAVITY * ts;
        if (G.y <= 0) { G.y = 0; G.vy = 0; G.onGround = true; }
      }
      // pebbles
      G.pebbles.forEach((p: any) => {
        p.x -= G.speed * ts;
        if (p.x < -4) { p.x = W + Math.random() * 40; p.s = Math.random() < 0.5 ? 1 : 2; }
      });
      // spawn
      G.spawnTimer -= ts;
      if (G.spawnTimer <= 0) {
        spawn();
        const gap = 58 + Math.random() * 70 - G.speed * 2.4;
        G.spawnTimer = Math.max(34, gap);
      }
      // move + collide
      const box = dinoBox();
      for (let i = G.obstacles.length - 1; i >= 0; i--) {
        const o = G.obstacles[i];
        o.x -= G.speed * ts;
        if (o.x + o.w < -10) { G.obstacles.splice(i, 1); continue; }
        if (hits(box, o)) {
          G.gameOver = true;
          G.flashT = 6;
          if (G.score > G.hi) {
            G.hi = G.score;
            localStorage.setItem('dino-hi', String(G.hi));
            setHi(G.hi);
          }
        }
      }
      // score + speed
      G.scoreF += G.speed * ts * 0.12;
      G.score = Math.floor(G.scoreF);
      G.speed += 0.0024 * ts;
    }

    function drawSprite(sprite: string[], x: number, y: number, fg: string) {
      for (let r = 0; r < sprite.length; r++) {
        const row = sprite[r];
        for (let c = 0; c < row.length; c++) {
          const ch = row[c];
          if (ch === ' ') continue;
          ctx!.fillStyle = ch === '▒' ? G._bg : fg;
          ctx!.fillRect(x + c * px, y + r * px, px, px);
        }
      }
    }

    function draw() {
      const night = Math.floor(G.score / 700) % 2 === 1;
      const bg = night ? FG : BG;
      const fg = night ? BG : FG;
      G._bg = bg;
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, W, H);

      // ground line + pebbles
      ctx!.fillStyle = fg;
      ctx!.fillRect(0, groundY + 2, W, 2);
      G.pebbles.forEach((p: any) => {
        ctx!.fillRect(Math.round(p.x), groundY + 8, p.s * 3, 2);
      });

      // obstacles
      G.obstacles.forEach((o: any) => {
        let sprite;
        if (o.kind === 'bird') sprite = (Math.floor(G.flap / 8) % 2 === 0) ? BIRD_1 : BIRD_2;
        else if (o.kind === 'cbig') sprite = C_BIG;
        else sprite = C_SMALL;
        drawSprite(sprite, Math.round(o.x), Math.round(o.y), fg);
      });

      // dino
      let dSprite;
      if (G.gameOver) dSprite = DINO_DEAD;
      else if (G.ducking) dSprite = (Math.floor(G.t / 6) % 2 === 0) ? DUCK_A : DUCK_B;
      else if (!G.onGround) dSprite = DINO_A;
      else dSprite = (Math.floor(G.t / 6) % 2 === 0) ? DINO_A : DINO_B;
      const dh = (G.ducking ? duckSize.h : dinoSize.h);
      drawSprite(dSprite, 28, groundY - dh - G.y, fg);

      // score (top-right, monospace)
      ctx!.fillStyle = fg;
      ctx!.font = "600 15px 'JetBrains Mono', ui-monospace, monospace";
      ctx!.textAlign = 'right';
      ctx!.textBaseline = 'top';
      const pad = (n: number) => String(n).padStart(5, '0');
      ctx!.fillStyle = DIM;
      ctx!.fillText('HI ' + pad(G.hi), W - 96, 10);
      ctx!.fillStyle = fg;
      ctx!.fillText(pad(G.score), W - 14, 10);

      // game over overlay
      if (G.gameOver) {
        ctx!.textAlign = 'center';
        ctx!.font = "700 22px 'JetBrains Mono', ui-monospace, monospace";
        ctx!.fillStyle = fg;
        ctx!.fillText('G A M E   O V E R', W / 2, 38);
        ctx!.font = "400 12px 'JetBrains Mono', ui-monospace, monospace";
        ctx!.fillStyle = DIM;
        ctx!.fillText('press space / tap to retry', W / 2, 66);
      }
      if (G.quit) {
        ctx!.fillStyle = bg; ctx!.fillRect(0, 0, W, H);
        ctx!.fillStyle = DIM;
        ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle';
        ctx!.font = "400 13px 'JetBrains Mono', ui-monospace, monospace";
        ctx!.fillText('// connection restored — run `disconnect network` to play again', W / 2, H / 2);
      }
    }

    let last = performance.now();
    function frame(now: number) {
      if (G.id !== (window as any).__activeDinoId) { draw(); return; } // superseded → freeze
      const dt = Math.min(48, now - last); last = now;
      const ts = dt / 16.6667;
      if (G.running && !G.gameOver && !G.quit) update(ts);
      draw();
      G.raf = requestAnimationFrame(frame);
    }
    G.raf = requestAnimationFrame(frame);

    function onKeyDown(e: KeyboardEvent) {
      if (G.id !== (window as any).__activeDinoId || G.quit) return;
      const k = e.key;
      if (k === ' ' || k === 'Spacebar' || k === 'ArrowUp') {
        e.preventDefault(); e.stopPropagation();
        jump();
      } else if (k === 'ArrowDown') {
        e.preventDefault(); e.stopPropagation();
        if (G.onGround && !G.gameOver) G.ducking = true;
      } else if (k === 'q' || k === 'Q') {
        e.preventDefault(); e.stopPropagation();
        G.quit = true; G.running = false;
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      if (G.id !== (window as any).__activeDinoId) return;
      if (e.key === 'ArrowDown') { e.stopPropagation(); G.ducking = false; }
    }
    function onTap(e: Event) {
      e.preventDefault();
      (window as any).__activeDinoId = G.id;
      jump();
    }

    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('keyup', onKeyUp, true);
    canvas.addEventListener('mousedown', onTap);
    canvas.addEventListener('touchstart', onTap, { passive: false });

    return () => {
      cancelAnimationFrame(G.raf);
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('keyup', onKeyUp, true);
      canvas.removeEventListener('mousedown', onTap);
      canvas.removeEventListener('touchstart', onTap);
      if ((window as any).__activeDinoId === G.id) (window as any).__activeDinoId = 0;
    };
  }, []);

  return (
    <div className="dino-game">
      <canvas ref={canvasRef} width={640} height={150} />
      <div className="dino-meta">
        <span>space / ↑ jump &middot; ↓ duck &middot; q quit &middot; tap to jump</span>
        <span>hi {String(hi).padStart(5, '0')}</span>
      </div>
    </div>
  );
}
