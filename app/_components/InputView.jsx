import { useShallow } from "zustand/react/shallow";
import useTranslateStore from "../translateStore";
import CharCounter from "./CharCounter";
import ClearInputBtn from "./ClearInputBtn";
import Recorder from "./Recorder";
import Speaker from "./Speaker";
import { TextareaBox } from "./TextareaBox";

export default function InputView({
  inputElementRef,
  audioStatus,
  setAudioStatus,
}) {
  const { isMainSectionVertical, inputText, setInputText } = useTranslateStore(
    useShallow((state) => ({
      isMainSectionVertical: state.isMainSectionVertical,
      inputText: state.inputText,
      setInputText: state.setInputText,
    })),
  );

  return (
    <TextareaBox
      isOutput={false}
      ref={inputElementRef}
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      className="relative w-full flex-1"
      isMainSectionVertical={isMainSectionVertical}
    >
      <Recorder
        className="mb-4 ml-1"
        onAudioTranscriped={(transcribedText) => setInputText(transcribedText)}
        onDisableSpeaker={(bool) =>
          setAudioStatus({ ...audioStatus, isMicRecording: bool })
        }
      />

      <Speaker
        className="mb-4 ml-1"
        value={inputText}
        speaking={audioStatus.isInputSpeaking}
        setSpeaking={(bool) =>
          setAudioStatus({ ...audioStatus, isInputSpeaking: bool })
        }
        isRecordingInProgress={audioStatus.isMicRecording} // Prevents audio playback while the microphone is actively recording
      />

      <ClearInputBtn />
      <CharCounter currentLength={inputText.length} />
    </TextareaBox>
  );
}
