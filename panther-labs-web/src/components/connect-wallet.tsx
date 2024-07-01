"use client";

import { Account } from "./account";
import { WalletOptions } from "./connect-wallet/wallet-options";
import { useAccount } from "wagmi";

export function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}
