import { PiSpeakerSimpleHigh } from "react-icons/pi";
import Tooltip from "./ui/Tooltip";

function SpeakerBtn({ onClick, isThereText, isRecordingInProgress }) {
  if (!isThereText || isRecordingInProgress) return null;

  return (
    <Tooltip title="Listen">
      <button
        onClick={onClick}
        type="button"
        className="hover:bg-icon-hover flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300"
      >
        <PiSpeakerSimpleHigh
          strokeWidth={2}
          className="h-[1.15rem] w-[1.15rem] text-inherit"
        />
      </button>
    </Tooltip>
  );
}

export default SpeakerBtn;
