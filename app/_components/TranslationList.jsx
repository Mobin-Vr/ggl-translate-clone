'use client';

import { deleteTranslation } from '@/app/_lib/actions';
import { useOptimistic } from 'react';
import HistoryCard from './HistoryCard';

function TranslationList({ history }) {
   const [optimisticTranslation, optimisticDelete] = useOptimistic(
      history,
      (curTranslation, translationId) => {
         return curTranslation.filter(
            (translate) => translate.id !== translationId
         );
      }
   );

   async function handleDelete(translationId) {
      optimisticDelete(translationId);
      await deleteTranslation(translationId);
   }

   return (
      <>
         <ul className='divide-y border rounded-md'>
            {optimisticTranslation.map((translation) => (
               <HistoryCard
                  key={translation.id}
                  translation={translation}
                  onDelete={handleDelete}
               />
            ))}
         </ul>
      </>
   );
}

export default TranslationList;
