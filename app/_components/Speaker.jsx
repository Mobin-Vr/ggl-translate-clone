import { PiSpeakerSimpleHigh } from "react-icons/pi";
import Tooltip from "./ui/Tooltip";
import { SpeakerIcon, SquareIcon } from "@/public/icons";
import { isSpeaking, playAudio, stopAudio } from "../_lib/utils";
import { useEffect, useState } from "react";

export default function Speaker({
  value,
  isRecordingInProgress,
  className,
  speaking,
  setSpeaking,
}) {
  if (!value || isRecordingInProgress) return;

  function handleClick() {
    if (speaking) {
      stopAudio();
      setSpeaking(false);
    } else {
      setSpeaking(true);
      playAudio(value, () => setSpeaking(false));
    }
  }

  return (
    <Tooltip title="Listen (Only Latin)">
      <button
        onClick={handleClick}
        type="button"
        className={`hover:bg-icon-hover flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-all duration-300 ${className}`}
      >
        {speaking ? <SquareIcon size={14} color="#4a5565" /> : <SpeakerIcon />}
      </button>
    </Tooltip>
  );
}
