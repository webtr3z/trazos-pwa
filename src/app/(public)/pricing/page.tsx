"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, Zap, Sparkles, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();

  const handleGetStarted = (plan: string) => {
    if (plan === "free") {
      router.push("/auth");
    } else {
      router.push("/contact");
    }
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

  const plans = [
    {
      name: "Starter",
      description: "Perfecto para comenzar tu viaje en la tokenización",
      price: "Gratis",
      period: "",
      features: [
        "3 productos tokenizados gratuitos",
        "Códigos QR básicos",
        "Almacenamiento IPFS estándar",
        "Soporte por email",
        "Acceso a la plataforma web",
        "Templates básicos de productos",
        "Verificación blockchain básica",
        "Dashboard simple",
      ],
      cta: "Comenzar Gratis",
      popular: false,
      icon: Sparkles,
      color: "border-border/50",
      bgColor: "bg-card/80",
      badge: "Perfecto para empezar",
      badgeColor: "bg-muted text-muted-foreground",
    },
    {
      name: "Professional",
      description: "Para negocios que quieren escalar su presencia digital",
      price: "49€",
      period: "/mes",
      features: [
        "50 productos tokenizados",
        "Códigos QR personalizables",
        "Almacenamiento IPFS premium",
        "Soporte prioritario",
        "API completa",
        "Templates avanzados",
        "Verificación blockchain completa",
        "Dashboard avanzado",
        "Analytics básicos",
        "Integración con redes sociales",
        "Backup automático",
        "Soporte por chat",
      ],
      cta: "Comenzar Prueba",
      popular: true,
      icon: Crown,
      color: "border-primary/50",
      bgColor: "bg-card/90",
      badge: "Más Popular",
      badgeColor: "bg-primary text-primary-foreground",
    },
    {
      name: "Enterprise",
      description: "Solución completa para grandes organizaciones",
      price: "199€",
      period: "/mes",
      features: [
        "Productos ilimitados",
        "Códigos QR completamente personalizables",
        "Almacenamiento IPFS dedicado",
        "Soporte 24/7",
        "API personalizada",
        "Templates personalizados",
        "Verificación blockchain avanzada",
        "Dashboard empresarial",
        "Analytics avanzados",
        "Integración completa",
        "Backup en tiempo real",
        "Soporte telefónico",
        "Onboarding personalizado",
        "SLA garantizado",
        "Múltiples usuarios",
        "White-label disponible",
      ],
      cta: "Contactar Ventas",
      popular: false,
      icon: Star,
      color: "border-purple-500/50",
      bgColor: "bg-card/80",
      badge: "Para empresas",
      badgeColor: "bg-purple-500 text-white",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-7xl mx-auto px-4 py-24">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Badge className="mb-6 px-4 py-2 bg-primary/10 text-primary border-primary/20">
            <Star className="w-4 h-4 mr-2" />
            Precios
          </Badge>
          
          <h1 className="text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Elige el plan{" "}
            <span className="text-gradient">perfecto</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Desde proyectos personales hasta grandes empresas, tenemos el plan ideal para 
            que puedas tokenizar tus productos y conectarlos con el futuro digital.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className="relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <Badge className={`${plan.badgeColor} px-4 py-2 text-sm font-semibold shadow-lg`}>
                    {plan.badge}
                  </Badge>
                </motion.div>
              )}

              <Card className={`h-full border-2 ${plan.color} ${plan.bgColor} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative pb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl ${plan.badgeColor.replace('text-', 'bg-').replace('text-white', 'bg-white')} ${plan.badgeColor.includes('text-white') ? 'text-purple-500' : 'text-primary'}`}>
                      <plan.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-foreground">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {plan.description}
                      </CardDescription>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-lg text-muted-foreground">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    {plan.price === "Gratis" && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Sin tarjeta de crédito
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="relative pb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + featureIndex * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 bg-green-500/10 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-green-500" />
                        </div>
                        <span className="text-sm text-foreground leading-relaxed">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="relative pt-0">
                  <Button
                    onClick={() => handleGetStarted(plan.name.toLowerCase())}
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-primary hover:bg-gradient-primary-hover text-primary-foreground"
                        : "bg-card border border-border hover:bg-accent text-foreground"
                    } font-semibold py-3 text-lg transition-all duration-300 transform hover:scale-[1.02]`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mt-32 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-foreground mb-8">
            ¿Tienes preguntas?
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 bg-card/50 rounded-xl border border-border/30">
              <h3 className="font-semibold text-foreground mb-2">
                ¿Puedo cambiar de plan en cualquier momento?
              </h3>
              <p className="text-muted-foreground">
                Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplican inmediatamente.
              </p>
            </div>
            
            <div className="p-6 bg-card/50 rounded-xl border border-border/30">
              <h3 className="font-semibold text-foreground mb-2">
                ¿Qué pasa si excedo mi límite de productos?
              </h3>
              <p className="text-muted-foreground">
                Te notificaremos cuando te acerques al límite. Puedes actualizar tu plan o contactarnos para opciones personalizadas.
              </p>
            </div>
            
            <div className="p-6 bg-card/50 rounded-xl border border-border/30">
              <h3 className="font-semibold text-foreground mb-2">
                ¿Ofrecen descuentos para organizaciones sin fines de lucro?
              </h3>
              <p className="text-muted-foreground">
                Sí, ofrecemos descuentos especiales para ONGs y organizaciones educativas. Contáctanos para más detalles.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12">
            <Button
              onClick={() => router.push("/contact")}
              variant="outline"
              size="lg"
              className="border-border/50 hover:border-primary/50 px-8 py-3"
            >
              ¿Necesitas un plan personalizado?
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
