'use client';
import { useState, useEffect, useRef } from 'react';
import ProfileModal from './ProfileModal';

function Profile({ session }) {
   const [isModalOpen, setModalOpen] = useState(false);
   const modalRef = useRef(null);

   function toggleModal() {
      setModalOpen(!isModalOpen);
   }

   function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
         setModalOpen(false);
      }
   }

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   return (
      <div className='relative' ref={modalRef}>
         <div className='h-10 w-10 rounded-full hover:bg-gray-200 flex items-center justify-center'>
            <img
               className='h-8 w-8 rounded-full cursor-pointer'
               src={session.user?.image}
               alt={session.user?.name}
               referrerPolicy='no-referrer'
               onClick={toggleModal}
            />
         </div>

         {isModalOpen && (
            <ProfileModal
               session={session}
               onClose={() => setModalOpen(false)}
            />
         )}
      </div>
   );
}

export default Profile;
