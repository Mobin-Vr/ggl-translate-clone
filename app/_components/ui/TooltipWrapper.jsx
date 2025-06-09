import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

export default function TooltipWrapper({
  children,
  title,
  side = "bottom",
  disabled = false,
}) {
  if (disabled) return children;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{title}</TooltipContent>
    </Tooltip>
  );
}
