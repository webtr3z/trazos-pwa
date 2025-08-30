"use client";

import { ContactForm } from "@/components/forms/contact-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare,
  Globe,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
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

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hola@trazos.com",
      description: "Respuesta en 24 horas",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Phone,
      title: "Teléfono",
      value: "+34 600 000 000",
      description: "Lun-Vie 9:00-18:00",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: MapPin,
      title: "Oficina",
      value: "Madrid, España",
      description: "Visitas con cita previa",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Clock,
      title: "Horario",
      value: "9:00 - 18:00",
      description: "GMT+1 (CET)",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Respuesta Rápida",
      description: "Nos comprometemos a responder en menos de 24 horas",
    },
    {
      icon: MessageSquare,
      title: "Soporte Personalizado",
      description: "Atención directa con nuestro equipo de expertos",
    },
    {
      icon: Globe,
      title: "Disponibilidad Global",
      description: "Soporte en español e inglés para clientes internacionales",
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
            <MessageSquare className="w-4 h-4 mr-2" />
            Contacto
          </Badge>
          
          <h1 className="text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Hablemos sobre tu{" "}
            <span className="text-gradient">proyecto</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ¿Tienes una idea para digitalizar tus productos? ¿Necesitas ayuda con la implementación? 
            Nuestro equipo está aquí para ayudarte a convertir tu visión en realidad.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-xl">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    Envíanos un mensaje
                  </h2>
                  <p className="text-muted-foreground">
                    Cuéntanos sobre tu proyecto y te responderemos lo antes posible.
                  </p>
                </div>
                
                <ContactForm />
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Información de contacto
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group"
                  >
                    <Card className="border-border/30 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${info.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                            <info.icon className={`w-5 h-5 ${info.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground mb-1">
                              {info.title}
                            </h4>
                            <p className="text-sm font-semibold text-foreground mb-1">
                              {info.value}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {info.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                ¿Por qué elegirnos?
              </h3>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3 p-4 bg-card/30 rounded-lg border border-border/20 hover:bg-card/50 transition-all duration-300"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gradient-primary rounded-xl text-primary-foreground"
            >
              <h4 className="font-semibold text-lg mb-2">
                ¿Proyecto urgente?
              </h4>
              <p className="text-sm opacity-90 mb-4">
                Para consultas urgentes o proyectos con deadlines ajustados, 
                contáctanos directamente por teléfono.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                <span className="font-medium">+34 600 000 000</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
