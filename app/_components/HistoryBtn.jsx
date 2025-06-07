import { RiHistoryLine } from "react-icons/ri";

export default function HistoryBtn({ onClick, ref, showHistory }) {
  return (
    <div ref={ref} className="mt-12 mb-16 flex justify-center">
      <button
        onClick={onClick}
        className={`flex w-fit cursor-pointer flex-col items-center gap-2 transition duration-300 ${showHistory ? "text-blue-600" : "text-gray-500"}`}
      >
        <div
          className={`flex h-15 w-15 items-center justify-center rounded-full ${showHistory ? "border-0 bg-blue-100" : "border border-gray-300"}`}
        >
          <RiHistoryLine className="text-3xl" />
        </div>

        {/* Label */}
        <span className="text-sm font-medium">History</span>
      </button>
    </div>
  );
}
