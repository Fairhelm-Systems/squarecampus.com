// squarecampus-contact-intake — the human check.
//
// WHY THIS SHAPE
// --------------
// The website is a static export on S3/CloudFront. There is no server between
// the visitor and the page, so anything the browser is told, a bot reads. A
// puzzle whose answer travels in JSON — "the target is cell 4,2" — is not a
// puzzle at all; it is a field with an extra step. So the answer never leaves
// this function: the board is rasterised to a PNG here, and the solution is
// held server-side against a one-time nonce. Solving it therefore requires
// looking at pixels, which is the whole point.
//
// WHY A TANGLE, AND NOT A BULLSEYE
// --------------------------------
// "Drag the tile onto the marked spot" is trivial for any model with vision.
// The task chosen instead is the one with the widest measured gap between
// people and vision models: follow ONE line through a tangle of crossing
// lines, then land on the small dot where it ends. People trace a line with a
// fingertip almost perfectly. Vision models lose the thread at crossings —
// they answer from global layout ("it heads right and down, so probably that
// dot") rather than by tracing, and their coordinate estimates are coarse.
//
// Three details do the work:
//   - Every wire is the same colour and weight, so the only way to pick out
//     the right one is to start at the tile and follow it. Colouring the
//     visitor's wire would hand a model the answer.
//   - Wires are drawn with a background-coloured casing, which opens a small
//     gap where one passes under another. That is the classic readability aid
//     from transit maps: it tells a person's eye which line is continuous.
//     It also removes the excuse that the puzzle is ambiguous.
//   - Every wire ends on a dot, and the board carries many more identical
//     dots that end nothing. A guesser cannot shortlist "the endpoints"; a
//     person just sees which dot their own line touches.
//
// This is not unbreakable, and nothing rendered to a screen can be. A patient
// multimodal agent will solve some fraction of these. The goal is to make the
// cheap attacks fail outright and the expensive one cost more than a lead form
// is worth — while a person solves it in about four seconds.
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { deflateSync } from "node:zlib";

/** Board geometry, in CSS pixels. The PNG is rendered at `scale` for retina. */
export const BOARD = Object.freeze({ w: 440, h: 300, scale: 2 });

/** How close the tile must land, in CSS pixels. Comfortably larger than a
 *  fingertip's precision and comfortably smaller than the gap between dots. */
export const TOLERANCE = 22;

const MARGIN = 38;
const WIRE_COUNT = 4;
const DECOY_DOTS = 74;
const DOT_R = 5.4;
const WIRE_W = 3.1;
const CASING_W = 9.5;
/**
 * No two dots closer than this, so "which dot" is never a coin toss.
 *
 * Only has to exceed TOLERANCE: a drop lands on the dot the visitor aimed at,
 * so the nearest wrong dot is a full gap away and misses the accepting circle.
 * Tightening it from 44 to 34 is what makes room for enough decoys to matter —
 * the decoy count is the entire defence against a bot that skips the puzzle,
 * finds the dots with ordinary blob detection, and guesses one.
 */
const MIN_DOT_GAP = 28;
/** The answer must be a real journey from the tile, not a nudge. */
const MIN_TRAVEL = 170;

/**
 * Board palette, tuned for contrast rather than for prettiness.
 *
 * The wire is the thing a visitor has to follow, so it clears the 3:1 that
 * WCAG asks of a meaningful graphical object against its background — the
 * first pass sat at 2.4:1, which is fine for decoration and not fine for the
 * one line someone has to trace. Values are plain sRGB because a PNG rendered
 * on a Lambda cannot read a CSS custom property; the light and dark boards are
 * chosen to sit against the site's own --surface in each theme.
 */
const THEMES = {
  light: { bg: [247, 248, 250], wire: [122, 131, 145], dot: [92, 101, 114] },
  dark: { bg: [17, 20, 25], wire: [113, 122, 135], dot: [136, 145, 157] },
};

// ---------------------------------------------------------------- PNG writer
// A dependency-free encoder. Lambda ships with zlib, which is the only hard
// part of PNG; the rest is four chunks and a CRC. Truecolour, 8-bit, filter 0
// — the art is flat, so deflate does the compressing, not the filter.

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const out = Buffer.alloc(data.length + 12);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, "ascii");
  data.copy(out, 8);
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
  return out;
}

function encodePng(width, height, rgb) {
  const stride = width * 3;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: None
    rgb.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ------------------------------------------------------------- tiny raster
// Coverage-based antialiasing: every primitive reports, per pixel, how much
// of it the primitive covers, and that becomes the blend factor. Slower than
// scanline filling and far shorter to write; the board is 880x600 and this
// runs in a few milliseconds.

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

function canvas(w, h, bg) {
  const buf = Buffer.alloc(w * h * 3);
  for (let i = 0; i < buf.length; i += 3) {
    buf[i] = bg[0];
    buf[i + 1] = bg[1];
    buf[i + 2] = bg[2];
  }
  return { w, h, buf };
}

function blend(c, x, y, col, a) {
  if (a <= 0 || x < 0 || y < 0 || x >= c.w || y >= c.h) return;
  const i = (y * c.w + x) * 3;
  c.buf[i] += (col[0] - c.buf[i]) * a;
  c.buf[i + 1] += (col[1] - c.buf[i + 1]) * a;
  c.buf[i + 2] += (col[2] - c.buf[i + 2]) * a;
}

function disc(c, cx, cy, r, col) {
  for (let y = Math.floor(cy - r - 1); y <= Math.ceil(cy + r + 1); y++) {
    for (let x = Math.floor(cx - r - 1); x <= Math.ceil(cx + r + 1); x++) {
      const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      blend(c, x, y, col, clamp01(r + 0.5 - d));
    }
  }
}

function segment(c, x0, y0, x1, y1, width, col) {
  const hw = width / 2;
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len2 = dx * dx + dy * dy;
  for (
    let y = Math.floor(Math.min(y0, y1) - hw - 1);
    y <= Math.ceil(Math.max(y0, y1) + hw + 1);
    y++
  ) {
    for (
      let x = Math.floor(Math.min(x0, x1) - hw - 1);
      x <= Math.ceil(Math.max(x0, x1) + hw + 1);
      x++
    ) {
      const px = x + 0.5 - x0;
      const py = y + 0.5 - y0;
      const t = len2 === 0 ? 0 : clamp01((px * dx + py * dy) / len2);
      const d = Math.hypot(px - dx * t, py - dy * t);
      blend(c, x, y, col, clamp01(hw + 0.5 - d));
    }
  }
}

function stroke(c, pts, width, col) {
  for (let i = 1; i < pts.length; i++) {
    segment(c, pts[i - 1].x, pts[i - 1].y, pts[i].x, pts[i].y, width, col);
  }
}

// -------------------------------------------------------------- board maker

/** A dot must not touch a wire: a bead sitting on a line reads as an ending. */
const MIN_PATH_CLEARANCE = 10;
/** Below this the board is a diagram, not a tangle, and tracing is free. */
const MIN_CROSSINGS = 6;
/** Two crossings closer than this read as one confusing knot. */
const MIN_CROSSING_GAP = 18;

const rnd = () => randomBytes(4).readUInt32BE(0) / 0x100000000;
const between = (lo, hi) => lo + rnd() * (hi - lo);
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];

/** Catmull-Rom through the control points: smooth, and it passes through
 *  every point given, so the wire visibly starts and ends on its dots. */
function spline(points, perSegment) {
  const p = [points[0], ...points, points[points.length - 1]];
  const out = [];
  for (let i = 0; i < p.length - 3; i++) {
    const [a, b, cc, d] = [p[i], p[i + 1], p[i + 2], p[i + 3]];
    for (let s = 0; s < perSegment; s++) {
      const t = s / perSegment;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push({
        x:
          0.5 *
          (2 * b.x +
            (-a.x + cc.x) * t +
            (2 * a.x - 5 * b.x + 4 * cc.x - d.x) * t2 +
            (-a.x + 3 * b.x - 3 * cc.x + d.x) * t3),
        y:
          0.5 *
          (2 * b.y +
            (-a.y + cc.y) * t +
            (2 * a.y - 5 * b.y + 4 * cc.y - d.y) * t2 +
            (-a.y + 3 * b.y - 3 * cc.y + d.y) * t3),
      });
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

const inBounds = (p) => ({
  x: Math.max(MARGIN, Math.min(BOARD.w - MARGIN, p.x)),
  y: Math.max(MARGIN, Math.min(BOARD.h - MARGIN, p.y)),
});

/**
 * A sweeping S from a to b.
 *
 * Waypoints advance monotonically along the straight line and are pushed
 * alternately to either side of it. The alternation is what makes wires cross
 * each other rather than run in parallel; the monotonic advance is what stops
 * a wire doubling back on itself. Hairpins were the first thing tried and they
 * are hard for a person to follow, which defeats the point — the difficulty
 * has to come from other wires, not from this one being a maze on its own.
 */
function wirePath(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const side = rnd() < 0.5 ? 1 : -1;
  const control = [a];
  const swing = [1, -1, 1];
  for (let i = 0; i < 3; i++) {
    const t = 0.25 * (i + 1);
    const off = side * swing[i] * between(30, 72);
    control.push(inBounds({ x: a.x + dx * t + nx * off, y: a.y + dy * t + ny * off }));
  }
  control.push(b);
  return spline(control, 24);
}

const dist = (p, q) => Math.hypot(p.x - q.x, p.y - q.y);

function distToPath(p, path) {
  let best = Infinity;
  for (const q of path) {
    const d = dist(p, q);
    if (d < best) best = d;
  }
  return best;
}

/** Standard orientation test. Used only to confirm the board really is a
 *  tangle before it is served — an untangled board is a free pass. */
function crosses(p1, p2, p3, p4) {
  const o = (a, b, c) => Math.sign((b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y));
  return o(p1, p2, p3) !== o(p1, p2, p4) && o(p3, p4, p1) !== o(p3, p4, p2);
}

/**
 * Where the wires cross, not just how often.
 *
 * The count decides whether the board is a tangle at all. The positions decide
 * whether it is a *fair* tangle: three lines meeting in one small patch is
 * ambiguous to a person as well as to a machine, and difficulty that comes
 * from bad drawing rather than from tracing is just an unfair form field.
 */
function crossingPoints(wires) {
  const points = [];
  for (let i = 0; i < wires.length; i++) {
    for (let j = i + 1; j < wires.length; j++) {
      const a = wires[i].path;
      const b = wires[j].path;
      for (let s = 1; s < a.length; s++) {
        for (let t = 1; t < b.length; t++) {
          if (crosses(a[s - 1], a[s], b[t - 1], b[t])) {
            points.push({ x: (a[s].x + b[t].x) / 2, y: (a[s].y + b[t].y) / 2 });
          }
        }
      }
    }
  }
  return points;
}

function scatterPoint(existing, gap, paths, clearance) {
  for (let i = 0; i < 500; i++) {
    const p = { x: between(MARGIN, BOARD.w - MARGIN), y: between(MARGIN, BOARD.h - MARGIN) };
    if (!existing.every((o) => dist(o, p) >= gap)) continue;
    if (paths && !paths.every((path) => distToPath(p, path) >= clearance)) continue;
    return p;
  }
  return null;
}

/** One attempt at a layout. Returns null if the geometry did not come out. */
function layout() {
  const dots = [];
  const wires = [];
  for (let i = 0; i < WIRE_COUNT; i++) {
    const a = scatterPoint(dots, MIN_DOT_GAP);
    if (!a) return null;
    let b = null;
    for (let attempt = 0; attempt < 80; attempt++) {
      const candidate = scatterPoint([...dots, a], MIN_DOT_GAP);
      if (candidate && dist(candidate, a) >= MIN_TRAVEL) {
        b = candidate;
        break;
      }
    }
    if (!b) return null;
    dots.push(a, b);
    wires.push({ a, b, path: wirePath(a, b) });
  }
  const xs = crossingPoints(wires);
  if (xs.length < MIN_CROSSINGS) return null;
  for (let i = 0; i < xs.length; i++) {
    for (let j = i + 1; j < xs.length; j++) {
      if (dist(xs[i], xs[j]) < MIN_CROSSING_GAP) return null;
    }
  }

  // Decoys come last, once every wire exists, so none of them can land on a
  // line. They are spaced exactly like the real endings, which is what keeps
  // the endings from being a shortlist someone can read off the picture.
  const paths = wires.map((w) => w.path);
  for (let i = 0; i < DECOY_DOTS; i++) {
    const p = scatterPoint(dots, MIN_DOT_GAP, paths, MIN_PATH_CLEARANCE);
    if (p) dots.push(p);
  }
  return { dots, wires };
}

/**
 * Build one board.
 *
 * Returns the PNG plus the coordinate the client legitimately needs (where the
 * tile starts) and the one it must never receive (where the tile belongs). The
 * caller stores `answer` server-side and sends only `start` and `png`.
 */
export function generateBoard(themeName) {
  const theme = THEMES[themeName] ?? THEMES.light;

  let built = null;
  for (let attempt = 0; attempt < 120 && !built; attempt++) built = layout();
  if (!built) throw new Error("board layout failed");
  const { dots, wires } = built;

  // The visitor's wire, and which end the tile sits on.
  const mine = pick(wires);
  const flip = rnd() < 0.5;
  const start = flip ? mine.b : mine.a;
  const answer = flip ? mine.a : mine.b;

  // Wire order is shuffled so the visitor's line is not reliably the one on
  // top — "follow the unbroken one" would otherwise be a shortcut past the
  // tracing. Dots are drawn last so an ending reads as a cap on its wire.
  const s = BOARD.scale;
  const c = canvas(BOARD.w * s, BOARD.h * s, theme.bg);
  for (const i of wires.map((_, i) => i).sort(() => rnd() - 0.5)) {
    const scaled = wires[i].path.map((p) => ({ x: p.x * s, y: p.y * s }));
    stroke(c, scaled, CASING_W * s, theme.bg); // casing: opens the crossings
    stroke(c, scaled, WIRE_W * s, theme.wire);
  }
  for (const d of dots) disc(c, d.x * s, d.y * s, DOT_R * s, theme.dot);

  return {
    png: encodePng(c.w, c.h, c.buf),
    start: { x: Math.round(start.x), y: Math.round(start.y) },
    answer: { x: Math.round(answer.x), y: Math.round(answer.y) },
    dots: dots.length,
    wires: wires.length,
  };
}

// ------------------------------------------------------------- pass tokens
// Issued once a board is solved and handed to the form. Stateless and signed:
// the contact handler can trust it without a second lookup, and the nonce
// inside is burned on use so one solve cannot post two enquiries.

const b64u = (v) => Buffer.from(v).toString("base64url");

export function newNonce() {
  return randomBytes(16).toString("base64url");
}

export function signPass(secret, nonce, ttlSeconds) {
  const payload = b64u(JSON.stringify({ n: nonce, e: Math.floor(Date.now() / 1000) + ttlSeconds }));
  const mac = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${mac}`;
}

/** @returns {{nonce: string} | null} — null for anything malformed, forged or expired. */
export function verifyPass(secret, token) {
  if (typeof token !== "string" || token.length > 400) return null;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;
  const payload = token.slice(0, dot);
  const mac = Buffer.from(token.slice(dot + 1));
  const expected = Buffer.from(createHmac("sha256", secret).update(payload).digest("base64url"));
  if (mac.length !== expected.length || !timingSafeEqual(mac, expected)) return null;
  let parsed;
  try {
    parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (typeof parsed?.n !== "string" || typeof parsed?.e !== "number") return null;
  if (parsed.e < Math.floor(Date.now() / 1000)) return null;
  return { nonce: parsed.n };
}
