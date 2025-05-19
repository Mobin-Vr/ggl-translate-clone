"use client";

import { IoMdSwap } from "react-icons/io";
import Tooltip from "./ui/Tooltip";
import { useEffect } from "react";

export default function SwapBtn({
  inputText,
  outputText,
  inputLang,
  outputLang,
  setInputText,
  setOutputText,
  setInputLang,
  setOutputLang,
  setIsSwaping,
  latestInText,
  latestOutLang,
}) {
  function handleSwap() {
    const curInLang = inputLang;
    const curOutLang = outputLang;
    const curInText = inputText;
    const curOutText = outputText;

    const newOutLang =
      curInLang === "Not" || curInLang === "" ? "Select a language" : curInLang;
    const newInLang = curOutLang === "Select a language" ? "" : curOutLang;
    const newInText = curOutText;
    const newOutText = curInText;

    setIsSwaping(true);

    // Reset the latests (refs)
    latestInText.current = newInText;
    latestOutLang.current = newOutLang;

    // Reset the states
    setOutputLang(newOutLang);
    setInputLang(newInLang);
    setInputText(newInText);
    setOutputText(newOutText);
  }

  return (
    <div className="flex flex-col items-center">
      <Tooltip title="Swap languages">
        <button
          onClick={handleSwap}
          type="button"
          className="hover:bg-icon-hover absolute left-1/2 z-50 flex h-10 w-10 -translate-x-1/2 -translate-y-2.5 cursor-pointer items-center justify-center rounded-full transition-all duration-300"
        >
          <IoMdSwap size={22} strokeWidth={1} className="text-gray-500" />
        </button>
      </Tooltip>
    </div>
  );
}
