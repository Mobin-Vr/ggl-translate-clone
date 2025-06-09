"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import useProfileModal from "../_hooks/useProfileModal";
import Portal from "./Portal";
import ProfileModal from "./ProfileModal";

function Profile() {
  const { user, isLoaded } = useUser();
  const { isOpen, toggle, close, ref } = useProfileModal();

  return (
    <div>
      <div
        onClick={toggle}
        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200"
      >
        <UserButton userProfileMode={false} />
      </div>

      {isOpen && (
        <Portal>
          <ProfileModal
            user={user}
            ref={ref}
            isLoaded={isLoaded}
            onClose={close}
          />
        </Portal>
      )}
    </div>
  );
}

export default Profile;
