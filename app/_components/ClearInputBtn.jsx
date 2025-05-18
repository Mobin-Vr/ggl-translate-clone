import { XIcon } from "@/public/icons";
import Tooltip from "./ui/Tooltip";
import { PiXCircleDuotone } from "react-icons/pi";
import { MdClear } from "react-icons/md";

export default function ClearInputBtn({
  setInputLanguage,
  setOutputLanguage,
  setInputText,
  setOutputText,
  inputText,
}) {
  if (!inputText.trim()) return;

  function handleClear() {
    setInputLanguage("");
    setOutputLanguage("Select a language");
    setInputText("");
    setOutputText("Translation");
  }

  return (
    <div className="flex flex-col items-center">
      <Tooltip title="Clear source text">
        <button
          onClick={handleClear}
          type="button"
          className="hover:bg-icon-hover text-bold absolute top-0 right-0 z-50 flex h-7 w-7 -translate-x-1/2 translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-all duration-300"
        >
          <MdClear />
        </button>
      </Tooltip>
    </div>
  );
}
