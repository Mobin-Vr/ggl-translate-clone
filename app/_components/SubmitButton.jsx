import { useFormStatus } from 'react-dom';
import SpinnerBtn from './SpinnerBtn';

function SubmitButton({ ref, disabled }) {
   const { isPending } = useFormStatus();

   return (
      <button
         ref={ref}
         type='submit'
         disabled={disabled || isPending}
         className=' flex justify-center items-center bg-blue-500 rounded-md px-3 py-2 text-white hover:bg-blue-600 hover:text-gray-100 font-semibold w-full lg:w-28 transition-colors duration-300'
      >
         {isPending ? <SpinnerBtn /> : 'Translate'}
      </button>
   );
}

export default SubmitButton;
