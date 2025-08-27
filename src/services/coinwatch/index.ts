import { env } from "@/env";
import { CRYPTO_CONFIG, getCommonHeaders } from "@/config/crypto";
import {
  retryWithBackoff,
  cryptoCache,
  validateEthData,
  rateLimiter,
} from "@/lib/crypto-utils";
import type { CoinGeckoResponse } from "@/types/crypto";

/**
 * Obtiene los datos completos de Ethereum desde CoinGecko API
 * @returns Datos completos de ETH
 */
export const getEthData = async () => {
  const cacheKey = "eth_data";

  // Verificar cache primero (solo devolver cache si es un objeto completo)
  const cachedData = cryptoCache.get(cacheKey);
  if (cachedData !== null && typeof cachedData === "object") {
    return cachedData;
  }

  // Verificar rate limiting
  if (!rateLimiter.canMakeRequest()) {
    throw new Error("Rate limit excedido. Intenta de nuevo en un momento.");
  }

  try {
    const response = await retryWithBackoff(
      async () => {
        const res = await fetch(
          `${CRYPTO_CONFIG.COINGECKO.BASE_URL}${CRYPTO_CONFIG.COINGECKO.ENDPOINTS.ETH_PRICE}?ids=ethereum&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`,
        );

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`HTTP ${res.status}: ${errorText}`);
        }

        return res;
      },
      CRYPTO_CONFIG.COINGECKO.RETRY_ATTEMPTS,
      CRYPTO_CONFIG.COINGECKO.RETRY_DELAY,
    );

    const data: CoinGeckoResponse = await response.json();
    const validatedData = validateEthData(data);

    // Guardar en cache (objeto completo)
    cryptoCache.set(cacheKey, validatedData);

    return validatedData;
  } catch (error) {
    console.error("Error obteniendo precio de ETH:", error);

    // En desarrollo, usar fallback; en producción, re-lanzar el error
    if (process.env.NODE_ENV === "development") {
      console.warn("Usando datos fallback de ETH");
      return {
        price: CRYPTO_CONFIG.FALLBACKS.ETH_PRICE,
        change24h: 0,
        volume24h: 0,
        marketCap: 0,
      };
    }

    throw error;
  }
};

/**
 * Función de compatibilidad para obtener solo el precio
 * @returns Precio de ETH en USD
 */
export const getEthToUsd = async (): Promise<number> => {
  const data = await getEthData();
  return data.price;
};

/**
 * Obtiene todos los datos de ETH
 * @returns Objeto con todos los datos de ETH
 */
export const getCryptoData = async () => {
  try {
    const ethData = await getEthData();

    return {
      ethPrice: ethData.price,
      ethChange24h: ethData.change24h,
      ethVolume24h: ethData.volume24h,
      ethMarketCap: ethData.marketCap,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error("Error obteniendo datos de crypto:", error);
    throw error;
  }
};

/**
 * Limpia el cache de crypto
 */
export const clearCryptoCache = (): void => {
  cryptoCache.clear();
  rateLimiter.reset();
};

/**
 * Obtiene información del estado del cache
 */
export const getCacheInfo = () => {
  return {
    cacheSize: cryptoCache.getSize(),
    rateLimitInfo: {
      currentRequests: rateLimiter.getCurrentRequests(),
      maxRequests: CRYPTO_CONFIG.RATE_LIMIT.MAX_REQUESTS_PER_MINUTE,
      windowMs: CRYPTO_CONFIG.RATE_LIMIT.WINDOW_MS,
    },
  };
};
