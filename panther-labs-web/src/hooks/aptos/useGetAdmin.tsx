"use client";
import { useState, useCallback, useEffect, use } from "react";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { getAptosClient } from "@/utils/aptosClient";
import { string } from "zod";
const client = getAptosClient();

export interface AdminEvent {
    timestamp: number;
    pool_name: string;
    principal: number;
    financing_fee: number;
    deal_formation_period: number;
    deal_grace_period: number;
    user_address: string;
}

export function useGetAdmin(){

    const [events, setEvents] = useState<AdminEvent[]>([]);
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
              resourceType: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::AdminEvents`
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