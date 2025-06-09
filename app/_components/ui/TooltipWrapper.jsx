import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

export default function TooltipWrapper({ children, title, side = "bottom" }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{title}</TooltipContent>
    </Tooltip>
  );
}
