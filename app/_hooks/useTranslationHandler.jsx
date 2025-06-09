import { enqueueTranslation } from "@/app/_lib/translation/queu";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useShallow } from "zustand/react/shallow";
import { CONFIG } from "../_lib/configs";
import useTranslateStore from "../translateStore";

export function useTranslationHandler(isSwaping, setIsSwaping) {
  const {
    getIsDataFromHistory,
    setIsDataFromHistory,
    inputText,
    outputLang,
    getLatestInText,
    getLatestOutLang,
    setOutputText,
    setInputLang,
    setLatestInText,
    setLatestOutLang,
  } = useTranslateStore(
    useShallow((state) => ({
      getIsDataFromHistory: state.getIsDataFromHistory,
      setIsDataFromHistory: state.setIsDataFromHistory,
      inputText: state.inputText,
      outputLang: state.outputLang,
      getLatestInText: state.getLatestInText,
      getLatestOutLang: state.getLatestOutLang,
      setOutputText: state.setOutputText,
      setInputLang: state.setInputLang,
      setLatestInText: state.setLatestInText,
      setLatestOutLang: state.setLatestOutLang,
    })),
  );

  const [isPending, setIsPending] = useState(false);
  const [debouncedInputText] = useDebounce(inputText, CONFIG.debounceDelay);

  async function handleTranslate(trimmedText) {
    const translationPayload = {
      inputText: trimmedText,
      outputLang,
    };

    // This flag is used to track the latest input text so that only the most recent translation result is shown. Prevents displaying outdated results when input changes quickly.
    setLatestInText(trimmedText);
    setLatestOutLang(outputLang);

    const result = await enqueueTranslation(translationPayload);
    const { translation, detectedLanguage } = result;

    // If the input text has changed while waiting for the translation, do not update the output text and set isPending to false
    if (getLatestInText() === trimmedText) {
      setOutputText(translation);
      setInputLang(detectedLanguage);
      setIsPending(false);
    }
  }

  useEffect(() => {
    const trimmed = inputText.trim();

    const hasInput = trimmed !== "";
    const hasLang =
      outputLang && outputLang !== "" && outputLang !== "Select a language";

    const inputChanged = trimmed !== getLatestInText();
    const langChanged = outputLang !== getLatestOutLang();

    if ((inputChanged || langChanged) && getIsDataFromHistory()) {
      setIsDataFromHistory(false);
    }

    // If data is from history, do not translate
    if (getIsDataFromHistory()) return;

    // If is just swapping dont do translation, just set in as false
    if (isSwaping) {
      setIsSwaping(false);
      return;
    }

    if (!inputChanged && !langChanged) return;

    if (!trimmed) {
      setLatestInText("");
      setIsPending(false);
      setOutputText("");
      return;
    }

    if (!hasLang || !hasInput) return;

    if (inputChanged || langChanged) setIsPending(true);

    setOutputText("");
    setInputLang("");

    handleTranslate(debouncedInputText.trim());

    // eslint-disable-next-line
  }, [debouncedInputText, outputLang]);

  return { isPending };
}
