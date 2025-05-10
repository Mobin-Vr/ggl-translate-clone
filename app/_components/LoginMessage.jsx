'use client';

import LoginButton from './LoginButton';

function LoginMessage() {
   return (
      <div className='max-w-lg mx-auto p-6 bg-white rounded-md shadow-md'>
         <h2 className='text-lg font-semibold text-gray-900 mb-2 '>
            Sign in for translation history
         </h2>

         <p className='text-sm text-gray-600 mb-4'>
            View and manage translation history associated with your account.
         </p>

         <div className='flex justify-start items-center'>
            <LoginButton />
         </div>
      </div>
   );
}

export default LoginMessage;
