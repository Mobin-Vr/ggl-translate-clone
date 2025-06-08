"use client";
import ModalContent from "./ModalContent";
import SpinnerMini from "./ui/SpinnerMini";

export default function ProfileModal({ user, onClose, isLoaded }) {
  return (
    <div className="modalProfile absolute top-16 right-3.5 z-50 h-77 w-88 rounded-3xl border border-gray-200 bg-[#e9eef6] shadow-[0_0_10px_rgba(0,0,0,0.3)]">
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
