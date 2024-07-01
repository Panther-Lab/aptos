"use client";
import { useState, useCallback, useEffect } from "react";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { getAptosClient } from "@/utils/aptosClient";
import { string } from "zod";
const client = getAptosClient();

export interface BorrowPool {
    pool_address: string;
    total_amount_per_period: number;
    interest_per_period: number;
    ratePerSecond: number;
    total: number;
    prinicipalAmount: number;
    interestAmount: number;
    totalRepayedAmount: number;
    totalPrincipalRepayed: number;
    totalInterestRepayed: number;
    totalPeriod: number;
    loanTerm: number;
    currentPeriod: number;
    lateFeeInterestRate: number;
    gracePeriod: number;
    totalInterestForLoanTerm: number;
    loan_start_time: number;
    loan_next_payment_time: number;
    loanEnded: boolean;
    isBulletRepay: boolean;
}

export function useGetBorrowerPools(){
    const [borrowerPools, setBorrowerPools] = useState<BorrowPool[]>([]);
    const [transactionInProgress, setTransactionInProgress] =useState<boolean>(false);
    const {account, network } = useWallet();
    const user_address=account?.address;
    const module_address=process.env.NEXT_CONTRACT_DEPLOYER_ADDRESS;
    const deployer_address=`${process.env.NEXT_PUBLIC_DEPLOYER_ADDRESS}`;
    const fetchPools = async () => {
        if (!account) return [];
        try {
          setTransactionInProgress(true);
          const poolResource = await client.getAccountResource(
            {
              accountAddress: user_address ?? '',
              resourceType: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::BorrowPools`
            }
          );
          console.log(poolResource);
          setBorrowerPools(poolResource?.pools);
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
        borrowerPools,
        transactionInProgress
    };
}