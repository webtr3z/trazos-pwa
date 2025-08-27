import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  getEthToUsd,
  getCryptoData,
  clearCryptoCache,
} from "@/services/coinwatch";
import type { CryptoState, CryptoActions } from "@/types/crypto";

// Estado inicial
const initialState: CryptoState = {
  ethPrice: null,
  ethChange24h: null,
  ethVolume24h: null,
  ethMarketCap: null,
  isLoading: false,
  lastUpdated: null,
  error: null,
};

// Store principal
export const cryptoStateAtom = atom<CryptoState>(initialState);

// Store persistente para cache local
export const cryptoCacheAtom = atomWithStorage<{
  ethPrice: number | null;
  lastUpdated: string | null;
}>("crypto-cache", {
  ethPrice: null,
  lastUpdated: null,
});

// Actions
export const cryptoActionsAtom = atom(
  (get) => get(cryptoStateAtom),
  (get, set, action: keyof CryptoActions) => {
    const currentState = get(cryptoStateAtom);

    switch (action) {
      case "fetchEthPrice":
        set(cryptoStateAtom, { ...currentState, isLoading: true, error: null });

        getEthToUsd()
          .then((price) => {
            set(cryptoStateAtom, {
              ...currentState,
              ethPrice: price,
              isLoading: false,
              lastUpdated: new Date(),
              error: null,
            });

            // Actualizar cache persistente
            set(cryptoCacheAtom, {
              ...get(cryptoCacheAtom),
              ethPrice: price,
              lastUpdated: new Date().toISOString(),
            });
          })
          .catch((error) => {
            set(cryptoStateAtom, {
              ...currentState,
              isLoading: false,
              error: error.message,
            });
          });
        break;

      case "refreshAll":
        set(cryptoStateAtom, { ...currentState, isLoading: true, error: null });

        getCryptoData()
          .then((data) => {
            set(cryptoStateAtom, {
              ...currentState,
              ethPrice: data.ethPrice,
              ethChange24h: data.ethChange24h,
              ethVolume24h: data.ethVolume24h,
              ethMarketCap: data.ethMarketCap,
              isLoading: false,
              lastUpdated: data.timestamp,
              error: null,
            });

            // Actualizar cache persistente
            set(cryptoCacheAtom, {
              ethPrice: data.ethPrice,
              lastUpdated: data.timestamp.toISOString(),
            });
          })
          .catch((error) => {
            set(cryptoStateAtom, {
              ...currentState,
              isLoading: false,
              error: error.message,
            });
          });
        break;

      case "clearError":
        set(cryptoStateAtom, { ...currentState, error: null });
        break;
    }
  },
);

// Hooks derivados
export const ethPriceAtom = atom(
  (get) => get(cryptoStateAtom).ethPrice,
  (get, set, value: number | null) => {
    set(cryptoStateAtom, { ...get(cryptoStateAtom), ethPrice: value });
  },
);

export const isLoadingAtom = atom((get) => get(cryptoStateAtom).isLoading);

export const lastUpdatedAtom = atom((get) => get(cryptoStateAtom).lastUpdated);

export const errorAtom = atom((get) => get(cryptoStateAtom).error);

// Hook para inicializar desde cache persistente
export const initializeFromCacheAtom = atom(null, (get, set) => {
  const cached = get(cryptoCacheAtom);
  const currentState = get(cryptoStateAtom);

  if (cached.lastUpdated && cached.ethPrice) {
    const lastUpdated = new Date(cached.lastUpdated);
    const now = new Date();
    const cacheAge = now.getTime() - lastUpdated.getTime();

    // Solo usar cache si tiene menos de 5 minutos
    if (cacheAge < 5 * 60 * 1000) {
      set(cryptoStateAtom, {
        ...currentState,
        ethPrice: cached.ethPrice,
        lastUpdated: lastUpdated,
      });
    }
  }
});

// Hook para limpiar cache
export const clearCacheAtom = atom(null, (get, set) => {
  clearCryptoCache();
  set(cryptoCacheAtom, {
    ethPrice: null,
    lastUpdated: null,
  });
  set(cryptoStateAtom, { ...get(cryptoStateAtom), error: null });
});
