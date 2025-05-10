'use client';

import { useUser } from '@clerk/nextjs';
import { useCallback, useEffect } from 'react';

import { useShallow } from 'zustand/react/shallow';
import useStore from '../translateStore';
import { createUserAction, getUserByEmailAction } from '../_lib/actions';

export default function UserSignupHandler() {
   const { user } = useUser();

   const { setUserState } = useStore(
      useShallow((state) => ({
         setUserState: state.setUserState,
      }))
   );

   // Use useCallback to prevent unnecessary re-renders
   const memoized_setUserState = useCallback(
      (userState) => setUserState(userState),
      [setUserState]
   );

   useEffect(() => {
      async function handleSignIn() {
         // If no user is logged in, do nothing
         if (!user) return;

         const email = user.emailAddresses[0].emailAddress;

         const existingUser = await getUserByEmailAction(email);

         // If the user doesn't exist, create a new user and store their data in the store
         if (!existingUser) {
            const newUser = await createUserAction({
               user_fullname: user.fullName,
               user_email: email,
            });

            memoized_setUserState(newUser[0]);
         }

         if (existingUser) memoized_setUserState(existingUser);
      }

      // Call the sign-in handler and catch any errors
      handleSignIn().catch((error) => {
         console.error('Error creating user record in DB:', error);
      });
   }, [user, memoized_setUserState]);

   return null;
}
