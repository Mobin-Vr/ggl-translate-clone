import { HiOutlineArrowLongRight } from "react-icons/hi2";
import DeleteTranslationBtn from "./DeleteTranslationBtn";
import TimeAgo from "./TimeAgo";
import TextExpander from "./TextExpander";

function HistoryCard({ translation, onDelete, onClick }) {
  const {
    translation_id: translationId,
    input_language: inputLang,
    output_language: outputLang,
    input_text: inputText,
    output_text: outputText,
    created_at: createdAt,
  } = translation;

  return (
    <li
      onClick={onClick}
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
        onDelete={onDelete}
        className="opacity-0 transition-opacity group-hover:opacity-100"
      />
    </li>
  );
}

export default HistoryCard;
