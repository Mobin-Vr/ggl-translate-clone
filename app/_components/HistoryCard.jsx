import { useRef } from "react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import DeleteTranslationBtn from "./DeleteTranslationBtn";

function HistoryCard({ translation, onDelete, moveHistoryDataToForm }) {
  const deleteBtnRef = useRef(null);

  const {
    input_language: inputLang,
    output_language: outputLang,
    input_text: inputText,
    output_text: outputText,
  } = translation;

  function handleClick(e) {
    if (deleteBtnRef.current?.contains(e.target)) return;

    moveHistoryDataToForm(translation);
  }

  return (
    <li
      onClick={(e) => handleClick(e)}
      className="group relative flex cursor-pointer items-start justify-between border-b border-gray-300 p-4 text-sm hover:bg-slate-50"
    >
      <div>
        <p className="mb-3 flex items-center gap-2 text-[0.8rem] text-gray-500">
          {inputLang}
          <span className="text-base">
            <HiOutlineArrowLongRight />
          </span>
          {outputLang}
        </p>

        <div className="space-y-2 pr-5">
          <p>{inputText}</p>
          <p className="text-gray-500">{outputText}</p>
        </div>
      </div>

      <DeleteTranslationBtn
        ref={deleteBtnRef}
        onDelete={onDelete}
        className="pointer-events-none absolute top-7 right-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100"
      />
    </li>
  );
}

export default HistoryCard;
