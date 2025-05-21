"use client";

import { cn } from "@/app/_lib/utils";

import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  parseISO,
} from "date-fns";

function formatDistanceFromNow(date) {
  const parsedDate = parseISO(date);
  const now = new Date();

  const daysDifference = differenceInDays(now, parsedDate);
  const hoursDifference = differenceInHours(now, parsedDate);
  const minutesDifference = differenceInMinutes(now, parsedDate);

  return daysDifference >= 1
    ? `${daysDifference}d ago`
    : hoursDifference >= 1
      ? `${hoursDifference}h ago`
      : `${minutesDifference}min ago`;
}

function TimeAgo({ date, className, ...props }) {
  return (
    <p className={cn("", className)} {...props}>
      {formatDistanceFromNow(date)}
    </p>
  );
}

export default TimeAgo;
