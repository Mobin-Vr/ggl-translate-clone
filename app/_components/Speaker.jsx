import { PiSpeakerSimpleHigh } from "react-icons/pi";

function SpeakerBtn({ onClick, isThereText, isRecordingInProgress }) {
  if (!isThereText || isRecordingInProgress) return null;

  return (
    <button
      onClick={onClick}
      type="button"
      className="hover:bg-opacity-50 hover:bg-icon-hover flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300"
    >
      <PiSpeakerSimpleHigh
        strokeWidth={2}
        className="text-icon-color h-[1.15rem] w-[1.15rem]"
      />
    </button>
  );
}

export default SpeakerBtn;
