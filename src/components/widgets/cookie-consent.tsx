"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Cookie,
  Shield,
  Settings,
  CheckCircle,
  X,
  ExternalLink,
} from "lucide-react";
import { Icon } from "@iconify/react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };

    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    localStorage.setItem("cookie-preferences", JSON.stringify(allAccepted));
    setShowConsent(false);

    // Here you would typically initialize analytics, marketing tools, etc.
    console.log("All cookies accepted:", allAccepted);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
    setShowConsent(false);
    setShowPreferences(false);

    // Here you would typically initialize selected services
    console.log("Selected cookies accepted:", preferences);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };

    localStorage.setItem("cookie-consent", JSON.stringify(onlyNecessary));
    localStorage.setItem("cookie-preferences", JSON.stringify(onlyNecessary));
    setShowConsent(false);

    console.log("Only necessary cookies accepted:", onlyNecessary);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return; // Can't disable necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      {/* Main Consent Banner */}
      {!showPreferences && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/50 shadow-2xl"
        >
          <div className="container max-w-7xl mx-auto">
            <Card className="border-border/50 bg-card backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  {/* Cookie Icon and Title */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Cookie className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Utilizamos cookies
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Para mejorar tu experiencia en nuestro sitio
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex-1 text-sm text-muted-foreground leading-relaxed">
                    Utilizamos cookies esenciales para el funcionamiento del
                    sitio y cookies opcionales para análisis, marketing y
                    funcionalidades adicionales. Puedes gestionar tus
                    preferencias en cualquier momento.
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPreferences(true)}
                      className="border-border/50 hover:border-primary/50"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Personalizar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRejectAll}
                      className="border-border/50 hover:border-red-500/50 text-red-600 hover:text-red-700"
                    >
                      Rechazar
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleAcceptAll}
                      className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aceptar Todo
                    </Button>
                  </div>
                </div>

                {/* Privacy Policy Link */}
                <div className="mt-4 pt-4 border-t border-border/30">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      Al continuar, aceptas nuestra{" "}
                      <a
                        href="/privacy"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                      >
                        Política de Privacidad
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowConsent(false)}
                      className="h-6 px-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Detailed Preferences Modal */}
      {showPreferences && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center p-4"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            <Card className="border-border/50 bg-card/95 backdrop-blur-sm">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Preferencias de Cookies
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreferences(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Cookie Categories */}
                <div className="space-y-4 mb-6">
                  {/* Necessary Cookies */}
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">
                          Cookies Necesarias
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          Siempre Activas
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Cookies esenciales para el funcionamiento básico del
                        sitio web.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">
                          Cookies de Análisis
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          Opcional
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Nos ayudan a entender cómo utilizas el sitio para
                        mejorarlo.
                      </p>
                    </div>
                    <Button
                      variant={preferences.analytics ? "default" : "outline"}
                      size="sm"
                      onClick={() => togglePreference("analytics")}
                      className="h-8 px-3"
                    >
                      {preferences.analytics ? "Activado" : "Desactivado"}
                    </Button>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">
                          Cookies de Marketing
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          Opcional
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Utilizadas para mostrar contenido relevante y publicidad
                        personalizada.
                      </p>
                    </div>
                    <Button
                      variant={preferences.marketing ? "default" : "outline"}
                      size="sm"
                      onClick={() => togglePreference("marketing")}
                      className="h-8 px-3"
                    >
                      {preferences.marketing ? "Activado" : "Desactivado"}
                    </Button>
                  </div>

                  {/* Functional Cookies */}
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">
                          Cookies Funcionales
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          Opcional
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Habilitan funcionalidades adicionales como recordar
                        preferencias.
                      </p>
                    </div>
                    <Button
                      variant={preferences.functional ? "default" : "outline"}
                      size="sm"
                      onClick={() => togglePreference("functional")}
                      className="h-8 px-3"
                    >
                      {preferences.functional ? "Activado" : "Desactivado"}
                    </Button>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowPreferences(false)}
                    className="border-border/50 hover:border-primary/50"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAcceptSelected}
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Guardar Preferencias
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
