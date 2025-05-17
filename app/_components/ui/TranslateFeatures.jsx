import { HiOutlineTranslate } from "react-icons/hi";

function TranslateFeatures() {
  return (
    <div className="mb-5 flex w-fit cursor-pointer items-center gap-1 rounded-md border border-gray-300 bg-blue-50 px-2 py-1.5 text-blue-700 transition-colors duration-300 hover:bg-blue-100">
      <span className="text-xl">
        <HiOutlineTranslate strokeWidth={1.8} />
      </span>
      <p className="text-sm font-medium">Text</p>
    </div>
  );
}

export default TranslateFeatures;
