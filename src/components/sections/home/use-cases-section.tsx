"use client";

import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Database, Lock } from "lucide-react";
import { motion } from "framer-motion";

export function UseCasesSection() {
  const useCases = [
    {
      icon: TrendingUp,
      title: "Comercio Minorista",
      description:
        "Conecta productos en tiendas físicas con contenido digital, ofertas especiales y verificación de autenticidad en tiempo real.",
      color: "blue",
    },
    {
      icon: Database,
      title: "Cadena de Suministro",
      description:
        "Rastrea productos desde la fabricación hasta el cliente final con transparencia total en la blockchain y trazabilidad completa.",
      color: "green",
    },
    {
      icon: Lock,
      title: "Lujo y Coleccionables",
      description:
        "Verifica la autenticidad de productos de lujo y crea colecciones digitales únicas para tus clientes con certificación blockchain.",
      color: "purple",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div className="w-full px-4 py-32 bg-gradient-to-b from-background to-gray-900 relative overflow-hidden">
      {/* Clean background - no floating elements */}

      <motion.div
        className="text-center mb-20 w-full space-y-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <Badge className="mb-6 px-4 py-2 bg-transparent text-base text-foreground border-white/50">
          <Target className="w-4 h-4 mr-2" />
          Casos de Uso
        </Badge>
        <h2 className="text-7xl max-w-[85%] mx-auto font-bold text-foreground leading-tight">
          Descubre cómo diferentes industrias{" "}
          <span className="text-gradient drop-shadow-lg">
            se benefician de Trazos
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Desde comercio minorista hasta productos de lujo, Trazos ofrece
          soluciones adaptadas a cada sector y necesidad específica.
        </p>
      </motion.div>

      {/* Simple Use Cases Layout */}
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid md:grid-cols-3 gap-12">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            const colorClasses = {
              blue: "text-blue-500",
              green: "text-green-500",
              purple: "text-purple-500",
            };

            return (
              <motion.div
                key={useCase.title}
                className="text-center group"
                variants={itemVariants}
              >
                <div className="mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 border border-white/20">
                    <IconComponent
                      className={`w-10 h-10 ${colorClasses[useCase.color as keyof typeof colorClasses]}`}
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {useCase.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
