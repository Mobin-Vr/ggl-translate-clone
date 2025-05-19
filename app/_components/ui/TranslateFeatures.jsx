import { DocIcon, ImageIcon, LanguageIcon, WebsiteIcon } from "@/public/icons";
import { HiOutlineTranslate } from "react-icons/hi";
import TranslateFeaturesView from "./TranslateFeaturesView";
import { useState } from "react";

function TranslateFeatures({ icon, text }) {
  const [active, setActive] = useState("Text"); // CHANGE later

  return (
    <div className="mt-4 mb-7 flex gap-2">
      <TranslateFeaturesView
        text="Text"
        icon={<LanguageIcon size="20" />}
        isActive={active === "Text"}
        onClick={() => setActive("Text")}
      />
      <TranslateFeaturesView
        text="Images"
        icon={<ImageIcon size="20" />}
        isActive={active === "Images"}
        onClick={() => setActive("Images")}
      />
      <TranslateFeaturesView
        text="Documents"
        icon={<DocIcon size="20" />}
        isActive={active === "Documents"}
        onClick={() => setActive("Documents")}
      />
      <TranslateFeaturesView
        text="Websites"
        icon={<WebsiteIcon size="20" />}
        isActive={active === "Websites"}
        onClick={() => setActive("Websites")}
      />
    </div>
  );
}

export default TranslateFeatures;
