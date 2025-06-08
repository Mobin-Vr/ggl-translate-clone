"use client";

import { IoMdSwap } from "react-icons/io";
import Tooltip from "./ui/Tooltip";
import useTranslateStore from "../translateStore";
import { useShallow } from "zustand/react/shallow";

export default function SwapBtn({ className, setIsSwaping }) {
  const {
    inputText,
    outputText,
    inputLang,
    outputLang,

    setInputText,
    setOutputText,
    setInputLang,
    setOutputLang,
    setLatestInText,
    setLatestOutLang,
  } = useTranslateStore(
    useShallow((state) => ({
      inputText: state.inputText,
      outputText: state.outputText,
      inputLang: state.inputLang,
      outputLang: state.outputLang,

      setInputText: state.setInputText,
      setOutputText: state.setOutputText,
      setInputLang: state.setInputLang,
      setOutputLang: state.setOutputLang,
      setLatestInText: state.setLatestInText,
      setLatestOutLang: state.setLatestOutLang,
    })),
  );

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

    // Reset the latests
    setLatestInText(newInText);
    setLatestOutLang(newOutLang);

    // Reset the states
    setOutputLang(newOutLang);
    setInputLang(newInLang);
    setInputText(newInText);
    setOutputText(newOutText);
  }

  return (
    <Tooltip title="Swap languages">
      <button
        onClick={handleSwap}
        type="button"
        className={`hover:bg-icon-hover z-40 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ${className}`}
      >
        <IoMdSwap size={22} strokeWidth={1} className="text-gray-500" />
      </button>
    </Tooltip>
  );
}
