"use client";

import { useRef, useState } from "react";
import { useResponsiveLayout } from "../_lib/hooks/useResponsiveLayout";
import HistoryBtn from "./HistoryBtn";

export default function ResponsiveWrapper({ mainApp, theHistory }) {
  const mainSectionRef = useRef(null);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const { showFormSection } = useResponsiveLayout(
    isHistoryVisible,
    mainSectionRef,
  );

  return (
    <main className="flex h-full">
      {showFormSection && (
        <section
          ref={mainSectionRef}
          className={`flex-1 overflow-x-auto ${
            isHistoryVisible ? "md:mr-[21rem] xl:mr-[30rem]" : ""
          }`}
        >
          {mainApp} {/* a parallel server component */}
          <HistoryBtn onClick={() => setIsHistoryVisible((prev) => !prev)} />
        </section>
      )}

      {isHistoryVisible && (
        <aside
          className="fixed top-[65px] right-0 z-50 h-[calc(100vh-65px)] w-full border-l border-gray-300 md:max-w-[21rem] xl:max-w-[30rem]"
          onClick={() => setIsHistoryVisible(false)}
        >
          {theHistory} {/* a parallel server component */}
        </aside>
      )}
    </main>
  );
}
