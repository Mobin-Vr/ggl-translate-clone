import { Roboto, Vazirmatn } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Header from '@/app/_components/Header';
import '@/app/_styles/globals.css';

const roboto = Roboto({
   weight: ['400', '700'],
   subsets: ['latin'],
   style: 'normal',
   display: 'swap',
});

const vazirmatn = Vazirmatn({
   weight: ['400', '700'],
   subsets: ['arabic'],
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
      <html lang='en'>
         <body className={`${roboto.className} ${vazirmatn.className}`}>
            <Toaster />
            <Header />
            <div className='mx-auto max-w-6xl'>{children}</div>
         </body>
      </html>
   );
}
