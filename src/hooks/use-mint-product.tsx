"use client";

import { useState, useCallback } from "react";
import {
  mintProduct,
  MintProductData,
  MintProductResult,
} from "@/services/thirdweb/mint-service";

export interface UseMintProductReturn {
  isMinting: boolean;
  mintResult: MintProductResult | null;
  mintProduct: (data: MintProductData, image: File) => Promise<void>;
  resetMintResult: () => void;
  error: string | null;
}

/**
 * Custom hook for minting products as NFTs
 * @returns Object with minting state and functions
 */
export const useMintProduct = (): UseMintProductReturn => {
  const [isMinting, setIsMinting] = useState(false);
  const [mintResult, setMintResult] = useState<MintProductResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMintProduct = useCallback(
    async (data: MintProductData, image: File) => {
      setIsMinting(true);
      setError(null);
      setMintResult(null);

      try {
        const result = await mintProduct(data, image);
        setMintResult(result);

        if (!result.success) {
          setError(result.error || "Failed to mint product");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setError(errorMessage);
        setMintResult({
          success: false,
          error: errorMessage,
        });
      } finally {
        setIsMinting(false);
      }
    },
    [],
  );

  const resetMintResult = useCallback(() => {
    setMintResult(null);
    setError(null);
  }, []);

  return {
    isMinting,
    mintResult,
    mintProduct: handleMintProduct,
    resetMintResult,
    error,
  };
};
