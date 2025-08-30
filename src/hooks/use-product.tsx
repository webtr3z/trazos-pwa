import { getProduct } from "@/engine/get-product";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

export const useProduct = (tokenId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!tokenId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Get the IPFS URI from the contract
        const productUri = await getProduct(tokenId);
        
        if (!productUri) {
          throw new Error("Product not found");
        }

        // Convert IPFS URI to HTTP URL
        const cleanUrl = productUri.replace("ipfs://", "https://ipfs.io/ipfs/");
        
        // Fetch the product metadata
        const response = await fetch(cleanUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch product metadata");
        }
        
        const productData = await response.json();
        
        // Convert IPFS image URI to HTTP URL
        const imageUrl = productData.image.replace("ipfs://", "https://ipfs.io/ipfs/");
        
        const product: Product = {
          id: tokenId,
          name: productData.name,
          description: productData.description,
          image: imageUrl,
          status: productData.status || "active",
          customFields: productData.attributes || [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        setProduct(product);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [tokenId]);

  return { product, loading, error };
};
