import '@/app/_styles/globals.css';

import { ClerkProvider, SignedIn } from '@clerk/nextjs';
import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import UserSignupHandler from './_components/UserSignupHandler';

const roboto = Roboto({
   weight: ['400', '700'],
   subsets: ['latin'],
   style: 'normal',
   display: 'swap',
});

const iranSansRegular = localFont({
   src: '../public/fonts/IRANSansWeb.ttf',
   weight: '400',
   style: 'normal',
   display: 'swap',
});

export const metadata = {
   title: {
      template: '%s | Google Translate',
      default: 'Google Translate',
   },
   description: 'Translate text and recognize speech with Google Translate.',
};

export default function RootLayout({ children }) {
   return (
      <ClerkProvider dynamic>
         <html lang='en'>
            <body
               className={`${roboto.className} ${iranSansRegular.className} $`}
            >
               <SignedIn>
                  <UserSignupHandler />
               </SignedIn>

               <main className='mx-auto max-w-6xl'>{children}</main>

               <Toaster />
            </body>
         </html>
      </ClerkProvider>
   );
}
