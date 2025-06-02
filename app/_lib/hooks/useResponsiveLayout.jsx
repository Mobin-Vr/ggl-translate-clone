import { useEffect } from "react";
import { CONFIG } from "../configs";

/**
 * Hook for handling responsive layout behavior.
 * - Determines if the layout is vertical based on a container's width.
 * - Shows or hides the form section and header based on screen size and history visibility.
 */

export function useResponsiveLayout(
  containerRef,
  setIsVerticalLayout, // setter to indicate vertical layout (true/false)
  setIsMobileHistoryView, // setter to toggle form section visibility
  showHistory, // boolean: whether the history panel is visible
) {
  // Detects vertical layout by observing container's
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const observer = new ResizeObserver(() => {
      setIsVerticalLayout(container.offsetWidth <= CONFIG.ui.mainBreakpoint);
    });

    observer.observe(container);
    return () => observer.disconnect();

    // eslint-disable-next-line
  }, [containerRef.current]);

  // Adjusts visibility of form section and header on window resize
  useEffect(() => {
    function handleResize() {
      const isNarrowScreenWithHistory =
        showHistory && window.innerWidth <= CONFIG.ui.mainBreakpoint;

      const header = document.getElementById("main-header");

      // Set isMobileHistoryView to true if it's a mobile screen and history is visible
      setIsMobileHistoryView(isNarrowScreenWithHistory);

      // Conditionally hide or show the header based on screen size and history
      if (header) {
        header.style.display = isNarrowScreenWithHistory ? "none" : "flex";
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Run once on mount

    return () => window.removeEventListener("resize", handleResize);
  }, [showHistory, setIsMobileHistoryView]);

  return { containerRef };
}
