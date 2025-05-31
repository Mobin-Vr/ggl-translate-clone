import { useShallow } from "zustand/react/shallow";
import useTranslateStore from "../translateStore";
import Tooltip from "./ui/Tooltip";

function DetectedLang({ detectedLanguage, className }) {
  const cleanLang = detectedLanguage?.trim().toLowerCase();

  const { getIsDataFromHistory } = useTranslateStore(
    useShallow((state) => ({
      getIsDataFromHistory: state.getIsDataFromHistory,
    })),
  );

  const displayText = getIsDataFromHistory()
    ? detectedLanguage
    : cleanLang && cleanLang !== "unknown language" && detectedLanguage !== ""
      ? `${detectedLanguage} - detected`
      : "Auto - detection";

  return (
    <Tooltip title="Auto language detection">
      <div className={`w-fit text-sm text-blue-600 ${className}`}>
        {displayText}
      </div>
    </Tooltip>
  );
}

export default DetectedLang;
