"use client";

import { useEffect } from "react";

export function DevtoolsGuard() {
  useEffect(() => {
    const blockContext = (event: Event) => {
      event.preventDefault();
    };

    const blockShortcuts = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isBlocked =
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key)) ||
        (event.ctrlKey && !event.shiftKey && key === "u");

      if (isBlocked) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener("contextmenu", blockContext);
    window.addEventListener("keydown", blockShortcuts, true);

    return () => {
      window.removeEventListener("contextmenu", blockContext);
      window.removeEventListener("keydown", blockShortcuts, true);
    };
  }, []);

  return null;
}
