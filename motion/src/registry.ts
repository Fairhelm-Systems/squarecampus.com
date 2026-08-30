import type React from "react";
import {
  EvidenceLedRollout,
  rolloutDuration,
  type RolloutVariant,
} from "./compositions/EvidenceLedRollout";
import {
  GovernedQuestionPath,
  governedQuestionPathDuration,
} from "./compositions/GovernedQuestionPath";
import {
  oneCoreDuration,
  OneCoreManySurfaces,
  type SurfacesVariant,
} from "./compositions/OneCoreManySurfaces";
import {
  operatingSignalDuration,
  OperatingSignalToAction,
} from "./compositions/OperatingSignalToAction";
import type { ThemeName } from "./theme";

/**
 * The single list the Studio, the render script and the website manifest all
 * read. Adding a composition here is the only step needed to make it
 * renderable; nothing downstream keeps its own copy of this table.
 *
 * `tier` follows the motion priority matrix:
 *  - tier 1 ships a video *and* a poster.
 *  - tier 2 ships the poster only, and stays that way until tier 1 has cleared
 *    its performance and human-review gates.
 */
export type MotionEntry = {
  /** Stable key used by the website manifest. */
  id: string;
  family: string;
  tier: 1 | 2;
  /** Frame held as the poster — always the composition's meaningful end state. */
  posterFrame: number;
  durationInFrames: number;
  // biome-ignore lint/suspicious/noExplicitAny: each entry carries its own props shape
  component: React.FC<any>;
  // biome-ignore lint/suspicious/noExplicitAny: see above
  props: (theme: ThemeName) => any;
  /** Accessible description; becomes the aria-label / caption on the site. */
  description: string;
};

const rollout = (variant: RolloutVariant, id: string, tier: 1 | 2, description: string) => ({
  id,
  family: "EvidenceLedRollout",
  tier,
  posterFrame: rolloutDuration(variant) - 1,
  durationInFrames: rolloutDuration(variant),
  component: EvidenceLedRollout,
  props: (theme: ThemeName) => ({ theme, variant }),
  description,
});

const surfaces = (variant: SurfacesVariant, id: string, tier: 1 | 2, description: string) => ({
  id,
  family: "OneCoreManySurfaces",
  tier,
  posterFrame: oneCoreDuration - 1,
  durationInFrames: oneCoreDuration,
  component: OneCoreManySurfaces,
  props: (theme: ThemeName) => ({ theme, variant }),
  description,
});

export const MOTION_ENTRIES: MotionEntry[] = [
  rollout(
    "founding",
    "founding-partner-path",
    1,
    "Four stages of the Founding Institutional Partner pilot: one bottleneck is chosen, a baseline is written down, the current system and SquareCampus run in parallel for 60 to 90 days, and the institution converts, extends or stops against the agreed measure."
  ),
  rollout(
    "rollout",
    "rollout-path",
    1,
    "The six-stage SquareCampus rollout: blueprint, migration clinic, role-based training, parallel validation, staged go-live, and adoption follow-through after handover."
  ),
  {
    id: "governed-question-path",
    family: "GovernedQuestionPath",
    tier: 1,
    posterFrame: governedQuestionPathDuration - 1,
    durationInFrames: governedQuestionPathDuration,
    component: GovernedQuestionPath,
    props: (theme: ThemeName) => ({ theme }),
    description:
      "A leadership question passes through the tenant boundary and the asker's role before any answer is composed. Records outside that scope are refused rather than summarised, the answer is drawn only from what remains, and the query itself is written to the audit timeline.",
  },
  surfaces(
    "architecture",
    "platform-core-surfaces",
    1,
    "Admissions, academics, finance, communication and operations stop exchanging exports with each other and instead act on one shared identity, data and workflow core, so a change made once is already current everywhere else."
  ),
  surfaces(
    "audience",
    "ecosystem-core-surfaces",
    2,
    "Parents, teachers, principals, finance teams and trustees each work from the same institutional record, seeing the part of it their role owns."
  ),
  {
    id: "operating-signal-to-action",
    family: "OperatingSignalToAction",
    tier: 2,
    posterFrame: operatingSignalDuration - 1,
    durationInFrames: operatingSignalDuration,
    component: OperatingSignalToAction,
    props: (theme: ThemeName) => ({ theme }),
    description:
      "A routine record becomes an exception, the exception is routed to a named owner, the owner acts with a recorded reason, and the action is committed to an append-only audit timeline.",
  },
];

export const THEME_NAMES: ThemeName[] = ["light", "dark"];

/** Studio/render composition id for one entry in one theme. */
export const compositionId = (entry: MotionEntry, theme: ThemeName) => `${entry.id}-${theme}`;
