"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { HeroSection } from "../sections/home/hero-section";
import MarqueeSection from "../sections/home/marquee-section";
import { BenefitsSection } from "../sections/home/benefits-section";
import { FeaturesSection } from "../sections/home/features-section";
import { UseCasesSection } from "../sections/home/use-cases-section";
import { TechnologyStackSection } from "../sections/home/technology-stack-section";
import { CTASection } from "../sections/home/cta-section";

// Experimental 3D tilt effect component
const TiltCard = ({
  children,
  intensity = 20,
}: {
  children: React.ReactNode;
  intensity?: number;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    setMousePosition({ x: mouseX, y: mouseY });
  }, []);

  // Calculate rotation values directly from state
  const rotateX = Math.max(
    -intensity,
    Math.min(intensity, (mousePosition.y / 200) * intensity),
  );
  const rotateY = Math.max(
    -intensity,
    Math.min(intensity, (mousePosition.x / 200) * intensity),
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="perspective-1000"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

// Experimental magnetic cursor effect
const MagneticCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isClient]);

  const springConfig = { stiffness: 500, damping: 28 };

  return (
    <>
      {/* Outer cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", ...springConfig }}
      >
        <div className="w-full h-full border-2 border-white rounded-full" />
      </motion.div>

      {/* Inner cursor dot */}
      <motion.div
        ref={cursorInnerRef}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-50 bg-white rounded-full"
        style={{
          x: mousePosition.x - 1,
          y: mousePosition.y - 1,
        }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", ...springConfig, delay: 0.05 }}
      />
    </>
  );
};

// Experimental morphing background
const MorphingBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isClient]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated SVG background */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="morphGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(154, 255, 141, 0.1)" />
            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <motion.path
          d="M0,50 Q25,25 50,50 T100,50 L100,100 L0,100 Z"
          fill="url(#morphGradient)"
          animate={{
            d: [
              "M0,50 Q25,25 50,50 T100,50 L100,100 L0,100 Z",
              "M0,50 Q25,75 50,50 T100,50 L100,100 L0,100 Z",
              "M0,50 Q25,25 50,50 T100,50 L100,100 L0,100 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />
      </svg>

      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 border border-primary/20"
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + i * 8}%`,
            transform: `rotate(${i * 45}deg)`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [i * 45, i * 45 + 360, i * 45],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

// Experimental scroll-triggered text reveal
const ScrollRevealText = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8],
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className="relative overflow-hidden"
    >
      <motion.div
        className="block"
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Experimental section wrapper with advanced animations
const ExperimentalSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 100,
  stagger = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "rotate";
  distance?: number;
  stagger?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getTransform = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      case "scale":
        return { scale: 0.5 };
      case "rotate":
        return { rotateY: 90 };
      default:
        return { y: distance };
    }
  };

  const getFinalTransform = () => {
    switch (direction) {
      case "scale":
        return { scale: 1 };
      case "rotate":
        return { rotateY: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...getTransform(),
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              ...getFinalTransform(),
            }
          : {
              opacity: 0,
              ...getTransform(),
            }
      }
      transition={{
        duration: 1.5,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
};

// Experimental scroll progress with morphing
const MorphingScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div className="fixed top-0 left-0 right-0 h-1 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-purple-500 to-primary origin-left"
        style={{ scaleX }}
      />
      <motion.div
        className="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full -mt-1.5"
        style={{
          x: useTransform(scaleX, [0, 1], [0, Math.max(0, windowWidth - 16)]),
        }}
      />
    </motion.div>
  );
};

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Get scroll progress for animations
  const { scrollYProgress } = useScroll();

  // Create transform values for scroll-reactive effects
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.3, 0.6, 0.8],
  );
  const particlesOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.2, 0.4, 0.6],
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-7xl mx-auto px-4 py-24">
          <div className="animate-pulse">
            <div className="h-96 bg-muted rounded-lg mb-8"></div>
            <div className="h-64 bg-muted rounded-lg mb-8"></div>
            <div className="h-80 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Experimental magnetic cursor */}
      <MagneticCursor />

      {/* Experimental morphing background */}
      <MorphingBackground />

      {/* Experimental morphing scroll progress */}
      <MorphingScrollProgress />

      {/* Main container with experimental effects */}
      <div
        ref={containerRef}
        className="relative min-h-screen w-full overflow-hidden"
      >
        {/* Enhanced content wrapper with experimental animations */}
        <div className="relative w-full">
          {/* Hero Section with elegant text motion */}
          <ExperimentalSection delay={0.1} direction="scale">
            <div className="relative z-10">
              <HeroSection />
            </div>
          </ExperimentalSection>

          {/* Marquee with experimental scroll reveal */}
          <ExperimentalSection delay={0.2} direction="up" distance={80}>
            <ScrollRevealText delay={0.1}>
              <div className="relative z-10">
                <MarqueeSection />
              </div>
            </ScrollRevealText>
          </ExperimentalSection>

          {/* Benefits with experimental stagger animations */}
          <ExperimentalSection
            delay={0.3}
            direction="up"
            distance={100}
            stagger={true}
          >
            <div className="relative z-10">
              <BenefitsSection />
            </div>
          </ExperimentalSection>

          {/* Features with experimental rotation effect */}
          <ExperimentalSection delay={0.4} direction="rotate">
            <div className="relative z-10">
              <FeaturesSection />
            </div>
          </ExperimentalSection>

          {/* Use Cases with experimental scale effect */}
          <ExperimentalSection delay={0.5} direction="scale">
            <div className="relative z-10">
              <UseCasesSection />
            </div>
          </ExperimentalSection>

          {/* Technology Stack with experimental left entrance */}
          <ExperimentalSection delay={0.6} direction="left" distance={120}>
            <div className="relative z-10">
              <TechnologyStackSection />
            </div>
          </ExperimentalSection>

          {/* CTA with experimental dramatic entrance */}
          <ExperimentalSection delay={0.7} direction="up" distance={150}>
            <div className="relative z-10">
              <CTASection />
            </div>
          </ExperimentalSection>
        </div>

        {/* Experimental scroll-reactive background effects */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle at ${50 + scrollY * 0.05}% ${50 + scrollY * 0.03}%, rgba(154, 255, 141, 0.03) 0%, transparent 60%)`,
            opacity: backgroundOpacity,
          }}
        />

        {/* Experimental floating particles with scroll interaction */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            opacity: particlesOpacity,
          }}
        >
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.8, 1],
                x: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
              }}
            />
          ))}
        </motion.div>

        {/* Experimental scroll indicator */}
        <AnimatePresence>
          {isScrolling && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed right-8 bottom-8 w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 flex items-center justify-center z-40"
            >
              <motion.div
                className="w-8 h-8 border-2 border-primary rounded-full border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
