import { HiOutlineArrowLongRight } from "react-icons/hi2";
import DeleteTranslationBtn from "./DeleteTranslationBtn";
import TimeAgo from "./TimeAgo";
import TextExpander from "./TextExpander";

function HistoryCard({ translation, onDelete }) {
  const {
    translation_id: translationId,
    input_language: inputLang,
    output_language: outputLang,
    input_text: inputText,
    output_text: outputText,
    created_at: createdAt,
  } = translation;

  return (
    <li className="relative flex items-center justify-between p-4 text-sm hover:bg-gray-50">
      <div>
        <p className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          {inputLang}
          <span className="text-lg">
            <HiOutlineArrowLongRight />
          </span>
          {outputLang}
        </p>

        <div className="space-y-2 pr-5">
          <TextExpander>{inputText}</TextExpander>
          <TextExpander className="text-gray-400">{outputText}</TextExpander>
        </div>
      </div>

      <TimeAgo
        className="absolute top-3 right-3 text-sm text-gray-300"
        date={createdAt}
      />

      <DeleteTranslationBtn onDelete={onDelete} />
    </li>
  );
}

export default HistoryCard;
