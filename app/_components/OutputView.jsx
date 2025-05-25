import CopyToClipboard from "./CopyToClipboard";
import GoogleSearchBtn from "./GoogleSearchBtn";
import Speaker from "./Speaker";
import { TextareaBox } from "./TextareaBox";

export default function OutputView({
  isPending,
  outputElementRef,

  outputLang,
  outputText,
  inputText,

  audioStatus,
  setAudioStatus,

  isMainSectionVertical,
}) {
  return (
    <TextareaBox
      isOutput={true}
      isPending={isPending}
      ref={outputElementRef}
      value={outputText}
      className="relative w-full flex-1"
      isMainSectionVertical={isMainSectionVertical}
      inputValue={inputText}
      outputLang={outputLang}
    >
      <Speaker
        value={outputText}
        speaking={audioStatus.isOutputSpeaking}
        setSpeaking={(bool) =>
          setAudioStatus({ ...audioStatus, isOutputSpeaking: bool })
        }
        className="mb-4 ml-1"
      />

      <div className="mr-1 mb-4 ml-auto flex space-x-1">
        <CopyToClipboard value={outputText} />
        <GoogleSearchBtn value={outputText} />
      </div>
    </TextareaBox>
  );
}
