// Configuración para las APIs de crypto
export const CRYPTO_CONFIG = {
  // CoinGecko API (gratuita, sin CORS)
  COINGECKO: {
    BASE_URL: "https://api.coingecko.com/api/v3",
    ENDPOINTS: {
      ETH_PRICE: "/simple/price",
    },
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutos
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 segundo
  },



  // Fallback values (solo para desarrollo)
  FALLBACKS: {
    ETH_PRICE: 3200, // Precio aproximado de ETH
  },

  // Rate limiting
  RATE_LIMIT: {
    MAX_REQUESTS_PER_MINUTE: 30,
    WINDOW_MS: 60 * 1000, // 1 minuto
  },
} as const;

// Headers comunes para las APIs
export const getCommonHeaders = (apiKey?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "RWA-Web-App/1.0",
  };

  if (apiKey) {
    headers["x-api-key"] = apiKey;
  }

  return headers;
};
