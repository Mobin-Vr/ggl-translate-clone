import TranslationForm from '@/app/_components/TranslationForm';
import { getLanguages } from '@/app/_lib/data-services';
import HistoryIconLink from './_components/HistoryIconLink';

async function TranslatePage() {
   //  CHANGE redirect to login page
   //  if (!userId) throw new Error('user not logged in');

   const languages = await getLanguages();

   return (
      <div className='px-10 xl:px-0 mb-20'>
         <TranslationForm languages={languages} />

         {/* History Button */}
         <HistoryIconLink />
      </div>
   );
}

export default TranslatePage;
