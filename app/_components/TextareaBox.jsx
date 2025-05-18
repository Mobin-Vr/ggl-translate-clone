import DoteLoader from "./ui/DoteLoader";

export function TextareaBox({
  isOutput = true,
  isPending,
  ref,
  value,
  maxLength = 1000,
  onChange,
  children,
}) {
  const shouldShowLoader = isPending && isOutput;

  const newVlue = isOutput && value === "" ? "Translation" : value;

  return (
    <div
      className={`text-text-color relative flex min-h-32 flex-col justify-between overflow-hidden rounded-sm text-lg sm:text-2xl lg:min-h-36 ${
        isOutput ? "bg-textaria-dis" : "border border-gray-200"
      }`}
    >
      <textarea
        className={`resize-none border-none p-4 pr-16 outline-none md:px-5 md:py-4 ${
          isOutput
            ? "bg-textaria-dis placeholder:text-text-color"
            : "pr-12 md:pr-12"
        }`}
        dir="auto"
        disabled={isOutput}
        value={newVlue}
        onChange={!isOutput ? onChange : undefined}
        maxLength={maxLength}
        ref={ref}
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
