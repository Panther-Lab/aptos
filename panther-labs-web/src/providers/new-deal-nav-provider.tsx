"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { NavDealStore, createNewDealNavStore } from "@/store/nav-deal-store";

export const DealNavStoreContext = createContext<StoreApi<NavDealStore> | null>(
  null,
);

export interface DealStoreProviderProps {
  children: ReactNode;
}

export const DealNavStoreProvider = ({ children }: DealStoreProviderProps) => {
  const storeRef = useRef<StoreApi<NavDealStore>>();
  if (!storeRef.current) {
    storeRef.current = createNewDealNavStore();
  }

  return (
    <DealNavStoreContext.Provider value={storeRef.current}>
      {children}
    </DealNavStoreContext.Provider>
  );
};

export const useNavDealStore = <T,>(
  selector: (store: NavDealStore) => T,
): T => {
  const dealStoreContext = useContext(DealNavStoreContext);

  if (!dealStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`);
  }

  return useStore(dealStoreContext, selector);
};
