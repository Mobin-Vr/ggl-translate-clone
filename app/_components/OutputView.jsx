import CopyToClipboard from "./CopyToClipboard";
import GoogleSearchBtn from "./GoogleSearchBtn";
import Speaker from "./Speaker";
import { TextareaBox } from "./TextareaBox";

export default function OutputView({
  languages,
  outputLang,
  setOutputLang,
  outputText,
  inputText,
  isPending,
  outputElementRef,
  isOutputSpeaking,
  setIsOutputSpeaking,
  isFormVertical,
}) {
  return (
    <TextareaBox
      isOutput={true}
      isPending={isPending}
      ref={outputElementRef}
      value={outputText}
      className="relative w-full flex-1"
      isFormVertical={isFormVertical}
      inputValue={inputText}
      outputLang={outputLang}
    >
      <Speaker
        value={outputText}
        speaking={isOutputSpeaking}
        setSpeaking={setIsOutputSpeaking}
        className="mb-4 ml-1"
      />

      <div className="mr-1 mb-4 ml-auto flex space-x-1">
        <CopyToClipboard value={outputText} />
        <GoogleSearchBtn value={outputText} />
      </div>
    </TextareaBox>
  );
}
