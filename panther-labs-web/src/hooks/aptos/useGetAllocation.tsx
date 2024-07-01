"use client";
import { useState, useCallback, useEffect, use } from "react";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { getAptosClient } from "@/utils/aptosClient";
import { string } from "zod";
const client = getAptosClient();

// struct UserPool has store, drop{
//     pool_address: address,
//     total_deposit: u64,
//     timestamp: u64, 
//     pool_name: String,
//     interest_rate: u64,
//     term: String,
//     maturity: String,
// }

export interface UserPool {
    pool_address: string;
    total_deposit: number;
    timestamp: number;
    pool_name: string;
    interest_rate: number;
    term: string;
    maturity: string;
}

export function useGetAllocations(){
    const [allocations, setAllocations] = useState<UserPool[]>([]);
    const [transactionInProgress, setTransactionInProgress] =useState<boolean>(false);
    const {account, network } = useWallet();
    const user_address=account?.address;
    const module_address=process.env.NEXT_CONTRACT_DEPLOYER_ADDRESS;
    const deployer_address=`${process.env.NEXT_PUBLIC_DEPLOYER_ADDRESS}`;
    const fetchEvents = async () => {
        if (!account) return [];
        try {
          setTransactionInProgress(true);
          const eventResource = await client.getAccountResource(
            {
              accountAddress: user_address ?? '',
              resourceType: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::UserPools`
            }
          );
          console.log(eventResource);
          setAllocations(eventResource?.pools);
          console.log("Allocations:",allocations);
          setTransactionInProgress(false);
        } catch (e: any) {
          console.log(e);
        }
    };
    useEffect(()=>{
        if (!account?.address || !network) return;
        fetchEvents();
    },[network, account?.address]);
    return{
        allocations,
        transactionInProgress
    };
}