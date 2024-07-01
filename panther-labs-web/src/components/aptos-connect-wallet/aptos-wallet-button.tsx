"use client"
import React, {useState} from 'react'
import {
    useWallet,

    } from "@aptos-labs/wallet-adapter-react";
import dynamic from 'next/dynamic';


export const AptosWalletButton = () => {
    const [walletConnected, setWalletConnected] = useState(false);
    const { wallets, connected, disconnect, isLoading, account, network } = useWallet();
  console.log(connected)

    const WalletButtons = dynamic(
        async () => {
        const { WalletButtons } = await import("./aptos-wallet");
        return { default: WalletButtons };
        },
        {
        loading: () => (
        <div className="nes-btn is-primary opacity-50 cursor-not-allowed">
          Loading...
        </div>
        ),
        ssr: false,
        }
        );
  return (
    <div className="">
      <div className="">
      <WalletButtons />
      </div>
    </div>
  )
}
