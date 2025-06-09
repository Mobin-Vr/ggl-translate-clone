"use client";

import { MenuIcon } from "@/public/icons";
import Tooltip from "./TooltipWrapper";

export default function MenuBtn() {
  return (
    <Tooltip title="Not available">
      <button
        onClick={() => {}}
        type="button"
        className="hover:bg-icon-hover flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
      >
        <MenuIcon size="24" />
      </button>
    </Tooltip>
  );
}
