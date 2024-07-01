"use client";
import { useState, useCallback, useEffect, use } from "react";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { getAptosClient } from "@/utils/aptosClient";
import { number, string } from "zod";
const client = getAptosClient();

export interface BorrowerPortfolio {
    borrow_history?: BorrowHistory[],
    borrow_pool_distribution?: BorrowPoolDistribution[],
    repayed_history?:RepayedHistory[],
    borrowed_amount: string,
    outstanding_loan_amount: string,
    total_available_amount: string,
    average_interest_rate: string,
}

export interface BorrowHistory{
    amount: string;
    timestamp: string;
}

export interface BorrowPoolDistribution{
    amount_borrowed:string;
    pool_address: string;
    pool_name: string;
}

export interface RepayedHistory{
    amount: string;
    timestamp: string;
}

export function useGetBorrowerPortfolio(){
    const [borrowPortfolio, setBorrowPortfolio] = useState<BorrowerPortfolio>({
        borrowed_amount: "0",
        outstanding_loan_amount: "0",
        total_available_amount: "0",
        average_interest_rate: "0",
        borrow_history: [],
        repayed_history: [],
        borrow_pool_distribution: {
        amount_borrowed:"0",
        pool_address: "",
        pool_name: "",
        },
    });
    const [borrowHistory, setBorrrowHistory] = useState<BorrowHistory[]>([]);
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
              resourceType: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::BorrowerPortfolio`
            }
          );
          console.log("Portfolio Events:",eventResource);
          setBorrrowHistory(eventResource.invest_history);
          console.log("Borrow History Set State:",borrowHistory);
          console.log("Invest History Pool:",eventResource.borrow_history);
          console.log("Total Portfolio Value:",eventResource.total_available_amount);
          if(eventResource){
            const borrowHistory = eventResource.borrow_history || [];
            const borrowPoolDistribution = eventResource.borrow_pool_distribution || [];
            const repayedHistory = eventResource.repayed_history || [];
            //const interestDistribution = portfolioDistribution.interest_distribution || [];
            setBorrowPortfolio((prev)=>({
                ...prev,
                total_available_amount: eventResource.total_available_amount,
                borrowed_amount: eventResource.borrowed_amount,
                outstanding_loan_amount: eventResource.outstanding_loan_amount,
                average_interest_rate: eventResource.average_interest_rate,
                borrow_history: borrowHistory.map((history: any)=>({
                    amount: history.amount,
                    timestamp: history.timestamp,
                })),
                portfolio_distribution: borrowPoolDistribution.map((pool: any)=>({
                    amount_borrowed: pool.amount_borrowed,
                    pool_address: pool.pool_address,
                    pool_name: pool.pool_name,
                })),
                repayed_history: repayedHistory.map((history: any)=>({
                    amount: history.amount,
                    timestamp: history.timestamp,
                })),
            }));
        }    
          //setEvents(eventResource?.events);
          setTransactionInProgress(false);
          console.log("Portfolio:",borrowPortfolio);
        
        } catch (e: any) {
          console.log(e);
        }
    };
    useEffect(()=>{
        if (!account?.address || !network) return;
        console.log("Portfolio:",borrowPortfolio);
        fetchEvents();
    },[network, account?.address]);
    return{
        transactionInProgress,
        borrowPortfolio,
    };
}