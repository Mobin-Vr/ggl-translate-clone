import Link from "next/link";
import { RiHistoryLine } from "react-icons/ri";

export default function HistoryBtn({ onClick }) {
  return (
    <div className="mt-12 flex justify-center">
      <button
        onClick={onClick}
        className="flex flex-col items-center gap-2 text-gray-500 transition duration-300 hover:text-gray-700"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-300">
          <RiHistoryLine className="text-3xl" />
        </div>

        {/* Label */}
        <span className="text-sm font-medium">History</span>
      </button>
    </div>
  );
}
