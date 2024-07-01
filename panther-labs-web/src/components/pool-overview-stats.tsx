"use client";
import { getAptosClient } from "@/utils/aptosClient";
const client = getAptosClient();
import { StatCard, StatCardItem } from "@/components/stat-card";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { DashboardSubTitle } from "@/app/(dashboard)/componenets/dashboard-utils";
import { useGetPoolsByHash } from "@/hooks/useGetPoolByhash";
import { useGetPoolByUid } from "@/hooks/aptos/useGetPoolbyuid";
import { formatEther } from "viem";
import { useGetTranches } from "@/hooks/aptos/useGetTranches";
export function PoolOverview({ pool }: { pool: any }) {
  //const { pool, transactionInProgress  } = useGetPoolByUid(deal_hash as string);
  if(!pool) return null;
  console.log("Pool::", pool);
  if(pool === undefined) return null;
  if (pool?.transactionInProgress) {
    return <div>Fetching in progress...</div>; // Render a message indicating transaction in progress
  }
  const poolAddress = pool?.resource_addr;
  const { junior, senior } = useGetTranches(poolAddress as string);
  const parseJuniorCurrentAmount = parseFloat(junior.current_amount);
  const parseSeniorCurrentAmount = parseFloat(senior.current_amount);
  const parseJuniorRepaidAmount = parseFloat(junior.repayed_amount);
  const parseSeniorRepaidAmount = parseFloat(senior.repayed_amount);
  const totalBalance = parseJuniorCurrentAmount + parseSeniorCurrentAmount;
  const totalRepaid = parseJuniorRepaidAmount + parseSeniorRepaidAmount;
  console.log(totalBalance)
  console.log("Junior::", junior); 
  console.log("Senior::", senior);
  console.log("Junior Current Amount::", junior.current_amount);
  console.log("Current Amount::", parseJuniorCurrentAmount);
  //console.log("Senior::", senior);
  //const data = useGetPoolsByHash(deal_hash);
  const { wallets, connected, disconnect, isLoading, account, network, signAndSubmitTransaction } = useWallet();
  //check is account is lodded then calculate balance and repaid amount
  if (!account) return null;
  //console.log(pool);
  return (
    <section className="flex flex-col gap-y-5">
      <DashboardSubTitle>Overview</DashboardSubTitle>
      <div className="grid grid-cols-2 gap-5">
      <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Principal Amount
          </StatCardItem>
          <StatCardItem className="text-3xl font-semibold">
            {pool?.principal} APT
          </StatCardItem>
        </StatCard>
        <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Total Balance
          </StatCardItem>
          <StatCardItem className="text-3xl font-semibold">
            {totalBalance} APT
          </StatCardItem>
        </StatCard>
        <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Interest Rate
          </StatCardItem>
          <StatCardItem className="text-3xl font-semibold">
            {pool?.financing_fee}%
          </StatCardItem>
        </StatCard>
        <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Pool Structure
          </StatCardItem>
          <StatCardItem className="text-2xl font-semibold">
            {pool?.tranches_structure}
          </StatCardItem>
        </StatCard>
        <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Captial Formation Period
          </StatCardItem>
          <StatCardItem className="text-3xl font-semibold">
            {pool?.deal_formation_period} Days
          </StatCardItem>
        </StatCard>
        <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Total Repaid
          </StatCardItem>
          <StatCardItem className="text-3xl font-semibold">
             {totalRepaid} APT
          </StatCardItem>
        </StatCard>
        <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Principal Repaid
          </StatCardItem>
          <StatCardItem className="text-3xl font-semibold">
            {"0"} APT
          </StatCardItem>
        </StatCard>
        <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Interest Repaid
          </StatCardItem>
          <StatCardItem className="text-3xl font-semibold">
            {"0"} APT
          </StatCardItem>
        </StatCard>
      </div>
    </section>
  );
}
