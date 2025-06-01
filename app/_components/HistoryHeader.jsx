import { ArrowBackIcon, XIcon } from "@/public/icons";

export default function HistoryHeader({ setShowHistory, isMobileHistoryView }) {
  return (
    <div
      className={`flex items-center border-b border-b-gray-300 text-gray-600 ${
        isMobileHistoryView ? "px-1 py-1" : "px-6 py-5"
      }`}
    >
      {isMobileHistoryView ? (
        <>
          <button
            onClick={() => setShowHistory(false)}
            className="hover:bg-icon-hover mr-3 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
          >
            <ArrowBackIcon />
          </button>
          <h1 className="text-lg">History</h1>
        </>
      ) : (
        <>
          <h1 className="text-3xl">History</h1>
          <button
            onClick={() => setShowHistory(false)}
            className="hover:bg-icon-hover ml-auto flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
          >
            <XIcon />
          </button>
        </>
      )}
    </div>
  );
}
