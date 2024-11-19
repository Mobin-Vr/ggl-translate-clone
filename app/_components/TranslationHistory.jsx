import { getHistory } from '@/app/_lib/data-services';

import TranslationList from './TranslationList';
import NoPastTranslations from './NoPastTranslations';
import { auth } from '../_lib/auth';

async function TranslationHistory() {
   const session = await auth();
   const history = await getHistory(session.user.userId);

   return (
      <div className=''>
         <h1 className='text-3xl my-5 text-gray-600'>History</h1>
         {history.length === 0 ? (
            <NoPastTranslations />
         ) : (
            <TranslationList history={history} />
         )}
      </div>
   );
}

export default TranslationHistory;
