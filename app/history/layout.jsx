import BackBtn from '../_components/BackBtn';

export const metadata = {
   title: 'History',
};

function layout({ children }) {
   return (
      <div className='relative py-8'>
         <BackBtn />
         <div className='mt-8'>{children}</div>
      </div>
   );
}

export default layout;
