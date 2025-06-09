import { useShallow } from "zustand/react/shallow";
import { useAudioStatus } from "../_hooks/useAudioStatus";
import useTranslateStore from "../translateStore";
import CopyToClipboard from "./CopyToClipboard";
import GoogleSearchBtn from "./GoogleSearchBtn";
import Speaker from "./Speaker";
import { TextareaBox } from "./TextareaBox";

export default function OutputView({ isPending, outputElementRef }) {
  const { audioStatus, setAudioStatus } = useAudioStatus();
  const { isMainSectionVertical, inputText, outputText, outputLang } =
    useTranslateStore(
      useShallow((state) => ({
        isMainSectionVertical: state.isMainSectionVertical,
        inputText: state.inputText,
        outputText: state.outputText,
        outputLang: state.outputLang,
      })),
    );

  return (
    <TextareaBox
      className="relative w-full flex-1"
      ref={outputElementRef}
      isOutput={true}
      isPending={isPending}
      value={outputText}
      isMainSectionVertical={isMainSectionVertical}
      inputValue={inputText}
      outputLang={outputLang}
    >
      <Speaker
        className="mb-4 ml-1"
        value={outputText}
        speaking={audioStatus.isOutputSpeaking}
        setSpeaking={(bool) => setAudioStatus({ isOutputSpeaking: bool })}
      />

      <div className="mr-1 mb-4 ml-auto flex space-x-1">
        <CopyToClipboard value={outputText} />
        <GoogleSearchBtn value={outputText} />
      </div>
    </TextareaBox>
  );
}
