import "@/app/_styles/globals.css";

import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "tippy.js/dist/tippy.css"; // optional
import UserSignupHandler from "./_components/UserSignupHandler";
import Header from "./_components/Header";
import ResponsiveWrapper from "./_components/ResponsiveWrapper";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: "normal",
  display: "swap",
});

const iranSansRegular = localFont({
  src: "../public/fonts/IRANSansWeb.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Google Translate",
    default: "Google Translate",
  },
  description: "Translate text and recognize speech with Google Translate.",
};

export default function RootLayout({ children, history }) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" className="h-full">
        <body
          className={`flex h-full flex-col ${roboto.className} ${iranSansRegular.className} `}
        >
          <SignedIn>
            <UserSignupHandler />
          </SignedIn>

          <Header />

          {/* It is a wrapper component to handle the responsive design but the pages (main page: children & history page) are server components */}
          <ResponsiveWrapper mainApp={children} theHistory={history} />

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
