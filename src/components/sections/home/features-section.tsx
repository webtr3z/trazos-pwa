"use client";

import { AppFeatures } from "@/components/data-display/app-features";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function FeaturesSection() {
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
    hidden: { opacity: 0, y: 30 },
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
    <div className="w-full px-4 py-32 bg-primary">
      <motion.div
        className="text-center mb-20 w-full space-y-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <Badge className="mb-6 px-4 py-2 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
          <Award className="w-4 h-4 mr-2" />
          Características Principales
        </Badge>

        <h2 className="text-7xl max-w-[70%] mx-auto font-bold text-primary-foreground leading-tight">
          Todo lo que necesitas para{" "}
          <span className="bg-gradient-to-r from-purple-950 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            digitalizar tus productos
          </span>
        </h2>

        <p className="text-xl text-primary-foreground max-w-3xl mx-auto leading-relaxed">
          Una suite completa de herramientas para convertir productos físicos en
          activos digitales verificables y comerciables.
        </p>
      </motion.div>

      {/* App Features Component */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <AppFeatures />
      </motion.div>

      {/* Simple Feature List */}
      {/* <motion.div
        className="mt-20 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="space-y-6">
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
            variants={itemVariants}
          >
            <div className="flex items-center gap-6">
              <div className="w-3 h-3 bg-background rounded-full"></div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-background mb-2">
                  Escaneo Instantáneo
                </h3>
                <p className="text-background/80">
                  Cualquier smartphone puede escanear y acceder inmediatamente a
                  la información del producto.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
            variants={itemVariants}
          >
            <div className="flex items-center gap-6">
              <div className="w-3 h-3 bg-background rounded-full"></div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-background mb-2">
                  PDP Directo
                </h3>
                <p className="text-background/80">
                  Redirección automática a la página digital del producto con
                  toda la información verificable.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
            variants={itemVariants}
          >
            <div className="flex items-center gap-6">
              <div className="w-3 h-3 bg-background rounded-full"></div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-background mb-2">
                  Verificación en Tiempo Real
                </h3>
                <p className="text-background/80">
                  Autenticidad verificable instantáneamente en la blockchain
                  para máxima confianza.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div> */}
    </div>
  );
}
