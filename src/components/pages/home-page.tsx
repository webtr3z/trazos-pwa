"use client";

import {
  BenefitsSection,
  CTASection,
  FeaturesSection,
  FooterSection,
  HeroSection,
  TechnologyStackSection,
  UseCasesSection,
} from "@/components/sections";
import MarqueeSection from "@/components/sections/home/marquee-section";
import { motion } from "framer-motion";
import { InteractiveLinesBackgroundComponent } from "../backgrounds/interactive-lines-background";

export default function HomePage() {
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
  return (
    <div className="z-[-10] min-h-screen relative w-full overflow-x-hidden">
      {/* Clean background - no floating elements */}
      <div className="absolute w-[100vw] h-[100vh] inset-0 z-[0] top-0 left-0">
        {/* Three.js Interactive Lines Background */}
        <InteractiveLinesBackgroundComponent
          canvasId="hero-background-canvas"
          className="pointer-events-auto"
        />
      </div>

      {/* Content */}
      <div className="relative overflow-x-hidden z-10 w-full">
        {/* Hero Section */}
        <div className="container max-w-7xl mx-auto px-4 pt-24 pb-16">
          <HeroSection />
        </div>

        {/* Marquee Section */}
        <MarqueeSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Use Cases Section */}
        <UseCasesSection />

        {/* Technology Stack Section */}
        <TechnologyStackSection />

        {/* CTA Section */}
        <CTASection />

        {/* Footer */}
        <FooterSection />
      </div>
    </div>
  );
}
