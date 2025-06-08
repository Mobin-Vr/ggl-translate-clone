import { useShallow } from "zustand/react/shallow";
import useTranslateStore from "../translateStore";
import DetectedLang from "./DetectedLang";
import SelectLang from "./SelectLang";
import SwapBtn from "./SwapBtn";

export default function LanguageBar({
  setIsSwaping,

  languages,
  recentHistory,
  className,
}) {
  const { isMainSectionVertical } = useTranslateStore(
    useShallow((state) => ({
      isMainSectionVertical: state.isMainSectionVertical,
    })),
  );

  return (
    <div className={`relative flex h-12 items-center select-none ${className}`}>
      <DetectedLang
        className={`font-sans text-sm font-[500] select-none ${isMainSectionVertical ? "" : "absolute left-5"}`}
      />

      <SwapBtn
        setIsSwaping={setIsSwaping}
        className="absolute left-1/2 -translate-x-1/2 text-xs"
      />

      <SelectLang
        languages={languages}
        recentHistory={recentHistory}
        className={`font-sans text-sm font-[500] ${isMainSectionVertical ? "" : "absolute left-1/2 -translate-x-[calc(50%-7.5rem)]"}`}
      />
    </div>
  );
}
