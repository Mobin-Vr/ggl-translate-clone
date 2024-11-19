import { PiSignOutBold } from 'react-icons/pi';

import { signOutAction } from '../_lib/actions';

function SignOutButton() {
   return (
      <form
         className='w-full py-2 bg-white hover:bg-gray-50 text-sm rounded-r-full flex items-center'
         action={signOutAction}
      >
         <button>
            <div className='flex items-center justify-start gap-3 ml-8'>
               <PiSignOutBold className='text-xl text-gray-600' />
               <span>Sign Out</span>
            </div>
         </button>
      </form>
   );
}

export default SignOutButton;
