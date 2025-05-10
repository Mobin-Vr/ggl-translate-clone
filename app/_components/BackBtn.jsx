'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';

function Backbtn() {
   const router = useRouter();

   return (
      <button
         onClick={() => router.back()}
         className='absolute top-0 left-5 w-10 h-10 flex items-center justify-center text-xl text-gray-500 hover:text-gray-600 hover:bg-gray-300 hover:bg-opacity-50 rounded-full'
         aria-label='Close'
      >
         <FaArrowLeftLong />
      </button>
   );
}

export default Backbtn;
