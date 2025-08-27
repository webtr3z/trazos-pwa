// Tipos para la API de CoinGecko
export interface CoinGeckoResponse {
  ethereum: {
    usd: number;
    usd_24h_change: number;
    usd_24h_vol: number;
    usd_market_cap: number;
  };
}

// Tipos para el store de crypto
export interface CryptoState {
  ethPrice: number | null;
  ethChange24h: number | null;
  ethVolume24h: number | null;
  ethMarketCap: number | null;
  isLoading: boolean;
  lastUpdated: Date | null;
  error: string | null;
}

// Tipos para las acciones del store
export interface CryptoActions {
  fetchEthPrice: () => Promise<void>;
  refreshAll: () => Promise<void>;
  clearError: () => void;
}
