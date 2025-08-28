import { ArticleCard } from "@/components/cards/article-card";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Globe, Zap } from "lucide-react";

export function AppFeatures() {
  return (
    <div className="space-y-16">
      {/* Statistics Section */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center p-6 border-0 shadow-lg bg-gradient-to-br backdrop-blur-sm from-primary/5 to-primary/10 rounded-2xl">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-2">100%</div>
          <div className="text-sm text-muted-foreground">Verificable</div>
        </Card>

        <Card className="text-center p-6 border-0 shadow-lg bg-gradient-to-br backdrop-blur-sm from-blue-500/5 to-blue-500/10 rounded-2xl">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-2">
            &lt;5 min
          </div>
          <div className="text-sm text-muted-foreground">Implementación</div>
        </Card>

        <Card className="text-center p-6 border-0 shadow-lg bg-gradient-to-br backdrop-blur-sm from-green-500/5 to-green-500/10 rounded-2xl">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Globe className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-2">Global</div>
          <div className="text-sm text-muted-foreground">Alcance</div>
        </Card>

        <Card className="text-center p-6 border-0 shadow-lg bg-gradient-to-br backdrop-blur-sm from-purple-500/5 to-purple-500/10 rounded-2xl ">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-2">24/7</div>
          <div className="text-sm text-muted-foreground">Disponible</div>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="grid gap-4 lg:grid-cols-3 justify-center">
        <ArticleCard
          title="🚀 Formularios Dinámicos NFT"
          href="#"
          description="Crea productos únicos con campos personalizables (texto, número, selección) y conviértelos en NFTs en la blockchain de Base Sepolia."
        />

        <ArticleCard
          title="🔐 Autenticación Web3 Segura"
          href="#"
          description="Sistema de autenticación basado en wallet con Thirdweb, whitelist y validación en tiempo real para máxima seguridad blockchain."
        />

        <ArticleCard
          title="📱 Generación de Códigos QR"
          href="#"
          description="Sistema inteligente para generar códigos QR únicos que conectan productos físicos con sus páginas digitales (PDP) en la blockchain."
        />
      </div>
    </div>
  );
}
