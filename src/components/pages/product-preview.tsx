/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  Eye,
  Package,
  Calendar,
  ExternalLink,
  Shield,
  Hash,
  Globe,
  Database,
  QrCode,
  Copy,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";

interface ProductPreviewProps {
  product: Product;
  onEdit: (product: Product) => void;
  onPublish: (productId: string) => void;
  onBack: () => void;
}

export function ProductPreview({
  product,
  onEdit,
  onPublish,
  onBack,
}: ProductPreviewProps) {
  const router = useRouter();

  // QR Code state
  const [qrCodeUrl, setQrCodeUrl] = useState(
    `https://tu-app.com/producto/${product.id}`,
  );
  const [qrCodeSize, setQrCodeSize] = useState(256);
  const [qrCodeColor, setQrCodeColor] = useState("#000000");

  // Generate QR Code
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        // Dynamic import of qrcode library
        const QRCode = (await import("qrcode")).default;
        const container = document.getElementById("qr-code-container");
        if (container) {
          // Remove placeholder first
          const placeholder = container.querySelector("#qr-placeholder");
          if (placeholder) {
            placeholder.remove();
          }

          // Clear container and generate new QR code
          container.innerHTML = "";
          await QRCode.toCanvas(container, qrCodeUrl, {
            width: qrCodeSize,
            color: {
              dark: qrCodeColor,
              light: "#FFFFFF",
            },
            margin: 2,
          });
        }
      } catch (error) {
        console.error("Error generating QR code:", error);
        // Fallback: show error message
        const container = document.getElementById("qr-code-container");
        if (container) {
          container.innerHTML = `
            <div class="flex flex-col items-center justify-center space-y-2">
              <img 
                src="/images/qrcode-sample.svg" 
                alt="QR Code Sample" 
                class="w-40 h-40"
              />
              <p class="text-sm text-foreground text-center">
                Error generando QR<br/>
                <span class="text-xs">Usando muestra por defecto</span>
              </p>
            </div>
          `;
        }
      }
    };

    generateQRCode();
  }, [qrCodeUrl, qrCodeSize, qrCodeColor]);

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "published":
        return "border border-success text-success";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "border border-muted";
      default:
        return "bg-transparent text-muted-foreground";
    }
  };

  const getStatusText = (status: Product["status"]) => {
    switch (status) {
      case "published":
        return "Publicado";
      case "draft":
        return "Borrador";
      case "archived":
        return "Archivado";
      default:
        return "Desconocido";
    }
  };

  const handlePublish = () => {
    onPublish(product.id);
  };

  const handleEdit = () => {
    onEdit(product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Professional Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a Mis Productos
            </Button>

            <div className="flex items-center gap-4">
              <Badge
                variant="outline"
                className={getStatusColor(product.status)}
              >
                <Shield className="w-3 h-3 mr-1" />
                {getStatusText(product.status)}
              </Badge>

              {product.status === "draft" && (
                <Button
                  variant="default"
                  onClick={handlePublish}
                  className="shadow-lg"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Publicar en Blockchain
                </Button>
              )}

              <Button
                onClick={handleEdit}
                variant="outline"
                className="border-2"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Image */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted rounded-2xl overflow-hidden shadow-sm border border-border/50">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-32 h-32 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                      {product.name}
                    </h1>
                    {product.description && (
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Token Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Token ID
                      </span>
                    </div>
                    <div className="text-lg font-mono font-semibold">
                      #{product.id}
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Creado
                      </span>
                    </div>
                    <div className="text-lg font-semibold">
                      {product.createdAt.toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Actualizado
                      </span>
                    </div>
                    <div className="text-lg font-semibold">
                      {product.updatedAt.toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Properties */}
              {Object.keys(product.customFields).length > 0 && (
                <Card className="border-2 border-border/50 shadow-sm">
                  <CardHeader className="">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-2">
                        <CardTitle className="flex items-center gap-2">
                          <Globe className="w-5 h-5" />
                          Propiedades del Token
                        </CardTitle>
                        <CardDescription>
                          Metadatos on-chain del producto tokenizado
                        </CardDescription>
                      </div>

                      <div className="flex flex-col items-end">
                        <Badge variant="outline" className="text-xs">
                          Base Sepolia Testnet
                        </Badge>
                        {/* Blockchain Explorer Link */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 border-info text-info hover:bg-info hover:text-info-foreground transition-all duration-300 ease-in-out"
                          onClick={() =>
                            window.open(
                              `https://sepolia.basescan.org/token/${product.id}`,
                              "_blank",
                            )
                          }
                        >
                          <ExternalLink className="w-3 h-3 mr-2" />
                          Ver en Base Sepolia Explorer
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(product.customFields).map(
                        ([key, value]) => (
                          <div key={key} className="space-y-2">
                            <div className="text-sm font-medium text-muted-foreground capitalize">
                              {value.trait_type
                                .replace(/([A-Z])/g, " $1")
                                .trim()}
                            </div>
                            <div className="text-base font-semibold bg-muted/30 px-3 py-2 rounded-lg border border-border/50">
                              {String(value.value)}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* QR Code Section */}
              <Card className="border-2 border-border/50 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <CardTitle className="flex items-center gap-2">
                        <QrCode className="w-5 h-5" />
                        Código QR del Producto
                      </CardTitle>
                      <CardDescription>
                        Escanea para acceder a la información del producto
                        tokenizado
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* QR Code Display */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Código QR</h4>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Copy QR code data to clipboard
                              navigator.clipboard.writeText(qrCodeUrl);
                            }}
                            className="border-2"
                          >
                            <Copy className="w-3 h-3 mr-2" />
                            Copiar URL
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Download QR code as image
                              const canvas = document.querySelector("canvas");
                              if (canvas) {
                                const link = document.createElement("a");
                                link.download = `${product.name}-qr-code.png`;
                                link.href = canvas.toDataURL();
                                link.click();
                              }
                            }}
                            className="border-2"
                          >
                            <Download className="w-3 h-3 mr-2" />
                            Descargar
                          </Button>
                        </div>
                      </div>

                      <div className="bg-white/40 rounded-lg p-6 border border-border/50 flex items-center justify-center">
                        <div
                          id="qr-code-container"
                          className="flex items-center justify-center"
                        >
                          {/* QR Code will be generated here */}
                          <div
                            id="qr-placeholder"
                            className="flex items-center justify-center"
                          >
                            <img
                              src="/images/qrcode-sample.svg"
                              alt="QR Code Sample"
                              className="w-48 h-48"
                            />
                            <p className="text-xs text-muted-foreground mt-2 text-center">
                              Generando QR personalizado...
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* QR Code Configuration */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold mb-3">
                          Configuración del QR
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-2">
                              URL de Destino
                            </label>
                            <input
                              type="text"
                              value={qrCodeUrl}
                              onChange={(e) => setQrCodeUrl(e.target.value)}
                              className="w-full p-3 border border-border/50 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              placeholder="https://tu-app.com/producto/123"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Esta URL se abrirá cuando se escanee el código QR
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-2">
                              Tamaño del QR
                            </label>
                            <select
                              value={qrCodeSize}
                              onChange={(e) =>
                                setQrCodeSize(Number(e.target.value))
                              }
                              className="w-full p-3 border border-border/50 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                              <option value={128}>128x128 px</option>
                              <option value={256}>256x256 px</option>
                              <option value={512}>512x512 px</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-2">
                              Color del QR
                            </label>
                            <div className="flex items-center gap-3">
                              <input
                                type="color"
                                value={qrCodeColor}
                                onChange={(e) => setQrCodeColor(e.target.value)}
                                className="w-12 h-12 border border-border/50 rounded-lg cursor-pointer"
                              />
                              <span className="text-sm text-muted-foreground">
                                Color principal del código QR
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
