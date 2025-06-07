"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { useHistoryModal } from "../_lib/hooks/useHistoryModal";
import { useResponsiveLayout } from "../_lib/hooks/useResponsiveLayout";
import useTranslateStore from "../translateStore";
import HistoryAccessModal from "./HistoryAccessModal";
import HistoryBtn from "./HistoryBtn";

export default function ResponsiveWrapper({ mainApp, theHistory, userId }) {
  const containerRef = useRef(null);
  const router = useRouter();

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

  useResponsiveLayout(
    containerRef,
    setIsMainSectionVertical,
    setIsMobileHistoryView,
    showHistory,
  );

  // eslint-disable-next-line
  useEffect(() => resetForm(), []);

  function handleHistoryBtnClick() {
    if (!userId) {
      openModal();
      return;
    }
    if (!showHistory) startTransition(() => router.refresh());
    setShowHistory(!showHistory);
  }

  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  return (
    <main className="flex h-full pt-16.5">
      {!isMobileHistoryView && (
        <section
          ref={containerRef}
          className={`main-section flex-1 overflow-x-auto transition-all duration-300 ease-in-out ${
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

      <AnimatePresence>
        {showHistory && (
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed right-0 z-40 flex w-full flex-col ${
              isMobileHistoryView
                ? "top-0 h-dvh"
                : "top-header-height h-screen-minus-header md:max-w-history-md xl:max-w-history-xl border-l border-gray-300"
            }`}
          >
            {theHistory}
          </motion.aside>
        )}
      </AnimatePresence>

      {isModalOpen && (
        <HistoryAccessModal ref={modalRef} onClose={closeModal} />
      )}
    </main>
  );
}
