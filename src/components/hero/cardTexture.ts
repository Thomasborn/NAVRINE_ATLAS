import * as THREE from 'three';

export interface OrbitCardData {
  id: string;
  title: string;
  category: string;
  palette: string[];
}

const W = 512;
const H = 640;

/** Renders one signal card (glow, swatches, category, serif title) to a texture. */
export function makeCardTexture(card: OrbitCardData): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  const r = 36;
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, r);
  ctx.clip();

  ctx.fillStyle = '#0b0b10';
  ctx.fillRect(0, 0, W, H);

  const glowA = ctx.createRadialGradient(W * 0.75, H * 0.2, 40, W * 0.75, H * 0.2, W * 0.9);
  glowA.addColorStop(0, hexWithAlpha(card.palette[0] ?? '#4d8dff', 0.55));
  glowA.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glowA;
  ctx.fillRect(0, 0, W, H);

  const glowB = ctx.createRadialGradient(W * 0.15, H * 0.95, 30, W * 0.15, H * 0.95, W * 0.8);
  glowB.addColorStop(0, hexWithAlpha(card.palette[1] ?? '#ff4fd8', 0.35));
  glowB.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glowB;
  ctx.fillRect(0, 0, W, H);

  card.palette.slice(0, 4).forEach((hex, i) => {
    ctx.beginPath();
    ctx.arc(56 + i * 52, 72, 16, 0, Math.PI * 2);
    ctx.fillStyle = hex;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  ctx.fillStyle = 'rgba(245,245,240,0.55)';
  ctx.font = '500 24px "Space Grotesk", system-ui, sans-serif';
  ctx.fillText(card.category.toUpperCase(), 48, H - 150);

  ctx.fillStyle = '#f5f5f0';
  ctx.font = 'italic 54px "Fraunces", "Times New Roman", serif';
  wrapText(ctx, card.title, 48, H - 96, W - 96, 58);

  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(1.5, 1.5, W - 3, H - 3, r);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Soft radial glow used as additive backdrop sprites in the scene. */
export function makeGlowTexture(hex: string): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, hexWithAlpha(hex, 0.8));
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function hexWithAlpha(hex: string, alpha: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  bottomY: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  lines.push(line);
  lines.forEach((l, i) => {
    ctx.fillText(l, x, bottomY - (lines.length - 1 - i) * lineHeight);
  });
}
