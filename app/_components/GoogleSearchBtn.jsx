import { PiSpeakerSimpleHigh } from "react-icons/pi";
import Tooltip from "./ui/Tooltip";
import { GoogleGIcon, SpeakerIcon } from "@/public/icons";

export default function GoogleSearchBtn({ value, className }) {
  if (!value) return;

  function handleSearch() {
    const query = encodeURIComponent(value);
    const url = `https://www.google.com/search?q=${query}`;
    window.open(url, "_blank");
  }

  return (
    <Tooltip title="Search with Google">
      <button
        onClick={handleSearch}
        type="button"
        className={`hover:bg-icon-hover flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-all duration-300 ${className}`}
      >
        <GoogleGIcon />
      </button>
    </Tooltip>
  );
}
