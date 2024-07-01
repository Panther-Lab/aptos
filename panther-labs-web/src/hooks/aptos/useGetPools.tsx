"use client";
import { useState, useCallback, useEffect } from "react";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { getAptosClient } from "@/utils/aptosClient";
import { string } from "zod";
const client = getAptosClient();

export interface Pool {
  isActivatedTimeStamp: number;
  isJuniorLocked: boolean;
  isActivated: boolean;
  uid: any;
  borrower_address: string;
  coin_type: string;
  credit_rating: string;
  deal_formation_period: number;
  deal_grace_period: number;
  deal_name: string;
  deployer_address: string;
  financing_fee: number;
  interest_rate: number;
  junior_apr: number;
  junior_ceiling: number;
  junior_ratio: number;
  loan_type: string;
  principal: number;
  repayment_period: number;
  resource_addr: string;
  seeds: string;
  senior_apr: number;
  senior_ceiling: number;
  senior_ratio: number;
  tranches_structure: string;
}

export function useGetPools(){

    const [pools, setPools] = useState<Pool[]>([]);
    const [transactionInProgress, setTransactionInProgress] =useState<boolean>(false);
    const {account, network } = useWallet();
    const module_address=process.env.NEXT_CONTRACT_DEPLOYER_ADDRESS;
    const deployer_address=`${process.env.NEXT_PUBLIC_DEPLOYER_ADDRESS}`;
    const fetchPools = async () => {
        if (!account) return [];
        try {
          setTransactionInProgress(true);
          const poolResource = await client.getAccountResource(
            {
              accountAddress: deployer_address,
              resourceType: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::LiquidityPools`
            }
          );
          console.log(poolResource);
          setPools(poolResource?.pools);
          setTransactionInProgress(false);
        } catch (e: any) {
          console.log(e);
        }
    };
    useEffect(()=>{
        if (!account?.address || !network) return;
        fetchPools();
    },[network, account?.address]);
    return{
        pools,
        transactionInProgress
    };
}