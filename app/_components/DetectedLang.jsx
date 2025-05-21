import Tooltip from "./ui/Tooltip";

function DetectedLang({ detectedLanguage, className }) {
  const displayText = detectedLanguage ? detectedLanguage : "Auto - detection";

  return (
    <Tooltip title="Auto langauge detection">
      <div className={`w-fit text-sm text-blue-600 ${className}`}>
        {displayText}
      </div>
    </Tooltip>
  );
}

export default DetectedLang;
