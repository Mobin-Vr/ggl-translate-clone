import { useEffect, useRef, useState } from "react";
//NOTE Determine (top- right - w - h - color) in className

export default function ScrollableFade({ containerRef, className }) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  useEffect(() => {
    const el = containerRef.current;

    function checkScroll() {
      if (!el) return;

      const hasOverflow = el.scrollWidth > el.clientWidth;
      const hasScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth;

      setIsOverflowing(hasOverflow);
      setShowRightFade(hasOverflow && hasScrollRight);
    }

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  if (showRightFade)
    return (
      //NOTE Determine top- right - w - h - color
      <div
        className={`pointer-events-none absolute bg-gradient-to-l from-white to-transparent ${className}`}
      />
    );
}
