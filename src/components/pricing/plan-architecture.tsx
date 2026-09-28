import { Check, KeyRound } from "lucide-react";
import { RetentionPointer } from "@/components/pricing/retention-pointer";
import { ButtonLink } from "@/components/site/button-link";
import { OperationalBadge } from "@/components/site/marketing";
import { plans } from "@/content/pricing";
import { cn } from "@/lib/utils";

/**
 * Ascending capability architecture.
 *
 * Not three interchangeable cards: the plans are horizontal bands that gain
 * visual weight as they gain institutional depth — quiet surface, then a
 * raised panel, then a strong panel with a brand rail. The depth meter states
 * its own value in text, so the progression is never colour-only.
 */

const bandTone = ["surface-quiet", "surface-panel", "surface-panel-strong"] as const;
const railTone = [
  "bg-[color:var(--line-strong)]",
  "bg-[color:var(--brand)]/55",
  "bg-[color:var(--brand)]",
] as const;

function DepthMeter({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-2">
      <span aria-hidden className="flex items-center gap-1">
        {[0, 1, 2].map((segment) => (
          <span
            key={segment}
            className={cn(
              "h-1.5 w-5 rounded-full",
              segment < level
                ? "bg-[color:var(--brand)]"
                : "bg-[color:var(--line-strong)] opacity-60"
            )}
          />
        ))}
      </span>
      <span className="type-caption">Depth {level} of 3</span>
    </div>
  );
}

export function PlanArchitecture() {
  return (
    <div className="space-y-4 sm:space-y-5">
      {plans.map((plan, index) => (
        <article
          key={plan.id}
          id={`plan-${plan.id}`}
          className={cn(
            "relative overflow-hidden rounded-[var(--radius-panel-lg)] p-6 sm:p-8 lg:p-9",
            bandTone[index]
          )}
        >
          <span aria-hidden className={cn("absolute inset-y-0 left-0 w-1", railTone[index])} />

          <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:gap-12">
            <div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <span className="type-caption text-[color:var(--brand)]">{plan.step}</span>
                <h3 className="font-display text-2xl tracking-[-0.045em] sm:text-3xl">
                  {plan.name}
                </h3>
                {plan.badge ? <OperationalBadge tone="brand">{plan.badge}</OperationalBadge> : null}
              </div>

              <p className="type-body mt-4 max-w-lg text-[color:var(--foreground)]">
                {plan.positioning}
              </p>

              <div className="mt-6">
                <DepthMeter level={index + 1} />
              </div>

              <div className="mt-6 rounded-[var(--radius-chip)] border border-[color:var(--line)] bg-[color:var(--surface-muted)] px-4 py-4">
                <p className="eyebrow">The problem it solves</p>
                <p className="type-support mt-2 text-[color:var(--muted-foreground)]">
                  {plan.problem}
                </p>
              </div>

              <div className="mt-6">
                <p className="eyebrow">Best suited for</p>
                <ul className="mt-3 space-y-2">
                  {plan.bestFor.map((item) => (
                    <li key={item} className="type-support flex gap-2.5">
                      <span
                        aria-hidden
                        className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-[color:var(--brand)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deployment lives with the "who is this for" column: it is a
                  fact about the institution's context, and it keeps the two
                  columns from drifting badly out of balance. */}
              <div className="mt-6 border-t border-[color:var(--line)] pt-5">
                <p className="eyebrow">Deployment posture</p>
                <p className="type-support mt-2">{plan.deployment}</p>
                <RetentionPointer className="mt-4" />
              </div>
            </div>

            <div className="flex flex-col">
              <p className="eyebrow">Capability themes</p>
              <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {plan.capabilities.map((capability) => (
                  <li key={capability} className="type-support flex gap-2.5">
                    <Check
                      aria-hidden
                      className="mt-1 size-3.5 shrink-0 text-[color:var(--brand)]"
                    />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>

              {plan.spotlight ? (
                <div className="mt-6 rounded-[var(--radius-chip)] border border-[color:var(--line-strong)] bg-[color:var(--brand-tint)] px-5 py-5">
                  <div className="flex items-center gap-2.5">
                    <KeyRound aria-hidden className="size-4 text-[color:var(--brand)]" />
                    <h4 className="text-sm font-medium text-[color:var(--foreground)]">
                      {plan.spotlight.title}
                    </h4>
                  </div>
                  <p className="type-support mt-3">{plan.spotlight.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {plan.spotlight.labels.map((label) => (
                      <li key={label}>
                        <span className="inline-flex rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[color:var(--muted-foreground)]">
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="type-support mt-4">{plan.spotlight.note}</p>
                </div>
              ) : null}

              <div className="mt-6 lg:mt-auto lg:pt-6">
                <ButtonLink
                  href={plan.cta.href}
                  label={plan.cta.label}
                  variant={index === 2 ? "cta" : "secondary"}
                  className="w-full justify-center sm:w-auto"
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
