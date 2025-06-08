import { CONFIG } from "../_lib/configs";

export default function CharCounter({ currentLength }) {
  return (
    <p className="mt-1.5 mr-2 mb-4 ml-auto flex items-center justify-center p-0 text-center align-middle text-xs leading-none text-gray-600 select-none">
      {currentLength.toLocaleString("en-US")} /{" "}
      {CONFIG.ui.inputMaxLength.toLocaleString("en-US")}
    </p>
  );
}
