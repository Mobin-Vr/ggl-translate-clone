"use client";

import { SettingsGearIcon } from "@/public/icons";
import Tooltip from "./TooltipWrapper";

export default function SettingBtn({ size = 24 }) {
  return (
    <Tooltip title="Not available">
      <button
        onClick={() => {}}
        type="button"
        className="hover:bg-icon-hover flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
      >
        <SettingsGearIcon size={size} />
      </button>
    </Tooltip>
  );
}
