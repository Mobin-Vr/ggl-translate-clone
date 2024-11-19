import BackBtn from '../_components/BackBtn';

export const metadata = {
   title: 'History',
};

function layout({ children }) {
   return (
      <div className='relative p-10'>
         <BackBtn />
         <div className='mt-10'>{children}</div>
      </div>
   );
}

export default layout;
