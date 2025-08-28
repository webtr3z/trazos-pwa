/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { QrCode, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface QrCodeGeneratorProps {
  productId: string;
  productName: string;
  onQrCodeGenerated: (svgFile: File) => void;
  className?: string;
}

export function QrCodeGenerator({
  productId,
  productName,
  onQrCodeGenerated,
  className = "",
}: QrCodeGeneratorProps) {
  const [qrCodeSvg, setQrCodeSvg] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(
    `https://bazurto.vercel.app/product/${productId}`,
  );
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const hasGenerated = useRef(false);

  // Generate QR code only once when component mounts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    // Prevent multiple generations
    if (hasGenerated.current || !productId || !productName) return;

    hasGenerated.current = true;

    const generateQrCode = async () => {
      setIsGenerating(true);
      try {
        // Dynamic import of qrcode library
        const QRCode = (await import("qrcode")).default;

        const qrData = {
          productId,
          productName,
          timestamp: Date.now(),
          redirectUrl,
        };

        const qrCodeSvgString = await QRCode.toString(JSON.stringify(qrData), {
          type: "svg",
          width: 200,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });

        setQrCodeSvg(qrCodeSvgString);

        // Convert SVG string to File and pass to parent
        const svgBlob = new Blob([qrCodeSvgString], { type: "image/svg+xml" });
        const svgFile = new File([svgBlob], `${productName}-qr-code.svg`, {
          type: "image/svg+xml",
        });

        onQrCodeGenerated(svgFile);
      } catch (error) {
        console.error("Error generating QR code:", error);
        toast.error("Error generando código QR");
      } finally {
        setIsGenerating(false);
      }
    };

    generateQrCode();
  }, []); // Empty dependency array - only run once

  return (
    <Card className={`border-2 border-border/50 shadow-sm ${className}`}>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* QR Code Display */}
          <div className="space-y-4">
            {/* <h4 className="text-lg font-semibold">Código QR</h4> */}
            <div className="bg-background rounded-lg p-6 border border-border/50 flex items-center justify-center min-h-[200px]">
              {isGenerating ? (
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Generando código QR...
                  </p>
                </div>
              ) : qrCodeSvg ? (
                <div
                  ref={qrCodeRef}
                  dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
                  className="flex items-center justify-center"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <QrCode className="w-16 h-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Código QR no generado</p>
                </div>
              )}
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold mb-3">Configuración</h4>
                <Badge variant="outline" className="text-xs">
                  Auto-generado
                </Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="redirectUrl"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    URL de Redirección
                  </Label>
                  <Input
                    id="redirectUrl"
                    type="text"
                    value={redirectUrl}
                    onChange={(e) => setRedirectUrl(e.target.value)}
                    className="mt-2 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
                    placeholder="https://tu-app.com/producto/123"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    URL a la que se redirigirá al escanear el código QR
                  </p>
                </div>

                <div className="pt-2">
                  <Badge variant="outline" className="text-xs">
                    {qrCodeSvg
                      ? "✅ QR Generado"
                      : "⏳ Pendiente de Generación"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
