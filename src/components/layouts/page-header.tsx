"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function PageHeader() {
  const router = useRouter();

  const handleRedirect = () => {
    router.replace("/dashboard/home");
  };

  return (
    <div className="relative">
      <Card className="relative z-10 border-0 shadow-none bg-transparent">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-foreground">
              <span>Web3</span> Auth Template
            </h1>
            <p className="text-base text-surface">
              Leer{" "}
              <a
                href="https://github.com/webtr3z/web3-auth-template"
                target="__blank"
              >
                <code className="bg-muted italic text-muted-foreground p-[4px] rounded-sm leading-none">
                  README.md
                </code>
              </a>{" "}
              para más información
            </p>
            <div className="pt-8 flex gap-4 justify-center">
              <Button size="xl" onClick={handleRedirect}>
                Comenzar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
