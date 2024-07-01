"use client";
import { useState, useCallback, useEffect } from "react";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { getAptosClient } from "@/utils/aptosClient";
const client = getAptosClient();

export function useGetTranches(){
    const [transactionInProgress, setTransactionInProgress] =useState<boolean>(false);
    const {account, network } = useWallet();
    
    const fetchTranches = async () => {
        if (!account) return [];
        const deployer_address=`${process.env.NEXT_PUBLIC_DEPLOYER_ADDRESS}`;
        try {
            setTransactionInProgress(true);
            const Tranches = await client.getAccountResource(
              {
                accountAddress:deployer_address,
                resourceType:`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::TrancheMap`
              }
            );
            console.log("TrancheMap::",Tranches);
            //setTranches(Tranches);
            setTransactionInProgress(false);
          } catch (e: any) {
           console.log(e);
          }
    };
    useEffect(()=>{
        if (!account?.address || !network) return;
        fetchTranches();
    },[network, account?.address]);
    return(
        <>
        <h1>TrancheMap</h1>
        </>
    )
}