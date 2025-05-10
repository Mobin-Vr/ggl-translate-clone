'use client';

import TranslationHistory from '@/app/_components/TranslationHistory';
import { useShallow } from 'zustand/react/shallow';
import useTranslateStore from '../translateStore';

function Page() {
   const { userState } = useTranslateStore(
      useShallow((state) => ({
         userState: state.userState,
      }))
   );

   if (!userState) return;

   //  CHANGE redirect to login page
   //  if (!userId) throw new Error('user not logged in');

   return (
      <div className='px-10 xl:px-0'>
         {/* translation History */}
         <TranslationHistory user={userState} />
      </div>
   );
}

export default Page;
