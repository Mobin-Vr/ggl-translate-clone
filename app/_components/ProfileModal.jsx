"use client";
import ModalContent from "./ModalContent";
import SpinnerMini from "./ui/SpinnerMini";

export default function ProfileModal({ user, onClose, isLoaded }) {
  return (
    <div className="modalProfile absolute top-14 right-0 z-50 h-76 w-88 rounded-3xl border border-gray-200 bg-blue-50 shadow-md">
      {isLoaded ? (
        <ModalContent user={user} onClose={onClose} />
      ) : (
        <div className="flex h-full items-center justify-center">
          <SpinnerMini className="-translate-y-[3.2rem]" />
        </div>
      )}
    </div>
  );
}
