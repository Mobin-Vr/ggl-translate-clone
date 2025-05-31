"use client";

import { AlertIcon } from "@/public/icons";

export default function Error({ reset }) {
  return (
    <div className="flex h-full items-center justify-center text-sm text-gray-600">
      <AlertIcon size="16" />

      <p className="ml-2 leading-0">
        Failed to load history. Please{" "}
        <button onClick={reset} className="text-blue-600 underline">
          refresh the page
        </button>
        .
      </p>
    </div>
  );
}
