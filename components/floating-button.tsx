import Link from "next/link";
import React from "react";

interface FlotingButton {
  children: React.ReactNode;
  href: string;
}
export default function FloatingButton({ children, href }: FlotingButton) {
  return (
    <Link href={href}>
      <a className="fixed bottom-24 right-5 flex aspect-square w-14 cursor-pointer  items-center justify-center rounded-full border-0 border-transparent bg-purple-400 text-white shadow-xl transition-colors hover:bg-purple-500">
        {children}
      </a>
    </Link>
  );
}
