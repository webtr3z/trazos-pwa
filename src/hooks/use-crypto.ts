"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  cryptoStateAtom,
  cryptoActionsAtom,
  ethPriceAtom,
  isLoadingAtom,
  lastUpdatedAtom,
  errorAtom,
  initializeFromCacheAtom,
  clearCacheAtom,
} from "@/stores/crypto-store";

/**
 * Hook personalizado para manejar el estado de crypto
 * @returns Objeto con estado y acciones de crypto
 */
export function useCrypto() {
  const [state, dispatch] = useAtom(cryptoActionsAtom);
  const setInitializeFromCache = useSetAtom(initializeFromCacheAtom);
  const setClearCache = useSetAtom(clearCacheAtom);

  // Inicializar desde cache al montar el componente
  useEffect(() => {
    setInitializeFromCache();
  }, [setInitializeFromCache]);

  // Función para obtener precio de ETH
  const fetchEthPrice = () => dispatch("fetchEthPrice");

  // Función para refrescar todos los datos
  const refreshAll = () => dispatch("refreshAll");

  // Función para limpiar errores
  const clearError = () => dispatch("clearError");

  // Función para limpiar cache
  const clearCache = () => setClearCache();

  return {
    // Estado
    ethPrice: state.ethPrice,
    ethChange24h: state.ethChange24h,
    ethVolume24h: state.ethVolume24h,
    ethMarketCap: state.ethMarketCap,
    isLoading: state.isLoading,
    lastUpdated: state.lastUpdated,
    error: state.error,

    // Acciones
    fetchEthPrice,
    refreshAll,
    clearError,
    clearCache,
  };
}

/**
 * Hook para obtener solo el precio de ETH
 */
export function useEthPrice() {
  return useAtomValue(ethPriceAtom);
}

/**
 * Hook para obtener solo el estado de loading
 */
export function useCryptoLoading() {
  return useAtomValue(isLoadingAtom);
}

/**
 * Hook para obtener solo la fecha de última actualización
 */
export function useCryptoLastUpdated() {
  return useAtomValue(lastUpdatedAtom);
}

/**
 * Hook para obtener solo los errores
 */
export function useCryptoError() {
  return useAtomValue(errorAtom);
}
