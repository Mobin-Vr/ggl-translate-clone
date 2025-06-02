const allowedSizes = ["xs", "sm", "md", "lg", "xl"];

export default function DoteLoader({ size }) {
  const finalSize = allowedSizes.includes(size) ? size : "xs";

  return (
    <>
      {finalSize === "xs" && (
        <span className="loading loading-dots loading-xs"></span>
      )}
      {finalSize === "sm" && (
        <span className="loading loading-dots loading-sm"></span>
      )}

      {finalSize === "md" && (
        <span className="loading loading-dots loading-md"></span>
      )}

      {finalSize === "lg" && (
        <span className="loading loading-dots loading-lg"></span>
      )}

      {finalSize === "xl" && (
        <span className="loading loading-dots loading-xl"></span>
      )}
    </>
  );
}
