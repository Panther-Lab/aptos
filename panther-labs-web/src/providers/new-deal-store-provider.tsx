"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { type NewDealStore, createNewDealStore } from "@/store/new-deal-store";

export const DealStoreContext = createContext<StoreApi<NewDealStore> | null>(
  null,
);

export interface DealStoreProviderProps {
  children: ReactNode;
}

export const DealStoreProvider = ({ children }: DealStoreProviderProps) => {
  const storeRef = useRef<StoreApi<NewDealStore>>();
  if (!storeRef.current) {
    storeRef.current = createNewDealStore();
  }

  return (
    <DealStoreContext.Provider value={storeRef.current}>
      {children}
    </DealStoreContext.Provider>
  );
};

export const useDealStore = <T,>(selector: (store: NewDealStore) => T): T => {
  const dealStoreContext = useContext(DealStoreContext);

  if (!dealStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`);
  }

  return useStore(dealStoreContext, selector);
};
