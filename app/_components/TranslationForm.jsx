"use client";

import { useEffect, useRef, useState } from "react";

import { playAudio } from "@/app/_lib/utils";
import Recorder from "./Recorder";
import SelectLang from "./SelectLang";
import Speaker from "./Speaker";

import autosize from "autosize";
import { enqueueTranslation } from "../_lib/translation/queu";
import CopyToClipboard from "./CopyToClipboard";
import { TextareaBox } from "./TextareaBox";
import TranslateFeatures from "./ui/TranslateFeatures";
import useTranslateStore from "../translateStore";
import { useShallow } from "zustand/react/shallow";
import DetectedLang from "./DetectedLang";
import { IoMdSwap } from "react-icons/io";
import SwapBtn from "./SwapBtn";

const initialState = {
  inputLanguage: "",
  outputLanguage: "",
  inputText: "",
  outputText: "Translation",
};

function TranslationForm({ languages: initialLanguages }) {
  const submitBtnRef = useRef(null);

  const [isPending, setIsPending] = useState(false);
  const [languages, setLanguages] = useState(initialLanguages);
  const [inputText, setInputText] = useState(initialState.inputText);
  const [outputText, setOutputText] = useState(initialState.outputText);
  const [inputLanguage, setInputLanguage] = useState(
    initialState.inputLanguage,
  );
  const [outputLanguage, setOutputLanguage] = useState(
    initialState.outputLanguage,
  );
  const [isMicRecording, setIsMicRecording] = useState(false); // State to track recording status and prevent audio playback during recording

  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const latestInputRef = useRef("");
  const latestOutputLangRef = useRef("");

  autosize(inputRef.current);
  autosize(outputRef.current);

  function handleSwap() {
    const curInLang = inputLanguage;
    const curOutLang = outputLanguage;
    const curInText = inputText;
    const curOutText = outputText;

    const newOutput =
      curInLang === "Auto-Detection" || curInLang === ""
        ? "Select a language"
        : curInLang;
    const newInput = curOutLang === "Select a language" ? "" : curOutLang;
    const newInputText = curOutText === "Translation" ? "" : curOutText;
    const newOutputText = curInText.trim() === "" ? "Translation" : curInText;

    setOutputLanguage(newOutput);
    setInputLanguage(newInput);
    setInputText(newInputText);
    setOutputText(newOutputText);
  }

  async function handleTranslate() {
    const translationPayload = {
      inputText,
      inputLanguage,
      outputLanguage,
    };

    // This flag is used to track the latest input text so that only the most recent translation result is shown. Prevents displaying outdated results when input changes quickly.
    latestInputRef.current = inputText;
    latestOutputLangRef.current = outputLanguage;

    setIsPending(true);

    // Add translation request to the queue and return the final result (only the latest input in the queue will be processed within X ms debounce interval)
    const result = await enqueueTranslation(translationPayload);
    const { translatedText, detectedLanguage } = result;

    // If the input text has changed while waiting for the translation, do not update the output text and set isPending to false
    if (latestInputRef.current === inputText) {
      setOutputText(translatedText);
      setInputLanguage(detectedLanguage);
      setIsPending(false);
    }
  }

  // Auto-translate on typing
  useEffect(() => {
    const trimmed = inputText.trim();
    const hasInput = trimmed !== "";
    const hasLang =
      outputLanguage &&
      outputLanguage !== "" &&
      outputLanguage !== "Select a language";

    const inputChanged = trimmed !== latestInputRef.current;
    const langChanged = outputLanguage !== latestOutputLangRef.current;

    if (!inputChanged && !langChanged) return;

    // If there is no input text, reset the output text and pending state
    if (!trimmed) {
      latestInputRef.current = "";
      setIsPending(false);
      setOutputText("Translation");

      return;
    }

    if (!hasLang || !hasInput) return;

    setOutputText("Translation");

    handleTranslate();
  }, [inputText, inputLanguage, outputLanguage]);

  const handleAudioUpload = (transcribedText) => {
    setInputText(transcribedText);
  };

  return (
    <div>
      {/* Header */}
      <TranslateFeatures />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-2">
        {/* Input Section */}
        <div className="relative flex-1 space-y-2">
          <DetectedLang
            detectedLanguage={inputLanguage}
            className="mb-4 px-4"
          />

          <TextareaBox
            isOutput={false}
            ref={inputRef}
            name="inputText"
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

            <p className="mt-1.5 mr-2 ml-auto flex items-center justify-center p-0 text-center align-middle text-xs leading-none text-inherit select-none">
              {inputText.length}/1000
            </p>
          </TextareaBox>
        </div>

        <SwapBtn onSwap={handleSwap} />

        {/* Output Section */}
        <div className="relative flex-1 space-y-2">
          <SelectLang
            languages={languages}
            name="outputLanguage"
            value={outputLanguage}
            onSelect={setOutputLanguage}
            className="mb-4 px-4"
          />

          <TextareaBox
            isOutput={true}
            isPending={isPending}
            ref={outputRef}
            name="outputText"
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
