import { HiOutlineTrash } from "react-icons/hi";

function DeleteTranslationBtn({ onDelete }) {
  return (
    <button
      onClick={onDelete}
      className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors duration-300 hover:bg-red-200 hover:text-red-500"
    >
      <HiOutlineTrash className="h-5 w-5" />
    </button>
  );
}

export default DeleteTranslationBtn;
