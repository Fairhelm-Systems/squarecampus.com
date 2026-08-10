import { Sparkles } from "lucide-react";
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
 *  - One <img> renders the screen at every breakpoint; only the frame
 *    around it changes, so there is no duplicate download.
 */

/** Bezel cutout, measured against /images/devices/macbook-air-figma.webp. */
const SCREEN_INSET =
  "lg:inset-auto lg:top-[8.7%] lg:left-[12.84%] lg:right-[12.96%] lg:bottom-[13.09%]";

export function HeroProductComposition() {
  return (
    <div className="w-full">
      {/* React hoists this to <head>. Without it the LCP image is discovered
          only when the parser reaches it — Lighthouse measured 2.8s of LCP
          "load delay" on throttled mobile. `imageSrcSet`/`imageSizes` must
          mirror the <img> below or the browser preloads the wrong file. */}
      <link
        rel="preload"
        as="image"
        href="/images/screens/laptop/institution-command-center.webp"
        imageSrcSet="/images/screens/laptop/institution-command-center-800.webp 800w, /images/screens/laptop/institution-command-center.webp 1586w"
        imageSizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), (max-width: 1439px) 42vw, 470px"
        fetchPriority="high"
      />
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="eyebrow">Admin &amp; trust command centre</p>
      </div>

      {/* Command centre. Below lg the box takes the screenshot's own 8:5 ratio
          and the screen fills it; at lg it takes the laptop's ratio and the
          screen sits inside the bezel cutout. */}
      <div className="relative aspect-[8/5] w-full lg:aspect-[3880/2300]">
        <div
          className={`absolute inset-0 overflow-hidden rounded-[0.9rem] border border-[color:var(--line-strong)] bg-[color:var(--surface)] shadow-[var(--shadow-2)] lg:rounded-[0.8rem] lg:border-0 lg:shadow-none ${SCREEN_INSET}`}
        >
          {/*
           * A plain <img>, deliberately.
           *
           * `images.unoptimized` is required for the static export, which means
           * next/image cannot build a srcset — it would ship the full 1586w
           * file to a 358px phone slot. Lighthouse mobile measured LCP 6.0s
           * with "properly size images" flagging it. Declaring the srcset by
           * hand lets a phone take the 29 kB/800w file instead of the 90 kB one.
           */}
          {/** biome-ignore lint/performance/noImgElement: static export cannot generate a srcset */}
          <img
            src="/images/screens/laptop/institution-command-center.webp"
            srcSet="/images/screens/laptop/institution-command-center-800.webp 800w, /images/screens/laptop/institution-command-center.webp 1586w"
            sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), (max-width: 1439px) 42vw, 470px"
            width={1586}
            height={992}
            alt="SquareCampus command centre: attendance, fee collection, report publication and escalation figures across campuses, with an exceptions table listing each exception's campus, accountable owner, priority, status and next step"
            className="absolute inset-0 h-full w-full object-cover object-left-top"
            fetchPriority="high"
            decoding="async"
          />
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
