"use client";

import { ThemeToggle } from "@/components/widgets/theme-toggle";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";

export function TopNavbar() {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="w-full mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-4">
            <Image
              src="/images/trazos.svg"
              alt="Logo"
              width={40}
              height={40}
              className=""
            />
          </div>
          <div className="flex items-center space-x-3">
            <button
              className="flex items-center justify-center rounded-md transition-all duration-200 ease-in-out min-w-[50px] p-0 min-h-[50px] hover:bg-accent"
              onClick={() =>
                window.open(
                  "https://github.com/webtr3z/web3-auth-template",
                  "_blank",
                )
              }
            >
              <Icon icon="akar-icons:github-fill" className="h-8 w-8" />
              <span className="sr-only">GitHub</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
