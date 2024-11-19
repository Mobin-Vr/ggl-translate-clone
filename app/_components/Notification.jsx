import { toast } from 'react-hot-toast';

export default function CustomToast({ message }) {
   return toast.custom((t) => (
      <div
         className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
         } h-10 max-w-sm w-fit p-3 bg-blue-100 shadow-lg rounded-lg pointer-events-auto flex items-center justify-center`}
      >
         <p className='text-sm font-medium text-blue-700 text-center'>
            {message}
         </p>
      </div>
   ));
}
