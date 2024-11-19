import SignInButton from '../_components/SignInButton';
import SignOutButton from '../_components/SignOutButton';

export const metadata = {
   title: 'login',
};

export default function Page() {
   return (
      <div className='flex flex-col gap-10 mt-10 items-center'>
         <h2 className='text-xl font-semibold'>
            Sign in to access your guest area
         </h2>

         <SignInButton />
         <SignOutButton />
      </div>
   );
}
