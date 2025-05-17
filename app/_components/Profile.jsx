'use client';
import { useState, useEffect, useRef } from 'react';
import ProfileModal from './ProfileModal';
import { UserButton, useUser } from '@clerk/nextjs';

function Profile({ session }) {
   const [isModalOpen, setModalOpen] = useState(false);
   const modalRef = useRef(null);

   const { user } = useUser();

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

   const userButtonAppearance = {
      elements: {
         userButtonAvatarBox: 'w-10.5 h-10.5',
      },
   };

   return (
      <div className='relative' ref={modalRef}>
         <div
            onClick={toggleModal}
            className='h-10 w-10 rounded-full hover:bg-gray-200 flex items-center justify-center'
         >
            <UserButton
               appearance={userButtonAppearance}
               userProfileMode={false}
            />
         </div>

         {isModalOpen && (
            <ProfileModal user={user} onClose={() => setModalOpen(false)} />
         )}
      </div>
   );
}

export default Profile;
