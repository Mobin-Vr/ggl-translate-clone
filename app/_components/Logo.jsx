import GoogleIcon from "@/public/google.png";
import Image from "next/image";
import Link from "next/link";

function Logo({ className }) {
  return (
    <Link href="/" className={`flex items-center gap-1 ${className}`}>
      <div className="relative hidden h-18 w-18 md:block">
        <Image src={GoogleIcon} alt="logo" fill className="object-cover" />
      </div>
      <p className="mt-[0.2rem] text-[1.33rem] font-medium">Translate</p>
    </Link>
  );
}

export default Logo;
