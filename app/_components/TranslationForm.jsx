"use client";

import { useEffect, useRef, useState } from "react";

import autosize from "autosize";
import { USER_MOST_FREQUENT_OUT_LANG } from "../_lib/configs";
import { useTranslationHandler } from "../_lib/hooks/useTranslationHandler";
import InputView from "./InputView";
import LanguageBar from "./LanguageBar";
import OutputView from "./OutputView";
import TranslateFeatures from "./ui/TranslateFeatures";

// LATER
const mostUsedLang = USER_MOST_FREQUENT_OUT_LANG;

export default function TranslationForm({
  isFormVertical,
  showHistory,
  inputElementRef,
  outputElementRef,
  latestInText,
  latestOutLang,
  languages,
  setLanguages,
  inputText,
  setInputText,
  outputText,
  setOutputText,
  inputLang,
  setInputLang,
  outputLang,
  setOutputLang,
  isSwaping,
  setIsSwaping,
  isMicRecording,
  setIsMicRecording,
  isInputSpeaking,
  setIsInputSpeaking,
  isOutputSpeaking,
  setIsOutputSpeaking,
  isPending,
}) {
  function handleAudioUpload(transcribedText) {
    setInputText(transcribedText);
  }

  // Keeps both textareas at the same height by matching them to the taller one
  useEffect(() => {
    if (!inputElementRef.current || !outputElementRef.current) return;

    // Step 1: Apply autosize
    autosize(inputElementRef.current);
    autosize(outputElementRef.current);

    // Step 2: Force update to get accurate height
    autosize.update(inputElementRef.current);
    autosize.update(outputElementRef.current);

    // Step 3: Compare and unify heights
    const inputHeight = inputElementRef.current.scrollHeight;
    const outputHeight = outputElementRef.current.scrollHeight;
    const maxHeight = Math.max(inputHeight, outputHeight);

    inputElementRef.current.style.height = `${maxHeight}px`;
    outputElementRef.current.style.height = `${maxHeight}px`;
  }, [inputText, outputText]);

  return (
    <div
      className={`relative ${showHistory && isFormVertical ? "px-0" : "px-3"}`}
    >
      <TranslateFeatures
        isFormVertical={isFormVertical}
        className={`h-[3.5rem] px-3`}
      />

      {/* Visible only on form smaller than 720 */}
      <LanguageBar
        inputLang={inputLang}
        outputLang={outputLang}
        inputText={inputText}
        outputText={outputText}
        setInputText={setInputText}
        setOutputText={setOutputText}
        setInputLang={setInputLang}
        setOutputLang={setOutputLang}
        setIsSwaping={setIsSwaping}
        latestInText={latestInText}
        latestOutLang={latestOutLang}
        languages={languages}
        isFormVertical={isFormVertical}
        className={isFormVertical ? "justify-around" : "hidden"}
      />

      {/* Visible only on form bigger than 720 */}
      <LanguageBar
        inputLang={inputLang}
        outputLang={outputLang}
        inputText={inputText}
        outputText={outputText}
        setInputText={setInputText}
        setOutputText={setOutputText}
        setInputLang={setInputLang}
        setOutputLang={setOutputLang}
        setIsSwaping={setIsSwaping}
        latestInText={latestInText}
        latestOutLang={latestOutLang}
        languages={languages}
        isFormVertical={isFormVertical}
        className={isFormVertical ? "hidden" : ""}
      />

      <div
        className={`flex items-center justify-center ${isFormVertical ? "flex-col" : "flex-row gap-2"}`}
      >
        <InputView
          inputLang={inputLang}
          inputText={inputText}
          setInputLang={setInputLang}
          setOutputLang={setOutputLang}
          setInputText={setInputText}
          setOutputText={setOutputText}
          inputElementRef={inputElementRef}
          handleAudioUpload={handleAudioUpload}
          setIsMicRecording={setIsMicRecording}
          isMicRecording={isMicRecording}
          isInputSpeaking={isInputSpeaking}
          setIsInputSpeaking={setIsInputSpeaking}
          isFormVertical={isFormVertical}
        />

        {/* Border bottom for input - it wii be invisible in some conditions */}
        {isFormVertical && (!inputText || !outputLang) && (
          <div className="w-full border-t border-t-gray-300"></div>
        )}

        <OutputView
          languages={languages}
          outputLang={outputLang}
          setOutputLang={setOutputLang}
          outputText={outputText}
          inputText={inputText}
          isPending={isPending}
          outputElementRef={outputElementRef}
          isOutputSpeaking={isOutputSpeaking}
          setIsOutputSpeaking={setIsOutputSpeaking}
          isFormVertical={isFormVertical}
        />
      </div>
    </div>
  );
}
