/**
 * SquareCampus motion tokens.
 *
 * These are the site's own values, not a second palette invented for video:
 * the hex pairs mirror `src/app/globals.css` and the homepage command-centre
 * SVG, so a rendered composition sits inside a `surface-panel` without looking
 * like a foreign asset.
 *
 * Every composition renders twice — once per theme. Only one file is ever
 * fetched by a visitor: the delivery component picks the variant that matches
 * `document.documentElement.dataset.theme` before it attaches a source.
 */

import { FONT } from "./fonts";

export { FONT };

export type ThemeName = "light" | "dark";

export type MotionTheme = {
  bg: string;
  panel: string;
  panelAlt: string;
  line: string;
  lineStrong: string;
  text: string;
  muted: string;
  dim: string;
  faint: string;
  brand: string;
  brandSoft: string;
  brandLine: string;
  teal: string;
  tealSoft: string;
  amber: string;
  amberSoft: string;
  violet: string;
  gridOpacity: number;
  shadow: string;
};

export const THEMES: Record<ThemeName, MotionTheme> = {
  light: {
    bg: "#F1F5FB",
    panel: "#FFFFFF",
    panelAlt: "#F5F8FE",
    line: "#E3EAF5",
    lineStrong: "#C9D5E8",
    text: "#1B2334",
    muted: "#57647C",
    dim: "#8592A9",
    faint: "#B3BECE",
    brand: "#3F6BC4",
    brandSoft: "#E7EEFB",
    brandLine: "#9FBAEA",
    teal: "#217F6C",
    tealSoft: "#E0F1ED",
    amber: "#A96D14",
    amberSoft: "#FAEFDC",
    violet: "#5F45C0",
    gridOpacity: 0.055,
    shadow: "0 18px 44px rgba(26,44,80,0.10)",
  },
  dark: {
    bg: "#070C15",
    panel: "#111A2B",
    panelAlt: "#0B1220",
    line: "#1B2540",
    lineStrong: "#2B3A5E",
    text: "#EAEEF7",
    muted: "#8595B2",
    dim: "#63718F",
    faint: "#3C4964",
    brand: "#6E9CE8",
    brandSoft: "#16233D",
    brandLine: "#3E63B8",
    teal: "#3FA894",
    tealSoft: "#102A29",
    amber: "#E0A44A",
    amberSoft: "#2A2216",
    violet: "#8B6BE8",
    gridOpacity: 0.07,
    shadow: "0 18px 44px rgba(0,0,0,0.45)",
  },
};

/**
 * Canvas geometry. 1280×720 renders down to roughly 340 px on a phone, a
 * 3.8× reduction — which is the single hardest constraint on these
 * compositions. Anything a viewer must actually read is set at
 * `type.label` (44px → ~11.7px at 340px) or larger. Nothing below
 * `type.meta` is allowed to carry meaning on its own.
 */
export const CANVAS = {
  width: 1280,
  height: 720,
  fps: 24,
  padding: 56,
} as const;

export const type = {
  eyebrow: 26,
  title: 62,
  label: 44,
  body: 34,
  meta: 28,
} as const;


/** Uppercase mono micro-label, the site's `.eyebrow` treatment. */
export const eyebrowStyle = (t: MotionTheme) =>
  ({
    fontFamily: FONT.mono,
    fontSize: type.eyebrow,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: t.dim,
  }) as const;
