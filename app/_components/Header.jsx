import { MdMenu } from 'react-icons/md';
import LoginButton from './LoginButton';
import Logo from './Logo';
import Profile from './Profile';
import { headers } from 'next/headers';

async function Header() {
   // دریافت هدر تنظیم‌شده در Middleware
   const headersList = headers();
   const currentPath = headersList.get('x-current-path');

   // بررسی مسیر جاری
   const isHistoryPage = currentPath === '/history';

   return (
      <header className='h-16 flex items-center justify-between px-8 border-b mb-5'>
         <div className='flex items-center gap-3 text-gray-600'>
            <MdMenu className='w-6 h-6' />
            <Logo />
         </div>

         <Profile />
      </header>
   );
}

export default Header;
