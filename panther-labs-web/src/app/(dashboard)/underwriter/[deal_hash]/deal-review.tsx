"use client";

import { Icons } from "@/components/icons";
import { StatCard, StatCardItem } from "@/components/stat-card";
import { siteRoutes } from "@/config/site";
import { useState } from "react";
import Link from "next/link";
import { DashboardTitle } from "../../componenets/dashboard-utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InvestInTrancheForm } from "./invest-intranche";
import { useParams } from "next/navigation";
import { ModalWhiteListInvestor } from "@/components/modal/modal-whitelist-investor";
import { PoolReypaymentStructrue } from "@/components/pool-repayment-structure";
import { PoolTrancheStructure } from "@/components/pool-tranche-structure";
import { useGetPoolByUid } from "@/hooks/aptos/useGetPoolbyuid";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { toast } from "@/components/ui/use-toast";
import { MoveFunctionId, Aptos, MoveFunctionGenericTypeParam } from "@aptos-labs/ts-sdk";
import { PoolRepaymentScheduleChart } from "@/components/pool-reypament-schedule-chart";


export function DealReview() {
  const { wallets, connected, disconnect, isLoading, account, network, signAndSubmitTransaction } = useWallet();
  const [transactionInProgress, setTransactionInProgress] =useState<boolean>(false);
  const { deal_hash } = useParams();
  const { pool: deal } = useGetPoolByUid(deal_hash as string);
  const handleSubmit = async () => {
    let functionName=`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::activateSeniorTranche`;
    const deployer_address=`${process.env.NEXT_PUBLIC_DEPLOYER_ADDRESS}`;
    const poolAddress=deal?.resource_addr;
    const functionArguments=[deployer_address, poolAddress];
    const executeFunction = async () => {
      if (!account) return;
          setTransactionInProgress(true);
          const transaction:InputTransactionData = {
            data:{
              function: functionName as MoveFunctionId,
              functionArguments: functionArguments,
            }
          };
        try {
          const response = await signAndSubmitTransaction(transaction);
          //await client.waitForTransaction(response.hash);
          console.log("Response Hash::",response.hash);
          console.log('Transaction successful!');
          toast({
              title: "Transaction successful!",
          });
          console.log(transaction.data);
        } catch (error) {
          console.log('Error executing function:', error);
        } finally {
          setTransactionInProgress(false);
        }
      }
    executeFunction()
  };
  function invest() {}

  return (
    <section className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-2">
        <Link
          className="flex items-center gap-2 text-xs text-[#000000B0]"
          href={siteRoutes.underwriter}
        >
          <Icons.backArrow />
          Go Back To All Pools
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <DashboardTitle className="text-3xl font-bold">
              {deal?.deal_name}
            </DashboardTitle>
          </div>
          <div className="flex items-center gap-3">
            <ModalWhiteListInvestor />
            <Button onClick={()=>handleSubmit()}>Activate Deal</Button>
          </div>
        </div>
        <Separator className="mt-6" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <StatCard>
          <StatCardItem className="text-base font-medium">
            Principal
          </StatCardItem>
          <StatCardItem className="text-2xl font-semibold">
            {deal?.principal} APT
          </StatCardItem>
        </StatCard>
        <StatCard>
          <StatCardItem className="text-base font-medium">
            Interest
          </StatCardItem>
          <StatCardItem className="text-2xl font-semibold">
            {deal?.financing_fee}
          </StatCardItem>
        </StatCard>
        <StatCard>
          <StatCardItem className="text-base font-medium">
            Financing Fee
          </StatCardItem>
          <StatCardItem className="text-2xl font-semibold">
            {deal?.financing_fee}%
          </StatCardItem>
        </StatCard>
      </div>
      
      <PoolReypaymentStructrue data={deal} />
      <div className="flex flex-col gap-y-6">
        <DashboardTitle>Repayment  Schedule</DashboardTitle>
        <div className="rounded-md border p-6">
        <PoolRepaymentScheduleChart principal={deal?.principal ?? 0} poolTerm={deal?.repayment_period ?? 0} />
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <DashboardTitle>Tranche Structure</DashboardTitle>
        <div className="rounded-md border p-6">
          {deal && <PoolTrancheStructure deal={deal} />}
        </div>
      </div>

      <DashboardTitle>Invest In Tranche </DashboardTitle>

      {deal && (
        <>
          <InvestInTrancheForm
            ratio1={Number(deal?.senior_ratio)}
            ratio2={Number(deal?.junior_ratio)}
            ceiling1={Number(deal?.senior_ceiling)}
            ceiling2={Number(deal?.junior_ceiling)}
            poolAddress={deal?.resource_addr}
            fn={invest}
            label="Junior"
            type="junior"
          />
          <InvestInTrancheForm
            ratio2={Number(deal?.senior_ratio)}
            ratio1={Number(deal?.junior_ratio)}
            ceiling2={Number(deal?.senior_ceiling)}
            ceiling1={Number(deal?.junior_ceiling)}
            poolAddress={deal?.resource_addr}
            fn={invest}
            label="Senior"
            type="senior"
          />
        </>
      )}
    </section>
  );
}
