"use client";

import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
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
  "founding-partner": "Founding Institutional Partnership",
};

const roleOptions = [
  "Trustee / Director",
  "Principal / Head of School",
  "Administrator / Registrar",
  "Finance / Accounts",
  "IT / Systems",
  "Other",
] as const;

const campusCountOptions = ["1 campus", "2–5 campuses", "6–15 campuses", "15+ campuses"] as const;

const primaryPainOptions = [
  "Fragmented reporting across systems",
  "Fee collection and reconciliation",
  "Admissions pipeline visibility",
  "Parent communication overload",
  "Compliance and audit readiness",
  "Multi-campus control",
  "Other",
] as const;

const inputClassName =
  "h-12 w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 text-sm text-[color:var(--foreground)] outline-none transition-colors placeholder:text-[color:var(--muted-foreground)] focus:border-[color:var(--line-strong)]";

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

function buildEmailDraft(state: DemoFormState) {
  const subject = `${state.enquiryType} — ${state.institution || state.name}`;
  const body = [
    `Enquiry type: ${state.enquiryType}`,
    `Name: ${state.name}`,
    `Email: ${state.email}`,
    `Phone: ${state.phone}`,
    `Role: ${state.role}`,
    `Institution / group: ${state.institution}`,
    `Campuses: ${state.campusCount}`,
    state.currentSystem && `Current system: ${state.currentSystem}`,
    state.primaryPain && `Primary pain point: ${state.primaryPain}`,
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
      const { website: _honeypot, ...payload } = state;
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // The intent also rides along in `source`, which the intake function
        // has always stored, so a founding-partner enquiry is distinguishable
        // even before the handler's field allowlist is redeployed.
        body: JSON.stringify({ ...payload, source: sourceTag(state.enquiryType) }),
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
            className={inputClassName}
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
              className={inputClassName}
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
              className={inputClassName}
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
              Current system
            </label>
            <input
              id="demo-current-system"
              name="currentSystem"
              autoComplete="off"
              className={inputClassName}
              placeholder="ERP name, spreadsheets, or mixed"
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
              className={inputClassName}
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
            className="w-full rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition-colors placeholder:text-[color:var(--muted-foreground)] focus:border-[color:var(--line-strong)]"
            placeholder="Context on your current stack, timelines, or what the demo should focus on."
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

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            aria-live="polite"
            className="max-w-md text-sm leading-6 text-[color:var(--muted-foreground)]"
          >
            {status === "success"
              ? "Request received. We reply within one business day."
              : status === "draft"
                ? "Email draft opened — send it from your mail app to complete the request."
                : status === "error"
                  ? `Submission failed. Email us at ${CONTACT_EMAIL} and we will pick it up.`
                  : EMAIL_DRAFT_MODE
                    ? `Submitting opens a pre-filled email draft to ${CONTACT_EMAIL} in your mail app — nothing is sent until you hit send.`
                    : "We reply with a guided walkthrough plan and the right stakeholders to bring into the evaluation."}
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[color:var(--foreground)] px-5 text-sm font-medium text-[color:var(--background)] transition-opacity hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting"
              ? "Submitting..."
              : EMAIL_DRAFT_MODE
                ? "Request Demo via Email"
                : "Request Demo"}
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
