import { HiOutlineArrowLongRight } from "react-icons/hi2";
import DeleteTranslationBtn from "./DeleteTranslationBtn";
import TimeAgo from "./TimeAgo";
import TextExpander from "./TextExpander";
import { useRef } from "react";

function HistoryCard({ translation, onDelete, moveHistoryDataToForm }) {
  const deleteBtnRef = useRef(null);

  const {
    input_language: inputLang,
    output_language: outputLang,
    input_text: inputText,
    output_text: outputText,
    created_at: createdAt,
  } = translation;

  function handleClick(e) {
    if (deleteBtnRef.current?.contains(e.target)) return;

    moveHistoryDataToForm(translation);
  }

  return (
    <li
      onClick={(e) => handleClick(e)}
      className="group relative flex cursor-pointer items-center justify-between border-b border-gray-300 p-4 text-sm hover:bg-slate-50"
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
          <TextExpander>{inputText}</TextExpander>
          <TextExpander className="text-gray-500">{outputText}</TextExpander>
        </div>
      </div>

      <TimeAgo
        className="absolute top-3 right-3 mt-0.5 text-xs font-extralight text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
        date={createdAt}
      />

      <DeleteTranslationBtn
        ref={deleteBtnRef}
        onDelete={onDelete}
        className="pointer-events-none opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100"
      />
    </li>
  );
}

export default HistoryCard;
