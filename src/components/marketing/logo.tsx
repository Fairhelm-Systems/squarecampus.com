"use client";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      data-logo-anchor
      className="font-normal flex space-x-2 items-center text-sm mr-4 text-black px-2 py-1 relative z-20"
    >
      <Image src="https://cdn.squarecampus.in/application_files/logo-light.png" alt="logo" width={30} height={30} />
      <span className="font-medium text-white">SquareCampus</span>
    </Link>
  );
};
