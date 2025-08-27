import { getProduct } from "@/engine/get-product";
import { nextTokenToMint } from "@/engine/next-token-to-mint";
import { Product } from "@/types/product";
import { use, useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productUrls, setProductUrls] = useState<string[]>([]);

  const fetchNextTokenToMint = async () => {
    const nextToken = await nextTokenToMint();
    console.log("[nextTokenToMint]", nextToken);
  };

  const fetchProducts = async () => {
    const products = await getProduct("0");
    console.log("[getProduct]", products);
    setProductUrls((prev) => [...prev, products]);
  };

  useEffect(() => {
    // fetchNextTokenToMint();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (productUrls && productUrls.length > 0) {
      productUrls.map(async (url: string) => {
        const cleanUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
        const productResponse = await fetch(cleanUrl);
        const productData = await productResponse.json();
        const product: Product = {
          id: productData.id,
          name: productData.name,
          description: productData.description,
          image: productData.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
          status: productData.status,
          customFields: productData.attributes,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setProducts((prev) => [...prev, product]);
        console.log("[product]", product);
      });
    }
  }, [productUrls]);

  return { products, setProducts };
};
