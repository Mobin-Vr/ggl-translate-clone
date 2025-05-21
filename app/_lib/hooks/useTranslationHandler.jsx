import { enqueueTranslation } from "@/app/_lib/translation/queu";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { DEBOUNCE_DELAY } from "../configs";

export function useTranslationHandler(
  inputText,
  outputLang,
  inputLang,
  setOutputText,
  setInputLang,
  isSwaping,
  setIsSwaping,
  latestInText,
  latestOutLang,
  isDataFromHistory,
  setIsDataFromHistory,
) {
  const [isPending, setIsPending] = useState(false);
  const [debouncedInputText] = useDebounce(inputText, DEBOUNCE_DELAY);

  async function handleTranslate(trimmedText) {
    const translationPayload = {
      inputText: trimmedText,
      inputLang,
      outputLang,
    };

    // This flag is used to track the latest input text so that only the most recent translation result is shown. Prevents displaying outdated results when input changes quickly.
    latestInText.current = trimmedText;
    latestOutLang.current = outputLang;

    setIsPending(true);
    const result = await enqueueTranslation(translationPayload);
    const { translatedText, detectedLanguage } = result;

    // If the input text has changed while waiting for the translation, do not update the output text and set isPending to false
    if (latestInText.current === trimmedText) {
      setOutputText(translatedText);
      setInputLang(detectedLanguage);
      setIsPending(false);
    }
  }

  useEffect(() => {
    const trimmed = debouncedInputText.trim();

    const hasInput = trimmed !== "";
    const hasLang =
      outputLang && outputLang !== "" && outputLang !== "Select a language";

    const inputChanged = trimmed !== latestInText.current;
    const langChanged = outputLang !== latestOutLang.current;

    // If data is from history, do not translate
    if (isDataFromHistory) {
      if (inputChanged || langChanged) setIsDataFromHistory(false);
      return;
    }

    // If is just swapping dont do translation, just set in as false
    if (isSwaping) {
      setIsSwaping(false);
      return;
    }

    if (!inputChanged && !langChanged) return;

    if (!trimmed) {
      latestInText.current = "";
      setIsPending(false);
      setOutputText("");
      return;
    }

    if (!hasLang || !hasInput) return;

    setOutputText("");
    setInputLang("");

    handleTranslate(trimmed);
  }, [debouncedInputText, outputLang]);

  return { isPending };
}
