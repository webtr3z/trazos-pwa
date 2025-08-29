"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function CTASection() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/auth");
  };

  const handleLearnMore = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
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

  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="w-full px-4 py-32 bg-gradient-to-b from-background to-gray-900">
      <motion.div
        className="relative z-10 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {/* Main CTA Content */}
        <motion.div className="mb-16" variants={fadeInUp}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 text-surface rounded-full border border-surface/20 backdrop-blur-sm shadow-lg mb-8">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="font-semibold tracking-wide">
              Revoluciona tu negocio hoy
            </span>
          </div>

          <h2 className="text-7xl max-w-[85%] mx-auto font-bold text-foreground mb-8 leading-tight">
            ¿Listo para{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
              revolucionar tu negocio?
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Únete a la revolución digital y conecta tus productos físicos con el
            futuro de la blockchain. El momento es ahora.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div variants={staggerItem}>
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
              >
                Comenzar Ahora
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Button
                variant="outline"
                size="lg"
                onClick={handleLearnMore}
                className="px-12 py-6 text-xl font-bold border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm shadow-lg"
              >
                Ver Demostración
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Simple Trust Indicators */}
        <motion.div
          className="inline-flex items-center gap-8 px-8 py-4"
          variants={staggerItem}
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">
              +1000 productos
            </span>
          </div>
          <div className="w-px h-6 bg-white/20"></div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-1000"></div>
            <span className="text-sm text-muted-foreground">+50 empresas</span>
          </div>
          <div className="w-px h-6 bg-white/20"></div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-2000"></div>
            <span className="text-sm text-muted-foreground">99.9% uptime</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
