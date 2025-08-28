"use client";

import { AppFeatures } from "@/components/data-display/app-features";
import { PageHeader } from "@/components/layouts/page-header";
import { BackgroundCanvas } from "@/sketches";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Users,
  TrendingUp,
  Code,
  Database,
  Lock,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/auth");
  };

  const handleLearnMore = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative">
      {/* 3D Background Scene */}
      <BackgroundCanvas />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container max-w-7xl mx-auto px-4 py-20">
          <PageHeader />
        </div>

        {/* Benefits Section */}
        <div className="container max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              ¿Por qué elegir Bazurto?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              La plataforma que revoluciona la forma de conectar productos
              físicos con el mundo digital
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Velocidad de Implementación
              </h3>
              <p className="text-muted-foreground">
                Crea y gestiona productos NFT en minutos, no en días. Interfaz
                intuitiva para resultados inmediatos.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Seguridad Blockchain
              </h3>
              <p className="text-muted-foreground">
                Autenticidad verificable en la blockchain. Cada producto tiene
                un registro inmutable y transparente.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Alcance Global</h3>
              <p className="text-muted-foreground">
                Conecta con clientes de todo el mundo. Los códigos QR funcionan
                en cualquier lugar, en cualquier momento.
              </p>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="container max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Características Principales
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Todo lo que necesitas para digitalizar y tokenizar tus productos
            </p>
          </div>

          <AppFeatures />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-0 shadow-lg rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Códigos QR Inteligentes
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Genera códigos QR únicos para cada producto que conectan
                    directamente con su página digital verificable.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Escaneo instantáneo desde cualquier smartphone
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Redirección directa a la PDP del producto
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Verificación de autenticidad en tiempo real
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg  flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Experiencia del Cliente
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Proporciona a tus clientes una experiencia digital rica y
                    verificable para cada producto físico.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Información detallada del producto
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Historial de transacciones verificable
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Conexión directa con la marca
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="container max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Casos de Uso
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubre cómo diferentes industrias pueden beneficiarse de Bazurto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Comercio Minorista</h3>
              <p className="text-muted-foreground text-sm">
                Conecta productos en tiendas físicas con contenido digital,
                ofertas especiales y verificación de autenticidad.
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-3">
                Cadena de Suministro
              </h3>
              <p className="text-muted-foreground text-sm">
                Rastrea productos desde la fabricación hasta el cliente final
                con transparencia total en la blockchain.
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold mb-3">
                Lujo y Coleccionables
              </h3>
              <p className="text-muted-foreground text-sm">
                Verifica la autenticidad de productos de lujo y crea colecciones
                digitales únicas para tus clientes.
              </p>
            </Card>
          </div>
        </div>

        {/* Technology Stack Section */}
        <div className="container max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Tecnología de Vanguardia
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Construido con las mejores tecnologías para garantizar
              rendimiento, seguridad y escalabilidad
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Next.js 15</h3>
              <p className="text-sm text-muted-foreground">
                Framework React de última generación
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="font-semibold mb-2">Thirdweb</h3>
              <p className="text-sm text-muted-foreground">
                SDK Web3 para blockchain
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold mb-2">Base Sepolia</h3>
              <p className="text-sm text-muted-foreground">
                Blockchain L2 escalable
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-semibold mb-2">IPFS</h3>
              <p className="text-sm text-muted-foreground">
                Almacenamiento descentralizado
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container max-w-7xl mx-auto px-4 py-20">
          <Card className="text-center p-16 border-0 shadow-2xl bg-card/50 backdrop-blur-sm">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              ¿Listo para revolucionar tu negocio?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Únete a la revolución digital y conecta tus productos físicos con
              el futuro de la blockchain
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleGetStarted} className="group">
                Comenzar Ahora
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleLearnMore}>
                Ver Demostración
              </Button>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <footer className="border-t bg-muted/20 mt-20">
          <div className="container max-w-7xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Bazurto</h3>
                <p className="text-sm text-muted-foreground">
                  Conectando el mundo físico con el digital a través de
                  blockchain y códigos QR inteligentes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Producto</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Características</li>
                  <li>Precios</li>
                  <li>Documentación</li>
                  <li>API</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Soporte</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Centro de Ayuda</li>
                  <li>Contacto</li>
                  <li>Estado del Sistema</li>
                  <li>Comunidad</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Privacidad</li>
                  <li>Términos de Servicio</li>
                  <li>Cookies</li>
                  <li>Licencias</li>
                </ul>
              </div>
            </div>
            <div className="border-t pt-8 mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                © 2024 Bazurto. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
