"use client";

import LoginButton from "./ui/LoginButton";

function LoginMessage() {
  return (
    <div className="mx-auto max-w-lg rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        Sign in for translation history
      </h2>

      <p className="mb-4 text-sm text-gray-600">
        View and manage translation history associated with your account.
      </p>

      <div className="flex items-center justify-start">
        <LoginButton />
      </div>
    </div>
  );
}

export default LoginMessage;
