"use client";

import { TopNavbar } from "@/components/navigation/top-navbar";
import { Footer } from "./footer";
import { CookieConsent } from "../widgets/cookie-consent";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <TopNavbar />
      <main className="w-full flex-1">{children}</main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
