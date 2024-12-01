import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const InfoBar = (props: Props) => {
  return (
    <header className="sticky top-0 z-40 w-full pt-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 via-violet-600 to-violet-700">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl tracking-tight">frinz.ai</span>
          </div>
        </Link>

        <div className="flex items-center justify-end gap-4">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default InfoBar;
