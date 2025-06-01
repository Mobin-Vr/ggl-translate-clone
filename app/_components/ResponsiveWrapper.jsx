"use client";

import { startTransition, useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { useHistoryModal } from "../_lib/hooks/useHistoryModal";
import { useResponsiveLayout } from "../_lib/hooks/useResponsiveLayout";
import useTranslateStore from "../translateStore";
import HistoryAccessModal from "./HistoryAccessModal";
import HistoryBtn from "./HistoryBtn";

export default function ResponsiveWrapper({ mainApp, theHistory, userId }) {
  const containerRef = useRef(null);

  const {
    showHistory,
    isMobileHistoryView,
    setIsMobileHistoryView,
    setShowHistory,
    setIsMainSectionVertical,
    resetForm,
  } = useTranslateStore(
    useShallow((state) => ({
      showHistory: state.showHistory,
      isMobileHistoryView: state.isMobileHistoryView,
      setIsMobileHistoryView: state.setIsMobileHistoryView,
      setShowHistory: state.setShowHistory,
      setIsMainSectionVertical: state.setIsMainSectionVertical,
      resetForm: state.resetForm,
    })),
  );

  const { isModalOpen, openModal, closeModal, modalRef } = useHistoryModal();

  // Layout responsiveness
  useResponsiveLayout(
    containerRef,
    setIsMainSectionVertical,
    setIsMobileHistoryView,
    showHistory,
  );

  // Reset form on mount
  // eslint-disable-next-line
  useEffect(() => resetForm(), []);

  // Refresh server history
  useEffect(() => {
    if (showHistory) {
      startTransition(async () => {
        // await revalidateHistory();
      });
    }
  }, [showHistory]);

  function handleHistoryBtnClick() {
    if (!userId) {
      openModal();
      return;
    }

    setShowHistory(!showHistory);
  }

  return (
    <main className="flex h-full">
      {!isMobileHistoryView && (
        <section
          ref={containerRef}
          className={`flex-1 overflow-x-auto ${
            showHistory ? "md:mr-history-md xl:mr-history-xl" : ""
          }`}
        >
          {mainApp}
          <HistoryBtn
            showHistory={showHistory}
            onClick={handleHistoryBtnClick}
          />
        </section>
      )}

      {showHistory && (
        <aside
          className={`fixed right-0 z-50 flex w-full flex-col ${isMobileHistoryView ? "top-0 h-dvh" : "top-header-height md:max-w-history-md h-screen-minus-header xl:max-w-history-xl border-l border-gray-300"}`}
        >
          {theHistory}
        </aside>
      )}

      {isModalOpen && (
        <HistoryAccessModal ref={modalRef} onClose={closeModal} />
      )}
    </main>
  );
}
