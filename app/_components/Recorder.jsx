import { useEffect } from 'react';
import { PiMicrophone } from 'react-icons/pi';
import { PiSquareFill } from 'react-icons/pi';

import useSpeechRecog from '../_hooks/useSpeechRecog';

export default function Recorder({ onAudioTranscriped, onDisableSpeaker }) {
   // Use the custom hook for speech recognition
   const { isRecording, transcript, toggleRecording } = useSpeechRecog();

   // Update transcript state when it changes in the hook
   useEffect(() => {
      if (transcript) onAudioTranscriped(transcript);
   }, [transcript]);

   // Update isMicRecording (TranslationForm) state when isRecordind changes in the custom hook
   useEffect(() => {
      onDisableSpeaker(isRecording);
   }, [isRecording]);

   return (
      <div className='flex flex-col items-center'>
         <button
            onClick={toggleRecording}
            type='button'
            className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 ${
               isRecording
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-white hover:bg-gray-300 hover:bg-opacity-50'
            }`}
         >
            {!isRecording ? (
               <PiMicrophone
                  strokeWidth={2}
                  className='w-[1.15rem] h-[1.15rem] text-gray-800'
               />
            ) : (
               <PiSquareFill
                  strokeWidth={1}
                  className='w-[0.8rem] h-[0.8rem] text-gray-100'
               />
            )}
         </button>
      </div>
   );
}
