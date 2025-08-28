"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";

export function PageHeader() {
  const router = useRouter();

  const handleRedirect = () => {
    router.replace("/dashboard/home");
  };

  return (
    <div className="relative">
      {/* Background Elements */}
      {/* <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div> */}

      <Card className="relative z-10 border-0 shadow-none bg-transparent">
        <CardContent className="p-8 lg:p-12">
          <div className="text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                Revolución Digital del Caribe
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
              <span className="text-primary">Bazurto </span>
              <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dapp
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Convierte lo más sabroso y auténtico del Caribe en activos
              digitales verificables con blockchain y códigos QR únicos por
              producto.
            </p>

            {/* Key Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-primary" />
                <span>Implementación en minutos</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span>Seguridad blockchain</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>QR inteligentes</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleRedirect}
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
              >
                Comenzar Ahora
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Ver Demostración
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Base Sepolia Network</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>IPFS Descentralizado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Thirdweb SDK</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
