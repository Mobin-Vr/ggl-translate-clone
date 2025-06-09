"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { useResponsiveLayout } from "../_hooks/useResponsiveLayout";
import useTranslateStore from "../translateStore";

export default function ResponsiveWrapper({ mainApp, theHistory }) {
  const containerRef = useRef(null);

  const { showHistory, isMobileHistoryView, resetForm } = useTranslateStore(
    useShallow((state) => ({
      showHistory: state.showHistory,
      isMobileHistoryView: state.isMobileHistoryView,
      resetForm: state.resetForm,
    })),
  );

  useResponsiveLayout(containerRef);

  useEffect(() => resetForm(), [resetForm]);

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
    </main>
  );
}
