"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect, useRef } from "react";
import { useResponsiveLayout } from "../_lib/hooks/useResponsiveLayout";
import HistoryBtn from "./HistoryBtn";
import useTranslateStore from "../translateStore";
import { useShallow } from "zustand/react/shallow";

export default function ResponsiveWrapper({ mainApp, theHistory }) {
  const mainSectionRef = useRef(null);
  const router = useRouter();

  const {
    showHistory,
    showFormSection,
    setShowFormSection,
    setShowHistory,
    setIsMainSectionVertical,
    resetForm,
  } = useTranslateStore(
    useShallow((state) => ({
      showHistory: state.showHistory,
      showFormSection: state.showFormSection,
      setShowFormSection: state.setShowFormSection,
      setShowHistory: state.setShowHistory,
      setIsMainSectionVertical: state.setIsMainSectionVertical,
      resetForm: state.resetForm,
    })),
  );

  // Custom hook to manage responsive layout; updates state via store without returning any value
  useResponsiveLayout(
    mainSectionRef,
    setIsMainSectionVertical,
    setShowFormSection,
    showHistory,
  );

  // Refreshes server components to fetch fresh history when panel opens
  useEffect(() => {
    // Only when the history panel opens
    // if (showHistory) router.refresh();
    if (showHistory) {
      startTransition(async () => {
        // await revalidateHistory();
      });
    }
  }, [showHistory]);

  // Resets form fields when component mounts
  useEffect(() => {
    resetForm();
    // eslint-disable-next-line
  }, []);

  return (
    <main className="flex h-full">
      {showFormSection && (
        <section
          ref={mainSectionRef}
          className={`flex-1 overflow-x-auto ${
            showHistory ? "md:mr-[21rem] xl:mr-[30rem]" : ""
          }`}
        >
          {mainApp} {/* a parallel server component */}
          <HistoryBtn onClick={() => setShowHistory(!showHistory)} />
        </section>
      )}

      {showHistory && (
        <aside className="fixed top-[65px] right-0 z-50 h-[calc(100vh-65px)] w-full border-l border-gray-300 md:max-w-[21rem] xl:max-w-[30rem]">
          {theHistory} {/* a parallel server component */}
        </aside>
      )}
    </main>
  );
}
