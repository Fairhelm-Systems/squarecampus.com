"use client";

import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import {
  DEMO_INTENT_ATTRIBUTE,
  demoIntents,
  FOUNDING_PARTNER_INTENT,
} from "@/content/demo-intents";
import { ButtonLink } from "./button-link";

type DemoFormState = {
  enquiryType: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  role: string;
  campusCount: string;
  currentSystem: string;
  primaryPain: string;
  message: string;
  consent: boolean;
  website: string;
  // Founding-partner diagnosis fields. Always present in state so the form
  // stays a single controlled shape; stripped from the payload for a generic
  // demo enquiry (see `buildPayload`).
  bottleneck: string;
  executiveSponsor: string;
  pilotUnit: string;
  timeSensitivity: string;
  successMeasure: string;
};

const initialState: DemoFormState = {
  enquiryType: "Guided platform demo",
  name: "",
  email: "",
  phone: "",
  institution: "",
  role: "",
  campusCount: "",
  currentSystem: "",
  primaryPain: "",
  message: "",
  consent: false,
  website: "",
  bottleneck: "",
  executiveSponsor: "",
  pilotUnit: "",
  timeSensitivity: "",
  successMeasure: "",
};

/**
 * Enquiry type. The form has always tagged submissions with a fixed
 * `source: "demo-form"`; this is the visitor-editable version of the same
 * idea, so the Founding Partner CTAs can hand over their intent without a
 * second form or a second backend.
 */
const enquiryTypeOptions = ["Guided platform demo", "Founding Institutional Partnership"] as const;

/**
 * Query-string intents, mapped to the options above. Only these exact keys are
 * honoured and the value used is always one of our own constants — the raw
 * parameter is never rendered, stored or echoed back.
 */
const INTENT_PARAM: Record<string, (typeof enquiryTypeOptions)[number]> = {
  [FOUNDING_PARTNER_INTENT]: "Founding Institutional Partnership",
};

const FOUNDING_PARTNER_ENQUIRY = INTENT_PARAM[FOUNDING_PARTNER_INTENT];

/**
 * Roles. Deliberately one list for both intents rather than a school list and
 * a university list: a Registrar filling this in should not have to notice
 * which variant of the page they landed on. Ordered leadership → academic →
 * function, which is roughly how institutions introduce themselves.
 */
const roleOptions = [
  "Trustee / Director / President",
  "Vice Chancellor / Pro Vice Chancellor",
  "Principal / Head of School",
  "Registrar / Administrator",
  "Dean / Academic Leader",
  "Finance / Accounts",
  "Operations / COO",
  "IT / Systems",
  "Other",
] as const;

const campusCountOptions = ["1 campus", "2–5 campuses", "6–15 campuses", "15+ campuses"] as const;

/**
 * Pain points, written so one list serves a school and a multi-school
 * university group. The exception-shaped options (reconciliation, ownership,
 * approvals) are the ones a founding pilot can actually be scoped around.
 */
const primaryPainOptions = [
  "Payment-to-ERP reconciliation exceptions",
  "Admissions-to-enrolment visibility",
  "Cross-department workflow ownership",
  "Approvals and decision latency",
  "Multi-campus or multi-school governance",
  "Fragmented reporting across systems",
  "Parent and guardian communication overload",
  "Compliance and audit readiness",
  "Other",
] as const;

const timeSensitivityOptions = [
  "Blocking us now",
  "Before the next admissions cycle",
  "This academic year",
  "Exploring, no fixed date",
] as const;

const inputClassName =
  "h-12 w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 text-sm text-[color:var(--foreground)] outline-none transition-colors placeholder:text-[color:var(--muted-foreground)] focus:border-[color:var(--line-strong)]";

// Selects add `.select-field` (globals.css), which swaps the UA chevron for
// one inset to the same 1rem as the field's text. Without it the native arrow
// sits against the edge of the pill, out of line with the inputs beside it.
const selectClassName = `${inputClassName} select-field`;

const textareaClassName =
  "w-full rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition-colors placeholder:text-[color:var(--muted-foreground)] focus:border-[color:var(--line-strong)]";

const labelClassName =
  "mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-[color:var(--muted-foreground)]";

// Static export: the site has no server of its own, so the form posts to an
// external intake endpoint configured at build time via
// NEXT_PUBLIC_CONTACT_ENDPOINT. Production builds fail without it (see
// next.config.ts) — there is deliberately no silent mailto fallback. The one
// sanctioned interim state is NEXT_PUBLIC_CONTACT_FORM_MODE=email: the form
// visibly tells the visitor that submitting opens a pre-filled email draft.
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
const EMAIL_DRAFT_MODE = !CONTACT_ENDPOINT && process.env.NEXT_PUBLIC_CONTACT_FORM_MODE === "email";
const CONTACT_EMAIL = "contact@squarecampus.com";

/** Founding-partner answers, in the order the reader was asked for them. */
const foundingPartnerFields = [
  ["bottleneck", "Operational bottleneck"],
  ["pilotUnit", "Intended pilot unit"],
  ["executiveSponsor", "Executive sponsor"],
  ["timeSensitivity", "Time sensitivity"],
  ["successMeasure", "Success measure"],
] as const;

/**
 * The wire payload.
 *
 * A generic demo enquiry sends exactly the fields it always sent: the
 * founding-partner answers are dropped rather than posted as five empty
 * strings, so nothing about the existing intake record changes shape.
 */
function buildPayload(state: DemoFormState) {
  const { website: _honeypot, ...rest } = state;
  if (state.enquiryType === FOUNDING_PARTNER_ENQUIRY) {
    return rest;
  }
  const generic = { ...rest };
  for (const [key] of foundingPartnerFields) {
    delete (generic as Partial<DemoFormState>)[key];
  }
  return generic;
}

function buildEmailDraft(state: DemoFormState) {
  const subject = `${state.enquiryType} — ${state.institution || state.name}`;
  const founding =
    state.enquiryType === FOUNDING_PARTNER_ENQUIRY
      ? foundingPartnerFields.map(([key, label]) => state[key] && `${label}: ${state[key]}`)
      : [];
  const body = [
    `Enquiry type: ${state.enquiryType}`,
    `Name: ${state.name}`,
    `Email: ${state.email}`,
    `Phone: ${state.phone}`,
    `Role: ${state.role}`,
    `Institution / group: ${state.institution}`,
    `Campuses: ${state.campusCount}`,
    state.currentSystem && `Current process / systems: ${state.currentSystem}`,
    state.primaryPain && `Primary pain point: ${state.primaryPain}`,
    ...founding,
    "",
    state.message,
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Stable machine tag for the intake record. */
function sourceTag(enquiryType: string) {
  const intent = Object.entries(INTENT_PARAM).find(([, label]) => label === enquiryType)?.[0];
  return intent ? `demo-form:${intent}` : "demo-form";
}

type SubmitStatus = "idle" | "submitting" | "success" | "error" | "draft";

export function ContactForm() {
  const [state, setState] = useState(initialState);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const mountedRef = useRef(true);
  const isFoundingPartner = state.enquiryType === FOUNDING_PARTNER_ENQUIRY;

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // /demo/?intent=founding-partner preselects the founding-partner enquiry
  // type. It stays a normal select the visitor can change; an unrecognised
  // value simply leaves the default in place.
  useEffect(() => {
    const intent = new URLSearchParams(window.location.search).get("intent");
    const mapped = intent ? INTENT_PARAM[intent] : undefined;
    if (mapped) {
      setState((current) => ({ ...current, enquiryType: mapped }));
    }
  }, []);

  /*
    Keep the page copy and the select in agreement, in both directions.

    On a hard load the inline script in demo-intents.ts has already set this
    attribute before paint; this effect is then a no-op. It earns its keep on a
    client-side navigation (where no inline script re-runs) and when a visitor
    changes the enquiry type by hand — the surrounding copy follows the select
    rather than contradicting it. The attribute is cleared on unmount so it
    cannot leak into another route.
  */
  useEffect(() => {
    const root = document.documentElement;
    if (isFoundingPartner) {
      root.setAttribute(DEMO_INTENT_ATTRIBUTE, FOUNDING_PARTNER_INTENT);
    } else {
      root.removeAttribute(DEMO_INTENT_ATTRIBUTE);
    }
    return () => root.removeAttribute(DEMO_INTENT_ATTRIBUTE);
  }, [isFoundingPartner]);

  const set = <K extends keyof DemoFormState>(key: K, value: DemoFormState[K]) =>
    setState((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Honeypot: bots fill the hidden field, humans never see it.
    if (state.website) {
      setStatus("success");
      toast.success("Your request has been sent.");
      setState(initialState);
      return;
    }

    if (EMAIL_DRAFT_MODE) {
      // Explicit interim mode: the UI already tells the visitor that
      // submitting opens a pre-filled email draft.
      window.location.href = buildEmailDraft(state);
      setStatus("draft");
      toast.success("Email draft opened — send it from your mail app to complete the request.");
      return;
    }

    if (!CONTACT_ENDPOINT) {
      // Dev-only path: production builds cannot reach here (build fails
      // without an endpoint or the explicit email mode). Surface loudly.
      setStatus("error");
      toast.error(
        `Form endpoint is not configured (NEXT_PUBLIC_CONTACT_ENDPOINT). Email us at ${CONTACT_EMAIL}.`
      );
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // The intent also rides along in `source`, which the intake function
        // has always stored, so a founding-partner enquiry is distinguishable
        // even before the handler's field allowlist is redeployed.
        body: JSON.stringify({ ...buildPayload(state), source: sourceTag(state.enquiryType) }),
      });

      if (!response.ok) {
        if (mountedRef.current) setStatus("error");
        if (response.status === 429) {
          toast.error("Too many requests from this connection. Please try again in an hour.");
        } else {
          toast.error(`Unable to submit right now. You can email us at ${CONTACT_EMAIL}.`);
        }
        return;
      }

      toast.success("Your request has been sent. We reply within one business day.");
      if (mountedRef.current) {
        setStatus("success");
        setState(initialState);
      }
    } catch (error) {
      console.error(error);
      if (mountedRef.current) setStatus("error");
      toast.error(`Unable to submit right now. You can email us at ${CONTACT_EMAIL}.`);
    }
  };

  return (
    <>
      {/* Toaster lives with the form (the only surface that fires toasts), so
          sonner ships on /demo instead of every page in the root layout. */}
      <Toaster position="top-right" richColors />
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label htmlFor="demo-enquiry-type" className={labelClassName}>
            What is this about? *
          </label>
          <select
            id="demo-enquiry-type"
            name="enquiryType"
            required
            className={selectClassName}
            value={state.enquiryType}
            onChange={(event) => set("enquiryType", event.target.value)}
          >
            {enquiryTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="demo-name" className={labelClassName}>
              Your name *
            </label>
            <input
              id="demo-name"
              name="name"
              required
              autoComplete="name"
              className={inputClassName}
              placeholder="Full name"
              value={state.name}
              onChange={(event) => set("name", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="demo-email" className={labelClassName}>
              Work email *
            </label>
            <input
              id="demo-email"
              name="email"
              required
              type="email"
              autoComplete="email"
              className={inputClassName}
              placeholder="you@institution.edu.in"
              value={state.email}
              onChange={(event) => set("email", event.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="demo-phone" className={labelClassName}>
              Phone *
            </label>
            <input
              id="demo-phone"
              name="phone"
              required
              type="tel"
              autoComplete="tel"
              className={inputClassName}
              placeholder="+91"
              value={state.phone}
              onChange={(event) => set("phone", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="demo-role" className={labelClassName}>
              Your role *
            </label>
            <select
              id="demo-role"
              name="role"
              required
              autoComplete="organization-title"
              className={selectClassName}
              value={state.role}
              onChange={(event) => set("role", event.target.value)}
            >
              <option value="" disabled>
                Select role
              </option>
              {roleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="demo-institution" className={labelClassName}>
              Institution / group name *
            </label>
            <input
              id="demo-institution"
              name="institution"
              required
              autoComplete="organization"
              className={inputClassName}
              placeholder="Institution or group name"
              value={state.institution}
              onChange={(event) => set("institution", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="demo-campuses" className={labelClassName}>
              Number of campuses *
            </label>
            <select
              id="demo-campuses"
              name="campusCount"
              required
              className={selectClassName}
              value={state.campusCount}
              onChange={(event) => set("campusCount", event.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              {campusCountOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="demo-current-system" className={labelClassName}>
              Current process and systems
            </label>
            <input
              id="demo-current-system"
              name="currentSystem"
              autoComplete="off"
              className={inputClassName}
              placeholder="ERP, LMS, payment portal, spreadsheets, or mixed"
              value={state.currentSystem}
              onChange={(event) => set("currentSystem", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="demo-pain" className={labelClassName}>
              Primary pain point
            </label>
            <select
              id="demo-pain"
              name="primaryPain"
              className={selectClassName}
              value={state.primaryPain}
              onChange={(event) => set("primaryPain", event.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              {primaryPainOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/*
          Founding-partner diagnosis questions.

          Every field here is optional, deliberately: the block is hidden with
          CSS for a generic demo enquiry, and a `required` control that is
          `display: none` makes the browser refuse to submit a form it cannot
          scroll the visitor to. Optional keeps the generic path byte-identical
          to what it was.
        */}
        <div data-when-intent="founding-partner" className="grid gap-4">
          <div className="rounded-[1.35rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)] px-4 py-3 text-sm leading-6 text-[color:var(--muted-foreground)]">
            The diagnosis is only as good as the bottleneck. Anything you can answer below makes the
            first conversation shorter and more concrete.
          </div>

          <div>
            <label htmlFor="demo-bottleneck" className={labelClassName}>
              The operational bottleneck
            </label>
            <textarea
              id="demo-bottleneck"
              name="bottleneck"
              rows={3}
              className={textareaClassName}
              placeholder="Where visibility arrives late, ownership becomes unclear, or staff rebuild the same truth by hand."
              value={state.bottleneck}
              onChange={(event) => set("bottleneck", event.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="demo-pilot-unit" className={labelClassName}>
                Intended pilot unit
              </label>
              <input
                id="demo-pilot-unit"
                name="pilotUnit"
                autoComplete="off"
                className={inputClassName}
                placeholder="One campus, school, department or workflow"
                value={state.pilotUnit}
                onChange={(event) => set("pilotUnit", event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="demo-sponsor" className={labelClassName}>
                Accountable executive sponsor
              </label>
              <input
                id="demo-sponsor"
                name="executiveSponsor"
                autoComplete="off"
                className={inputClassName}
                placeholder="Name and role, or 'to be confirmed'"
                value={state.executiveSponsor}
                onChange={(event) => set("executiveSponsor", event.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="demo-time-sensitivity" className={labelClassName}>
                Time sensitivity
              </label>
              <select
                id="demo-time-sensitivity"
                name="timeSensitivity"
                className={selectClassName}
                value={state.timeSensitivity}
                onChange={(event) => set("timeSensitivity", event.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                {timeSensitivityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="demo-success-measure" className={labelClassName}>
                What would count as success
              </label>
              <input
                id="demo-success-measure"
                name="successMeasure"
                autoComplete="off"
                className={inputClassName}
                placeholder="One measure you would judge the pilot on"
                value={state.successMeasure}
                onChange={(event) => set("successMeasure", event.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Honeypot field — visually hidden and skipped by keyboard users. */}
        <input
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          placeholder="Website"
          value={state.website}
          onChange={(event) => set("website", event.target.value)}
        />

        <div>
          <label htmlFor="demo-message" className={labelClassName}>
            Anything else we should know?
          </label>
          <textarea
            id="demo-message"
            name="message"
            rows={4}
            className={textareaClassName}
            placeholder="Context on your current stack, timelines, or what the conversation should focus on."
            value={state.message}
            onChange={(event) => set("message", event.target.value)}
          />
        </div>

        <label className="flex items-start gap-3 text-sm leading-6 text-[color:var(--muted-foreground)]">
          <input
            type="checkbox"
            name="consent"
            required
            checked={state.consent}
            onChange={(event) => set("consent", event.target.checked)}
            className="mt-1 size-4 shrink-0 accent-[color:var(--brand)]"
          />
          <span>
            I agree that SquareCampus may contact me about this request and process the details
            above as described in the{" "}
            <a
              href="/privacy-policy/"
              className="underline underline-offset-2 hover:text-[color:var(--foreground)]"
            >
              privacy policy
            </a>
            . *
          </span>
        </label>

        {/*
          The idle note and the submit label are the two pieces of form copy the
          intent changes, so they follow the same CSS-gated route as the page
          around them rather than a React branch. A branch here would be correct
          only after hydration, which is exactly the flash the rest of the page
          avoids — and these two sit right next to copy that never flashes.
          Every other status message is intent-independent.
        */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            aria-live="polite"
            className="max-w-md text-sm leading-6 text-[color:var(--muted-foreground)]"
          >
            {status === "success" ? (
              "Request received. We reply within one business day."
            ) : status === "draft" ? (
              "Email draft opened — send it from your mail app to complete the request."
            ) : status === "error" ? (
              `Submission failed. Email us at ${CONTACT_EMAIL} and we will pick it up.`
            ) : EMAIL_DRAFT_MODE ? (
              `Submitting opens a pre-filled email draft to ${CONTACT_EMAIL} in your mail app — nothing is sent until you hit send.`
            ) : (
              <>
                <span data-when-intent="demo">{demoIntents.demo.form.idleNote}</span>
                <span data-when-intent="founding-partner">
                  {demoIntents["founding-partner"].form.idleNote}
                </span>
              </>
            )}
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[color:var(--foreground)] px-5 text-center text-sm font-medium text-[color:var(--background)] transition-opacity hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? (
              "Submitting..."
            ) : (
              <>
                <span data-when-intent="demo">
                  {EMAIL_DRAFT_MODE
                    ? demoIntents.demo.form.emailSubmitLabel
                    : demoIntents.demo.form.submitLabel}
                </span>
                <span data-when-intent="founding-partner">
                  {EMAIL_DRAFT_MODE
                    ? demoIntents["founding-partner"].form.emailSubmitLabel
                    : demoIntents["founding-partner"].form.submitLabel}
                </span>
              </>
            )}
          </button>
        </div>
        <div className="text-sm text-[color:var(--muted-foreground)]">
          Need a direct line instead?{" "}
          <ButtonLink
            href={`mailto:${CONTACT_EMAIL}`}
            label="Email the team"
            variant="ghost"
            className="min-h-0 border-none px-0 py-0 align-baseline"
          />
        </div>
      </form>
    </>
  );
}
