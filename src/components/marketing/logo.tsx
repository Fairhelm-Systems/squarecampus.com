"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      data-logo-anchor
      className={cn(
        "group relative z-20 flex items-center gap-2.5 rounded-xl px-2 py-1.5",
        "transition-all duration-200 hover:bg-white/5",
        className
      )}
    >
      <div className="relative flex h-8 w-8 items-center justify-center">
        <Image
          src="https://cdn.mdtechspire.com/application_files/logo/squarecampus.png"
          alt="SquareCampus"
          width={32}
          height={32}
          className="transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <span className="text-lg font-semibold tracking-tight text-white">
        SquareCampus
      </span>
    </Link>
  );
};
