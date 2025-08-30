import { getProduct } from "@/engine/get-product";
import { getTotalSupply } from "@/engine/get-total-supply";
import { nextTokenToMint } from "@/engine/next-token-to-mint";
import { Product } from "@/types/product";
import { useEffect, useState, useCallback } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productUrls, setProductUrls] = useState<string[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      // Clear existing URLs first
      setProductUrls([]);

      const supply = await getTotalSupply();
      const newProductUrls: string[] = [];

      for (let i = 0; i < supply; i++) {
        const productUrl = await getProduct(i.toString());
        newProductUrls.push(productUrl);
      }

      // Set all URLs at once
      setProductUrls(newProductUrls);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductsLoading(false);
    }
  }, []);

  const refreshProducts = useCallback(async () => {
    setProducts([]);
    setProductUrls([]);
    setProductsLoading(true);
    await fetchProducts();
  }, [fetchProducts]);

  // Initial fetch - only run once
  useEffect(() => {
    if (!isInitialized) {
      fetchProducts();
      setIsInitialized(true);
    }
  }, [fetchProducts, isInitialized]);

  // Fetch product data when URLs change
  useEffect(() => {
    if (productUrls && productUrls.length > 0) {
      const fetchAllProducts = async () => {
        const fetchedProducts: Product[] = [];

        for (let i = 0; i < productUrls.length; i++) {
          try {
            const url = productUrls[i];
            const cleanUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
            const productResponse = await fetch(cleanUrl);
            const productData = await productResponse.json();

            const product: Product = {
              id: i.toString(),
              name: productData.name,
              description: productData.description,
              image: productData.image.replace(
                "ipfs://",
                "https://ipfs.io/ipfs/",
              ),
              status: productData.status,
              customFields: productData.attributes,
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            fetchedProducts.push(product);
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        }

        // Set all products at once to avoid duplicates
        setProducts(fetchedProducts);
        setProductsLoading(false);
      };

      fetchAllProducts();
    }
  }, [productUrls]);

  return { products, setProducts, refreshProducts, productsLoading };
};
