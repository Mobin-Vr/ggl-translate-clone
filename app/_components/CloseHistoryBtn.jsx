import { XIcon } from "@/public/icons";

export default function CloseHistoryBtn({ setShowHistory }) {
  return (
    <div className="flex border-b border-b-gray-300 px-6 text-gray-600">
      <h1 className="my-5 text-3xl">History</h1>
      <button
        onClick={() => setShowHistory(false)}
        className="hover:bg-icon-hover z-50 mt-2 mr-0 ml-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300"
      >
        <XIcon />
      </button>
    </div>
  );
}
