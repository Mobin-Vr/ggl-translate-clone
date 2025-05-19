// "use client";

import { AppsDotsIcon } from "@/public/icons";
import { headers } from "next/headers";
import { MdMenu } from "react-icons/md";
import Logo from "./Logo";
import Profile from "./Profile";
import SettingBtn from "./ui/SettingBtn";
import DottedAppBtn from "./ui/DottedAppBtn";
import MenuBtn from "./ui/MenuBtn";

async function Header() {
  // Get the custom header set in the middleware
  const headersList = await headers();
  const currentPath = headersList.get("x-current-path");

  // Check if the current path is "/history"
  const isHistoryPage = currentPath === "/history";

  return (
    <header className="flex h-16.5 items-center justify-between border-b border-b-gray-300 px-3 pr-6">
      <div className="flex items-center gap-1 text-center text-gray-600">
        <MenuBtn />
        <Logo className="mt-1" />
      </div>

      <div className="flex items-center gap-2 text-center text-gray-500">
        <SettingBtn />
        <DottedAppBtn />
        <Profile />
      </div>
    </header>
  );
}

export default Header;
