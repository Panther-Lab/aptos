"use client";
import { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { getAptosClient } from "@/utils/aptosClient";

const client = getAptosClient();

export interface JuniorTranche {
    current_amount: string;
    interest_rate: string;
    capacity: string;
    isLocked: boolean;
    isFull: boolean;
    repayed_amount: string;
    expected_return: string;
    borrowed_amount: string;
}

export interface SeniorTranche {
    current_amount: string;
    interest_rate: string;
    capacity: string;
    isLocked: boolean;
    isFull: boolean;
    repayed_amount: string;
    expected_return: string;
    borrowed_amount: string;
}

export function useGetTranches(poolAddress: string) {
    const { account, network, signAndSubmitTransaction } = useWallet();
    const [junior, setJunior] = useState<JuniorTranche[]>([]);
    const [senior, setSenior] = useState<SeniorTranche[]>([]);
    //const [fetchingInProgress, setFetchingInProgress] = useState<boolean>(false);

    const fetchTranches = async () => {
        if (!account) return;

        try {
            //setFetchingInProgress(true);

            const response = await client.getAccountResource({
                accountAddress: process.env.NEXT_PUBLIC_DEPLOYER_ADDRESS || '',
                resourceType: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::TrancheMap`,
            });

            const poolTranches = response?.pool_tranches?.data;

            if (poolTranches) {
                const poolTranche = poolTranches.find((item: any) => item.key === poolAddress);

                if (poolTranche) {
                    setJunior(poolTranche.value.junior);
                    setSenior(poolTranche.value.senior);
                    console.log("Pool Tranche::", poolTranche);
                    console.log("Junior::", poolTranche.value.junior);
                    console.log("Senior::", poolTranche.value.senior);

                }
            }

            //setFetchingInProgress(false);
        } catch (error) {
            console.error(error);
        }

    };
    // fetchTranches();
    useEffect(() => {
        if (account && network) {
            fetchTranches();
        }
    }, [poolAddress, signAndSubmitTransaction]);
    return {
        //fetchingInProgress,
        junior,
        senior,
    };
}
