"use client";

import { useMemo, useRef, useState } from "react";

import { useShallow } from "zustand/react/shallow";
import { useTextareaSyncHeight } from "../_lib/hooks/useTextareaSyncHeight";
import { useTranslationHandler } from "../_lib/hooks/useTranslationHandler";
import useTranslateStore from "../translateStore";
import InputView from "./InputView";
import LanguageBar from "./LanguageBar";
import OutputView from "./OutputView";
import TranslateFeatures from "./ui/TranslateFeatures";

// LATER
// const mostUsedLang = USER_MOST_FREQUENT_OUT_LANG;

export default function TranslationForm({ supportedLangs, recentHistory }) {
  const {
    isMainSectionVertical,
    showHistory,
    getIsDataFromHistory,
    setIsDataFromHistory,
    inputText,
    outputText,
    inputLang,
    outputLang,
    getLatestInText,
    getLatestOutLang,
    setInputText,
    setOutputText,
    setInputLang,
    setOutputLang,
    setLatestInText,
    setLatestOutLang,
  } = useTranslateStore(
    useShallow((state) => ({
      isMainSectionVertical: state.isMainSectionVertical,
      showHistory: state.showHistory,

      getIsDataFromHistory: state.getIsDataFromHistory,
      setIsDataFromHistory: state.setIsDataFromHistory,

      inputText: state.inputText,
      outputText: state.outputText,
      inputLang: state.inputLang,
      outputLang: state.outputLang,
      getLatestInText: state.getLatestInText,
      getLatestOutLang: state.getLatestOutLang,

      setInputText: state.setInputText,
      setOutputText: state.setOutputText,
      setInputLang: state.setInputLang,
      setOutputLang: state.setOutputLang,
      setLatestInText: state.setLatestInText,
      setLatestOutLang: state.setLatestOutLang,
    })),
  );

  const [isSwaping, setIsSwaping] = useState(false);
  const inputElementRef = useRef(null);
  const outputElementRef = useRef(null);

  const [audioStatus, setAudioStatus] = useState({
    isMicRecording: false,
    isInputSpeaking: false,
    isOutputSpeaking: false,
  });

  // Keeps both textareas at the same height by matching them to the taller one
  useTextareaSyncHeight(inputElementRef, outputElementRef, [
    inputText,
    outputText,
  ]);

  const { isPending } = useTranslationHandler(
    inputText,
    outputLang,
    inputLang,
    setOutputText,
    setInputLang,

    isSwaping,
    setIsSwaping,

    getLatestInText,
    getLatestOutLang,
    setLatestInText,
    setLatestOutLang,

    getIsDataFromHistory,
    setIsDataFromHistory,
  );

  const translationProps = useMemo(
    () => ({
      inputLang,
      outputLang,
      inputText,
      outputText,
      setInputText,
      setOutputText,
      setInputLang,
      setOutputLang,
    }),
    [
      inputLang,
      outputLang,
      inputText,
      outputText,
      setInputText,
      setOutputText,
      setInputLang,
      setOutputLang,
    ],
  );

  return (
    <div
      className={`relative ${showHistory && isMainSectionVertical ? "px-0" : "px-3"}`}
    >
      <TranslateFeatures
        isMainSectionVertical={isMainSectionVertical}
        className={`h-[3.5rem] px-3`}
      />

      <LanguageBar
        {...translationProps}
        setIsSwaping={setIsSwaping}
        latestInText={getLatestInText()}
        latestOutLang={getLatestOutLang()}
        setLatestInText={setLatestInText}
        setLatestOutLang={setLatestOutLang}
        languages={supportedLangs}
        recentHistory={recentHistory}
        isMainSectionVertical={isMainSectionVertical}
        className={isMainSectionVertical ? "justify-around" : ""} // TODO LATER check this later
      />

      <div
        className={`flex items-center justify-center ${isMainSectionVertical ? "flex-col" : "flex-row gap-2"}`}
      >
        <InputView
          audioStatus={audioStatus}
          setAudioStatus={setAudioStatus}
          inputElementRef={inputElementRef}
          isMainSectionVertical={isMainSectionVertical}
          handleAudioUpload={(transcribedText) => setInputText(transcribedText)}
          {...translationProps}
        />

        {/* Border bottom for input - it will be invisible in some conditions */}
        {isMainSectionVertical && (!inputText || !outputLang) && (
          <div className="w-full border-t border-t-gray-300"></div>
        )}

        <OutputView
          isPending={isPending}
          outputElementRef={outputElementRef}
          audioStatus={audioStatus}
          setAudioStatus={setAudioStatus}
          isMainSectionVertical={isMainSectionVertical}
          {...translationProps}
        />
      </div>
    </div>
  );
}
