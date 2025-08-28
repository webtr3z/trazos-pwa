import { ArticleCard } from "@/components/cards/article-card";

export function AppFeatures() {
  return (
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
  );
}
