import autosize from "autosize";
import DoteLoader from "./ui/DoteLoader";
import { useLayoutEffect } from "react";

export function TextareaBox({
  maxLength = 1000,
  isOutput = true,
  isPending,
  ref,
  value,
  onChange,
  children,
}) {
  const shouldShowLoader = isPending && isOutput;
  const valueCond = isOutput && value === "" ? "Translation" : value;

  // autosize doesn't work properly on disabled textareas, so we temporarily enable it, then apply autosize and revert it back to its original disabled state
  //   useLayoutEffect(() => {
  //     if (ref.current) {
  //       const textarea = ref.current;
  //       const wasDisabled = textarea.disabled;
  //
  //       // temporarily enable if disabled
  //       if (wasDisabled) textarea.disabled = false;
  //
  //       autosize(textarea);
  //       autosize.update(textarea);
  //
  //       // revert to original disabled state
  //       if (wasDisabled) textarea.disabled = true;
  //     }
  //   }, [value]);

  return (
    <div
      className={`text-text-color relative flex flex-col justify-between overflow-hidden rounded-sm text-lg sm:text-2xl ${
        isOutput ? "bg-textaria-dis" : "border border-gray-200"
      }`}
    >
      <textarea
        ref={ref}
        value={valueCond}
        onChange={!isOutput ? onChange : undefined}
        disabled={isOutput}
        maxLength={maxLength}
        dir="auto"
        className={`resize-none border-none p-4 pr-16 outline-none md:px-5 md:py-4 ${
          isOutput
            ? "bg-textaria-dis placeholder:text-text-color"
            : "pr-12 md:pr-12"
        }`}
      />

      {shouldShowLoader && (
        <span className="absolute top-4 left-36">
          <DoteLoader size="xs" />
        </span>
      )}

      <div className="m-1.5 flex h-7 items-center space-x-1">{children}</div>
    </div>
  );
}
