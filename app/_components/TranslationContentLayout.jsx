"use client";

import React from "react";
import useTranslateStore from "../translateStore";
import { useShallow } from "zustand/react/shallow";

export default function TranslationContentLayout({ children }) {
  const { isMainSectionVertical, inputText, outputLang } = useTranslateStore(
    useShallow((state) => ({
      isMainSectionVertical: state.isMainSectionVertical,
      inputText: state.inputText,
      outputLang: state.outputLang,
    })),
  );

  return (
    <div
      className={`flex items-center justify-center ${
        isMainSectionVertical ? "flex-col" : "flex-row gap-2"
      }`}
    >
      {children}

      {/* Optional border if vertical layout and missing input/output */}
      {isMainSectionVertical && (!inputText || !outputLang) && (
        <div className="w-full border-t border-t-gray-300"></div>
      )}
    </div>
  );
}
