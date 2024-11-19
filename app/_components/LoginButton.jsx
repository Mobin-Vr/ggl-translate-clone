import { signInAction } from '../_lib/actions';

function LoginBtn() {
   return (
      <form action={signInAction} className='flex items-center justify-center'>
         <button className='bg-blue-500 text-white font-bold rounded-md px-3 py-1 hover:bg-blue-600 hover:shadow-md transition-colors duration-300'>
            <span className='font-semibold text-xs'>Log in</span>
         </button>
      </form>
   );
}

export default LoginBtn;
