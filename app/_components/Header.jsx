import { MdMenu } from 'react-icons/md';
import { auth } from '../_lib/auth';
import LoginButton from './LoginButton';
import Logo from './Logo';
import Profile from './Profile';
import { headers } from 'next/headers';

async function Header() {
   const session = await auth();

   // دریافت هدر تنظیم‌شده در Middleware
   const headersList = headers();
   const currentPath = headersList.get('x-current-path');

   // بررسی مسیر جاری
   const isHistoryPage = currentPath === '/history';

   console.log(
      '>>> Current Path:',
      currentPath,
      'Is History Page:',
      isHistoryPage
   );

   return (
      <header className='h-16 flex items-center justify-between px-8 border-b mb-5'>
         <div className='flex items-center gap-3 text-gray-600'>
            <MdMenu className='w-6 h-6' />
            <Logo />
         </div>

         {session?.user ? <Profile session={session} /> : <LoginButton />}
      </header>
   );
}

export default Header;
