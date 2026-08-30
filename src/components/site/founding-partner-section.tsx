import { ButtonLink } from "@/components/site/button-link";
import { CTAGroup, Eyebrow, TrustNote } from "@/components/site/marketing";
import { MotionPoster } from "@/components/site/motion-poster";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { FOUNDING_PARTNER_DEMO_HREF, foundingPartners } from "@/content/founding-partners";
import { motionAssets } from "@/content/motion-assets";

const { home } = foundingPartners;

/**
 * Homepage Founding Institutional Partner section.
 *
 * Sits between "Rollout & trust" and the final "Next move" CTA: by that point
 * the reader has the problem, the product posture, the trust model and the
 * rollout approach, so this converts earned trust into a privileged next step
 * and hands off to the existing final CTA.
 *
 * The visual is the still, not the video. The homepage already carries the
 * command-centre composition and a large HTML payload; the moving version of
 * this composition lives on /launch-partners/, where it is the page's only
 * motion asset. `MotionPoster` ships no JavaScript.
 */
export function FoundingPartnerSection() {
  return (
    // scroll-mt: the header is sticky, so without it the section heading lands
    // underneath the header when someone follows /#founding-partners.
    <SectionShell
      id="founding-partners"
      className="scroll-mt-24"
      eyebrow={home.eyebrow}
      title={home.heading}
      body={home.lead}
    >
      <Reveal staggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {home.benefits.map((benefit) => (
          <article
            key={benefit.number}
            data-reveal-item
            className="surface-panel rounded-[var(--radius-panel)] p-6"
          >
            <p className="eyebrow">{benefit.number}</p>
            <h3 className="type-card-title mt-4">{benefit.title}</h3>
            <p className="type-support mt-3">{benefit.body}</p>
          </article>
        ))}
      </Reveal>

      <Reveal delay={80}>
        <div className="surface-panel-strong mt-4 rounded-[var(--radius-panel-lg)] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
            <div>
              <Eyebrow>{home.qualification.eyebrow}</Eyebrow>
              <h3 className="type-section-title mt-4">{home.qualification.heading}</h3>
              <p className="type-body measure mt-4 text-[color:var(--muted-foreground)]">
                {home.qualification.body}
              </p>
              <CTAGroup className="mt-7">
                <ButtonLink
                  href={foundingPartners.href}
                  label="Explore the partnership"
                  variant="cta"
                  className="w-full justify-center sm:w-auto"
                />
                <ButtonLink
                  href={FOUNDING_PARTNER_DEMO_HREF}
                  label="Start with a diagnosis"
                  variant="secondary"
                  className="w-full justify-center sm:w-auto"
                />
              </CTAGroup>
              <TrustNote className="mt-6">{home.ctaNote}</TrustNote>
            </div>

            {/* Redundant with the four-step path described on /launch-partners/,
                so it carries no alt text here — the copy beside it is the
                authoritative version. */}
            <MotionPoster asset={motionAssets["founding-partner-path"]} alt="" />
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
