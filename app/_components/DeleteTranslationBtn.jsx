import { TrashIcon } from "@/public/icons";
import { HiOutlineTrash } from "react-icons/hi";

function DeleteTranslationBtn({ onDelete, className }) {
  return (
    <button
      onClick={onDelete}
      className={`mt-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors duration-300 hover:bg-red-500 hover:text-white ${className}`}
    >
      <TrashIcon />
    </button>
  );
}

export default DeleteTranslationBtn;
