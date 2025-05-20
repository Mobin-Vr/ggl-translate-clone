import DetectedLang from "./DetectedLang";
import SelectLang from "./SelectLang";
import SwapBtn from "./SwapBtn";

export default function LanguageBar({
  inputLang,
  outputLang,
  inputText,
  outputText,
  setInputText,
  setOutputText,
  setInputLang,
  setOutputLang,
  setIsSwaping,
  latestInText,
  latestOutLang,
  languages,
  className,
  isFormVertical,
}) {
  return (
    <div className={`relative flex h-12 items-center select-none ${className}`}>
      <DetectedLang
        detectedLanguage={inputLang}
        className={`font-sans text-sm font-[500] select-none ${isFormVertical ? "" : "absolute left-5"}`}
      />

      <SwapBtn
        inputText={inputText}
        outputText={outputText}
        inputLang={inputLang}
        outputLang={outputLang}
        setInputText={setInputText}
        setOutputText={setOutputText}
        setInputLang={setInputLang}
        setOutputLang={setOutputLang}
        setIsSwaping={setIsSwaping}
        latestInText={latestInText}
        latestOutLang={latestOutLang}
        className="absolute left-1/2 -translate-x-1/2 text-xs"
      />

      <SelectLang
        languages={languages}
        value={outputLang}
        onSelect={setOutputLang}
        isFormVertical={isFormVertical}
        className={`font-sans text-sm font-[500] ${isFormVertical ? "" : "absolute left-1/2 -translate-x-[calc(50%-7.5rem)]"}`}
      />
    </div>
  );
}
