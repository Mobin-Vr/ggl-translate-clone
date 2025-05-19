import { CopyIcon } from "@/public/icons";
import Tooltip from "./ui/Tooltip";

export default function CopyToClipboard({ value }) {
  if (!value) return;

  async function copyToClipboard() {
    await navigator.clipboard.writeText(value);
  }

  return (
    <Tooltip title="Copy translation">
      <button
        type="button"
        onClick={copyToClipboard}
        className="hover:bg-icon-hover mr-2 ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-inherit transition-all duration-300"
      >
        <CopyIcon size="16" />
      </button>
    </Tooltip>
  );
}
