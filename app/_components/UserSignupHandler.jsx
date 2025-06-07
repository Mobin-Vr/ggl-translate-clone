"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { createUserAction } from "../_lib/actions";
import useStore from "../translateStore";

export default function UserSignupHandler() {
  const { user } = useUser();

  const { setUserState } = useStore(
    useShallow((state) => ({
      setUserState: state.setUserState,
    })),
  );

  useEffect(() => {
    async function handleSignIn() {
      // Skip if no user is logged in
      if (!user) return;

      const email = user.emailAddresses[0].emailAddress;
      let existingUser = null;

      // Try to fetch the user from the database via route handler
      try {
        const response = await fetch(`/api/user/${email}`);

        if (response.ok) {
          existingUser = await response.json();
        } else if (response.status === 404) {
          existingUser = null; // User not found
        } else {
          throw new Error(`Server responded with status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        return;
      }

      // If user doesn't exist, create a new one
      if (!existingUser) {
        const newUser = await createUserAction({
          user_id: user.id,
          user_fullname: user.fullName,
          user_email: email,
        });

        // Store new user data in Zustand
        setUserState(newUser[0]);
      }

      // If user exists, store their data in Zustand
      if (existingUser) setUserState(existingUser);
    }

    // Call the sign-in handler and log any unexpected errors
    handleSignIn().catch((error) => {
      console.error("Error creating user record in DB:", error);
    });
  }, [user, setUserState]);

  return null;
}
