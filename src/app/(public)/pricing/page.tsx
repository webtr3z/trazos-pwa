"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  Crown,
  Zap,
  Sparkles,
  Star,
  ArrowRight,
  Sparkles as SparklesIcon,
} from "lucide-react";
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
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 text-surface rounded-full border border-surface/20 backdrop-blur-sm shadow-lg mb-12"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SparklesIcon className="w-5 h-5 animate-pulse" />
            <span className="font-semibold tracking-wide">Precios</span>
          </motion.div>

          <motion.h1
            className="text-6xl lg:text-7xl font-black text-foreground leading-tight tracking-tight mb-8"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <span className="text-gradient">Precios</span>
          </motion.h1>

          <motion.p
            className="text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8 }}
          >
            Elige el plan{" "}
            <span className="text-gradient font-bold">perfecto</span> para tu
            proyecto
          </motion.p>

          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Desde proyectos personales hasta grandes empresas, tenemos el plan
            ideal para que puedas tokenizar tus productos y conectarlos con el
            futuro digital.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.0 }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className="relative group"
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20"
                >
                  <Badge
                    className={`${plan.badgeColor} px-6 py-3 text-sm font-bold shadow-xl border-2 border-primary/30`}
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    {plan.badge}
                  </Badge>
                </motion.div>
              )}

              <Card
                className={`h-full border-2 ${plan.color} ${plan.bgColor} backdrop-blur-xl shadow-xl hover:shadow-primary/25 transition-all duration-500 relative overflow-hidden group-hover:border-primary/50`}
              >
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />

                <CardHeader className="relative pb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className={`p-4 rounded-2xl ${plan.badgeColor.replace("text-", "bg-").replace("text-white", "bg-white")} ${plan.badgeColor.includes("text-white") ? "text-purple-500" : "text-primary"} shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <plan.icon className="w-8 h-8" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-foreground">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-lg">
                        {plan.description}
                      </CardDescription>
                    </div>
                  </div>

                  {/* Pricing Display */}
                  <div className="text-center">
                    <motion.div
                      className="flex items-baseline justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                    >
                      <span className="text-6xl font-black text-foreground">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-2xl text-muted-foreground font-medium">
                          {plan.period}
                        </span>
                      )}
                    </motion.div>
                    {plan.price === "Gratis" && (
                      <motion.p
                        className="text-base text-muted-foreground mt-3 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        Sin tarjeta de crédito
                      </motion.p>
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
                        className="flex items-start gap-3 group/feature"
                      >
                        <motion.div
                          className="flex-shrink-0 w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center mt-1 border border-green-500/30"
                          whileHover={{
                            scale: 1.2,
                            backgroundColor: "rgba(34, 197, 94, 0.3)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <Check className="w-3 h-3 text-green-500" />
                        </motion.div>
                        <span className="text-base text-foreground leading-relaxed font-medium group-hover/feature:text-foreground/80 transition-colors">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="relative pt-0">
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => handleGetStarted(plan.name.toLowerCase())}
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-primary hover:bg-gradient-primary-hover text-primary-foreground shadow-xl hover:shadow-primary/30"
                          : "bg-card border-2 border-border hover:border-primary/50 hover:bg-accent text-foreground"
                      } font-bold py-4 text-lg transition-all duration-300 transform`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.8 }}
        >
          <motion.h2
            className="text-5xl lg:text-6xl font-black text-foreground mb-16"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 2.0 }}
          >
            <span className="text-gradient">¿Preguntas?</span>
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                question: "¿Puedo cambiar de plan en cualquier momento?",
                answer:
                  "Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplican inmediatamente.",
              },
              {
                question: "¿Qué pasa si excedo mi límite de productos?",
                answer:
                  "Te notificaremos cuando te acerques al límite. Puedes actualizar tu plan o contactarnos para opciones personalizadas.",
              },
              {
                question:
                  "¿Ofrecen descuentos para organizaciones sin fines de lucro?",
                answer:
                  "Sí, ofrecemos descuentos especiales para ONGs y organizaciones educativas. Contáctanos para más detalles.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="p-8 bg-card/60 rounded-2xl border border-border/40 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:bg-card/80"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 2.2 + index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <h3 className="font-bold text-xl text-foreground mb-4">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 3.0 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={() => router.push("/contact")}
                variant="outline"
                size="lg"
                className="border-2 border-border/50 hover:border-primary/50 px-12 py-4 text-lg font-bold bg-card/80 backdrop-blur-sm hover:bg-primary/10 transition-all duration-500"
              >
                ¿Necesitas un plan personalizado?
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
