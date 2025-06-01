"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import useProfileModal from "../_lib/hooks/useProfileModal";
import ProfileModal from "./ProfileModal";
import Tooltip from "./ui/Tooltip";

function Profile() {
  const { user, isLoaded } = useUser();
  const { isOpen, toggle, close, ref } = useProfileModal();

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={toggle}
        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200"
      >
        <UserButton userProfileMode={false} />
      </div>

      {isOpen && (
        <ProfileModal user={user} isLoaded={isLoaded} onClose={close} />
      )}
    </div>
  );
}

export default Profile;
