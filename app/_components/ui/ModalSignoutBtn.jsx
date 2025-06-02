import useTranslateStore from "@/app/translateStore";
import { SignOutIcon } from "@/public/icons";
import { useClerk } from "@clerk/nextjs";
import { useShallow } from "zustand/react/shallow";

export default function ModalSignoutBtn({ closeModal }) {
  const { signOut } = useClerk();

  const { setShowHistory } = useTranslateStore(
    useShallow((state) => ({
      setShowHistory: state.setShowHistory,
    })),
  );

  async function handleSignOut() {
    closeModal();
    setShowHistory(false); // Close history

    await new Promise((r) => setTimeout(r, 300));
    await signOut();
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-r-full bg-white py-2 text-sm text-gray-700 hover:bg-gray-50"
    >
      <SignOutIcon />
      <span>Sign out</span>
    </button>
  );
}
