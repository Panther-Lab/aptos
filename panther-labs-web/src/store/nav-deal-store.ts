import { createStore } from "zustand";

export type NavDealState = {
  steps: {
    first: boolean;
    second: boolean;
    third: boolean;
  };
};

const defaultDealState: NavDealState = {
  steps: {
    first: false,
    second: false,
    third: false,
  },
};

type dealNavStoreAction = {
  updateStep: (step: keyof NavDealState["steps"]) => void;
};

export type NavDealStore = NavDealState & dealNavStoreAction;

export function createNewDealNavStore(
  initState: NavDealState = defaultDealState,
) {
  return createStore<NavDealStore>()((set) => ({
    ...initState,
    updateStep: (step) => {
      set((state) => ({
        steps: {
          ...state.steps,
          [step]: !state.steps[step],
        },
      }));
    },
  }));
}
