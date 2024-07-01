"use client";
import { useState, useCallback, useEffect, use } from "react";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { getAptosClient } from "@/utils/aptosClient";
import { string } from "zod";
const client = getAptosClient();

export interface BorrowerEvent {
    timestamp: number;
    pool_address: string;
    amount: number;
    user_address: string;
    event_type: string;
    tranche: string;
}

export function useGetBorrower(){

    const [events, setEvents] = useState<BorrowerEvent[]>([]);
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
              resourceType: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::BorrowerEvents`
            }
          );
          console.log("Admin Events:",eventResource);
          setEvents(eventResource?.events);
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
        events,
        transactionInProgress
    };
}