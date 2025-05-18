"use client";

import { IoMdSwap } from "react-icons/io";
import Tooltip from "./ui/Tooltip";
import { useEffect } from "react";

export default function SwapBtn({
  inputText,
  outputText,
  inputLanguage,
  outputLanguage,
  setInputText,
  setOutputText,
  setInputLanguage,
  setOutputLanguage,
  setIsSwaping,
  latestInText,
  latestOutLang,
}) {
  function handleSwap() {
    const curInLang = inputLanguage;
    const curOutLang = outputLanguage;
    const curInText = inputText;
    const curOutText = outputText;

    const newOutLang =
      curInLang === "Not" || curInLang === "" ? "Select a language" : curInLang;
    const newInLang = curOutLang === "Select a language" ? "" : curOutLang;
    const newInText = curOutText === "Translation" ? "" : curOutText;
    const newOutText = curInText.trim() === "" ? "Translation" : curInText;

    setIsSwaping(true);

    // Reset the latests (refs)
    latestInText.current = newInText;
    latestOutLang.current = newOutLang;

    // Reset the states
    setOutputLanguage(newOutLang);
    setInputLanguage(newInLang);
    setInputText(newInText);
    setOutputText(newOutText);
  }

  return (
    <div className="flex flex-col items-center">
      <Tooltip title="Swap languages">
        <button
          onClick={handleSwap}
          type="button"
          className="hover:bg-icon-hover absolute left-1/2 z-50 flex h-7 w-7 -translate-x-1/2 -translate-y-1 cursor-pointer items-center justify-center rounded-full transition-all duration-300"
        >
          <IoMdSwap size={22} strokeWidth={1} className="text-gray-500" />
        </button>
      </Tooltip>
    </div>
  );
}
