import { UserButton } from "@clerk/nextjs";
import { truncateText } from "../_lib/utils";
import ModalProfileBtn from "./ui/ModalProfileBtn";
import ModalSignoutBtn from "./ui/ModalSignoutBtn";

export default function ModalContent({ user, onClose }) {
  return (
    <>
      <div className="mt-4 mb-2">
        <div className="flex flex-col items-center gap-3">
          <UserButton userProfileMode={false} />

          <div className="flex flex-col items-center justify-center">
            <p className="mx-auto mb-2 text-xl text-gray-900">
              Hi, {truncateText(user?.firstName)}!
            </p>

            <div className="border-gray-00 rounded-full border-2 border-gray-300 px-4 py-2">
              <p className="text-sm font-medium text-gray-900">
                {truncateText(user?.primaryEmailAddress?.emailAddress)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-20 space-x-1 p-4">
        <ModalProfileBtn />
        <ModalSignoutBtn closeModal={onClose} />
      </div>

      <div className="p-1 text-center text-xs text-gray-500">
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        {"  "} - {"  "}
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
      </div>
    </>
  );
}
