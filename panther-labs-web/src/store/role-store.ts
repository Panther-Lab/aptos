import { createStore } from "zustand/vanilla";

type RoleState = {
  role: "invest" | "borrow" | "admin";
};

export type RoleStoreActon = {
  changeRole: (role: "invest" | "borrow" | "admin") => void;
};

export type RoleStore = RoleState & RoleStoreActon;

const defaultRoleState: RoleState = {
  role: "invest",
};

export function createNewRoleStore(initState: RoleState = defaultRoleState) {
  return createStore<RoleStore>()((set) => ({
    ...initState,
    changeRole: (newRole) => {
      set({ role: newRole });
    },
  }));
}
