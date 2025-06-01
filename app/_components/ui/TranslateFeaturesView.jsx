import Tooltip from "./Tooltip";

function TranslateFeaturesView({
  icon,
  text,
  onClick,
  isActive,
  title = "Translate a text",
}) {
  return (
    <Tooltip title={title}>
      <div
        onClick={onClick}
        className={`flex h-9 w-fit cursor-pointer items-center gap-1.5 rounded-sm border border-gray-300 pr-[0.9375rem] pl-[0.6875rem] text-sm font-medium text-blue-700 transition-colors duration-300 ${
          isActive ? "bg-blue-100" : ""
        }`}
      >
        <span className="text-xl">{icon}</span>
        <p className="text-sm font-medium">{text}</p>
      </div>
    </Tooltip>
  );
}

export default TranslateFeaturesView;
