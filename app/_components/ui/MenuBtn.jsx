"use client";

import { AppsDotsIcon, MenuIcon } from "@/public/icons";
import Tooltip from "./Tooltip";

export default function MenuBtn() {
  return (
    <Tooltip title="Main menu">
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
