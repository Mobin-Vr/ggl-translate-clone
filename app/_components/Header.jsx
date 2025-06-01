import { auth } from "@clerk/nextjs/server";
import Logo from "./Logo";
import Profile from "./Profile";
import SigninBtn from "./SigninBtn";
import DottedAppBtn from "./ui/DottedAppBtn";
import MenuBtn from "./ui/MenuBtn";
import SettingBtn from "./ui/SettingBtn";

async function Header() {
  const { userId } = await auth();

  return (
    <header
      id="main-header" // to control header visibility
      className="flex h-16.5 items-center justify-between border-b border-b-gray-300 px-3 pr-6"
    >
      <div className="flex items-center gap-1 text-center text-gray-600">
        <MenuBtn />
        <Logo className="mt-1" />
      </div>

      <div className="flex items-center gap-2 text-center text-gray-500">
        <SettingBtn />
        <DottedAppBtn />

        {userId ? <Profile /> : <SigninBtn />}
      </div>
    </header>
  );
}

export default Header;
