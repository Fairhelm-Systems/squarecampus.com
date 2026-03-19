"use client";

import { useEffect, useState } from "react";

interface DeviceCapabilities {
  /** True if device has touch or screen width < 1024px */
  isMobile: boolean;
  /** True if deviceMemory < 4GB or hardwareConcurrency < 4 */
  isLowEnd: boolean;
  /** True if user prefers reduced motion */
  prefersReducedMotion: boolean;
  /** True if device is on battery and level < 20% */
  isBatterySaver: boolean;
  /** Combined flag: should reduce animations/effects */
  shouldReduceEffects: boolean;
}

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
  getBattery?: () => Promise<BatteryManager>;
}

interface BatteryManager {
  charging: boolean;
  level: number;
  addEventListener: (type: string, listener: () => void) => void;
  removeEventListener: (type: string, listener: () => void) => void;
}

/**
 * Hook to detect device capabilities for optimizing performance.
 * Returns flags for mobile, low-end devices, battery status, and motion preferences.
 *
 * Use `shouldReduceEffects` as a single flag to conditionally render heavy elements.
 */
export function useDeviceCapabilities(): DeviceCapabilities {
  // Default to conservative values (assume mobile/reduced) for SSR
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: true,
    isLowEnd: false,
    prefersReducedMotion: false,
    isBatterySaver: false,
    shouldReduceEffects: true,
  });

  useEffect(() => {
    const nav = navigator as NavigatorWithMemory;

    // Check for mobile/tablet
    const checkMobile = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      return hasTouch || isSmallScreen;
    };

    // Check for low-end device
    const checkLowEnd = () => {
      const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
      const lowCores =
        navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4;
      return lowMemory || lowCores;
    };

    // Check reduced motion preference
    const checkReducedMotion = () => {
      return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    };

    // Initial state
    const isMobile = checkMobile();
    const isLowEnd = checkLowEnd();
    const prefersReducedMotion = checkReducedMotion();

    let isBatterySaver = false;
    let batteryManager: BatteryManager | null = null;

    const updateCapabilities = (batterySaver: boolean = isBatterySaver) => {
      const shouldReduceEffects = isMobile || isLowEnd || prefersReducedMotion || batterySaver;
      setCapabilities({
        isMobile,
        isLowEnd,
        prefersReducedMotion,
        isBatterySaver: batterySaver,
        shouldReduceEffects,
      });
    };

    // Check battery status
    const checkBattery = async () => {
      if (!nav.getBattery) {
        updateCapabilities(false);
        return;
      }

      try {
        batteryManager = await nav.getBattery();

        const updateBatteryStatus = () => {
          if (!batteryManager) return;
          // Consider battery saver if not charging and level < 20%
          const saver = !batteryManager.charging && batteryManager.level < 0.2;
          isBatterySaver = saver;
          updateCapabilities(saver);
        };

        updateBatteryStatus();

        // Listen for battery changes
        batteryManager.addEventListener("chargingchange", updateBatteryStatus);
        batteryManager.addEventListener("levelchange", updateBatteryStatus);
      } catch {
        updateCapabilities(false);
      }
    };

    checkBattery();

    // Handle resize
    const handleResize = () => {
      const newIsMobile = checkMobile();
      if (newIsMobile !== isMobile) {
        updateCapabilities();
      }
    };

    // Handle reduced motion change
    const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => {
      updateCapabilities();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    motionQuery?.addEventListener?.("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      motionQuery?.removeEventListener?.("change", handleMotionChange);

      if (batteryManager) {
        batteryManager.removeEventListener("chargingchange", () => {});
        batteryManager.removeEventListener("levelchange", () => {});
      }
    };
  }, []);

  return capabilities;
}

/**
 * Simple hook that just returns whether to reduce effects.
 * Use this when you only need the combined flag.
 */
export function useShouldReduceEffects(): boolean {
  const { shouldReduceEffects } = useDeviceCapabilities();
  return shouldReduceEffects;
}
