import TranslationHistory from '@/app/_components/TranslationHistory';
import LoginMessage from '../_components/LoginMessage';
import { auth } from '../_lib/auth';
import { Suspense } from 'react';
import SpinnerMini from '../_components/SpinnerMini';

async function Page() {
   //  CHANGE redirect to login page
   //  if (!userId) throw new Error('user not logged in');

   const session = await auth();

   return (
      <div className='px-10 xl:px-0'>
         {/* translation History */}
         {session?.user ? (
            <Suspense fallback={<SpinnerMini />}>
               <TranslationHistory />
            </Suspense>
         ) : (
            <LoginMessage />
         )}
      </div>
   );
}

export default Page;
