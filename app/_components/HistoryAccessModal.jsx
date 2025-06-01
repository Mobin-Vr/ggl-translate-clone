"use client";

import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";

export default function HistoryAccessModal({ onClose, ref }) {
  const { openSignIn } = useClerk();
  const [isVisible, setIsVisible] = useState(false);

  // Trigger fade-in animation after mount
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  function handleSignInClick() {
    // Start fade-out animation
    setIsVisible(false);

    // Wait for animation to complete before opening Clerk sign-in modal
    setTimeout(() => {
      openSignIn();
      onClose();
    }, 300);
  }

  function handleClose() {
    // Start fade-out animation
    setIsVisible(false);

    // Wait for animation to complete before unmounting modal
    setTimeout(onClose, 300);
  }

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } bg-black/73`}
    >
      <div
        ref={ref}
        className="z-50 w-[420px] rounded-sm bg-white p-6 pb-2 shadow-xl"
      >
        <h2 className="text-center text-lg font-medium text-gray-900">
          Sign in for translation history
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          View and manage translation history associated with your account.
        </p>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="rounded-sm p-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
          >
            Not now
          </button>

          <button
            onClick={handleSignInClick}
            className="rounded-sm p-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
