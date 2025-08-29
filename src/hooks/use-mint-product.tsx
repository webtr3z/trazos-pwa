"use client";

import { useState, useCallback } from "react";
import { NFTFormData } from "@/components/form/dynamic-product-form";
import { mintProduct } from "@/engine/mint-product";
import { ProductNft } from "@/types/product";

export interface UseMintProductReturn {
  isMinting: boolean;
  mintResult: { success: boolean; error?: string } | null;
  mintProduct: (data: NFTFormData, image: File) => Promise<void>;
  resetMintResult: () => void;
  error: string | null;
}

/**
 * Custom hook for minting products as NFTs
 * @returns Object with minting state and functions
 */
export const useMintProduct = (): UseMintProductReturn => {
  const [isMinting, setIsMinting] = useState(false);
  const [mintResult, setMintResult] = useState<{
    success: boolean;
    error?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMintProduct = useCallback(
    async (data: NFTFormData, image: File) => {
      setIsMinting(true);
      setError(null);
      setMintResult(null);

      try {
        // Convert NFTFormData to ProductNft format
        const productNft: ProductNft = {
          name: data.name,
          description: data.description,
          image: "", // This will be set by the upload process
          attributes: data.properties,
        };

        // For now, we'll simulate the minting process
        // The actual minting is handled in the dashboard page
        setMintResult({ success: true });
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
