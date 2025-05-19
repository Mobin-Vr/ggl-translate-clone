"use client";

import { AppsDotsIcon } from "@/public/icons";
import Tooltip from "./Tooltip";

export default function DottedAppBtn() {
  return (
    <Tooltip title="Not available">
      <button
        onClick={() => {}}
        type="button"
        className="hover:bg-icon-hover flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
      >
        <AppsDotsIcon />
      </button>
    </Tooltip>
  );
}
