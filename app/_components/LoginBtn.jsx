import Link from 'next/link';

function LoginBtn() {
   return (
      <div className=' flex items-center justify-center '>
         <Link
            href='/login'
            className='bg-blue-500 text-white text-sm font-bold rounded-md px-4 py-2 hover:bg-blue-600 hover:shadow-md transition-colors duration-300'
         >
            Log in
         </Link>
      </div>
   );
}

export default LoginBtn;
