import { DocIcon, ImageIcon, LanguageIcon, WebsiteIcon } from "@/public/icons";
import { useRef, useState } from "react";
import ScrollableFade from "../ScrollableFade";
import TranslateFeaturesView from "./TranslateFeaturesView";
import useTranslateStore from "@/app/translateStore";
import { useShallow } from "zustand/react/shallow";

function TranslateFeatures({ className }) {
  const [active, setActive] = useState("Text"); // CHANGE LATER
  const containerRef = useRef(null);

  const { isMainSectionVertical } = useTranslateStore(
    useShallow((state) => ({
      isMainSectionVertical: state.isMainSectionVertical,
    })),
  );

  return (
    <div
      ref={containerRef}
      className={`no-scrollbar reletive flex items-center overflow-x-auto whitespace-nowrap ${isMainSectionVertical ? "gap-1" : "gap-2"} ${className}`}
    >
      <ScrollableFade
        containerRef={containerRef}
        className="top-0 right-0 h-[3.5rem] w-6"
      />

      <TranslateFeaturesView
        text="Text"
        icon={<LanguageIcon size="20" />}
        isActive={active === "Text"}
        onClick={() => setActive("Text")}
      />
      <TranslateFeaturesView
        text="Images"
        title="Not available"
        icon={<ImageIcon size="20" />}
        isActive={active === "Images"}
        onClick={() => setActive("Images")}
      />
      <TranslateFeaturesView
        text="Documents"
        title="Not available"
        icon={<DocIcon size="20" />}
        isActive={active === "Documents"}
        onClick={() => setActive("Documents")}
      />
      <TranslateFeaturesView
        text="Websites"
        title="Not available"
        icon={<WebsiteIcon size="20" />}
        isActive={active === "Websites"}
        onClick={() => setActive("Websites")}
      />
    </div>
  );
}

export default TranslateFeatures;
