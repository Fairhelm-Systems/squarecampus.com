import { Database, Gauge, KeyRound, LifeBuoy, Server } from "lucide-react";
import type { ElementType } from "react";
import { type ScopedGroupId, separatelyScoped } from "@/content/pricing";
import { cn } from "@/lib/utils";

const groupIcons: Record<ScopedGroupId, ElementType> = {
  data: Database,
  engineering: Server,
  identity: KeyRound,
  implementation: LifeBuoy,
  metered: Gauge,
};

type ScopedItem = { label: string; tag?: string };

function ItemList({ items, className }: { items: readonly ScopedItem[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-baseline justify-between gap-3 border-t border-[color:var(--line)] py-3 first:border-t-0 first:pt-0"
        >
          <span className="type-support">{item.label}</span>
          {item.tag ? (
            <span className="shrink-0 rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[color:var(--muted-foreground)]">
              {item.tag}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/**
 * Separately scoped cost dimensions.
 *
 * `items-start` keeps each card at its natural height — the previous equal-
 * height grid left the two-item card half empty. Rows are divided rather than
 * bulleted so a tag ("One-time", "Metered", "Passed through") can sit opposite
 * the label without the line looking like an afterthought.
 */
export function ScopedCostGrid() {
  return (
    <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {separatelyScoped.map((group) => {
        const Icon = groupIcons[group.id];
        // Widened to fill the final row rather than leaving an empty cell.
        const wide = group.id === "metered";
        const half = Math.ceil(group.items.length / 2);

        return (
          <section
            key={group.id}
            className={cn(
              "surface-quiet rounded-[var(--radius-panel)] p-6 sm:p-7",
              wide && "sm:col-span-2"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-tint)]">
                <Icon aria-hidden className="size-4 text-[color:var(--brand)]" />
              </span>
              {/* Deliberately a step below `type-card-title`: at three columns
                  the larger step wraps to two lines and the icon drifts out of
                  alignment with the first line. */}
              <h3 className="text-base font-medium tracking-[-0.02em] text-[color:var(--foreground)]">
                {group.group}
              </h3>
            </div>

            {wide ? (
              // Two independent lists rather than a two-column grid, so each
              // column's first row keeps its own top-border reset.
              <div className="mt-5 grid gap-x-10 sm:grid-cols-2">
                <ItemList items={group.items.slice(0, half)} />
                <ItemList
                  items={group.items.slice(half)}
                  className="border-t border-[color:var(--line)] pt-3 sm:border-t-0 sm:pt-0"
                />
              </div>
            ) : (
              <ItemList items={group.items} className="mt-5" />
            )}
          </section>
        );
      })}
    </div>
  );
}
