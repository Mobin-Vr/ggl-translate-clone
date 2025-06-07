import { CONFIG } from "../_lib/configs";
import ClearInputBtn from "./ClearInputBtn";
import Recorder from "./Recorder";
import Speaker from "./Speaker";
import { TextareaBox } from "./TextareaBox";

export default function InputView({
  inputElementRef,
  isMainSectionVertical,

  audioStatus,
  setAudioStatus,

  handleAudioUpload,

  inputText,
  setInputLang,
  setInputText,
  setOutputText,
}) {
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
        onAudioTranscriped={handleAudioUpload}
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

      <ClearInputBtn
        setInputLang={setInputLang}
        setInputText={setInputText}
        setOutputText={setOutputText}
        inputText={inputText}
      />

      <p className="mt-1.5 mr-2 mb-4 ml-auto flex items-center justify-center p-0 text-center align-middle text-xs leading-none text-gray-600 select-none">
        {inputText.length.toLocaleString("en-US")} /{" "}
        {CONFIG.ui.inputMaxLength.toLocaleString("en-US")}
      </p>
    </TextareaBox>
  );
}
