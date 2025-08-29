"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ConnectButton, useActiveWallet, useDisconnect } from "thirdweb/react";
import { client } from "@/services/thirdweb/client";
import { ThemeToggle } from "../widgets/theme-toggle";
import { EthereumPriceWidget } from "../widgets/ethereum-price-widget";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Home, LogOut, Settings, Package, Wallet } from "lucide-react";
import { useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LoginButton } from "../auth/login-button";
import { Wallet as WalletType, WalletId } from "thirdweb/wallets";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export function PrivateLayout({ children }: PrivateLayoutProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return; // Prevent double-click

    setIsLoggingOut(true);
    try {
      disconnect(wallet as WalletType<WalletId>);
      router.push("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, wallet, disconnect, router]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full z-100 relative">
        <Sidebar className="">
          <SidebarHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 px-4 py-3">
                <Image
                  src="/images/trazos.svg"
                  alt="Logo"
                  width={40}
                  height={40}
                  className=""
                />
              </div>
            </div>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent className="px-4 py-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/home">
                    <Home className="h-4 w-4" />
                    <span>Inicio</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/my-products">
                    <Package className="h-4 w-4" />
                    <span>Mis Productos</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/my-wallet">
                    <Wallet className="h-4 w-4" />
                    <span>Mi Wallet</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Configuración</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            {/* <div className="space-y-2 p-2">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full justify-center bg-card py-6"
                disabled={isLoggingOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {isLoggingOut ? "Cerrando..." : "Cerrar Sesión"}
              </Button>
            </div> */}
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-20 items-center justify-between px-8">
              <SidebarTrigger className="-ml-1 border w-12 h-12" />
              <div className="flex items-center space-x-3">
                <div className="opacity-60">
                  <EthereumPriceWidget />
                </div>
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
                <LoginButton />
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
