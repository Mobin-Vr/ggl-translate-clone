"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { translate } from "@/app/_lib/actions";
import { playAudio } from "@/app/_lib/utils";
import Recorder from "./Recorder";
import SelectLang from "./SelectLang";
import Speaker from "./Speaker";
import { Textarea } from "./textarea";

import SubmitButton from "./SubmitButton";
import TranslateFeatures from "./TranslateFeatures";
import autosize from "autosize";
import { CopyIcon } from "@/public/icons";

const initialState = {
  inputLanguage: "Auto-Detection",
  outputLanguage: "Persian",
  inputText: "",
  outputText: "",
};

function TranslationForm({ languages: initialLanguages }) {
  const submitBtnRef = useRef(null);

  const [languages, setLanguages] = useState(initialLanguages);
  const [inputText, setInputText] = useState(initialState.inputText);
  const [outputText, setOutputText] = useState(initialState.outputText);
  const [inputLanguage, setInputLanguage] = useState(
    initialState.inputLanguage,
  );
  const [outputLanguage, setOutputLanguage] = useState(
    initialState.outputLanguage,
  );
  const [state, formAction] = useActionState(translate, initialState);
  const [isMicRecording, setIsMicRecording] = useState(false); // State to track recording status and prevent audio playback during recording

  // A flag to prevent the loop of removing and re-adding the detected language.
  const [isDetectedLangRemoved, setIsDetectedLangRemoved] = useState(false);

  const inputRef = useRef(null);
  const outputRef = useRef(null);

  autosize(inputRef.current);
  autosize(outputRef.current);

  /* CHANGE when you want to have a realtime translation while you are typing!
   useEffect(() => {
      if (inputText.trim()) return;

      const deleyDebounceFn = setTimeout(() => {
         // Submiting the form via the btn
         submitBtnRef.current?.click();

        //  Or submiting via the form itself
         formRef.current?.requestSubmit();
      }, 2000);

      return clearTimeout(deleyDebounceFn);
   }, [inputText]);*/

  const handleAudioUpload = (transcribedText) => {
    setInputText(transcribedText);
  };

  useEffect(() => {
    setOutputText(state.outputText);

    if (state.inputLanguage === "Auto-Detection") return;

    const detectedLanguage = `${state.inputLanguage} - Detected`;

    if (languages.some((lang) => lang.name === detectedLanguage)) return;

    // Exit early if the detected language has already been removed
    if (isDetectedLangRemoved) return;

    setLanguages((prev) => {
      setIsDetectedLangRemoved(false);
      return [
        {
          id: detectedLanguage,
          name: detectedLanguage,
          code: null,
          direction: null,
        },
        ...prev,
      ];
    });

    setInputLanguage(detectedLanguage);
    // eslint-disable-next-line
  }, [state, languages]);

  return (
    <div>
      {/* Header */}
      <TranslateFeatures />

      {/* Translation Form */}
      <form action={formAction}>
        <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
          {/* Input Section */}
          <div className="relative flex-1 space-y-2">
            <SelectLang
              name="inputLanguage"
              languages={languages}
              value={inputLanguage}
              onSelect={setInputLanguage}
              onLanguagesUpdate={setLanguages}
              onToggleDetectedLang={setIsDetectedLangRemoved}
            />

            <div className="flex min-h-32 flex-col justify-between rounded-sm border border-gray-200 p-2 hover:shadow-sm md:px-5 md:py-4 md:text-xl lg:min-h-36">
              <Textarea
                className="resize-none border-none text-xl"
                onChange={(e) => setInputText(e.target.value)}
                name="inputText"
                value={inputText}
                ref={inputRef}
                maxLength={1000}
              />
              <div className="m-1.5 flex h-7 space-x-1">
                <Recorder
                  onAudioTranscriped={handleAudioUpload}
                  onDisableSpeaker={setIsMicRecording}
                />

                <Speaker
                  isThereText={inputText}
                  isRecordingInProgress={isMicRecording} // Prevents audio playback while the microphone is actively recording
                  onClick={() => playAudio(inputText)}
                />

                <p className="text-icon-color mt-1.5 mr-2 ml-auto flex items-center justify-center p-0 text-center align-middle text-xs leading-none select-none">
                  {inputText.length}/1000
                </p>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="relative flex-1 space-y-2">
            <SelectLang
              languages={languages}
              name="outputLanguage"
              value={outputLanguage}
              onSelect={setOutputLanguage}
            />

            <div className="bg-textaria-dis flex min-h-32 flex-col justify-between rounded-sm p-2 md:px-5 md:py-4 lg:min-h-36">
              <Textarea
                className="bg-textaria-dis resize-none border-none text-xl outline-none placeholder:text-black"
                placeholder="Translation"
                name="outputText"
                disabled
                value={outputText}
                ref={outputRef}
                style={{ cursor: "default" }}
              />

              <div className="m-1.5 flex h-7 space-x-1">
                <Speaker
                  isThereText={outputText}
                  onClick={() => playAudio(outputText)}
                />

                <button className="text-icon-color hover:bg-icon-hover mr-2 ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-300">
                  <CopyIcon size="18" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-5 mb-8 flex h-10 justify-end">
          <SubmitButton ref={submitBtnRef} disabled={!inputText} />
        </div>
      </form>
    </div>
  );
}

export default TranslationForm;

// ////////////////////////////////////
