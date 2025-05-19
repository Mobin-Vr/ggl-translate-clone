"use client";

import { SettingsGearIcon } from "@/public/icons";
import Tooltip from "./Tooltip";

export default function SettingBtn() {
  return (
    <Tooltip title="Settings">
      <button
        onClick={() => {}}
        type="button"
        className="hover:bg-icon-hover flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
      >
        <SettingsGearIcon size="24" />
      </button>
    </Tooltip>
  );
}
