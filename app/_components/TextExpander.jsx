"use client";

import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { TEXT_EXPANDER_MAX_LENGTH } from "../_lib/configs";
import Tooltip from "./ui/Tooltip";

function TextExpander({ children, className }) {
  const text = typeof children === "string" ? children : String(children);
  const shouldTruncate = text.length > TEXT_EXPANDER_MAX_LENGTH;

  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = shouldTruncate
    ? isExpanded
      ? text
      : text.slice(0, TEXT_EXPANDER_MAX_LENGTH) + " ..."
    : text;

  return (
    <div className={className}>
      <span>{displayText}</span>
      {shouldTruncate && (
        <button
          className="ml-1 align-text-top text-xl text-blue-400"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <Tooltip title="Show less">
              <HiChevronUp />
            </Tooltip>
          ) : (
            <Tooltip title="Show more">
              <HiChevronDown />
            </Tooltip>
          )}
        </button>
      )}
    </div>
  );
}

export default TextExpander;
