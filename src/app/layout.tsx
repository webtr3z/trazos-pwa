import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { ThemeProvider } from "@/contexts/theme-context";
import { JotaiProvider } from "@/providers/jotai-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "thirdweb SDK + Next starter",
  description:
    "Starter template for using thirdweb SDK with Next.js App router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThirdwebProvider>
          <JotaiProvider>
            <ThemeProvider>
              {children}
              <Toaster />
            </ThemeProvider>
          </JotaiProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
