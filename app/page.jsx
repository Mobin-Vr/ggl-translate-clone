import TranslationForm from '@/app/_components/TranslationForm';
import { getLanguages } from '@/app/_lib/data-services';
import HistoryIconLink from './_components/HistoryIconLink';
import Header from './_components/Header';

async function TranslatePage() {
   //  CHANGE redirect to login page
   //  if (!userId) throw new Error('user not logged in');

   const languages = await getLanguages();

   return (
      <>
         <Header />
         <div className='px-10 xl:px-0 mb-20'>
            <TranslationForm languages={languages} />

            {/* History Button */}
            <HistoryIconLink />
         </div>
      </>
   );
}

export default TranslatePage;
