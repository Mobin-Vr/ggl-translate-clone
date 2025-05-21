"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslationHandler } from "../_lib/hooks/useTranslationHandler";
import HistoryBtn from "./HistoryBtn";
import TranslationForm from "./TranslationForm";
import TranslationHistory from "./TranslationHistory";

export default function TranslationPanel({ supportedLangs }) {
  const formRef = useRef(null);
  const inputElementRef = useRef(null);
  const outputElementRef = useRef(null);

  const latestInText = useRef("");
  const latestOutLang = useRef("");

  const [languages, setLanguages] = useState(supportedLangs);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputLang, setInputLang] = useState("");
  const [outputLang, setOutputLang] = useState("");
  const [isSwaping, setIsSwaping] = useState(false);
  const [isDataFromHistory, setIsDataFromHistory] = useState(false);

  const [showFrom, setShowForm] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [isFormVertical, setIsFormVertical] = useState(false);

  // track recording status and prevent audio playback during recording
  const [isMicRecording, setIsMicRecording] = useState(false);
  const [isInputSpeaking, setIsInputSpeaking] = useState(false);
  const [isOutputSpeaking, setIsOutputSpeaking] = useState(false);

  const { isPending } = useTranslationHandler(
    inputText,
    outputLang,
    inputLang,
    setOutputText,
    setInputLang,
    isSwaping,
    setIsSwaping,
    latestInText,
    latestOutLang,
    isDataFromHistory,
    setIsDataFromHistory,
  );

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
    handleResize(); // Run once initially to set the correct state

    return () => window.removeEventListener("resize", handleResize);
  }, [showHistory]);

  return (
    <div className="flex h-full">
      {showFrom && (
        <div
          ref={formRef}
          className={`flex-1 overflow-x-auto ${
            showHistory ? "md:mr-[21rem] xl:mr-[30rem]" : ""
          }`}
        >
          <TranslationForm
            languages={languages}
            isFormVertical={isFormVertical}
            showHistory={showHistory}
            inputElementRef={inputElementRef}
            outputElementRef={outputElementRef}
            latestInText={latestInText}
            latestOutLang={latestOutLang}
            languages={languages}
            setLanguages={setLanguages}
            inputText={inputText}
            setInputText={setInputText}
            outputText={outputText}
            setOutputText={setOutputText}
            inputLang={inputLang}
            setInputLang={setInputLang}
            outputLang={outputLang}
            setOutputLang={setOutputLang}
            isSwaping={isSwaping}
            setIsSwaping={setIsSwaping}
            isMicRecording={isMicRecording}
            setIsMicRecording={setIsMicRecording}
            isInputSpeaking={isInputSpeaking}
            setIsInputSpeaking={setIsInputSpeaking}
            isOutputSpeaking={isOutputSpeaking}
            setIsOutputSpeaking={setIsOutputSpeaking}
            isPending={isPending}
          />
          <HistoryBtn onClick={() => setShowHistory(true)} />
        </div>
      )}

      {showHistory && (
        <TranslationHistory
          setInputText={setInputText}
          setOutputText={setOutputText}
          setInputLang={setInputLang}
          setOutputLang={setOutputLang}
          setIsDataFromHistory={setIsDataFromHistory}
          latestInText={latestInText} // ref
          latestOutLang={latestOutLang} // ref
          handleCloseHistory={() => setShowHistory(false)}
          className="fixed top-[65px] right-0 z-50 h-[calc(100vh-65px)] w-full border-l border-gray-300 md:max-w-[21rem] xl:max-w-[30rem]"
        />
      )}
    </div>
  );
}
