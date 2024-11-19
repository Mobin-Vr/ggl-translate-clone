import { MdMenu } from 'react-icons/md';
import { auth } from '../_lib/auth';
import LoginBtn from './LoginBtn';
import Logo from './Logo';
import Profile from './Profile';

async function Header() {
   const session = await auth();

   return (
      <header className='h-16 flex items-center justify-between px-8 border-b mb-5'>
         <div className='flex items-center gap-3 text-gray-600 '>
            <MdMenu className='w-6 h-6' />
            <Logo />
         </div>

         {session?.user ? <Profile session={session} /> : <LoginBtn />}
      </header>
   );
}

export default Header;
