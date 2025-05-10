'use client';

import desert from '@/public/desert.png';
import Image from 'next/image';

function NoPastTranslations({ onClose }) {
   return (
      <div className=' flex items-center justify-center'>
         {/* Content */}
         <div className='flex flex-col items-center max-w-72 p-6 text-center'>
            <div className='mb-4 max-w-48'>
               {/* Responsive Image */}
               <Image src={desert} alt='No translations' />
            </div>

            {/* Title */}
            <h2 className='text-lg mb-2 font-semibold text-gray-900'>
               No past translations
            </h2>

            {/* Description */}
            <p className='text-sm text-gray-600 '>Start translation ;)</p>
         </div>
      </div>
   );
}

export default NoPastTranslations;
