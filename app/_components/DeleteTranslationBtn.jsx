import { TrashIcon } from "@/public/icons";

function DeleteTranslationBtn({ onDelete, ref, className }) {
  return (
    <button
      ref={ref}
      onClick={onDelete}
      className={`mt-3 flex aspect-square h-8 items-center justify-center rounded-full bg-transparent text-gray-500 transition-colors duration-300 hover:bg-red-500 hover:text-white ${className}`}
    >
      <TrashIcon />
    </button>
  );
}

export default DeleteTranslationBtn;
