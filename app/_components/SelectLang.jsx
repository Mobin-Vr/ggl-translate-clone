import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/app/_components/select';

import { useEffect, useState } from 'react';

const autoData = { name: 'Auto-Detection', code: 'auto', direction: null };

function findLanguageData(languages, value) {
   return languages.find((lang) => lang.name === value) || null;
}

function theLangWithDetected(languages) {
   return languages.find((lang) => lang.name.endsWith('Detected'));
}

function SelectLang({
   languages,
   name,
   onSelect,
   onLanguagesUpdate,
   onToggleDetectedLang,
   value,
}) {
   const [selected, setSelected] = useState(
      value === 'Auto-Detection' ? autoData : findLanguageData(languages, value)
   );

   useEffect(() => {
      if (value === 'Auto-Detection') setSelected(autoData);
      else {
         const langData = findLanguageData(languages, value);
         setSelected(langData);
      }
   }, [value, languages]);

   function handleSelectChange(selectedValue) {
      const langData =
         selectedValue === 'Auto-Detection'
            ? autoData
            : findLanguageData(languages, selectedValue);

      setSelected(langData);
      onSelect(langData?.name);

      const detectedLang = theLangWithDetected(languages);
      if (detectedLang) {
         onLanguagesUpdate((prev) =>
            prev.filter((lang) => lang.id !== detectedLang.id)
         );

         onToggleDetectedLang(true);
      }
   }

   return (
      <>
         <Select
            onValueChange={handleSelectChange}
            value={selected?.name || ''}
         >
            <SelectTrigger className='w-fit border-none font-bold text-blue-500 flex items-center gap-2 no-shadow'>
               <SelectValue placeholder='Select a language' />
            </SelectTrigger>

            <SelectContent>
               {name === 'inputLanguage' && (
                  <SelectGroup>
                     <SelectLabel>Want us to figure it out?</SelectLabel>
                     <SelectItem key='auto' value='Auto-Detection'>
                        Auto-Detection
                     </SelectItem>
                  </SelectGroup>
               )}

               <SelectGroup>
                  <SelectLabel>Languages:</SelectLabel>
                  {languages.map(({ id, name, code }) => (
                     <SelectItem key={id} value={code}>
                        {code}
                     </SelectItem>
                  ))}
               </SelectGroup>
            </SelectContent>
         </Select>
         <input type='hidden' name={name} value={JSON.stringify(selected)} />
      </>
   );
}

export default SelectLang;
