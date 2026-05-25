/**
 * useScrollRestoration
 * Saves scroll position when leaving a page and restores it when returning via back navigation.
 * Works with wouter's client-side routing.
 */
import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

const scrollPositions: Record<string, number> = {};

export function useScrollRestoration() {
  const [location] = useLocation();
  const prevLocation = useRef<string>(location);
  const isPopState = useRef(false);

  // Detect browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      isPopState.current = true;
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const prev = prevLocation.current;

    if (prev !== location) {
      // Save scroll position of the page we're leaving
      scrollPositions[prev] = window.scrollY;

      if (isPopState.current) {
        // Restore scroll position when navigating back/forward
        const saved = scrollPositions[location] ?? 0;
        // Use requestAnimationFrame to ensure DOM has rendered
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo({ top: saved, behavior: "instant" });
          });
        });
      } else {
        // Normal forward navigation — scroll to top
        window.scrollTo({ top: 0, behavior: "instant" });
      }

      isPopState.current = false;
      prevLocation.current = location;
    }
  }, [location]);
}
