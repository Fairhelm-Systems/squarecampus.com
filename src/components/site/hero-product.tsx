import { Sparkles } from "lucide-react";
import { LaptopDevice, PhoneDevice } from "./device-frames";
import { HeroWorkflowScreen } from "./hero-workflow-screen";
import { SyntheticDataNote } from "./synthetic-data-note";
import { TiltStage } from "./tilt-stage";

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
 *  - The laptop frame appears only at `lg` (`collapsible`). Below that it
 *    costs a quarter of the width to aluminium, which is what made the
 *    dashboard illegible on phones — so small screens get the screen in a
 *    plain rounded frame at full width instead.
 *  - The student phone is a supporting layer at `xl` only. It never sits
 *    beside the command centre on a narrow screen.
 *  - One inline SVG renders the screen at every breakpoint; only the frame
 *    around it changes. Being inline is what lets the site's light/dark
 *    toggle reach inside it — an <img> is an isolated document and cannot
 *    see `data-theme` on the host <html>.
 *  - The frames are CSS (device-frames.tsx): no bezel image is requested at
 *    any breakpoint, and the aluminium follows the theme.
 */

export function HeroProductComposition() {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="eyebrow">Admin &amp; trust command centre</p>
      </div>

      {/* The screen is 16:10 at every breakpoint. Below lg the box is the
          screen; at lg the aluminium is drawn around it. TiltStage is a
          client island that only adds a pointer listener — the SVG itself is
          still server-rendered markup, so LCP is unaffected. */}
      <TiltStage className="device-stage">
        <LaptopDevice collapsible shine>
          <HeroWorkflowScreen className="h-full w-full" />
        </LaptopDevice>
      </TiltStage>

      {/* Supporting layer: AEGIS always, student phone only when there is
          genuinely room for it without shrinking either one. */}
      <div className="mt-6 flex items-stretch gap-4 lg:mt-8">
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
        <div className="relative hidden w-[8.5rem] shrink-0 overflow-hidden xl:block">
          {/* Absolutely placed so the phone's own height never stretches the
              row: the wrapper takes the AEGIS panel's height and crops. */}
          <PhoneDevice className="absolute inset-x-0 top-2">
            {/* A CSS background: it is a supporting surface that only ever
                appears at xl, and an <img> here would be downloaded by every
                phone regardless. */}
            <div
              role="img"
              aria-label="SquareCampus student app showing the day's timetable and assignments due soon"
              className="hero-phone-screen h-full w-full"
            />
          </PhoneDevice>
        </div>
      </div>

      <SyntheticDataNote className="mt-4" />
    </div>
  );
}
