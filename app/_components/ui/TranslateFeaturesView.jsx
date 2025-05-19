import { LanguageIcon } from "@/public/icons";
import { HiOutlineTranslate } from "react-icons/hi";

function TranslateFeaturesView({ icon, text, onClick, isActive }) {
  return (
    <div
      onClick={onClick}
      //   className="flex w-fit cursor-pointer items-center gap-1.5 rounded-sm border border-gray-300 bg-blue-50 px-3.5 py-1.5 text-blue-700 transition-colors duration-300 active:bg-blue-200"
      // >
      className={`flex w-fit cursor-pointer items-center gap-1.5 rounded-sm border border-gray-300 px-3.5 py-2 text-sm font-medium text-blue-700 transition-colors duration-300 ${
        isActive ? "bg-blue-100" : ""
      }`}
    >
      <span className="text-xl">{icon}</span>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}

export default TranslateFeaturesView;
