import { HiOutlineArrowLongRight } from 'react-icons/hi2';
import DeleteTranslationBtn from './DeleteTranslationBtn';
import TimeAgo from './TimeAgo';
import TextExpander from './TextExpander';

function HistoryCard({ translation, onDelete }) {
   const {
      id: translationId,
      inputLanguage,
      outputLanguage,
      inputText,
      outputText,
      created_at: createdAt,
   } = translation;

   return (
      <li className='flex justify-between items-center text-sm p-4 hover:bg-gray-50 relative'>
         <div>
            <p className='flex items-center gap-2 text-sm mb-4 text-gray-500'>
               {inputLanguage}
               <span className='text-lg'>
                  <HiOutlineArrowLongRight />
               </span>
               {outputLanguage}
            </p>

            <div className='space-y-2 pr-5'>
               <TextExpander>{inputText}</TextExpander>
               <TextExpander className='text-gray-400'>
                  {outputText}
               </TextExpander>
            </div>
         </div>

         <TimeAgo
            className='absolute top-3 right-3 text-gray-300 text-sm'
            date={createdAt}
         />

         <DeleteTranslationBtn
            translationId={translationId}
            onDelete={onDelete}
         />
      </li>
   );
}

export default HistoryCard;
