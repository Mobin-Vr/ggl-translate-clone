"use client";
import { IoMdSettings } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import SettingButton from "./ui/SettingButton";

export default function ProfileModal({ user, onClose }) {
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-10.5 h-10.5",
    },
  };

  return (
    <div className="absolute top-14 right-0 z-50 w-88 rounded-3xl border border-gray-200 bg-blue-50 shadow-md">
      <div className="p-4">
        <div className="flex flex-col items-center gap-3">
          <UserButton
            appearance={userButtonAppearance}
            userProfileMode={false}
          />

          <div className="flex flex-col items-center justify-center">
            <p className="mx-auto mb-2 text-xl text-gray-900">
              Hi, {user?.fullName}!
            </p>

            <div className="rounded-full border px-4 py-2">
              <p className="text-sm font-medium text-gray-600">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-20 space-x-1 p-4">
        {/* <SettingButton /> */}
        <SignOutButton />
      </div>

      <div className="border-t p-3 text-center text-xs text-gray-500">
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>{" "}
        -{" "}
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
      </div>
    </div>
  );
}
