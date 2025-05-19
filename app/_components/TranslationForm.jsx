"use client";

import { useEffect, useRef, useState } from "react";

import { playAudio } from "@/app/_lib/utils";
import Recorder from "./Recorder";
import SelectLang from "./SelectLang";
import Speaker from "./Speaker";

import autosize from "autosize";
import { USER_MOST_FREQUENT_OUT_LANG } from "../_lib/configs";
import { useTranslationHandler } from "../_lib/hooks/useTranslationHandler";
import ClearInputBtn from "./ClearInputBtn";
import CopyToClipboard from "./CopyToClipboard";
import DetectedLang from "./DetectedLang";
import GoogleSearchBtn from "./GoogleSearchBtn";
import SwapBtn from "./SwapBtn";
import { TextareaBox } from "./TextareaBox";
import TranslateFeatures from "./ui/TranslateFeatures";

// LATER
const mostUsedLang = USER_MOST_FREQUENT_OUT_LANG;

export default function TranslationForm({ languages: initialLanguages }) {
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
  );

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
    <div className="px-12">
      {/* Header */}
      <TranslateFeatures />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-1">
        {/* Input Section */}
        <div className="relative flex-1 space-y-2">
          <DetectedLang
            detectedLanguage={inputLang}
            className="mb-3.5 px-4 select-none"
          />

          <TextareaBox
            isOutput={false}
            ref={inputElementRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          >
            <Recorder
              onAudioTranscriped={handleAudioUpload}
              onDisableSpeaker={setIsMicRecording}
              className="mb-4 ml-1"
            />

            <Speaker
              value={inputText}
              isRecordingInProgress={isMicRecording} // Prevents audio playback while the microphone is actively recording
              className="mb-4 ml-1"
              speaking={isInputSpeaking}
              setSpeaking={setIsInputSpeaking}
            />

            <ClearInputBtn
              setInputLang={setInputLang}
              setOutputLang={setOutputLang}
              setInputText={setInputText}
              setOutputText={setOutputText}
              inputText={inputText}
            />

            <p className="mt-1.5 mr-2 mb-4 ml-auto flex items-center justify-center p-0 text-center align-middle text-xs leading-none text-gray-600 select-none">
              {inputText.length} / 1,000
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
            className="mb-3.5 px-4"
          />

          <TextareaBox
            isOutput={true}
            isPending={isPending}
            ref={outputElementRef}
            value={outputText}
          >
            <Speaker
              value={outputText}
              speaking={isOutputSpeaking}
              setSpeaking={setIsOutputSpeaking}
              className="mb-4 ml-1"
            />

            <div className="mr-1 mb-4 ml-auto flex space-x-1">
              <CopyToClipboard value={outputText} />
              <GoogleSearchBtn value={outputText} />
            </div>
          </TextareaBox>
        </div>
      </div>
    </div>
  );
}
