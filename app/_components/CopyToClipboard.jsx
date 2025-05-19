import { CopyIcon } from "@/public/icons";
import Tooltip from "./ui/Tooltip";

export default function CopyToClipboard({ value, className }) {
  if (!value) return;

  async function copyToClipboard() {
    await navigator.clipboard.writeText(value);
  }

  return (
    <Tooltip title="Copy translation">
      <button
        type="button"
        onClick={copyToClipboard}
        className={`hover:bg-icon-hover flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-600 transition-all duration-300 ${className}`}
      >
        <CopyIcon />
      </button>
    </Tooltip>
  );
}
