import { poolInput, Tranche, TRANCHE_TYPE } from "@/types/pool";
import { createStore } from "zustand/vanilla";

export type NewDealState = {
  dealDetails: poolInput | null;
};

export type NewDealAction = {
  addDealInfo: (dealDetails: poolInput) => void;
  updateDealTranche: (tranche: Tranche, trancheType: TRANCHE_TYPE) => void; // Updated to include trancheType
};

export type NewDealStore = NewDealState & NewDealAction;

export const defaultNewDealState: NewDealState = {
  dealDetails: null,
};

export function createNewDealStore(
  initState: NewDealState = defaultNewDealState,
) {
  return createStore<NewDealStore>()((set) => ({
    ...initState,
    addDealInfo: (newDeal: poolInput) => {
      set((state) => {
        return {
          dealDetails: {
            ...state,
            ...newDeal,
          },
        };
      });
    },
    updateDealTranche: (trancheData: Tranche, trancheType: TRANCHE_TYPE) => {
      set((state) => {
        if (!state.dealDetails) return state; // Guard clause if dealDetails is null

        const updatedDealDetails = {
          ...state.dealDetails,
          ...(trancheType === TRANCHE_TYPE.JUNIOR && {
            juniorTranche: trancheData,
          }),
          ...(trancheType === TRANCHE_TYPE.SENIOR && {
            seniorTranche: trancheData,
          }),
        };

        return {
          dealDetails: updatedDealDetails,
        };
      });
    },
  }));
}
