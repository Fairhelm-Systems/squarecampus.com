"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // Disable browser's automatic scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Scroll to top on route changes
  useEffect(() => {
    // Skip on first render (initial page load handles its own scroll)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Skip if there's a hash in the URL (anchor links)
    if (window.location.hash) return;

    // Use a small timeout to ensure the new page content is fully rendered
    // This is more reliable than requestAnimationFrame for Next.js App Router
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
