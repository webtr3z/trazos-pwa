/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProducts } from "@/hooks/use-products";
import { Button } from "../ui/button";
import Link from "next/link";
import { resolveScheme } from "thirdweb/storage";
import { useEffect } from "react";

export default function ExplorerPage() {
  const { products, refreshProducts, productsLoading } = useProducts();

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div className="w-full p-16">
      <div className="grid grid-cols-4 gap-4">
        {products &&
          products.length &&
          products.map((product) => (
            <Card key={product.id}>
              <img
                src={(product?.image as string) || ""}
                alt=""
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader className="space-y-2">
                <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                <CardDescription className="overflow-hidden line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {
                      product.customFields.filter(
                        (attribute: any) =>
                          attribute?.trait_type?.toLowerCase() === "precio",
                      )[0]?.value
                    }{" "}
                    ETH
                  </span>
                  {/* <span className="text-sm text-gray-500">
                    {product.stock} en stock
                  </span> */}
                </div>
                <Button variant="default" className="">
                  <Link href={`/explorer/${product.id}`}>Ver</Link>
                </Button>{" "}
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
