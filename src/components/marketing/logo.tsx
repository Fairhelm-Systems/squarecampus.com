"use client";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      data-logo-anchor
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-white"
    >
      <Image
        src="https://cdn.squarecampus.in/application_files/logo-light.png"
        alt="logo"
        width={30}
        height={30}
      />
      <span className="font-medium text-white">SquareCampus</span>
    </Link>
  );
};
