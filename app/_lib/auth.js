import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createUser, getUser } from './data-services';

const authConfig = {
   providers: [
      Google({
         clientId: process.env.AUTH_GOOGLE_ID,
         clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
   ],
   callbacks: {
      authorized({ auth, request }) {
         return !!auth?.user;
      },
      async signIn({ user, account, profile }) {
         try {
            const existingUser = await getUser(user.email);

            if (!existingUser)
               await createUser({ email: user.email, fullName: user.name });

            return true;
         } catch {
            return false;
         }
      },
      // This code ensures that the guestId from the database is always attached to the session object. By doing this, you avoid multiple database calls throughout the application to retrieve the user's ID, improving efficiency and consistency.
      async session({ session, user }) {
         // Fetch the guest information from the database using the user's email
         const theUser = await getUser(session.user.email);

         // Attach the guest ID from the database to the session object
         session.user.userId = theUser.id;

         // Return the updated session object
         return session;
      },
   },
   pages: {
      signIn: '/login',
   },
};

export const {
   auth,
   signIn,
   signOut,
   handlers: { GET, POST },
} = NextAuth(authConfig);
