"use client";

import { Badge } from "@/components/ui/badge";
import { Code, CheckCircle } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function TechnologyStackSection() {
  const techStack = [
    {
      name: "Next.js",
      logo: "/images/nextjs-icon.svg",
      description: "Framework React para aplicaciones web modernas y rápidas",
      fallbackIcon: "⚛️",
    },
    {
      name: "Thirdweb",
      logo: "/images/thirdweb-icon.svg",
      description: "SDK para desarrollo blockchain y Web3 simplificado",
      fallbackIcon: "🔗",
    },
    {
      name: "Base Sepolia",
      logo: "/images/base-sepolia-icon.svg",
      description: "Red de prueba de Coinbase para desarrollo y testing",
      fallbackIcon: "🪙",
    },
    {
      name: "IPFS",
      logo: "/images/ipfs-icon.svg",
      description:
        "Sistema de archivos distribuido para almacenamiento descentralizado",
      fallbackIcon: "🌐",
    },
  ];

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
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
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
    <div className="w-full px-4 py-32 bg-gradient-to-b from-gray-950 to-background relative overflow-hidden">
      {/* QR Code Inspired Squares */}
      <div className="absolute top-20 left-20 w-3 h-3 bg-white/20 animate-bounce"></div>
      <div className="absolute top-32 left-32 w-2 h-2 bg-white/15 animate-bounce delay-300"></div>
      <div className="absolute top-40 left-16 w-4 h-4 bg-white/10 animate-bounce delay-600"></div>
      <div className="absolute top-16 left-40 w-2 h-2 bg-white/20 animate-bounce delay-900"></div>

      <div className="absolute bottom-20 right-20 w-3 h-3 bg-white/20 animate-bounce delay-200"></div>
      <div className="absolute bottom-32 right-32 w-2 h-2 bg-white/15 animate-bounce delay-500"></div>
      <div className="absolute bottom-40 right-16 w-4 h-4 bg-white/10 animate-bounce delay-800"></div>
      <div className="absolute bottom-16 right-40 w-2 h-2 bg-white/20 animate-bounce delay-1100"></div>

      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/15 animate-bounce delay-400"></div>
      <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-white/20 animate-bounce delay-700"></div>
      <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-white/10 animate-bounce delay-1000"></div>

      <motion.div
        className="text-center mb-20 w-full space-y-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <Badge className="mb-6 px-4 py-2 bg-transparent text-base text-foreground border-white/50">
          <Code className="w-4 h-4 mr-2" />
          Stack Tecnológico
        </Badge>
        <h2 className="text-7xl max-w-[85%] mx-auto font-bold text-foreground leading-tight">
          Construido con las mejores{" "}
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            tecnologías Web3
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Nuestra plataforma utiliza las herramientas más avanzadas y confiables
          para garantizar seguridad, escalabilidad y rendimiento excepcional.
        </p>
      </motion.div>

      {/* Logo Grid */}
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              className="text-center group cursor-pointer"
              variants={itemVariants}
            >
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 border border-white/20">
                  {tech.logo ? (
                    <Image
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                  ) : (
                    <span className="text-3xl">{tech.fallbackIcon}</span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {tech.name}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-sm">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Status Indicators */}
      <motion.div
        className="mt-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="inline-flex items-center gap-8 px-8 py-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm text-foreground">Auditado</span>
          </div>
          <div className="w-px h-6 bg-white/20"></div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-foreground">Open Source</span>
          </div>
          <div className="w-px h-6 bg-white/20"></div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-foreground">
              Activamente Mantenido
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
