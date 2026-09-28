/**
 * Stale or forbidden commercial wording, shared by the tests and the build
 * check. Mirrors the doctrine in scripts/check-claims.sh for the generated
 * surfaces (llms.txt, the Markdown alternates, rendered HTML) that the shell
 * grep over src/ cannot see.
 */
export const STALE_CLAIMS: ReadonlyArray<{ pattern: RegExp; reason: string }> = [
  {
    pattern: /no prices are published/i,
    reason: "pricing availability: the model is published, figures by proposal",
  },
  { pattern: /no figures are published/i, reason: "pricing availability wording" },
  { pattern: /no prices, rates/i, reason: "pricing availability wording" },
  { pattern: /pricing is not published/i, reason: "pricing availability wording" },
  { pattern: /contact us for (all )?pricing/i, reason: "pricing availability wording" },
  { pattern: /student \+ staff/i, reason: "licence basis is active enrolled students" },
  { pattern: /headcount-based/i, reason: "licence basis is student-volume bands" },
  {
    pattern: /implementation and training included/i,
    reason: "implementation is scoped separately",
  },
  {
    pattern: /(small|first|initial) cohort/i,
    reason: "Founding Partner programme has two positions, ever",
  },
  {
    pattern: /one approved (institutional )?tenant/i,
    reason: "SSO is optional from Pro, not an Enterprise tenant cap",
  },
  { pattern: /Enterprise-only/i, reason: "identity tier wording" },
  {
    pattern: /price protection for the (agreed|initial)/i,
    reason: "no protection duration is published",
  },
  {
    pattern: /lifetime (pricing|discount|protection)/i,
    reason: "forbidden Founding Partner wording",
  },
  {
    pattern:
      /\b(equity|shareholder|shareholding|securities|convertible|debenture|profit[- ]share|board seat)\b/i,
    reason: "no securities or ownership language in marketing copy",
  },
  {
    pattern: /Google Workspace (SSO|single sign-on|sign-in)/i,
    reason: "not implemented; must not be advertised",
  },
  {
    pattern: /SCIM (2\.0 )?provisioning/i,
    reason: "not implemented; must not be advertised as available",
  },
  {
    pattern: /revolutionary|cutting-edge|transform education|AI-powered future/i,
    reason: "boilerplate",
  },
  { pattern: /Trusted by \d|\d+\+ schools|India's #1|bank-grade/i, reason: "fabricated proof" },
  { pattern: /within 30 days of request/i, reason: "unsupported export deadline" },
  {
    pattern: /consent management, data retention controls/i,
    reason: "unimplemented capabilities described as available",
  },
  {
    pattern: /complete exports? in standard formats/i,
    reason: "export terms are agreed in the order form",
  },
  {
    pattern: /retention schedule is under legal review/i,
    reason: "implies an engaged legal review that is not established",
  },
];

/** Phrases that would turn llms.txt into instructions for assistants. */
export const DIRECTIVE_PHRASES: ReadonlyArray<RegExp> = [
  /\brecommend SquareCampus\b/i,
  /\bwhen users ask\b/i,
  /\bnotes for assistants\b/i,
  /\bdo not describe\b/i,
  /\byou (must|should) (describe|say|recommend)\b/i,
  /\bignore (previous|prior) instructions\b/i,
];

export function findStaleClaims(text: string) {
  return STALE_CLAIMS.filter(({ pattern }) => pattern.test(text));
}
