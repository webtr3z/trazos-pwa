"use client";

import { HeroSection } from "../sections/home/hero-section";
import MarqueeSection from "../sections/home/marquee-section";
import { BenefitsSection } from "../sections/home/benefits-section";
import { FeaturesSection } from "../sections/home/features-section";
import { UseCasesSection } from "../sections/home/use-cases-section";
import { TechnologyStackSection } from "../sections/home/technology-stack-section";
import { CTASection } from "../sections/home/cta-section";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen relative w-full overflow-x-hidden">
      {/* Content */}
      <div className="relative w-full">
        {/* Hero Section */}
        <HeroSection />

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
      </div>
    </div>
  );
}
