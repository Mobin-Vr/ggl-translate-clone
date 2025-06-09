"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import useProfileModal from "../_hooks/useProfileModal";
import ProfileModal from "./ProfileModal";
import Portal from "./Portal";

function Profile() {
  const { user, isLoaded } = useUser();
  const { isOpen, toggle, close, ref } = useProfileModal();

  return (
    <div ref={ref}>
      <div
        onClick={toggle}
        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200"
      >
        <UserButton userProfileMode={false} />
      </div>

      {isOpen && (
        <Portal>
          <ProfileModal user={user} isLoaded={isLoaded} onClose={close} />
        </Portal>
      )}
    </div>
  );
}

export default Profile;
