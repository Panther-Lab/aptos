"use client"
import { BitgetWallet } from "@bitget-wallet/aptos-wallet-adapter";
import { BloctoWallet } from "@blocto/aptos-wallet-adapter-plugin";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
import { OKXWallet } from "@okwallet/aptos-wallet-adapter";
import {
  AptosWalletAdapterProvider,
  NetworkName,
} from "@aptos-labs/wallet-adapter-react";
import { FC, ReactNode } from "react";
import { Network } from "@aptos-labs/ts-sdk";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  

  const wallets = [
    // Blocto supports Testnet/Mainnet for now.
    new BitgetWallet(),
    new BloctoWallet({
      network: NetworkName.Testnet,
      bloctoAppId: "6d85f56e-5f2e-46cd-b5f2-5cf9695b4d46",
    }),
    new MartianWallet(),
    new PetraWallet(),
    new TrustWallet(),
    new OKXWallet(),
  ];

  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      onError={(error) => {
        console.log("Custom error handling", error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};

export const AppContext: FC<{ children: ReactNode }> = ({ children }) => {
  return (
        <WalletContextProvider>{children}</WalletContextProvider>
  );
};