/**
 * GENERATED FILE — do not edit by hand.
 *
 * Written by `bun run motion:render` (motion/scripts/render.ts). It is the
 * only thing the website knows about the motion pipeline: filenames, intrinsic
 * dimensions and a text description. No Remotion code is imported here, or
 * anywhere else under src/.
 *
 * Filenames are content-hashed, so `public/motion/*` is safe to serve with a
 * one-year immutable cache.
 */

export type MotionSource = {
  /** Poster is always present: it is the complete fallback. */
  poster: string;
  /** Present for tier-1 assets only. Tier 2 ships the still and no video. */
  mp4?: string;
  webm?: string;
};

export type MotionAsset = {
  id: string;
  family: string;
  tier: 1 | 2;
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  /** Text alternative. The DOM around the figure remains authoritative. */
  description: string;
  light: MotionSource;
  dark: MotionSource;
};

export const motionAssets = {
  "founding-partner-path": {
    id: "founding-partner-path",
    family: "EvidenceLedRollout",
    tier: 1,
    width: 1280,
    height: 720,
    fps: 24,
    durationInFrames: 276,
    description:
      "Four stages of the Founding Institutional Partner pilot: one bottleneck is chosen, a baseline is written down, the current system and SquareCampus run in parallel for 60 to 90 days, and the institution converts, extends or stops against the agreed measure.",
    light: {
      poster: "/motion/founding-partner-path-light.bc9af67e.webp",
      mp4: "/motion/founding-partner-path-light.53299fb2.mp4",
    },
    dark: {
      poster: "/motion/founding-partner-path-dark.97ebfffe.webp",
      mp4: "/motion/founding-partner-path-dark.5297fcf6.mp4",
    },
  },
  "rollout-path": {
    id: "rollout-path",
    family: "EvidenceLedRollout",
    tier: 1,
    width: 1280,
    height: 720,
    fps: 24,
    durationInFrames: 324,
    description:
      "The six-stage SquareCampus rollout: blueprint, migration clinic, role-based training, parallel validation, staged go-live, and adoption follow-through after handover.",
    light: {
      poster: "/motion/rollout-path-light.4f02bdfe.webp",
      mp4: "/motion/rollout-path-light.bbd8ff70.mp4",
    },
    dark: {
      poster: "/motion/rollout-path-dark.f2cf905f.webp",
      mp4: "/motion/rollout-path-dark.30f59ba6.mp4",
    },
  },
  "governed-question-path": {
    id: "governed-question-path",
    family: "GovernedQuestionPath",
    tier: 1,
    width: 1280,
    height: 720,
    fps: 24,
    durationInFrames: 264,
    description:
      "A leadership question passes through the tenant boundary and the asker's role before any answer is composed. Records outside that scope are refused rather than summarised, the answer is drawn only from what remains, and the query itself is written to the audit timeline.",
    light: {
      poster: "/motion/governed-question-path-light.e177f77c.webp",
      mp4: "/motion/governed-question-path-light.d4f72e8b.mp4",
    },
    dark: {
      poster: "/motion/governed-question-path-dark.9563f553.webp",
      mp4: "/motion/governed-question-path-dark.dbdb4a1e.mp4",
    },
  },
  "platform-core-surfaces": {
    id: "platform-core-surfaces",
    family: "OneCoreManySurfaces",
    tier: 1,
    width: 1280,
    height: 720,
    fps: 24,
    durationInFrames: 264,
    description:
      "Admissions, academics, finance, communication and operations stop exchanging exports with each other and instead act on one shared identity, data and workflow core, so a change made once is already current everywhere else.",
    light: {
      poster: "/motion/platform-core-surfaces-light.e92112e0.webp",
      mp4: "/motion/platform-core-surfaces-light.1f18abf2.mp4",
    },
    dark: {
      poster: "/motion/platform-core-surfaces-dark.a6947d69.webp",
      mp4: "/motion/platform-core-surfaces-dark.32316ffa.mp4",
    },
  },
  "ecosystem-core-surfaces": {
    id: "ecosystem-core-surfaces",
    family: "OneCoreManySurfaces",
    tier: 2,
    width: 1280,
    height: 720,
    fps: 24,
    durationInFrames: 264,
    description:
      "Parents, teachers, principals, finance teams and trustees each work from the same institutional record, seeing the part of it their role owns.",
    light: {
      poster: "/motion/ecosystem-core-surfaces-light.6d17cfe4.webp",
    },
    dark: {
      poster: "/motion/ecosystem-core-surfaces-dark.e5bbd5a7.webp",
    },
  },
  "security-audit-screen": {
    id: "security-audit-screen",
    family: "ProductScreen",
    tier: 1,
    width: 1600,
    height: 1000,
    fps: 24,
    durationInFrames: 264,
    description:
      "The SquareCampus audit timeline: a fee concession approved with a recorded reason, an attendance correction made after the cut-off as a logged override, a report export recorded against the person who ran it, and a request for records outside the asker's role refused rather than fulfilled.",
    light: {
      poster: "/motion/security-audit-screen-light.6b47ca51.webp",
      mp4: "/motion/security-audit-screen-light.a55ed67d.mp4",
    },
    dark: {
      poster: "/motion/security-audit-screen-dark.1dfafb92.webp",
      mp4: "/motion/security-audit-screen-dark.a8115efa.mp4",
    },
  },
  "operating-signal-to-action": {
    id: "operating-signal-to-action",
    family: "OperatingSignalToAction",
    tier: 2,
    width: 1280,
    height: 720,
    fps: 24,
    durationInFrames: 252,
    description:
      "A routine record becomes an exception, the exception is routed to a named owner, the owner acts with a recorded reason, and the action is committed to an append-only audit timeline.",
    light: {
      poster: "/motion/operating-signal-to-action-light.4fbbfbc7.webp",
    },
    dark: {
      poster: "/motion/operating-signal-to-action-dark.a30471e9.webp",
    },
  },
} as const satisfies Record<string, MotionAsset>;

export type MotionAssetId = keyof typeof motionAssets;
