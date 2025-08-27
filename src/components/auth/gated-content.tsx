"use client";

import { LoginButton } from "@/components/auth/login-button";

export const GatedContent = () => {
  return (
    <div className="flex bg-transparent! flex-col min-h-[100vh] pb-10 tems-center justify-center container p-4 text-center max-w-screen-lg mx-auto">
      <LoginButton />
      <p className="text-2xl font-bold mt-4">Tienes acceso a este contenido</p>
    </div>
  );
};
