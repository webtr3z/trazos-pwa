"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const projectTypes = [
  { value: "product-minting", label: "Minteo de Productos" },
  { value: "qr-implementation", label: "Implementación QR" },
  { value: "blockchain-integration", label: "Integración Blockchain" },
  { value: "custom-development", label: "Desarrollo Personalizado" },
  { value: "consulting", label: "Consultoría" },
  { value: "other", label: "Otro" },
];

const budgetRanges = [
  { value: "under-5k", label: "Menos de 5.000€" },
  { value: "5k-15k", label: "5.000€ - 15.000€" },
  { value: "15k-50k", label: "15.000€ - 50.000€" },
  { value: "50k-100k", label: "50.000€ - 100.000€" },
  { value: "over-100k", label: "Más de 100.000€" },
  { value: "not-specified", label: "No especificado" },
];

const timelineOptions = [
  { value: "asap", label: "Lo antes posible" },
  { value: "1-3-months", label: "1-3 meses" },
  { value: "3-6-months", label: "3-6 meses" },
  { value: "6-12-months", label: "6-12 meses" },
  { value: "over-12-months", label: "Más de 12 meses" },
  { value: "not-specified", label: "No especificado" },
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validation
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "El mensaje debe tener al menos 20 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData);
      
      setSubmitStatus("success");
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: "",
        });
        setSubmitStatus("idle");
      }, 3000);
      
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (field: keyof FormData) => {
    const baseClasses = "transition-all duration-200";
    const errorClasses = errors[field] 
      ? "border-destructive focus:border-destructive focus:ring-destructive/20" 
      : "border-border/50 focus:border-primary/50 focus:ring-primary/20";
    
    return `${baseClasses} ${errorClasses}`;
  };

  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          ¡Mensaje enviado!
        </h3>
        <p className="text-muted-foreground mb-6">
          Gracias por contactarnos. Te responderemos en menos de 24 horas.
        </p>
        <Button
          onClick={() => setSubmitStatus("idle")}
          variant="outline"
          className="border-border/50 hover:border-primary/50"
        >
          Enviar otro mensaje
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Nombre completo *
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={getInputClassName("name")}
            placeholder="Tu nombre completo"
            disabled={isSubmitting}
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.name}
            </motion.p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={getInputClassName("email")}
            placeholder="tu@email.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </motion.p>
          )}
        </div>
      </div>

      {/* Company */}
      <div className="space-y-2">
        <Label htmlFor="company" className="text-sm font-medium text-foreground">
          Empresa
        </Label>
        <Input
          id="company"
          type="text"
          value={formData.company}
          onChange={(e) => handleInputChange("company", e.target.value)}
          className={getInputClassName("company")}
          placeholder="Nombre de tu empresa (opcional)"
          disabled={isSubmitting}
        />
      </div>

      {/* Project Type and Budget Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="projectType" className="text-sm font-medium text-foreground">
            Tipo de proyecto
          </Label>
          <Select
            value={formData.projectType}
            onValueChange={(value) => handleInputChange("projectType", value)}
            disabled={isSubmitting}
          >
            <SelectTrigger className={getInputClassName("projectType")}>
              <SelectValue placeholder="Selecciona el tipo" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget" className="text-sm font-medium text-foreground">
            Presupuesto
          </Label>
          <Select
            value={formData.budget}
            onValueChange={(value) => handleInputChange("budget", value)}
            disabled={isSubmitting}
          >
            <SelectTrigger className={getInputClassName("budget")}>
              <SelectValue placeholder="Selecciona el rango" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((budget) => (
                <SelectItem key={budget.value} value={budget.value}>
                  {budget.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-2">
        <Label htmlFor="timeline" className="text-sm font-medium text-foreground">
          Timeline del proyecto
        </Label>
        <Select
          value={formData.timeline}
          onValueChange={(value) => handleInputChange("timeline", value)}
          disabled={isSubmitting}
        >
          <SelectTrigger className={getInputClassName("timeline")}>
            <SelectValue placeholder="Selecciona el timeline" />
          </SelectTrigger>
          <SelectContent>
            {timelineOptions.map((timeline) => (
              <SelectItem key={timeline.value} value={timeline.value}>
                {timeline.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium text-foreground">
          Mensaje *
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          className={`min-h-[120px] resize-none ${getInputClassName("message")}`}
          placeholder="Cuéntanos sobre tu proyecto, objetivos, requisitos específicos..."
          disabled={isSubmitting}
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-destructive flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            {errors.message}
          </motion.p>
        )}
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Mínimo 20 caracteres</span>
          <span>{formData.message.length}/500</span>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-primary hover:bg-gradient-primary-hover text-primary-foreground font-semibold py-3 text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Enviando mensaje...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Enviar mensaje
          </>
        )}
      </Button>

      {/* Error Message */}
      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
        >
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">
              Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
            </span>
          </div>
        </motion.div>
      )}

      {/* Privacy Notice */}
      <div className="text-xs text-muted-foreground text-center leading-relaxed">
        Al enviar este formulario, aceptas que procesemos tu información de contacto 
        para responder a tu consulta. Puedes consultar nuestra{" "}
        <a href="/privacy" className="text-primary hover:underline">
          Política de Privacidad
        </a>{" "}
        para más detalles.
      </div>
    </form>
  );
}
