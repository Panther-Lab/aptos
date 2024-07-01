"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { type RoleStore, createNewRoleStore } from "@/store/role-store";

export const RoleStoreContext = createContext<StoreApi<RoleStore> | null>(null);

export interface RoleStoreProviderProps {
  children: ReactNode;
}

export const RoleStoreProvider = ({ children }: RoleStoreProviderProps) => {
  const storeRef = useRef<StoreApi<RoleStore>>();
  if (!storeRef.current) {
    storeRef.current = createNewRoleStore();
  }

  return (
    <RoleStoreContext.Provider value={storeRef.current}>
      {children}
    </RoleStoreContext.Provider>
  );
};

export const useRoleStore = <T,>(selector: (store: RoleStore) => T): T => {
  const dealStoreContext = useContext(RoleStoreContext);

  if (!dealStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`);
  }

  return useStore(dealStoreContext, selector);
};
