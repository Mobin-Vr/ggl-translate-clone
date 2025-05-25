import useTranslateStore from "@/app/translateStore";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { MAIN_BREAKPOINT } from "../configs";

export function useResponsiveLayout(isHistoryVisible, mainSectionRef) {
  const [showFormSection, setShowFormSection] = useState(true);
  const { setIsMainSectionVertical } = useTranslateStore(
    useShallow((state) => ({
      setIsMainSectionVertical: state.setIsMainSectionVertical,
    })),
  );

  // Detect vertical layout via ResizeObserver
  useEffect(() => {
    const section = mainSectionRef.current;
    if (!section) return;

    const observer = new ResizeObserver(() => {
      setIsMainSectionVertical(section.offsetWidth <= MAIN_BREAKPOINT);
    });

    observer.observe(section);
    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainSectionRef.current]);

  // Show/hide form section based on window size and history panel
  useEffect(() => {
    const handleResize = () => {
      setShowFormSection(
        !(isHistoryVisible && window.innerWidth <= MAIN_BREAKPOINT),
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // run initially

    return () => window.removeEventListener("resize", handleResize);
  }, [isHistoryVisible]);

  return { mainSectionRef, showFormSection };
}
