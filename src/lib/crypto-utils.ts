// Utilidades para el manejo de crypto APIs
import { CRYPTO_CONFIG } from "@/config/crypto";

// Función de retry con delay exponencial
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number,
  baseDelay: number,
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxAttempts) {
        throw lastError;
      }

      // Delay exponencial: baseDelay * 2^(attempt-1)
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
};

// Cache simple en memoria
class SimpleCache<T> {
  public cache = new Map<string, { data: T; timestamp: number }>();

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > CRYPTO_CONFIG.COINGECKO.CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  set(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }

  getSize(): number {
    return this.cache.size;
  }
}

// Cache para datos de crypto
export const cryptoCache = new SimpleCache<any>();

// Validación de respuestas de API
export const validateEthData = (data: any) => {
  if (!data || typeof data !== "object") {
    throw new Error("Respuesta inválida de la API");
  }

  if (!data.ethereum || typeof data.ethereum !== "object") {
    throw new Error("Datos de Ethereum no encontrados en la respuesta");
  }

  const eth = data.ethereum;

  // Validar precio
  if (typeof eth.usd !== "number" || eth.usd <= 0) {
    throw new Error("Precio de ETH inválido en la respuesta");
  }

  // Validar que el precio esté en un rango razonable (entre $100 y $50,000)
  if (eth.usd < 100 || eth.usd > 50000) {
    throw new Error("Precio de ETH fuera del rango esperado");
  }

  return {
    price: eth.usd,
    change24h: eth.usd_24h_change || 0,
    volume24h: eth.usd_24h_vol || 0,
    marketCap: eth.usd_market_cap || 0,
  };
};

// Formateo de números
export const formatCurrency = (
  value: number,
  currency: string = "USD",
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

// Rate limiting simple
class RateLimiter {
  public requests: number[] = [];

  canMakeRequest(): boolean {
    const now = Date.now();
    const windowStart = now - CRYPTO_CONFIG.RATE_LIMIT.WINDOW_MS;

    // Limpiar requests antiguos
    this.requests = this.requests.filter(
      (timestamp) => timestamp > windowStart,
    );

    // Verificar si podemos hacer una nueva request
    if (
      this.requests.length >= CRYPTO_CONFIG.RATE_LIMIT.MAX_REQUESTS_PER_MINUTE
    ) {
      return false;
    }

    this.requests.push(now);
    return true;
  }

  reset(): void {
    this.requests = [];
  }

  getCurrentRequests(): number {
    return this.requests.length;
  }
}

export const rateLimiter = new RateLimiter();
