import { ClerkLoaded, SignInButton } from "@clerk/nextjs";

export default function SigninBtn() {
  return (
    <ClerkLoaded>
      <SignInButton
        mode="modal"
        className="flex h-8 cursor-pointer items-center justify-center rounded-sm bg-blue-500 px-4 py-1 text-sm text-white transition-colors duration-300 hover:bg-blue-600 hover:shadow-md"
      >
        Sign in
      </SignInButton>
    </ClerkLoaded>
  );
}
