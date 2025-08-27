"use client";

import { TopNavbar } from "@/components/navigation/top-navbar";


interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-transparent">
      
      <TopNavbar />
      <main className="w-full">{children}</main>
    </div>
  );
}
