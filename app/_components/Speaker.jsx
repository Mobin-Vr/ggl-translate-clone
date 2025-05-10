import { PiSpeakerSimpleHigh } from 'react-icons/pi';

function SpeakerBtn({ onClick, isThereText, isRecordingInProgress }) {
   if (!isThereText || isRecordingInProgress) return null;

   return (
      <button
         onClick={onClick}
         type='button'
         className='w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-300 hover:bg-opacity-50 transition-all duration-300'
      >
         <PiSpeakerSimpleHigh
            strokeWidth={2}
            className='text-gray-800 w-[1.15rem] h-[1.15rem]'
         />
      </button>
   );
}

export default SpeakerBtn;
