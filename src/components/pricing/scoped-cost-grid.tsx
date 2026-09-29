import {
  Database,
  Gauge,
  Headset,
  KeyRound,
  Layers,
  LifeBuoy,
  Plus,
  Server,
  Smartphone,
} from "lucide-react";
import type { ElementType } from "react";
import { OperationalBadge } from "@/components/site/marketing";
import {
  licenceIncludes,
  METERED_NOTE,
  type ScopedGroupId,
  separatelyScoped,
  WHITE_LABEL_NOTE,
} from "@/content/pricing";
import { cn } from "@/lib/utils";

/**
 * Included versus separately scoped.
 *
 * The licence band comes first, so a reader sees what they already get before
 * the list of what is quoted on its own line. The scoped groups sit in three
 * balanced columns (the two short groups share the first), and metered usage
 * runs full width beneath them. A tag every item in a group shares ("Enterprise")
 * is shown once on the group instead of on each row.
 */

const groupIcons: Record<ScopedGroupId, ElementType> = {
  data: Database,
  engineering: Server,
  identity: KeyRound,
  implementation: LifeBuoy,
  metered: Gauge,
};

const includeIcons: Record<(typeof licenceIncludes)[number]["id"], ElementType> = {
  platform: Layers,
  apps: Smartphone,
  onboarding: Headset,
};

type Group = (typeof separatelyScoped)[number];

const tagClass =
  "shrink-0 rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[color:var(--muted-foreground)]";

function Tag({ children }: { children: string }) {
  return (
    <span data-md-prefix="(" data-md-suffix=")" className={tagClass}>
      {children}
    </span>
  );
}

function sharedTag(group: Group) {
  const first = group.items[0]?.tag;
  return first && group.items.every((item) => item.tag === first) ? first : undefined;
}

function GroupHeader({ group, tag }: { group: Group; tag?: string }) {
  const Icon = groupIcons[group.id];
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-tint)]">
        <Icon aria-hidden className="size-4 text-[color:var(--brand)]" />
      </span>
      <h3 className="text-base font-medium tracking-[-0.02em] text-[color:var(--foreground)]">
        {group.group}
      </h3>
      {tag ? (
        <span className="ml-auto">
          <Tag>{tag}</Tag>
        </span>
      ) : null}
    </div>
  );
}

function GroupCard({ group, className }: { group: Group; className?: string }) {
  const shared = sharedTag(group);
  return (
    <section className={cn("surface-panel rounded-[var(--radius-panel)] p-6 sm:p-7", className)}>
      <GroupHeader group={group} tag={shared} />
      <ul className="mt-5">
        {group.items.map((item) => (
          <li
            key={item.label}
            className="flex gap-2.5 border-t border-[color:var(--line)] py-3 first:border-t-0 first:pt-0 last:pb-0"
          >
            <Plus
              aria-hidden
              className="mt-1 size-3.5 shrink-0 text-[color:var(--muted-foreground)]"
            />
            {/* A row's own tag sits under its label, so a long tag never squeezes the label. */}
            <span className="flex flex-col items-start gap-2">
              <span className="type-support">{item.label}</span>
              {item.tag && !shared ? <Tag>{item.tag}</Tag> : null}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function group(id: ScopedGroupId): Group {
  const found = separatelyScoped.find((entry) => entry.id === id);
  if (!found) throw new Error(`Unknown scoped group: ${id}`);
  return found;
}

export function ScopedCostGrid() {
  const metered = group("metered");
  return (
    <div>
      {/* In the licence */}
      <section className="surface-panel-strong relative overflow-hidden rounded-[var(--radius-panel-lg)] p-6 sm:p-8">
        <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-[color:var(--brand)]" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="eyebrow">In every licence</h3>
          <OperationalBadge tone="brand">Included</OperationalBadge>
        </div>
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {licenceIncludes.map((item) => {
            const Icon = includeIcons[item.id];
            return (
              <li key={item.id} className="flex gap-3.5">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-chip)] bg-[color:var(--brand-tint)]">
                  <Icon aria-hidden className="size-[1.125rem] text-[color:var(--brand)]" />
                </span>
                <div>
                  <p className="font-medium text-[color:var(--foreground)]">{item.title}</p>
                  <p className="type-support mt-1">{item.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="type-support mt-6 border-t border-[color:var(--line)] pt-5 text-sm">
          {WHITE_LABEL_NOTE}
        </p>
      </section>

      {/* Quoted as its own line */}
      <div className="mt-8 mb-5 flex items-center gap-4">
        <h3 className="eyebrow shrink-0">Quoted as its own line</h3>
        <span aria-hidden className="h-px flex-1 bg-[color:var(--line)]" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <GroupCard group={group("data")} />
          <GroupCard group={group("implementation")} className="flex-1" />
        </div>
        <GroupCard group={group("engineering")} />
        <GroupCard group={group("identity")} />
      </div>

      <section className="surface-panel mt-4 rounded-[var(--radius-panel)] p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <GroupHeader group={metered} />
          <p className="type-support text-sm">{METERED_NOTE}</p>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {metered.items.map((item) => (
            <li
              key={item.label}
              className="flex flex-col items-start gap-2.5 rounded-[var(--radius-chip)] border border-[color:var(--line)] bg-[color:var(--surface-muted)] px-4 py-4"
            >
              <span className="type-support text-[color:var(--foreground)]">{item.label}</span>
              {item.tag ? <Tag>{item.tag}</Tag> : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
