import { MdMenu } from "react-icons/md";
import LoginButton from "./ui/LoginButton";
import Logo from "./Logo";
import Profile from "./Profile";
import { headers } from "next/headers";

async function Header() {
  // Get the custom header set in the middleware
  const headersList = await headers();
  const currentPath = headersList.get("x-current-path");

  // Check if the current path is "/history"
  const isHistoryPage = currentPath === "/history";

  return (
    <header className="mb-5 flex h-16 items-center justify-between border-b px-8">
      <div className="flex items-center gap-3 text-gray-600">
        <MdMenu className="h-6 w-6" />
        <Logo />
      </div>

      <Profile />
    </header>
  );
}

export default Header;
