import { XIcon } from "@/public/icons";
import Tooltip from "./ui/Tooltip";
import useTranslateStore from "../translateStore";
import { useShallow } from "zustand/react/shallow";

export default function ClearInputBtn({}) {
  const { inputText, setInputLang, setInputText, setOutputText } =
    useTranslateStore(
      useShallow((state) => ({
        inputText: state.inputText,
        setInputLang: state.setInputLang,
        setInputText: state.setInputText,
        setOutputText: state.setOutputText,
      })),
    );

  if (!inputText.trim()) return;

  function handleClear() {
    setInputLang("");
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
