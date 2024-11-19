import { HiOutlineTrash } from 'react-icons/hi';

function DeleteTranslationBtn({ translationId, onDelete }) {
   return (
      <button
         onClick={() => onDelete(translationId)}
         className='flex justify-center items-center w-8 h-8 text-gray-500 rounded-md hover:bg-red-200 hover:text-red-500 transition-colors duration-300'
      >
         <HiOutlineTrash className='h-5 w-5' />
      </button>
   );
}

export default DeleteTranslationBtn;
