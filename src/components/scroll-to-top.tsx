"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

export function ScrollToTop() {
  const pathname = usePathname();

  // Disable browser's automatic scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Use useLayoutEffect to scroll before paint, preventing flash at wrong position
  // pathname is used to trigger the effect on route changes
  useLayoutEffect(() => {
    // Skip if there's a hash in the URL (anchor links)
    if (window.location.hash) return;

    // Scroll to top immediately on route change
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
