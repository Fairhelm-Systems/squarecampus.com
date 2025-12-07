"use client";

import { useEffect, useState } from "react";
import { X } from "@/components/icons";

const STORAGE_KEY = "sc_browser_warn_dismissed";

const isVeryOldBrowser = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const match = ua.match(/Chrome\/(\d+)/);
  const chromeVersion = match ? parseInt(match[1], 10) : undefined;

  return (
    /MSIE |Trident\//.test(ua) ||
    /Firefox\/([1-6][0-9])/.test(ua) ||
    (chromeVersion !== undefined && chromeVersion < 90)
  );
};

export function BrowserWarning() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
    if (!dismissed && isVeryOldBrowser()) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed left-1/2 top-3 z-[120] w-[90%] max-w-2xl -translate-x-1/2 rounded-2xl border border-amber-200/60 bg-amber-900/90 px-4 py-3 text-sm text-amber-50 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_0_6px_rgba(251,191,36,0.25)]" />
        <div className="flex-1 space-y-1">
          <p className="font-semibold">Heads up: your browser might be outdated</p>
          <p className="text-xs text-amber-100/90">
            For the best visuals and performance, update to a modern browser (Chrome 100+, Edge,
            Safari 16+, or Firefox 100+). The site will still work, but some effects may be toned
            down to keep things smooth.
          </p>
        </div>
        <button
          type="button"
          aria-label="Dismiss browser warning"
          className="rounded-full p-1 text-amber-100 transition hover:bg-amber-800/70"
          onClick={() => {
            localStorage.setItem(STORAGE_KEY, "1");
            setVisible(false);
          }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
