import { UserSettingsIcon } from "@/public/icons";

function ModalProfileBtn() {
  return (
    <button
      title="🔜 Disable for now" // CHANGE LATER
      className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-l-full bg-white py-2 text-sm text-gray-700 hover:bg-gray-50"
    >
      <UserSettingsIcon />
      <span>Profile</span>
    </button>
  );
}

export default ModalProfileBtn;
