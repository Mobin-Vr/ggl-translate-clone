import { getHistory } from '@/app/_lib/data-services';

import NoPastTranslations from './NoPastTranslations';
import TranslationList from './TranslationList';

async function TranslationHistory({ user }) {
   const history = await getHistory(user.id);

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
