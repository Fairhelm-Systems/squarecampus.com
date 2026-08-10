import { Sparkles } from "lucide-react";
import { HeroWorkflowScreen } from "./hero-workflow-screen";
import { SyntheticDataNote } from "./synthetic-data-note";

/**
 * Homepage hero product composition.
 *
 * Deliberately a Server Component and deliberately in normal document flow —
 * the previous version floated the phone and the AEGIS card with `absolute`,
 * which overlapped the command-centre screenshot between 1024px and 1279px and
 * reserved a large empty band beneath the hero.
 *
 * Composition rules:
 *  - The Admin / Trust Command Centre is always the dominant visual.
 *  - The laptop bezel appears only at `lg`. Below that it costs ~26% of the
 *    width and ~22% of the height to decoration, which is what made the
 *    dashboard illegible on phones — so small screens get the screenshot in a
 *    plain rounded frame at full width instead.
 *  - The student phone is a supporting layer at `xl` only. It never sits
 *    beside the command centre on a narrow screen.
 *  - One inline SVG renders the screen at every breakpoint; only the frame
 *    around it changes. Being inline is what lets the site's light/dark
 *    toggle reach inside it — an <img> is an isolated document and cannot
 *    see `data-theme` on the host <html>.
 */

/** Bezel cutout, measured against /images/devices/macbook-air-figma.webp. */
const SCREEN_INSET =
  "lg:inset-auto lg:top-[8.7%] lg:left-[12.84%] lg:right-[12.96%] lg:bottom-[13.09%]";

export function HeroProductComposition() {
  return (
    <div className="w-full">
      {/* No image preload any more. The screen is now inline SVG, so it is
          part of the document and there is no second round-trip to race —
          which is what the preload existed to hide. */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="eyebrow">Admin &amp; trust command centre</p>
      </div>

      {/* Command centre. Below lg the box takes the screen's own 8:5 ratio and
          the screen fills it; at lg it takes the laptop's ratio and the screen
          sits inside the bezel cutout. The cutout is itself 8:5 — (3880 ×
          0.742) / (2300 × 0.7821) = 1.600 — so the artboard lands in it with
          no letterboxing and nothing cropped. */}
      <div className="relative aspect-[8/5] w-full lg:aspect-[3880/2300]">
        <div
          className={`absolute inset-0 overflow-hidden rounded-[0.9rem] border border-[color:var(--line-strong)] bg-[color:var(--surface)] shadow-[var(--shadow-2)] lg:rounded-[0.8rem] lg:border-0 lg:shadow-none ${SCREEN_INSET}`}
        >
          <HeroWorkflowScreen className="absolute inset-0 h-full w-full" />
        </div>

        {/* Decoration only, and only where there is room for it. Painted as a
            CSS background (see `.hero-bezel`) so phones never fetch it. */}
        <div
          aria-hidden
          className="hero-bezel pointer-events-none absolute inset-0 z-20 hidden lg:block"
        />
      </div>

      {/* Supporting layer: AEGIS always, student phone only when there is
          genuinely room for it without shrinking either one. */}
      <div className="mt-4 flex items-stretch gap-4">
        <div className="surface-panel flex-1 rounded-[var(--radius-panel)] p-5">
          <div className="flex items-center gap-2">
            <Sparkles aria-hidden className="size-4 shrink-0 text-[color:var(--brand)]" />
            <p className="text-sm font-medium text-[color:var(--foreground)]">
              AEGIS governed intelligence
            </p>
          </div>
          <p className="type-support mt-2">
            Explains what changed, who owns it, and what leadership should review next.
          </p>
        </div>

        {/* A portrait phone shown whole is ~360px tall — taller than the
            command centre itself, which is exactly the inversion this hero had
            before. It is height-matched to the AEGIS panel instead and cropped
            from the top, so it reads as a supporting surface rather than a
            second hero. */}
        <div className="hidden w-[8.5rem] shrink-0 xl:block">
          {/* Also a CSS background: it is a supporting surface that only ever
              appears at xl, and an <img> here would be downloaded by every
              phone regardless. */}
          <div
            role="img"
            aria-label="SquareCampus student app showing the day's timetable and assignments due soon"
            className="hero-phone-screen h-full w-full overflow-hidden rounded-t-[1.1rem] border border-b-0 border-[color:var(--line-strong)] bg-[color:var(--surface)] shadow-[var(--shadow-1)]"
          />
        </div>
      </div>

      <SyntheticDataNote className="mt-4" />
    </div>
  );
}
