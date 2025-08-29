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

export default function HomePage() {
  return (
    <div className="min-h-screen relative w-full">
      {/* 3D Background Scene */}
      {/* <BackgroundCanvas /> */}

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
