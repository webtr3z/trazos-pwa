"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Shield, Zap } from "lucide-react";

export function BenefitsSection() {
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="w-full px-4 py-32 bg-gradient-to-b from-background to-gray-950 relative overflow-hidden">
      {/* Clean background - no floating elements */}

      <motion.div
        className="text-center mb-20 w-full space-y-4"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <Badge className="bg-transparent text-base text-foreground border-white/50">
          Beneficios
        </Badge>
        <h2 className="text-7xl max-w-[70%] mx-auto font-bold text-foreground leading-tight">
          Conecta productos físicos con{" "}
          <span className="text-gradient">
            experiencias digitales
          </span>
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-3 gap-8 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div variants={cardVariants}>
          <Card className="group relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 h-full min-h-[400px] flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="relative p-8 text-center flex-1 flex flex-col justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-100/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-10 h-10 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Alcance Global
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Conecta con clientes de todo el mundo. Los códigos QR funcionan
                en cualquier lugar, en cualquier momento, sin barreras
                geográficas.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="group relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 h-full min-h-[400px] flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="relative p-8 text-center flex-1 flex flex-col justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-info/20 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-info" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Seguridad Blockchain
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Autenticidad verificable en la blockchain. Cada producto tiene
                un registro inmutable, transparente y resistente a la
                manipulación.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="group relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 h-full min-h-[400px] flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="relative p-8 text-center flex-1 flex flex-col justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Velocidad de Implementación
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Crea y gestiona productos NFT en minutos con interfaz intuitiva
                y escalabilidad instantánea.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
