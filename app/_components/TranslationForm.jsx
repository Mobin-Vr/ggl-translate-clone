"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { playAudio } from "@/app/_lib/utils";
import Recorder from "./Recorder";
import SelectLang from "./SelectLang";
import Speaker from "./Speaker";

import autosize from "autosize";
import {
  TRANSLATION_FORM_INITIAL_STATE,
  USER_MOST_FREQUENT_OUT_LANG,
} from "../_lib/configs";
import { useTranslationHandler } from "../_lib/hooks/useTranslationHandler";
import ClearInputBtn from "./ClearInputBtn";
import CopyToClipboard from "./CopyToClipboard";
import DetectedLang from "./DetectedLang";
import SwapBtn from "./SwapBtn";
import { TextareaBox } from "./TextareaBox";
import TranslateFeatures from "./ui/TranslateFeatures";

// LATER
const mostUsedLang = USER_MOST_FREQUENT_OUT_LANG;

function TranslationForm({ languages: initialLanguages }) {
  const inputElementRef = useRef(null);
  const outputElementRef = useRef(null);

  const latestInText = useRef("");
  const latestOutLang = useRef("");

  const [languages, setLanguages] = useState(initialLanguages);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputLang, setInputLang] = useState("");
  const [outputLang, setOutputLang] = useState("");
  const [isSwaping, setIsSwaping] = useState(false);

  // track recording status and prevent audio playback during recording
  const [isMicRecording, setIsMicRecording] = useState(false);

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
  );

  useLayoutEffect(() => {
    if (inputElementRef.current) autosize(inputElementRef.current);
    if (outputElementRef.current) autosize(outputElementRef.current);
  }, []);

  function handleAudioUpload(transcribedText) {
    setInputText(transcribedText);
  }

  return (
    <div>
      {/* Header */}
      <TranslateFeatures />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-2">
        {/* Input Section */}
        <div className="relative flex-1 space-y-2">
          <DetectedLang detectedLanguage={inputLang} className="mb-4 px-4" />

          <TextareaBox
            isOutput={false}
            ref={inputElementRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          >
            <Recorder
              onAudioTranscriped={handleAudioUpload}
              onDisableSpeaker={setIsMicRecording}
            />

            <Speaker
              isThereText={inputText}
              isRecordingInProgress={isMicRecording} // Prevents audio playback while the microphone is actively recording
              onClick={() => playAudio(inputText)}
            />

            <ClearInputBtn
              setInputLang={setInputLang}
              setOutputLang={setOutputLang}
              setInputText={setInputText}
              setOutputText={setOutputText}
              inputText={inputText}
            />

            <p className="mt-1.5 mr-2 ml-auto flex items-center justify-center p-0 text-center align-middle text-xs leading-none text-inherit select-none">
              {inputText.length}/1000
            </p>
          </TextareaBox>
        </div>

        <SwapBtn
          inputText={inputText}
          outputText={outputText}
          inputLang={inputLang}
          outputLang={outputLang}
          setInputText={setInputText}
          setOutputText={setOutputText}
          setInputLang={setInputLang}
          setOutputLang={setOutputLang}
          setIsSwaping={setIsSwaping}
          latestInText={latestInText}
          latestOutLang={latestOutLang}
        />

        {/* Output Section */}
        <div className="relative flex-1 space-y-2">
          <SelectLang
            languages={languages}
            value={outputLang}
            onSelect={setOutputLang}
            className="mb-4 px-4"
          />

          <TextareaBox
            isOutput={true}
            isPending={isPending}
            ref={outputElementRef}
            value={outputText}
          >
            <Speaker
              isThereText={outputText}
              onClick={() => playAudio(outputText)}
            />

            {outputText && <CopyToClipboard value={outputText} />}
          </TextareaBox>
        </div>
      </div>
    </div>
  );
}

export default TranslationForm;

// ////////////////////////////////////
