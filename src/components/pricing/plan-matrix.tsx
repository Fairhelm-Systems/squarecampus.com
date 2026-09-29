import { RetentionPointer } from "@/components/pricing/retention-pointer";
import { ComparisonRow } from "@/components/site/marketing";
import { plans, SCOPE_NOTE } from "@/content/pricing";

/**
 * At-a-glance comparison for procurement readers.
 *
 * A real <table> with row headers and column headers, so the relationship
 * between a dimension and a plan survives screen-reader navigation. It is
 * hidden below `md` — no information is lost there, because the stacked plan
 * bands above already carry every one of these statements in full.
 */

type MatrixRow = {
  label: string;
  starter: string;
  pro: string;
  enterprise: string;
};

const rows: readonly MatrixRow[] = [
  {
    label: "Leadership visibility",
    starter: "Standard operational dashboards",
    pro: "Owner command views and richer analytics",
    enterprise: "Trust-level command and advanced analytics",
  },
  {
    label: "Institutional structure",
    starter: "Single campus",
    pro: "Single or growing campus operations",
    enterprise: "Trust and campus hierarchy",
  },
  {
    label: "Sign-in and identity",
    starter: "SquareCampus-managed credentials, role-based access",
    pro: "Credentials plus optional Microsoft Entra ID single sign-on",
    enterprise:
      "Identity governance: multi-directory, group-to-role mappings, enforcement policy, lifecycle (scoped)",
  },
  {
    label: "Integrations",
    starter: "Scoped separately if needed",
    pro: "Standard integrations and development API access, scoped in the proposal",
    enterprise: "Deeper and custom integrations, scoped in the proposal",
  },
  {
    label: "Mobile apps",
    starter: "Parent and staff apps included",
    pro: "Parent and staff apps included",
    enterprise: "Parent and staff apps included; white-label scoped separately",
  },
  {
    label: "AEGIS intelligence",
    starter: "Not included",
    pro: "When the proposal includes it",
    enterprise: "Included within an agreed monthly allowance",
  },
  {
    label: "Deployment",
    starter: "Managed SquareCampus Cloud",
    pro: "Managed SquareCampus Cloud",
    enterprise: "Managed cloud; private cloud or on premises as a scoped service",
  },
  {
    label: "Scoped separately",
    starter: "Migration, custom integrations, premium support, prepaid usage top-ups",
    pro: "Custom integrations, premium support, prepaid usage top-ups",
    enterprise: "Private or on-premises deployment, custom engineering, custom SLA",
  },
  {
    label: "Implementation and support",
    starter: "Standard onboarding and support",
    pro: "Priority implementation and support options, with data migration",
    enterprise: "Full implementation and support, with data migration; custom SLA quoted",
  },
] as const;

export function PlanMatrix() {
  return (
    <div className="hidden md:block">
      <h3 className="eyebrow mb-4">At a glance</h3>
      <div className="surface-panel overflow-x-auto rounded-[var(--radius-panel-lg)] p-6 lg:p-8">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <caption className="sr-only">
            SquareCampus plan comparison across operational scope, visibility, accountability,
            structure, integrations, intelligence, deployment and support. The licensing model is
            published; figures are issued in a written proposal after institutional discovery.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-[15rem] pb-5 pr-6 align-bottom">
                <span className="eyebrow">Dimension</span>
              </th>
              {plans.map((plan) => (
                <th key={plan.id} scope="col" className="pb-5 pr-6 align-bottom last:pr-0">
                  <span className="type-caption block text-[color:var(--brand)]">{plan.step}</span>
                  <span className="mt-2 block font-display text-xl tracking-[-0.04em] text-[color:var(--foreground)]">
                    {plan.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <ComparisonRow
                key={row.label}
                label={row.label}
                values={[
                  { key: "starter", content: row.starter },
                  { key: "pro", content: row.pro },
                  { key: "enterprise", content: row.enterprise },
                ]}
              />
            ))}
          </tbody>
        </table>
      </div>
      <p className="type-caption mt-4">{SCOPE_NOTE}</p>
      <RetentionPointer className="mt-3" />
    </div>
  );
}
