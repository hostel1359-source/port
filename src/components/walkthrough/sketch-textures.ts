import * as THREE from 'three';

type SketchKind = 'wall' | 'floor' | 'door' | 'paper' | 'brick';

type LabelOptions = {
  width?: number;
  height?: number;
  fontSize?: number;
  handwritten?: boolean;
  color?: string;
  background?: string;
};

type Random = () => number;

const SIZE = 1024;
const INK = '#2c2b27';
const BASE_COLORS: Record<SketchKind, string> = {
  wall: '#f4f3ee',
  floor: '#e9e6dd',
  door: '#bba995',
  paper: '#faf8f0',
  brick: '#e9e6e0',
};

function seededRandom(key: string): Random {
  let seed = 2166136261;
  for (let i = 0; i < key.length; i += 1) {
    seed = Math.imul(seed ^ key.charCodeAt(i), 16777619);
  }
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function createCanvas(width: number, height: number) {
  if (typeof document === 'undefined') {
    throw new Error('Sketch textures must be created in the browser after the scene mounts.');
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('A 2D canvas context is required to draw the studio textures.');
  context.lineCap = 'round';
  context.lineJoin = 'round';
  return { canvas, context };
}

function textureFromCanvas(canvas: HTMLCanvasElement, repeat: boolean): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = repeat ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

/** The grain changes luminance, never alpha, so transparent signs stay transparent. */
function paperGrain(context: CanvasRenderingContext2D, random: Random, strength: number) {
  const { width, height } = context.canvas;
  const image = context.getImageData(0, 0, width, height);
  const pixels = image.data;
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 0) continue;
    const fleck = (random() + random() + random() - 1.5) * strength;
    pixels[i] += fleck;
    pixels[i + 1] += fleck;
    pixels[i + 2] += fleck;
  }
  context.putImageData(image, 0, 0);
}

function stroke(
  context: CanvasRenderingContext2D,
  random: Random,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  width = 0.7,
  opacity = 0.25,
  wobble = 1.1,
) {
  context.strokeStyle = INK;
  context.lineWidth = width;
  context.globalAlpha = opacity;
  context.beginPath();
  context.moveTo(x1, y1);
  context.quadraticCurveTo(
    (x1 + x2) / 2 + (random() - 0.5) * wobble,
    (y1 + y2) / 2 + (random() - 0.5) * wobble,
    x2,
    y2,
  );
  context.stroke();
  context.globalAlpha = 1;
}

/** Wrap boundary-crossing marks to keep repeating walls and boards continuous. */
function periodicStroke(
  context: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  width: number,
  opacity: number,
) {
  const { width: canvasWidth, height: canvasHeight } = context.canvas;
  const offsetsX = [0];
  const offsetsY = [0];
  if (Math.min(x1, x2) < 0) offsetsX.push(canvasWidth);
  if (Math.max(x1, x2) >= canvasWidth) offsetsX.push(-canvasWidth);
  if (Math.min(y1, y2) < 0) offsetsY.push(canvasHeight);
  if (Math.max(y1, y2) >= canvasHeight) offsetsY.push(-canvasHeight);
  context.strokeStyle = INK;
  context.lineWidth = width;
  context.globalAlpha = opacity;
  context.beginPath();
  for (const dx of offsetsX) {
    for (const dy of offsetsY) {
      context.moveTo(x1 + dx, y1 + dy);
      context.lineTo(x2 + dx, y2 + dy);
    }
  }
  context.stroke();
  context.globalAlpha = 1;
}

function hatchPatch(
  context: CanvasRenderingContext2D,
  random: Random,
  x: number,
  y: number,
  radius: number,
  opacity: number,
  cross = false,
) {
  const count = Math.ceil(radius / 2.2);
  for (let i = 0; i < count; i += 1) {
    const offset = (i / count - 0.5) * radius;
    const length = radius * (0.4 + Math.sin((i / count) * Math.PI) * 0.6);
    const startX = x + offset;
    const startY = y + offset * 0.42 + random() * 2;
    periodicStroke(context, startX, startY, startX + length * 0.48, startY - length, 0.4 + random() * 0.35, opacity * (0.55 + random() * 0.45));
    if (cross && i % 2 === 0) {
      periodicStroke(context, startX - 3, startY - length * 0.6, startX + length * 0.62, startY - length * 0.15, 0.4, opacity * 0.6);
    }
  }
}

function wallMarks(context: CanvasRenderingContext2D, random: Random, paper = false) {
  // Most of the wall stays white; occasional little hatch patches catch the light.
  const marks = paper ? 850 : 2400;
  for (let i = 0; i < marks; i += 1) {
    const x = random() * SIZE;
    const y = random() * SIZE;
    const length = 1 + random() * (paper ? 8 : 21);
    periodicStroke(context, x, y, x + length * 0.35, y - length, 0.35 + random() * 0.35, (paper ? 0.025 : 0.035) + random() * 0.06);
  }
  for (let i = 0; i < (paper ? 14 : 68); i += 1) {
    hatchPatch(context, random, random() * SIZE, random() * SIZE, 9 + random() * 28, paper ? 0.055 : 0.085, i % 4 === 0);
  }
}

function woodGrain(
  context: CanvasRenderingContext2D,
  random: Random,
  left: number,
  top: number,
  width: number,
  height: number,
  density: number,
  dark = false,
) {
  context.save();
  context.beginPath();
  context.rect(left + 2, top + 1, width - 4, height - 2);
  context.clip();
  context.strokeStyle = INK;
  for (let i = 0; i < density; i += 1) {
    const x = left + 3 + random() * (width - 6);
    const y = top + random() * height;
    const length = 9 + random() * Math.min(height * 0.44, 185);
    const drift = (random() - 0.5) * 8;
    context.globalAlpha = (dark ? 0.12 : 0.07) + random() * (dark ? 0.3 : 0.22);
    context.lineWidth = 0.35 + random() * 0.65;
    context.beginPath();
    context.moveTo(x, y);
    context.bezierCurveTo(x + drift, y + length * 0.3, x - drift * 0.5, y + length * 0.76, x + drift * 0.3, y + length);
    context.stroke();
  }
  // Long, irregular ovals suggest knots without a photorealistic wood texture.
  for (let knot = 0; knot < Math.max(1, Math.floor(height / 450)); knot += 1) {
    const x = left + width * (0.23 + random() * 0.54);
    const y = top + height * (0.13 + random() * 0.74);
    const knotWidth = Math.min(width * 0.1, 11) * (0.65 + random() * 0.6);
    const knotHeight = 9 + random() * 18;
    for (let ring = 1; ring < 5; ring += 1) {
      context.globalAlpha = (dark ? 0.32 : 0.22) - ring * 0.027;
      context.lineWidth = 0.45 + random() * 0.35;
      context.beginPath();
      context.ellipse(x + random() * 1.5, y, knotWidth * ring * 0.47, knotHeight * ring * 0.63, (random() - 0.5) * 0.06, 0, Math.PI * 2);
      context.stroke();
    }
    for (let line = 0; line < 6; line += 1) {
      const direction = line % 2 === 0 ? 1 : -1;
      const xOffset = direction * (knotWidth + line * 1.9);
      context.globalAlpha = 0.12;
      context.lineWidth = 0.6;
      context.beginPath();
      context.moveTo(x + xOffset * 0.4, y - knotHeight * 3.8);
      context.bezierCurveTo(x + xOffset * 1.8, y - knotHeight, x + xOffset * 1.6, y + knotHeight, x + xOffset * 0.6, y + knotHeight * 4);
      context.stroke();
    }
  }
  context.restore();
}

function floorBoards(context: CanvasRenderingContext2D, random: Random) {
  const boardWidth = SIZE / 8;
  for (let column = 0; column < 8; column += 1) {
    const left = column * boardWidth;
    context.fillStyle = column % 3 === 0 ? '#ffffff' : '#766f61';
    context.globalAlpha = column % 3 === 0 ? 0.065 : 0.018 + random() * 0.024;
    context.fillRect(left, 0, boardWidth, SIZE);
    context.globalAlpha = 1;
    woodGrain(context, random, left, 0, boardWidth, SIZE, 315);
    // A periodic stagger means the pattern can tile in both directions.
    const offset = [0, 256, 128, 384][column % 4];
    for (let row = -1; row < 3; row += 1) {
      const y = offset + row * 512;
      if (y < 0 || y >= SIZE) continue;
      periodicStroke(context, left, y, left + boardWidth, y, 1.1, 0.52);
      periodicStroke(context, left + 1, y + 2.1, left + boardWidth - 1, y + 1.2, 0.5, 0.35);
      // Tiny pairs of carpenter's nail marks, drawn rather than stamped.
      for (const nailX of [left + 8, left + boardWidth - 8]) {
        stroke(context, random, nailX, y + 6, nailX + 0.4, y + 9, 0.9, 0.45);
        stroke(context, random, nailX - 1.1, y + 7, nailX + 1.3, y + 7.3, 0.55, 0.32);
      }
    }
  }
  for (let i = 0; i <= 8; i += 1) {
    const x = i * boardWidth;
    periodicStroke(context, x, 0, x, SIZE, 1.1, 0.55);
    periodicStroke(context, x + 2.4, 0, x + 2.4, SIZE, 0.6, 0.31);
    for (let segment = 0; segment < 12; segment += 1) {
      const y = segment * (SIZE / 12);
      periodicStroke(context, x + 4 + random() * 2, y, x + 4 + random() * 2, y + 12 + random() * 40, 0.65, 0.2);
    }
  }
}

function roughRectangle(
  context: CanvasRenderingContext2D,
  random: Random,
  x: number,
  y: number,
  width: number,
  height: number,
  opacity: number,
  lineWidth = 1.2,
) {
  for (let pass = 0; pass < 2; pass += 1) {
    const jitter = () => (random() - 0.5) * (pass ? 3.5 : 1.3);
    stroke(context, random, x + jitter(), y + jitter(), x + width + jitter(), y + jitter(), pass ? lineWidth * 0.6 : lineWidth, pass ? opacity * 0.55 : opacity, 2.5);
    stroke(context, random, x + width + jitter(), y + jitter(), x + width + jitter(), y + height + jitter(), pass ? lineWidth * 0.6 : lineWidth, pass ? opacity * 0.55 : opacity, 2.5);
    stroke(context, random, x + width + jitter(), y + height + jitter(), x + jitter(), y + height + jitter(), pass ? lineWidth * 0.6 : lineWidth, pass ? opacity * 0.55 : opacity, 2.5);
    stroke(context, random, x + jitter(), y + height + jitter(), x + jitter(), y + jitter(), pass ? lineWidth * 0.6 : lineWidth, pass ? opacity * 0.55 : opacity, 2.5);
  }
}

function woodDoor(context: CanvasRenderingContext2D, random: Random) {
  woodGrain(context, random, 0, 0, SIZE, SIZE, 2400, true);
  roughRectangle(context, random, 22, 17, 980, 990, 0.76, 2.6);
  roughRectangle(context, random, 35, 30, 954, 964, 0.48, 1.2);
  for (const [x, y, width, height] of [[129, 100, 766, 341], [129, 551, 766, 364]]) {
    context.globalAlpha = 0.06;
    context.fillStyle = '#3c3023';
    context.fillRect(x, y, width, height);
    context.globalAlpha = 1;
    roughRectangle(context, random, x, y, width, height, 0.72, 2.0);
    roughRectangle(context, random, x + 13, y + 12, width - 26, height - 24, 0.58, 1.0);
    roughRectangle(context, random, x + 20, y + 18, width - 40, height - 36, 0.34, 0.8);
    // Graphite gathers in the panel bevels, with bright edges left as raw paper.
    for (let hatch = 0; hatch < height / 5; hatch += 1) {
      const yPosition = y + hatch * 5;
      stroke(context, random, x + 2, yPosition, x + 10, yPosition + 10, 0.7, 0.34);
      stroke(context, random, x + width - 11, yPosition, x + width - 2, yPosition + 9, 0.6, 0.18);
    }
    for (let hatch = 0; hatch < width / 6; hatch += 1) {
      const xPosition = x + hatch * 6;
      stroke(context, random, xPosition, y + height - 10, xPosition + 10, y + height - 2, 0.65, 0.22);
    }
  }
  for (let i = 0; i < 35; i += 1) {
    const x = random() > 0.5 ? 43 + random() * 38 : 944 + random() * 36;
    const y = 30 + random() * 950;
    stroke(context, random, x, y, x + random() * 2, y + 10 + random() * 45, 0.8, 0.3);
  }
}

function pencilBricks(context: CanvasRenderingContext2D, random: Random) {
  const rowHeight = SIZE / 8;
  const brickWidth = SIZE / 4;
  for (let row = 0; row < 8; row += 1) {
    const top = row * rowHeight;
    const offset = row % 2 === 0 ? 0 : -brickWidth / 2;
    for (let column = 0; column < 5; column += 1) {
      const left = offset + column * brickWidth;
      if (left >= SIZE) continue;
      context.save();
      context.beginPath();
      context.rect(left + 4, top + 4, brickWidth - 8, rowHeight - 8);
      context.clip();
      context.fillStyle = row % 3 === 0 ? '#ffffff' : '#8b8278';
      context.globalAlpha = 0.035 + random() * 0.045;
      context.fillRect(left, top, brickWidth, rowHeight);
      context.globalAlpha = 1;
      for (let patch = 0; patch < 7; patch += 1) {
        hatchPatch(context, random, left + random() * brickWidth, top + random() * rowHeight, 15 + random() * 29, 0.12, patch % 3 === 0);
      }
      context.restore();
      roughRectangle(context, random, left + 3, top + 3, brickWidth - 6, rowHeight - 6, 0.55, 1.2);
      stroke(context, random, left + 9, top + rowHeight - 9, left + brickWidth - 8, top + rowHeight - 8, 0.6, 0.3);
      stroke(context, random, left + 9, top + 9, left + 9, top + rowHeight - 10, 0.6, 0.2);
    }
  }
}

/**
 * Draw a new, deterministic material map. No module-level canvas/texture cache:
 * each scene owns the returned texture and must dispose it when no longer used.
 */
export function createSketchTexture(kind: SketchKind, tint?: string): THREE.CanvasTexture {
  const { canvas, context } = createCanvas(SIZE, SIZE);
  const random = seededRandom(`manvesh-pencil-${kind}-${tint ?? 'default'}-v1`);
  context.fillStyle = BASE_COLORS[kind];
  if (tint) context.fillStyle = tint;
  context.fillRect(0, 0, SIZE, SIZE);
  paperGrain(context, random, kind === 'door' ? 14 : 9);

  switch (kind) {
    case 'wall': wallMarks(context, random); break;
    case 'floor': floorBoards(context, random); break;
    case 'door': woodDoor(context, random); break;
    case 'paper': wallMarks(context, random, true); break;
    case 'brick': pencilBricks(context, random); break;
  }

  const texture = textureFromCanvas(canvas, true);
  texture.name = `pencil-${kind}`;
  return texture;
}

function dimension(value: number | undefined, fallback: number): number {
  return value !== undefined && Number.isFinite(value)
    ? Math.max(64, Math.min(4096, Math.round(value)))
    : fallback;
}

function labelFont(handwritten: boolean): string {
  const styles = getComputedStyle(document.documentElement);
  if (handwritten) {
    const gloria = styles.getPropertyValue('--font-gloria').trim();
    const caveat = styles.getPropertyValue('--font-caveat').trim();
    return [gloria, caveat, '"Gloria Hallelujah"', '"Caveat"', 'cursive'].filter(Boolean).join(', ');
  }
  const sans = styles.getPropertyValue('--font-space-grotesk').trim();
  return [sans, 'Arial', 'sans-serif'].filter(Boolean).join(', ');
}

/** Call after document.fonts.ready; the returned map owns its canvas and is disposable. */
export function createLabelTexture(lines: string[], options: LabelOptions = {}): THREE.CanvasTexture {
  const width = dimension(options.width, SIZE);
  const height = dimension(options.height, SIZE);
  const { canvas, context } = createCanvas(width, height);
  const random = seededRandom(`manvesh-label-${lines.join('\n')}-${JSON.stringify(options)}-v1`);
  const background = options.background ?? '#faf8f0';
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);
  paperGrain(context, random, 5);

  const handwritten = options.handwritten ?? true;
  const family = labelFont(handwritten);
  const padding = Math.min(width, height) * 0.085;
  const requestedSize = options.fontSize !== undefined && Number.isFinite(options.fontSize)
    ? Math.max(1, options.fontSize)
    : Math.min(width * 0.09, height / Math.max(2, lines.length * 1.9));
  const lineHeightRatio = handwritten ? 1.55 : 1.35;
  let fontSize = Math.min(requestedSize, (height - padding * 2) / Math.max(1, lines.length * lineHeightRatio));
  context.font = `${fontSize}px ${family}`;
  const widest = lines.reduce((maximum, line) => Math.max(maximum, context.measureText(line).width), 0);
  if (widest > width - padding * 2) fontSize *= (width - padding * 2) / widest;
  context.font = `${fontSize}px ${family}`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = options.color ?? '#282822';
  const lineHeight = fontSize * lineHeightRatio;
  const firstLineY = height / 2 - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((line, index) => {
    context.save();
    context.translate(width / 2, firstLineY + index * lineHeight);
    // Less than half a degree avoids typeset rigidity without hurting legibility.
    if (handwritten) context.rotate((random() - 0.5) * 0.009);
    context.fillText(line, 0, 0);
    context.restore();
  });

  const texture = textureFromCanvas(canvas, false);
  texture.name = `pencil-label-${lines[0]?.slice(0, 28) ?? 'blank'}`;
  return texture;
}
