import Image from 'next/image';
import Link from 'next/link';
import { MdMenu } from 'react-icons/md';
import GoogleIcon from '@/public/google.png';

function Logo() {
   return (
      <Link href='/' className='flex items-center gap-2'>
         <div className='relative h-[4.5rem] w-[4.5rem] hidden md:block'>
            <Image src={GoogleIcon} alt='logo' fill className='object-cover' />
         </div>
         <p className='text-[1.35rem] mt-[0.2rem]'>Translate</p>
      </Link>
   );
}

export default Logo;
