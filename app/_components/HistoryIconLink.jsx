import Link from 'next/link';
import { RiHistoryLine } from 'react-icons/ri';

export default function HistoryLink() {
   return (
      <div className='flex justify-center mt-12'>
         <Link
            href='/history'
            className='flex flex-col items-center gap-2 text-gray-500 hover:text-gray-700 transition duration-300'
         >
            {/* Icon */}
            <div className='w-16 h-16 flex items-center justify-center rounded-full border border-gray-300'>
               <RiHistoryLine className='text-3xl' />
            </div>

            {/* Label */}
            <span className='text-sm font-medium'>History</span>
         </Link>
      </div>
   );
}
