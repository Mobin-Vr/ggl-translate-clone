'use client';

import { useActionState, useEffect, useRef, useState } from 'react';

import { translate } from '@/app/_lib/actions';
import { playAudio } from '@/app/_lib/utils';
import Recorder from './Recorder';
import SelectLang from './SelectLang';
import Speaker from './Speaker';
import { Textarea } from './textarea';

import SubmitButton from './SubmitButton';
import TranslateFeatures from './TranslateFeatures';

const initialState = {
   inputLanguage: 'Auto-Detection',
   outputLanguage: 'Persian',
   inputText: '',
   outputText: '',
};

function TranslationForm({ languages: initialLanguages }) {
   const submitBtnRef = useRef(null);

   const [languages, setLanguages] = useState(initialLanguages);
   const [inputText, setInputText] = useState(initialState.inputText);
   const [outputText, setOutputText] = useState(initialState.outputText);
   const [inputLanguage, setInputLanguage] = useState(
      initialState.inputLanguage
   );
   const [outputLanguage, setOutputLanguage] = useState(
      initialState.outputLanguage
   );
   const [state, formAction] = useActionState(translate, initialState);
   const [isMicRecording, setIsMicRecording] = useState(false); // State to track recording status and prevent audio playback during recording

   // A flag to prevent the loop of removing and re-adding the detected language.
   const [isDetectedLangRemoved, setIsDetectedLangRemoved] = useState(false);

   /* CHANGE when you want to have a realtime translation while you are typing!
   useEffect(() => {
      if (inputText.trim()) return;

      const deleyDebounceFn = setTimeout(() => {
         // Submiting the form via the btn
         submitBtnRef.current?.click();

        //  Or submiting via the form itself
         formRef.current?.requestSubmit();
      }, 2000);

      return clearTimeout(deleyDebounceFn);
   }, [inputText]);*/

   const handleAudioUpload = (transcribedText) => {
      setInputText(transcribedText);
   };

   useEffect(() => {
      setOutputText(state.outputText);

      if (state.inputLanguage === 'Auto-Detection') return;

      const detectedLanguage = `${state.inputLanguage} - Detected`;

      if (languages.some((lang) => lang.name === detectedLanguage)) return;

      // Exit early if the detected language has already been removed
      if (isDetectedLangRemoved) return;

      setLanguages((prev) => {
         setIsDetectedLangRemoved(false);
         return [
            {
               id: detectedLanguage,
               name: detectedLanguage,
               code: null,
               direction: null,
            },
            ...prev,
         ];
      });

      setInputLanguage(detectedLanguage);
      // eslint-disable-next-line
   }, [state, languages]);

   return (
      <div>
         {/* Header */}
         <TranslateFeatures />

         {/* Translation Form */}
         <form action={formAction}>
            <div className='flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2'>
               {/* Input Section */}
               <div className='flex-1 space-y-2 relative'>
                  <SelectLang
                     name='inputLanguage'
                     languages={languages}
                     value={inputLanguage}
                     onSelect={setInputLanguage}
                     onLanguagesUpdate={setLanguages}
                     onToggleDetectedLang={setIsDetectedLangRemoved}
                  />

                  <div className='relative'>
                     <Textarea
                        className='text-xl no-shadow min-h-32 resize-none focus:outline-none hover:shadow-sm focus:shadow-sm md:textarea md:px-5 md:py-4 lg:min-h-36 md:text-xl'
                        name='inputText'
                        placeholder=''
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                     />

                     {/* Floating Buttons (Mic + Speaker) */}
                     <div className='absolute bottom-2 left-2 flex space-x-1'>
                        <Recorder
                           onAudioTranscriped={handleAudioUpload}
                           onDisableSpeaker={setIsMicRecording}
                        />
                        <Speaker
                           isThereText={inputText}
                           isRecordingInProgress={isMicRecording} // Prevents audio playback while the microphone is actively recording
                           onClick={() => playAudio(inputText)}
                        />
                     </div>
                  </div>
               </div>

               {/* Output Section */}
               <div className='flex-1 space-y-2 relative'>
                  <SelectLang
                     languages={languages}
                     name='outputLanguage'
                     value={outputLanguage}
                     onSelect={setOutputLanguage}
                  />

                  <div className='relative'>
                     <Textarea
                        style={{ cursor: 'default' }}
                        className='bg-gray-100 placeholder:text-gray-950 min-h-32 text-xl resize-none focus:outline-none hover:shadow-sm focus:shadow-sm md:textarea md:px-5 md:py-4 lg:min-h-36 md:text-xl'
                        placeholder='Translation'
                        name='outputText'
                        disabled
                        value={outputText}
                     />

                     {/* Floating Speaker Button */}
                     <div className='absolute bottom-2 left-2'>
                        <Speaker
                           isThereText={outputText}
                           onClick={() => playAudio(outputText)}
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* Submit Button */}
            <div className='mt-5 mb-8 flex justify-end h-10'>
               <SubmitButton ref={submitBtnRef} disabled={!inputText} />
            </div>
         </form>
      </div>
   );
}

export default TranslationForm;

// ////////////////////////////////////
