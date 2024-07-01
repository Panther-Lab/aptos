"use client";
import { useState, useCallback, useEffect, use } from "react";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { getAptosClient } from "@/utils/aptosClient";
import { number, string } from "zod";
const client = getAptosClient();


export interface InvestorPortfolio {
    invest_history?: InvestHistory[],
    portfolio_distribution?: PortfolioDistribution[],
    total_interest_earned: string,
    total_portfolio_value: string,
    weighted_apy: string,
}

export interface InvestHistory{
    amount: string;
    timestamp: string;
}

export interface PortfolioDistribution{
    no_of_pools: string;
    allocation_amount: string,
    interest_distribution?: InterestDistribution[],
    pool_distribution?: PoolDistribution[],
}

export interface PoolDistribution{
    pool_address: string,
    amount_invested: string,
}

export interface InterestDistribution{
    pool_address: string;
    interest_earned: string;
}

export function useGetInvestorPortfolio(){
    const [portfolio, setPortfolio] = useState<InvestorPortfolio>({
        total_portfolio_value: "0",
        total_interest_earned: "0",
        weighted_apy: "0",
        invest_history: [],
        portfolio_distribution: {
        no_of_pools: "0",
        allocation_amount: "0",
        interest_distribution: [],
        pool_distribution: []
        },
    });
    const [investHistory, setInvestHistory] = useState<InvestHistory[]>([]);

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
              resourceType: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::InvestorPortfolio`
            }
          );
          console.log("Portfolio Events:",eventResource);
          setInvestHistory(eventResource.invest_history);
          console.log("Invest History Set State:",investHistory);
          console.log("Invest History Pool:",eventResource.invest_history);
          console.log("Total Portfolio Value:",eventResource.total_portfolio_value);
          if(eventResource){
            const investHistory = eventResource.invest_history || [];
            const portfolioDistribution = eventResource.portfolio_distribution || {};
            const poolDistribution = portfolioDistribution.pool_distribution || [];
            const interestDistribution = portfolioDistribution.interest_distribution || [];
            setPortfolio((prev)=>({
                ...prev,
                total_portfolio_value: eventResource.total_portfolio_value,
                total_interest_earned: eventResource.total_interest_earned,
                weighted_apy: eventResource.weighted_apy,
                invest_history: investHistory.map((history: any)=>({
                    amount: history.amount,
                    timestamp: history.timestamp,
                })),
                portfolio_distribution: portfolioDistribution &&{
                    no_of_pools: portfolioDistribution.no_of_pools,
                    allocation_amount: portfolioDistribution.allocation_amount,
                    pool_distribution: poolDistribution.map((pool: any)=>({
                        pool_address: pool.pool_address,
                        amount_invested: pool.amount_invested,
                    })),
                    interest_distribution: interestDistribution.map((interest: any)=>({
                        pool_address: interest.pool_address,
                        interest_earned: interest.interest_earned,
                    })),
                }
            }));
        }    
          //setEvents(eventResource?.events);
          setTransactionInProgress(false);
          console.log("Portfolio:",portfolio);
        
        } catch (e: any) {
          console.log(e);
        }
    };
    useEffect(()=>{
        if (!account?.address || !network) return;
        console.log("Portfolio:",portfolio);
        fetchEvents();
    },[network, account?.address]);
    return{
        transactionInProgress,
        portfolio,
    };
}