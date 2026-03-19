"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ButtonLink } from "./button-link";

type DemoFormState = {
  name: string;
  email: string;
  institution: string;
  role: string;
  students: string;
  message: string;
  website: string;
};

const initialState: DemoFormState = {
  name: "",
  email: "",
  institution: "",
  role: "",
  students: "",
  message: "",
  website: "",
};

const inputClassName =
  "h-12 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 text-sm text-[color:var(--foreground)] outline-none transition-colors placeholder:text-[color:var(--muted-foreground)] focus:border-[color:var(--line-strong)]";

export function ContactForm() {
  const [state, setState] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.message ?? "Unable to submit the form right now.");
        return;
      }

      toast.success(result.message ?? "Your request has been sent.");
      if (mountedRef.current) {
        setState(initialState);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to submit the form right now.");
    } finally {
      if (mountedRef.current) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          className={inputClassName}
          placeholder="Your name"
          value={state.name}
          onChange={(event) => setState((current) => ({ ...current, name: event.target.value }))}
        />
        <input
          required
          type="email"
          className={inputClassName}
          placeholder="Work email"
          value={state.email}
          onChange={(event) => setState((current) => ({ ...current, email: event.target.value }))}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          className={inputClassName}
          placeholder="Institution name"
          value={state.institution}
          onChange={(event) =>
            setState((current) => ({ ...current, institution: event.target.value }))
          }
        />
        <input
          className={inputClassName}
          placeholder="Role"
          value={state.role}
          onChange={(event) => setState((current) => ({ ...current, role: event.target.value }))}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className={inputClassName}
          placeholder="Institution size"
          value={state.students}
          onChange={(event) =>
            setState((current) => ({ ...current, students: event.target.value }))
          }
        />
        <input
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          placeholder="Website"
          value={state.website}
          onChange={(event) => setState((current) => ({ ...current, website: event.target.value }))}
        />
      </div>

      <textarea
        rows={5}
        className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition-colors placeholder:text-[color:var(--muted-foreground)] focus:border-[color:var(--line-strong)]"
        placeholder="Tell us what needs replacing today: admissions, academics, fees, parent communication, or the whole patchwork."
        value={state.message}
        onChange={(event) => setState((current) => ({ ...current, message: event.target.value }))}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm leading-6 text-[color:var(--muted-foreground)]">
          We reply with a guided walkthrough plan, rollout framing, and the right stakeholders to
          bring into the evaluation.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[color:var(--foreground)] px-5 text-sm font-medium text-[color:var(--background)] transition-opacity hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Request Demo"}
        </button>
      </div>
      <div className="text-sm text-[color:var(--muted-foreground)]">
        Need a direct line instead?{" "}
        <ButtonLink
          href="mailto:contact@squarecampus.com"
          label="Email the team"
          variant="ghost"
          className="min-h-0 border-none px-0 py-0 align-baseline"
        />
      </div>
    </form>
  );
}
