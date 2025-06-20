import "@/app/_styles/globals.css";

import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import ResponsiveWrapper from "./_components/ResponsiveWrapper";
import UserSignupHandler from "./_components/UserSignupHandler";
import Header from "./_components/Header";

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

export default async function RootLayout({ children, history }) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" className="h-full">
        <body
          className={`flex h-full flex-col ${roboto.className} ${iranSansRegular.className} `}
        >
          <Header />

          {/* It is a wrapper component to handle the responsive design but the pages (main page: children & history page) are server components */}
          <ResponsiveWrapper mainApp={children} theHistory={history} />

          <SignedIn>
            <UserSignupHandler />
          </SignedIn>

          {/* Portal for the modal */}
          <div id="portal-root" />

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
