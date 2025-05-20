"use client";

import { useEffect, useRef, useState } from "react";
import TranslationForm from "./TranslationForm";
import TranslationHistory from "./TranslationHistory";
import HistoryBtn from "./HistoryBtn";

export default function TranslationPanel({ languages }) {
  const formRef = useRef();
  const [showHistory, setShowHistory] = useState(false);
  const [showFrom, setShowForm] = useState(true);
  const [isFormVertical, setIsFormVertical] = useState(false);

  // Only for the form element: observe its size changes
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const observer = new ResizeObserver(() => {
      const width = form.offsetWidth;
      setIsFormVertical(width <= 720);
    });

    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  // Only for the window size: listen to window resize events
  useEffect(() => {
    function handleResize() {
      const pageWidth = window.innerWidth;
      setShowForm(!(showHistory && pageWidth <= 720));
    }

    window.addEventListener("resize", handleResize);
    // Run once initially to set the correct state based on current window size
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [showHistory]);

  return (
    <div className="flex h-full">
      {showFrom && (
        <div ref={formRef} className="flex-1 overflow-x-auto">
          <TranslationForm
            languages={languages}
            isFormVertical={isFormVertical}
            showHistory={showHistory}
          />
          <HistoryBtn onClick={() => setShowHistory(true)} />
        </div>
      )}

      {showHistory && (
        <TranslationHistory
          handleCloseHistory={() => setShowHistory(false)}
          className="w-full md:max-w-92 md:border-l md:border-l-gray-300 xl:max-w-[30rem]"
        />
      )}
    </div>
  );
}
