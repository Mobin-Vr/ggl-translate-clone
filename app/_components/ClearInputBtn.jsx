import { XIcon } from "@/public/icons";
import Tooltip from "./ui/Tooltip";
import { PiXCircleDuotone } from "react-icons/pi";
import { MdClear } from "react-icons/md";

export default function ClearInputBtn({
  setInputLang,
  setOutputLang,
  setInputText,
  setOutputText,
  inputText,
}) {
  if (!inputText.trim()) return;

  function handleClear() {
    setInputLang("");
    setOutputLang("Select a language");
    setInputText("");
    setOutputText("");
  }

  return (
    <div className="flex flex-col items-center">
      <Tooltip title="Clear source text">
        <button
          onClick={handleClear}
          type="button"
          className="hover:bg-icon-hover text-bold absolute top-0 right-0 z-50 mt-2 mr-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-600 transition-all duration-300"
        >
          <XIcon />
        </button>
      </Tooltip>
    </div>
  );
}
