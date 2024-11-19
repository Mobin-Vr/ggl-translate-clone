import TranslationHistory from '@/app/_components/TranslationHistory';
import LoginMessage from '../_components/LoginMessage';
import { auth } from '../_lib/auth';

async function Page() {
   //  CHANGE redirect to login page
   //  if (!userId) throw new Error('user not logged in');

   const session = await auth();

   return (
      <div className='px-10 xl:px-0'>
         {/* translation History */}
         {session?.user ? <TranslationHistory /> : <LoginMessage />}
      </div>
   );
}

export default Page;
