import BackBtn from '../_components/BackBtn';
import Header from '../_components/Header';

export const metadata = {
   title: 'History',
};

function layout({ children }) {
   return (
      <div className='relative py-8'>
         <BackBtn />

         <Header />
         <div className='mt-8'>{children}</div>
      </div>
   );
}

export default layout;
