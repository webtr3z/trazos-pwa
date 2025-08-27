import { ArticleCard } from "@/components/cards/article-card";

export function AppFeatures() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="🔐 Autenticación Web3 Segura"
        href="#"
        description="Sistema de autenticación basado en wallet con whitelist y validación en tiempo real para máxima seguridad."
      />

      <ArticleCard
        title="🎨 Experiencia Visual Inmersiva"
        href="#"
        description="Interfaces modernas y elegantes que se adaptan a cada página para una experiencia visual inmersiva."
      />

      <ArticleCard
        title="⚡ Dashboard Dinámico"
        href="#"
        description="Panel de control en tiempo real con datos de mercado crypto, gráficos interactivos y gestión de sesión avanzada."
      />
    </div>
  );
}
