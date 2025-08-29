"use client";

import { useParams, useRouter } from "next/navigation";
import { useProduct } from "@/hooks/use-product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Heart,
  Share2,
  ExternalLink,
  Shield,
  CheckCircle,
  Calendar,
  Tag,
} from "lucide-react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const tokenId = params.id as string;
  const { product, loading, error } = useProduct(tokenId);

  const getPrice = (product: any) => {
    const priceField = product.customFields.find(
      (attribute: any) => attribute?.trait_type?.toLowerCase() === "precio",
    );
    return priceField?.value || "N/A";
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "inactive":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      default:
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            {/* Back button skeleton */}
            <div className="h-10 bg-muted rounded-lg w-24"></div>

            {/* Product layout skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image skeleton */}
              <div className="h-96 bg-muted rounded-xl"></div>

              {/* Content skeleton */}
              <div className="space-y-6">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
                <div className="h-12 bg-muted rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <div className="text-center py-20">
            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Producto no encontrado
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              {error || "No se pudo cargar la información del producto."}
            </p>
            <Button onClick={() => router.push("/explorer")}>
              Explorar Productos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-8 hover:bg-background/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Explorar
          </Button>
        </motion.div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="relative group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 w-10 p-0 rounded-full bg-background/90 hover:bg-background"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 w-10 p-0 rounded-full bg-background/90 hover:bg-background"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <Badge className={`${getStatusColor(product.status)} border`}>
                  {product.status || "Activo"}
                </Badge>
              </div>
            </div>

            {/* Token ID Display */}
            <div className="text-center">
              <Badge variant="outline" className="text-sm">
                Token ID: {product.id}
              </Badge>
            </div>
          </motion.div>

          {/* Product Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-center gap-3 pt-4">
                <Icon icon="logos:ethereum" width="32" height="32" />
                <span className="text-3xl font-bold text-foreground">
                  {getPrice(product)} ETH
                </span>
              </div>
            </div>

            <Separator />

            {/* Product Attributes */}
            {product.customFields && product.customFields.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Características
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.customFields.map((field: any, index: number) => (
                    <Card key={index} className="bg-card/50 border-border/30">
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">
                          {field.trait_type}
                        </div>
                        <div className="font-medium text-foreground">
                          {field.value}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Blockchain Verification */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Verificación Blockchain
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-muted-foreground">
                    Token autenticado en Base Sepolia
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-muted-foreground">
                    Metadatos almacenados en IPFS
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-muted-foreground">
                    Inmutable y verificable
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Timestamps */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Información Temporal
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Creado</div>
                  <div className="text-foreground">
                    {product.createdAt?.toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Actualizado</div>
                  <div className="text-foreground">
                    {product.updatedAt?.toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground font-semibold"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver en Blockchain
              </Button>

              <Button variant="outline" size="lg" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
