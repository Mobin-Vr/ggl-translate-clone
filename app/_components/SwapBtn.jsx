import { IoMdSwap } from "react-icons/io";
import Tooltip from "./ui/Tooltip";

export default function SwapBtn({ onSwap }) {
  return (
    <div className="flex flex-col items-center">
      <Tooltip title="Swap lnaguages">
        <button
          onClick={onSwap}
          type="button"
          className="hover:bg-icon-hover absolute left-1/2 z-50 flex h-7 w-7 -translate-x-1/2 -translate-y-1 cursor-pointer items-center justify-center rounded-full transition-all duration-300"
        >
          <IoMdSwap size={22} strokeWidth={1} className="text-gray-500" />
        </button>
      </Tooltip>
    </div>
  );
}
