import ClearInputBtn from "./ClearInputBtn";
import Recorder from "./Recorder";
import Speaker from "./Speaker";
import { TextareaBox } from "./TextareaBox";

export default function InputView({
  inputLang,
  inputText,
  setInputLang,
  setOutputLang,
  setInputText,
  setOutputText,
  inputElementRef,
  handleAudioUpload,
  setIsMicRecording,
  isMicRecording,
  isInputSpeaking,
  setIsInputSpeaking,
  isFormVertical,
}) {
  return (
    <TextareaBox
      isOutput={false}
      ref={inputElementRef}
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      className="relative w-full flex-1"
      isFormVertical={isFormVertical}
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
  );
}
