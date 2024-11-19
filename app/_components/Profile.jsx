function Profile({ session }) {
   return (
      <div>
         <img
            className='h-8 rounded-full'
            src={session.user?.image}
            alt={session.user?.name}
            referrerPolicy='no-referrer'
         />

         {/* ProfileCard */}
      </div>
   );
}

export default Profile;
