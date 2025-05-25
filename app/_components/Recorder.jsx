import { useEffect } from "react";
import { PiMicrophone } from "react-icons/pi";
import { PiSquareFill } from "react-icons/pi";

import Tooltip from "./ui/Tooltip";
import useSpeechRecognition from "../_lib/hooks/useSpeechRecog";
import { MicSensitivityIcon, SquareIcon } from "@/public/icons";

export default function Recorder({
  onAudioTranscriped,
  onDisableSpeaker,
  className,
}) {
  // Use the custom hook for speech recognition
  const { isRecording, transcript, toggleRecording } = useSpeechRecognition();

  // Update transcript state when it changes in the hook
  useEffect(() => {
    if (transcript) onAudioTranscriped(transcript);

    console.log(transcript);
  }, [transcript]);

  // Update isMicRecording (TranslationForm) state when isRecordind changes in the custom hook
  useEffect(() => {
    onDisableSpeaker(isRecording);
  }, [isRecording]);

  return (
    <div className="flex flex-col items-center">
      <Tooltip title="Translate by voice (Only English)">
        <button
          onClick={toggleRecording}
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-all duration-300 ${className} ${
            isRecording ? "bg-blue-500" : "hover:bg-icon-hover bg-white"
          }`}
        >
          {!isRecording ? (
            <MicSensitivityIcon />
          ) : (
            <SquareIcon color="#fff" size="14" />
          )}
        </button>
      </Tooltip>
    </div>
  );
}
