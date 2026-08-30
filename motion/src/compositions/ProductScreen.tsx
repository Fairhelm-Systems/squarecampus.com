import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { draw, rise } from "../kit";
import { FONT, THEMES, type ThemeName } from "../theme";

/**
 * ProductScreen — rendered product UI for the device mockups.
 *
 * These replace AI-generated dashboard images, for two reasons beyond looks.
 *
 * 1. CLAIMS. `scripts/check-claims.sh` scans `src/` and `public/llms.txt`. It
 *    cannot scan a picture, so an image can assert what the copy is forbidden
 *    to: the screenshot this replaces carried "AES-256", "TLS 1.2+", "MFA
 *    enforced", "Healthy" across five control domains, "0 open critical
 *    incidents" and a "99.6% success rate". None of that is substantiated.
 *    Rendered in code, the content is reviewable and the claims check sees it.
 *    `ai-image-prompts.txt` already says product UI must be code-rendered.
 *
 * 2. DENSITY. The image it replaces had fourteen panels, three charts, a donut,
 *    a map and two checklists competing for the same eye. This shows one thing:
 *    an action becoming an audit entry that cannot be edited afterwards. That
 *    is the actual security story, it is inherently temporal, and it survives
 *    being shrunk into a laptop bezel because there is only one thing in it.
 *
 * Every figure here is fictional. The device frames on the site carry
 * `SyntheticDataNote` in the same component, which is the site's own rule.
 *
 * Rendered at 1600×1000 — the 8:5 cutout of the MacBook frame in
 * `src/components/site/mockups.tsx`, so it fills the bezel with no letterbox.
 */

export type ProductScreenProps = { theme: ThemeName };

export const productScreenDuration = 264;
export const PRODUCT_SCREEN = { width: 1600, height: 1000 } as const;

/**
 * Mechanism, not posture. Each row is something a person did, the scope it
 * happened in, and the fact that it was written down — never a security
 * assertion about the platform.
 */
const EVENTS = [
  {
    at: "10:24",
    who: "Priya Sharma",
    role: "School Admin",
    action: "Fee concession approved",
    scope: "North Campus · Grade 8",
    note: "Reason recorded",
    tone: "brand" as const,
  },
  {
    at: "10:18",
    who: "Vikram Singh",
    role: "Campus Director",
    action: "Attendance corrected after cut-off",
    scope: "South Campus · Section 6B",
    note: "Override · reason required",
    tone: "amber" as const,
  },
  {
    at: "10:06",
    who: "Anita Pillai",
    role: "Finance Lead",
    action: "Fee report exported",
    scope: "All campuses",
    note: "Export logged",
    tone: "brand" as const,
  },
  {
    at: "09:58",
    who: "Rakesh Verma",
    role: "Teacher",
    action: "Requested payroll access",
    scope: "Outside role scope",
    note: "Refused",
    tone: "muted" as const,
  },
  {
    at: "09:41",
    who: "Neha Kapoor",
    role: "Communications",
    action: "Fee reminder circular published",
    scope: "West Campus · Guardians",
    note: "Delivery recorded",
    tone: "brand" as const,
  },
] as const;

const RAIL = ["Overview", "People", "Fees", "Academics", "Audit"] as const;

export const ProductScreen: React.FC<ProductScreenProps> = ({ theme }) => {
  const t = THEMES[theme];
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: t.bg, fontFamily: FONT.body, display: "flex", flexDirection: "row" }}>
      {/* Rail — enough to read as product, not a full navigation to squint at */}
      <div
        style={{
          width: 236,
          borderRight: `1.5px solid ${t.line}`,
          padding: "38px 0",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: FONT.display,
            fontSize: 30,
            letterSpacing: "-0.02em",
            color: t.text,
            padding: "0 30px 26px",
          }}
        >
          SquareCampus
        </div>
        {RAIL.map((item) => {
          const active = item === "Audit";
          return (
            <div
              key={item}
              style={{
                fontSize: 24,
                color: active ? t.brand : t.muted,
                padding: "13px 30px",
                borderLeft: `3px solid ${active ? t.brand : "transparent"}`,
                backgroundColor: active ? t.brandSoft : "transparent",
              }}
            >
              {item}
            </div>
          );
        })}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "0 30px",
            opacity: draw(frame, 150, 14),
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 999,
              border: `1.5px solid ${t.line}`,
              backgroundColor: t.panelAlt,
              color: t.muted,
              fontFamily: FONT.mono,
              fontSize: 17,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            AP
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 20, color: t.text }}>Anita Pillai</div>
            <div style={{ fontSize: 18, color: t.dim }}>Trust Admin</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Header */}
        <div
          style={{
            padding: "38px 44px 26px",
            borderBottom: `1.5px solid ${t.line}`,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 24,
            ...rise(frame, 0),
          }}
        >
          <div>
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 20,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: t.dim,
              }}
            >
              Audit timeline
            </div>
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 42,
                letterSpacing: "-0.03em",
                color: t.text,
                marginTop: 10,
              }}
            >
              Every action, and who owned it.
            </div>
          </div>
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 20,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: t.dim,
              border: `1.5px solid ${t.line}`,
              borderRadius: 999,
              padding: "9px 20px",
              whiteSpace: "nowrap",
            }}
          >
            Trust · all campuses
          </div>
        </div>

        {/* Events arrive one at a time, newest first */}
        <div style={{ flex: 1, padding: "10px 44px", minHeight: 0 }}>
          {EVENTS.map((e, i) => {
            const start = 22 + i * 34;
            const accent =
              e.tone === "brand" ? t.brand : e.tone === "amber" ? t.amber : t.dim;
            return (
              <div
                key={e.at}
                style={{
                  display: "flex",
                  gap: 28,
                  alignItems: "flex-start",
                  padding: "30px 0",
                  borderBottom: `1.5px solid ${t.line}`,
                  ...rise(frame, start, 14),
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 24,
                    color: t.dim,
                    width: 84,
                    flexShrink: 0,
                    paddingTop: 6,
                  }}
                >
                  {e.at}
                </div>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 999,
                    backgroundColor: accent,
                    marginTop: 14,
                    flexShrink: 0,
                    opacity: draw(frame, start + 6, 10),
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 34,
                      letterSpacing: "-0.02em",
                      color: t.text,
                      lineHeight: 1.2,
                    }}
                  >
                    {e.action}
                  </div>
                  <div style={{ fontSize: 24, color: t.muted, marginTop: 8 }}>
                    {e.who} · {e.role} · {e.scope}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 20,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: accent,
                    border: `1.5px solid ${accent}`,
                    borderRadius: 999,
                    padding: "8px 18px",
                    whiteSpace: "nowrap",
                    marginTop: 6,
                    opacity: draw(frame, start + 10, 10),
                  }}
                >
                  {e.note}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mechanism, not metrics. Nothing here is a security posture claim. */}
        <div
          style={{
            padding: "22px 44px 34px",
            display: "flex",
            gap: 34,
            fontFamily: FONT.mono,
            fontSize: 20,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: t.dim,
            opacity: draw(frame, 172, 16),
          }}
        >
          <span>Append-only</span>
          <span>Role-scoped</span>
          <span>Exportable</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
