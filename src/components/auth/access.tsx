"use client";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { LoginButton } from "./login-button";
import { useRouter } from "next/navigation";

export const Access = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/dashboard/home");
  };

  const handleBack = () => {
    router.replace("/");
  };

  return (
    <div className="flex bg-transparent flex-col gap-4 items-center justify-center p-4 text-center">
      <LoginButton />
      <Separator className="w-full my-4" />
      <div className="flex gap-4 items-center">
        <Button variant="link" onClick={handleBack}>
          Volver
        </Button>
        <Button variant="outline" onClick={handleRedirect}>
          Continuar
        </Button>
      </div>
    </div>
  );
};
