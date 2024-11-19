import { HiOutlineTranslate } from 'react-icons/hi';

function TranslateFeatures() {
   return (
      <div className='flex gap-1 items-center cursor-pointer border rounded-md w-fit mb-5 px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 duration-300 transition-colors'>
         <span className='text-xl'>
            <HiOutlineTranslate strokeWidth={2.4} />
         </span>
         <p className='font-medium mt-1 text-sm'>Text</p>
      </div>
   );
}

export default TranslateFeatures;
