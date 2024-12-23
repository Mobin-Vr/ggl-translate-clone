'use client';
import { IoMdSettings } from 'react-icons/io';
import { PiSignOutBold } from 'react-icons/pi';
import SignOutButton from './SignOutButton';
import SettingButton from './SettingButton';

export default function ProfileModal({ session, onClose }) {
   return (
      <div className='absolute top-14 right-0 rounded-3xl w-[22rem] z-50 border border-gray-200 shadow-md bg-blue-50'>
         <div className='p-4'>
            <div className='flex flex-col items-center gap-3'>
               <img
                  src={session.user?.image}
                  alt={session.user?.name}
                  className='w-20 h-20 rounded-full'
               />

               <div className='flex flex-col justify-center items-center'>
                  <p className='text-xl text-gray-900 mx-auto mb-2'>
                     Hi, {session.user?.name}!
                  </p>

                  <div className='border rounded-full px-4 py-2'>
                     <p className='text-sm font-medium text-gray-600'>
                        {session.user?.email}
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <div className='flex p-4 space-x-1 h-20'>
            <SettingButton />
            <SignOutButton />
         </div>

         <div class='p-3 border-t text-center text-xs text-gray-500'>
            <a href='#' class='hover:underline'>
               Privacy Policy
            </a>{' '}
            -{' '}
            <a href='#' class='hover:underline'>
               Terms of Service
            </a>
         </div>
      </div>
   );
}
