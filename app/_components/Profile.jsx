"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import ProfileModal from "./ProfileModal";

function Profile({ session }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  const { user } = useUser();

  function toggleModal() {
    setModalOpen(!isModalOpen);
  }

  function handleClickOutside(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={modalRef}>
      <div
        onClick={toggleModal}
        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200"
      >
        <UserButton userProfileMode={false} />
      </div>

      {isModalOpen && (
        <ProfileModal user={user} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}

export default Profile;
