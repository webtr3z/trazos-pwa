"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  CheckCircle,
  QrCode,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function HeroSection() {
  const router = useRouter();

  const handleRedirect = () => {
    router.replace("/dashboard/home");
  };

  // Animation variants
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

  const headlineVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const benefitVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const logoVariants = {
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
    <div className="relative">
      {/* Enhanced Background Elements */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-primary/20 via-blue-500/15 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>

        {/* QR Code Inspired Squares */}
        <div className="absolute top-20 right-20 w-3 h-3 bg-white/20 animate-bounce"></div>
        <div className="absolute top-32 right-32 w-2 h-2 bg-white/15 animate-bounce delay-300"></div>
        <div className="absolute top-40 right-16 w-4 h-4 bg-white/10 animate-bounce delay-600"></div>
        <div className="absolute top-16 right-40 w-2 h-2 bg-white/20 animate-bounce delay-900"></div>

        <div className="absolute bottom-20 left-20 w-3 h-3 bg-white/20 animate-bounce delay-200"></div>
        <div className="absolute bottom-32 left-32 w-2 h-2 bg-white/15 animate-bounce delay-500"></div>
        <div className="absolute bottom-40 left-16 w-4 h-4 bg-white/10 animate-bounce delay-800"></div>
        <div className="absolute bottom-16 left-40 w-2 h-2 bg-white/20 animate-bounce delay-1100"></div>

        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white/15 animate-bounce delay-400"></div>
        <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-white/20 animate-bounce delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-white/10 animate-bounce delay-1000"></div>
      </motion.div>

      <Card className="relative z-10 border-0 shadow-none bg-transparent">
        <CardContent className="p-8 lg:p-16">
          <motion.div
            className="text-center space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Enhanced Badge */}
            <motion.div
              className="inline-flex text-base items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 text-surface rounded-full border border-surface/20 backdrop-blur-sm shadow-lg"
              variants={badgeVariants}
            >
              <QrCode className="w-5 h-5 animate-pulse" />
              <span className="font-semibold tracking-wide">
                El futuro de tus productos{" "}
              </span>
            </motion.div>

            {/* Enhanced Main Headline */}
            <motion.div className="space-y-8" variants={headlineVariants}>
              <h1 className="text-[164px] font-black text-foreground leading-[0.9] tracking-tight">
                <span className="bg-gradient-to-r from-primary  to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                  Trazos
                </span>
                <br />
                <span className="text-surface drop-shadow-lg">Dapp</span>
              </h1>

              {/* Subtitle with enhanced styling */}
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
                Tokeniza y autentica tus productos y conviértelos en activos
                digitales verificables con blockchain y códigos QR únicos.
              </p>
            </motion.div>

            {/* Enhanced Key Benefits */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-12"
              variants={containerVariants}
            >
              <motion.div
                className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                variants={benefitVariants}
              >
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Implementación en minutos
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                variants={benefitVariants}
              >
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-foreground">
                  Seguridad blockchain
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                variants={benefitVariants}
              >
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-foreground">
                  QR inteligentes
                </span>
              </motion.div>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              className="pt-12 flex flex-col sm:flex-row gap-6 justify-center"
              variants={buttonVariants}
            >
              <Button
                size="xl"
                onClick={handleRedirect}
                className="group bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground px-10 py-4 text-lg font-bold shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
              >
                Comenzar Ahora
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </motion.div>

            {/* Enhanced Trust Indicators */}
            <motion.div
              className="pt-12 flex flex-wrap justify-center items-center gap-16 text-sm"
              variants={containerVariants}
            >
              <motion.div
                className="min-w-[200px] flex items-center justify-center"
                variants={logoVariants}
              >
                <Image
                  src="/images/base-sepolia-logo.svg"
                  alt="Base Sepolia"
                  width={120}
                  height={120}
                />
              </motion.div>
              <motion.div
                className="min-w-[200px] flex items-center justify-center"
                variants={logoVariants}
              >
                <Image
                  src="/images/ipfs-logo.svg"
                  alt="IPFS"
                  width={64}
                  height={64}
                />
              </motion.div>
              <motion.div
                className="min-w-[200px] flex items-center justify-center"
                variants={logoVariants}
              >
                <Image
                  src="/images/thirdweb-logo.svg"
                  alt="Thirdweb"
                  width={180}
                  height={180}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
