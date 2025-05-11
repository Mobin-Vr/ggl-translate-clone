import { MdMenu } from 'react-icons/md';
import LoginButton from './LoginButton';
import Logo from './Logo';
import Profile from './Profile';
import { headers } from 'next/headers';

async function Header() {
   // Get the custom header set in the middleware
   const headersList = await headers();
   const currentPath = headersList.get('x-current-path');

   // Check if the current path is "/history"
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
