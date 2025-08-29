"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface EthereumPrice {
  price: number;
  change24h: number;
  changePercent24h: number;
}

export function EthereumPriceWidget() {
  const [priceData, setPriceData] = useState<EthereumPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch("/api/crypto/ethereum-price");
        if (response.ok) {
          const data = await response.json();
          setPriceData(data);
        }
      } catch (error) {
        console.error("Error fetching Ethereum price:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch initial price
    fetchPrice();

    // Update every 30 seconds
    const interval = setInterval(fetchPrice, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <Badge variant="secondary" className="animate-pulse">
        Cargando ETH...
      </Badge>
    );
  }

  if (!priceData) {
    return (
      <Badge variant="outline" className="text-muted-foreground">
        ETH: Error
      </Badge>
    );
  }

  const isPositive = priceData.changePercent24h >= 0;
  const changeIcon = isPositive ? (
    <TrendingUp className="w-3 h-3" />
  ) : (
    <TrendingDown className="w-3 h-3" />
  );

  return (
    <div
      className={`flex flex-col items-end justify-center gap-0 ${isPositive ? "text-success" : "text-destructive"}`}
    >
      <div className="flex items-center gap-1 justify-end">
        {changeIcon}
        <span className="text-xs">
          {isPositive ? "+" : ""}
          {priceData.changePercent24h.toFixed(2)}%
        </span>
      </div>
      <div className="flex items-center gap-1 justify-end">
        <span className="font-mono text-xs">ETH</span>
        <span className="font-semibold">${priceData.price.toFixed(2)}</span>
      </div>
    </div>
  );
}
