import { IoMdSettings } from 'react-icons/io';

function SettingButton() {
   return (
      <button className='w-full py-2 bg-white hover:bg-gray-50 text-sm  rounded-l-full'>
         <div className='flex items-center justify-end gap-3 mr-8'>
            <IoMdSettings className='text-xl text-gray-600' />
            <span>Settings</span>
         </div>
      </button>
   );
}

export default SettingButton;
