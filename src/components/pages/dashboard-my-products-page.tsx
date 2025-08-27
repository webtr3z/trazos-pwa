/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
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
  Plus,
  Settings,
  Eye,
  Edit,
  Trash2,
  Package,
  PlusCircle,
  X,
} from "lucide-react";
import { DynamicProductForm } from "./dynamic-product-form";
import { ProductPreview } from "./product-preview";
import { getProduct } from "@/engine/get-product";
import { nextTokenToMint } from "@/engine/next-token-to-mint";
import { useProducts } from "@/hooks/use-products";

interface Product {
  id: string;
  name: string;
  description?: string;
  status: "draft" | "published" | "archived";
  createdAt: Date;
  updatedAt: Date;
  customFields: Record<string, any>;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Nike Air Max 270",
    description:
      "Zapatillas deportivas Nike Air Max 270 con tecnología Air Max",
    status: "published",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    customFields: {
      brand: "Nike",
      size: "42",
      color: "Black",
      condition: "New",
      image: "/images/nike-shoes.png",
    },
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    description: "Smartphone Apple iPhone 15 Pro con chip A17 Pro",
    status: "draft",
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
    customFields: {
      brand: "Apple",
      storage: "256GB",
      color: "Titanium",
      condition: "Like New",
      image: "/images/iphone.png",
    },
  },
  {
    id: "3",
    name: "MacBook Air M2",
    description: "Laptop Apple MacBook Air con chip M2 y 16GB de RAM",
    status: "published",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15"),
    customFields: {
      brand: "Apple",
      processor: "M2",
      ram: "16GB",
      storage: "512GB",
      image: "/images/macbook.png",
    },
  },
];

const getStatusColor = (status: Product["status"]) => {
  switch (status) {
    case "published":
      return "bg-transparent border border-success text-success";
    case "draft":
      return "text-yellow-200 border border-yellow-200 bg-transparent";
    case "archived":
      return "border border-muted bg-transparent text-muted-foreground";
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
  }
};

export default function DashboardMyProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [previewingProduct, setPreviewingProduct] = useState<Product | null>(
    null,
  );

  const { products, setProducts } = useProducts();

  const handleProductSubmit = (productData: any) => {
    if (editingProduct) {
      // Update existing product
      const updatedProduct: Product = {
        ...editingProduct,
        name: productData.name || editingProduct.name,
        description: productData.description || editingProduct.description,
        updatedAt: new Date(),
        customFields: productData.customFields || editingProduct.customFields,
      };

      setProducts(
        products.map((p) => (p.id === editingProduct.id ? updatedProduct : p)),
      );
      setEditingProduct(null);
    } else {
      // Create new product
      const newProduct: Product = {
        id: Date.now().toString(),
        name: productData.name || "Producto sin nombre",
        status: "draft",
        createdAt: new Date(),
        updatedAt: new Date(),
        customFields: productData.customFields || {},
      };

      setProducts([newProduct, ...products]);
    }

    setShowForm(false);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const handleStatusChange = (
    productId: string,
    newStatus: Product["status"],
  ) => {
    setProducts(
      products.map((p) =>
        p.id === productId
          ? { ...p, status: newStatus, updatedAt: new Date() }
          : p,
      ),
    );
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  const handlePreviewProduct = (product: Product) => {
    setPreviewingProduct(product);
  };

  const handleCancelPreview = () => {
    setPreviewingProduct(null);
  };

  const handlePublishProduct = (productId: string) => {
    setProducts(
      products.map((p) =>
        p.id === productId
          ? { ...p, status: "published" as const, updatedAt: new Date() }
          : p,
      ),
    );
    setPreviewingProduct(null);
  };

  // Show preview mode if a product is being previewed
  if (previewingProduct) {
    return (
      <ProductPreview
        product={previewingProduct}
        onEdit={(product) => {
          setPreviewingProduct(null);
          setEditingProduct(product);
          setShowForm(true);
        }}
        onPublish={handlePublishProduct}
        onBack={handleCancelPreview}
      />
    );
  }

  return (
    <div className="space-y-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mis Productos</h1>
          <p className="text-muted-foreground">
            Gestiona tus productos tokenizados y monitorea su rendimiento
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      {/* Dynamic Form */}
      {showForm && (
        <Card className="border-2 border-dashed border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {editingProduct ? (
                <>
                  <Edit className="h-5 w-5 text-primary" />
                  Editar Producto: {editingProduct.name}
                </>
              ) : (
                <>
                  <PlusCircle className="h-5 w-5 text-primary" />
                  Crear Nuevo Producto
                </>
              )}
            </CardTitle>
            <CardDescription>
              {editingProduct
                ? "Modifica la información del producto y sus campos personalizados"
                : "Construye tu formulario personalizado agregando campos según tus necesidades"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DynamicProductForm
              onSubmit={handleProductSubmit}
              onCancel={
                editingProduct ? handleCancelEdit : () => setShowForm(false)
              }
              initialData={editingProduct}
            />
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Productos ({products.length})
          </h2>
          <div className="flex gap-2">
            <Badge variant="outline">
              {products.filter((p) => p.status === "published").length}{" "}
              Publicados
            </Badge>
            <Badge variant="outline">
              {products.filter((p) => p.status === "draft").length} Borradores
            </Badge>
          </div>
        </div>

        {products.length === 0 ? (
          <Card className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No hay productos aún
            </h3>
            <p className="text-muted-foreground mb-4">
              Comienza creando tu primer producto tokenizado
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Producto
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4">
            {products.map((product) => (
              <Card
                key={product.name}
                className="hover:shadow-sm transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Package className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold">
                          {product.name}
                        </h3>
                        <Badge className={getStatusColor(product.status)}>
                          {getStatusText(product.status)}
                        </Badge>
                      </div>

                      {/* Custom Fields Display */}
                      {Object.keys(product.customFields).length > 0 && (
                        <div className="flex flex-wrap justify-start items-center gap-x-8 gap-y-2 mb-4">
                          {Object.entries(product.customFields).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="text-sm flex items-center gap-2"
                              >
                                {(value as any).trait_type === "tags" ? (
                                  <>
                                    <span className="text-muted-foreground capitalize">
                                      {(value as any).trait_type}:
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                      {(value as any).value
                                        .split(",")
                                        .map((v: string) => {
                                          return (
                                            <Badge
                                              key={v}
                                              variant="outline"
                                              className="text-xs"
                                            >
                                              {v}
                                            </Badge>
                                          );
                                        })}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-muted-foreground capitalize">
                                      {(value as any).trait_type}:
                                    </span>
                                    <span className="ml-1 font-medium">
                                      {String((value as any).value)}
                                    </span>
                                  </>
                                )}
                              </div>
                            ),
                          )}
                        </div>
                      )}

                      {/* <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          Creado:{" "}
                          {product.createdAt.toLocaleDateString("es-ES")}
                        </span>
                        <span>
                          Actualizado:{" "}
                          {product.updatedAt.toLocaleDateString("es-ES")}
                        </span>
                      </div> */}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePreviewProduct(product)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <select
                        value={product.status}
                        onChange={(e) =>
                          handleStatusChange(
                            product.id,
                            e.target.value as Product["status"],
                          )
                        }
                        className="text-xs border rounded px-2 py-1 bg-background"
                      >
                        <option value="draft">Borrador</option>
                        <option value="published">Publicado</option>
                        <option value="archived">Archivado</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
