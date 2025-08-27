import { getProduct } from "@/engine/get-product";
import { getTotalSupply } from "@/engine/get-total-supply";
import { nextTokenToMint } from "@/engine/next-token-to-mint";
import { Product } from "@/types/product";
import { use, useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productUrls, setProductUrls] = useState<string[]>([]);

  const fetchProducts = async () => {
    const supply = await getTotalSupply();
    // console.log("[supply]", supply);
    for (let i = 0; i < supply; i++) {
      const productUrl = await getProduct(i.toString());
      console.log("[productUrl]", productUrl);
      setProductUrls((prev) => [...prev, productUrl]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (productUrls && productUrls.length - 1 > 0) {
      productUrls.map(async (url: string, index: number) => {
        const cleanUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
        const productResponse = await fetch(cleanUrl);
        console.log("[productResponse]", productResponse);
        const productData = await productResponse.json();
        const product: Product = {
          id: index.toString(),
          name: productData.name,
          description: productData.description,
          image: productData.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
          status: productData.status,
          customFields: productData.attributes,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setProducts((prev) => [...prev, product]);
        console.log("[productData]", productData);
      });
    }
  }, [productUrls]);

  return { products, setProducts };
};
