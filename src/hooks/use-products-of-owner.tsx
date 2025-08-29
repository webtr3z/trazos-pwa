"server-only";

import { getProduct } from "@/engine/get-product";
import { getProductOfOwner } from "@/engine/get-product-of-owner";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

export const useProductsOfOwner = (owner: string | undefined | null) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productIds, setProductIds] = useState<string[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const fetchProductsIdsOfOwner = async () => {
    console.log("fetching products", owner);
    setProductsLoading(true);
    let exists: boolean = true;
    let productIndex = 0;
    try {
      while (exists && exists !== undefined) {
        const res = await getProductOfOwner(
          owner || "",
          productIndex.toString(),
        );

        exists = res !== undefined && res !== null;

        if (exists) setProductIds((prev) => [...prev, res.toString()]);
        console.log(exists);
        productIndex++;
      }
    } catch (error) {
      console.log("Done fetching products");
    }
  };

  const refreshProducts = async () => {
    setProductIds([]);
    setProducts([]);
    setProductsLoading(true);
    await fetchProductsIdsOfOwner();
  };

  useEffect(() => {
    if (owner && owner !== undefined && owner !== null) {
      fetchProductsIdsOfOwner();
    }
  }, [owner]);

  useEffect(() => {
    if (productIds && productIds.length > 0) {
      const fetchAllProducts = async () => {
        const fetchedProducts: Product[] = [];

        for (let i = 0; i < productIds.length; i++) {
          try {
            const url = productIds[i];
            console.log("fetching product", url);
            const productHash = await getProduct(url);
            const cleanUrl = productHash.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/",
            );
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
  }, [productIds]);

  return { products, setProducts, refreshProducts, productsLoading };
};
