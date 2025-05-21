import DoteLoader from "./ui/DoteLoader";

export function TextareaBox({
  maxLength = 1000,
  isOutput = true,
  isPending,
  ref,
  value,
  onChange,
  children,
  className,
  isFormVertical,
  inputValue = "",
  outputLang,
}) {
  const hideEmptyOutputVertical =
    isFormVertical && isOutput && (!inputValue || !outputLang);

  if (hideEmptyOutputVertical) return null;

  const shouldShowLoader = isPending && isOutput;
  const valueCond = isOutput && value === "" ? "" : value;

  return (
    <div
      className={`text-text-color relative flex min-h-41 flex-col justify-between overflow-hidden text-2xl ${className} ${
        isFormVertical ? "" : "rounded-sm"
      } ${
        isOutput
          ? "bg-textaria-dis"
          : isFormVertical
            ? `border-t border-gray-300`
            : "border border-gray-300"
      }`}
    >
      <textarea
        ref={ref}
        value={valueCond}
        onChange={!isOutput ? onChange : undefined}
        disabled={isOutput}
        maxLength={maxLength}
        placeholder={isOutput ? "Translation" : ""}
        dir="auto"
        className={`resize-none border-none p-4 outline-none md:px-5 md:py-4 ${isOutput ? "pr-6" : "pr-16"} ${
          isOutput
            ? "bg-textaria-dis placeholder:text-gray-500"
            : "pr-12 md:pr-12"
        }`}
      />

      {shouldShowLoader && (
        <span className="absolute top-4 left-36 text-gray-500">
          <DoteLoader size="xs" />
        </span>
      )}

      <div className="m-1.5 flex h-7 items-center space-x-1">{children}</div>
    </div>
  );
}
