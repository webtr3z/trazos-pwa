"use client";

import { ThemeToggle } from "@/components/widgets/theme-toggle";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TopNavbar() {
  const router = useRouter();

  const handleRedirect = () => {
    router.replace("/dashboard/home");
  };

  return (
    <nav className="bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="w-full mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <div className="flex items-center space-x-4 mr-12">
              <Image
                src="/images/trazos.svg"
                alt="Logo"
                width={40}
                height={40}
                className=""
              />
            </div>
            <nav className="flex items-center gap-8 font-medium">
              <Link
                className="hover:text-primary transition-colors duration-200"
                href="/"
              >
                Inicio
              </Link>
              <Link
                className="hover:text-primary transition-colors duration-200"
                href="/explorer"
              >
                Explorar
              </Link>
            </nav>
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
            <Button
              size="xl"
              onClick={handleRedirect}
              className="group bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground px-10 py-4 text-lg font-bold shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
            >
              Iniciar
              {/* <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" /> */}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
