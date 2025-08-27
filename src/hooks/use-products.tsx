import { getProduct } from "@/engine/get-product";
import { getTotalSupply } from "@/engine/get-total-supply";
import { nextTokenToMint } from "@/engine/next-token-to-mint";
import { Product } from "@/types/product";
import { use, useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productUrls, setProductUrls] = useState<string[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const supply = await getTotalSupply();
      for (let i = 0; i < supply; i++) {
        const productUrl = await getProduct(i.toString());
        setProductUrls((prev) => [...prev, productUrl]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const refreshProducts = async () => {
    setProductUrls([]);
    setProducts([]);
    setProductsLoading(true);
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
