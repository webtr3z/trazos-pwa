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
  Loader2,
  RefreshCw,
} from "lucide-react";
import { DynamicProductForm, NFTFormData } from "./dynamic-product-form";
import { ProductPreview } from "./product-preview";
import { getProduct } from "@/engine/get-product";
import { nextTokenToMint } from "@/engine/next-token-to-mint";
import { useProducts } from "@/hooks/use-products";
import { Product, ProductNft } from "@/types/product";
import { mintProduct } from "@/engine/mint-product";
import { uploadImage } from "@/engine/upload-image";
import { useAtom } from "jotai";
import { getWalletAddress } from "@/actions/auth";
import { sendTransaction } from "thirdweb";
import { client } from "@/services/thirdweb/client";
import { useActiveAccount } from "thirdweb/react";
import { Account } from "thirdweb/wallets";

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
  const [mintingLoading, setMintingLoading] = useState(false);

  const { products, setProducts, refreshProducts, productsLoading } =
    useProducts();

  const account = useActiveAccount() as Account;

  const startTransactionPolling = async (
    productId: string,
    transactionHash: string,
  ) => {
    const pollInterval = setInterval(async () => {
      try {
        // Try to get the product from the contract using the next token ID
        const nextToken = await nextTokenToMint();
        const currentTokenId = (Number(nextToken) - 1).toString();

        // Check if this token exists by trying to get its URI
        try {
          await getProduct(currentTokenId);
          // If successful, transaction confirmed
          setProducts((prev) =>
            prev.map((p) =>
              p.id === productId
                ? { ...p, mintingStatus: "confirmed", tokenId: currentTokenId }
                : p,
            ),
          );

          // Don't refresh products here - just update the local state
          // The product will remain visible with confirmed status
          clearInterval(pollInterval);
        } catch (error) {
          // Token not found yet, continue polling
          console.log(`Polling for product ${productId}...`);
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    }, 5000); // Poll every 5 seconds

    // Stop polling after 10 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, mintingStatus: "failed" } : p,
        ),
      );
    }, 600000);
  };

  const handleProductSubmit = async (productData: NFTFormData) => {
    if (editingProduct) {
      // Update existing product
      const updatedProduct: Product = {
        ...editingProduct,
        name: productData.name || editingProduct.name,
        description: productData.description || editingProduct.description,
        updatedAt: new Date(),
        customFields: productData.properties || editingProduct.customFields,
      };

      setProducts(
        products.map((p) => (p.id === editingProduct.id ? updatedProduct : p)),
      );
      setEditingProduct(null);
    } else {
      // Create new product with pending status
      const newProduct: Product = {
        id: Date.now().toString(),
        name: productData.name || "Producto sin nombre",
        status: "draft",
        createdAt: new Date(),
        updatedAt: new Date(),
        customFields: productData.properties || {},
        transactionHash: "",
        mintingStatus: "pending",
      };

      setProducts([newProduct, ...products]);

      try {
        setMintingLoading(true);

        // Upload Image and GET IPFS HASH
        const imageHash = await uploadImage(productData.image as File);
        const nftData: ProductNft = {
          image: imageHash,
          description: productData.description,
          name: productData.name,
          attributes: productData.properties,
        };

        // Get wallet address and mint
        const walletAddress = await getWalletAddress();
        const preparedTx = await mintProduct(walletAddress as string, nftData);

        const { transactionHash } = await sendTransaction({
          account: account,
          transaction: preparedTx,
        });

        // Update product with transaction hash and start polling
        setProducts((prev) =>
          prev.map((p) =>
            p.id === newProduct.id
              ? { ...p, transactionHash, mintingStatus: "submitted" }
              : p,
          ),
        );

        // Start polling for transaction confirmation
        startTransactionPolling(newProduct.id, transactionHash);

        console.log("\n\n============================");
        console.log("[WALLET]", walletAddress);
        console.log("[PRODUCT DATA]", productData);
        console.log("[IMAGE HASH]", imageHash);
        console.log("[TX HASH]", transactionHash);
        console.log("============================\n\n");
      } catch (error) {
        console.error("Minting failed:", error);
        setProducts((prev) =>
          prev.map((p) =>
            p.id === newProduct.id ? { ...p, mintingStatus: "failed" } : p,
          ),
        );
      } finally {
        setMintingLoading(false);
      }
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
              isMinting={mintingLoading}
            />
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">
              Productos ({products.length})
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshProducts}
              disabled={productsLoading}
              className="h-8 w-8 p-0"
            >
              <RefreshCw
                className={`h-4 w-4 ${productsLoading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
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

        {productsLoading ? (
          <Card className="text-center py-12">
            <div className="flex items-center justify-center mb-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            <h3 className="text-lg font-medium text-muted-foreground">
              Cargando productos...
            </h3>
            <p className="text-muted-foreground">
              Obteniendo información de la blockchain
            </p>
          </Card>
        ) : products.length === 0 ? (
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
              Nuevo Producto
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
                        {product.mintingStatus && (
                          <Badge
                            variant="outline"
                            className={
                              product.mintingStatus === "pending"
                                ? "text-info border-info"
                                : product.mintingStatus === "submitted"
                                  ? "text-info border-info"
                                  : product.mintingStatus === "confirmed"
                                    ? "text-success border-success bg-transparent"
                                    : "text-destructive border-destructive"
                            }
                          >
                            {product.mintingStatus === "pending" &&
                              "⏳ Pendiente"}
                            {product.mintingStatus === "submitted" &&
                              "📤 Enviado"}
                            {product.mintingStatus === "confirmed" &&
                              "✅ Confirmado"}
                            {product.mintingStatus === "failed" && "❌ Falló"}
                          </Badge>
                        )}
                      </div>

                      {/* Custom Fields Display */}
                      {Object.keys(product.customFields).length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap justify-start items-center gap-x-8 gap-y-2 max-h-[3.5rem] overflow-hidden">
                            {Object.entries(product.customFields)
                              .slice(0, 4)
                              .map(([key, value]) => (
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
                              ))}
                          </div>
                          {Object.keys(product.customFields).length > 4 && (
                            <button
                              onClick={() => handlePreviewProduct(product)}
                              className="font-semibold underline text-xs text-primary hover:text-primary/80 transition-colors mt-1 cursor-pointer"
                              title="Ver todos los campos del producto"
                            >
                              +{Object.keys(product.customFields).length - 4}{" "}
                              más
                            </button>
                          )}
                        </div>
                      )}

                      {/* NFT Information */}
                      {product.tokenId && (
                        <div className="flex flex-wrap items-center gap-4 mb-4 p-3 bg-transparent rounded-lg border border-success opacity-75">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-transparent text-success border-success"
                            >
                              🎨 NFT
                            </Badge>
                            <span className="text-sm text-success">
                              <strong>Token ID:</strong> {product.tokenId}
                            </span>
                          </div>
                          {product.transactionHash && (
                            <div className="text-xs text-success">
                              <strong>Tx:</strong>{" "}
                              {product.transactionHash.slice(0, 10)}...
                              {product.transactionHash.slice(-8)}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Transaction Status */}
                      {product.transactionHash && !product.tokenId && (
                        <div className="flex flex-wrap items-center gap-4 mb-4 p-3 bg-info/10 rounded-lg border border-info/20">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="text-info border-info"
                            >
                              ⏳ Minting
                            </Badge>
                            <span className="text-sm text-info">
                              <strong>Transaction:</strong>{" "}
                              {product.transactionHash.slice(0, 10)}...
                              {product.transactionHash.slice(-8)}
                            </span>
                          </div>
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
