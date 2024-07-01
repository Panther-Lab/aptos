"use client";

import { PoolDescriptionData, poolStatsData } from "@/lib/test_db/pool_details";
import { PoolDescription } from "./components/pool-description";
import { PoolRiskAnalysis } from "./components/pool-risk-analysis";
import { PoolRepaymentSchedule } from "./components/pool-repayment-schedule";
import { DepositWithdraw } from "./components/deposit-withdraw";
import { useParams } from "next/navigation";
import { PoolOverview } from "@/components/pool-overview-stats";
import { useGetPoolByUid } from "@/hooks/aptos/useGetPoolbyuid";
import { PoolTrancheStructure } from "@/components/pool-tranche-structure";
import { PoolReypaymentStructrue } from "@/components/pool-repayment-structure";
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { PoolRepaymentScheduleChart } from "@/components/pool-reypament-schedule-chart";
import { DashboardSubTitle } from "../../componenets/dashboard-utils";


function PoolDetails() {
  const { wallets, connected, disconnect, isLoading, account, network, signAndSubmitTransaction } = useWallet();
  if (!account) return null;
  const { deal_hash } = useParams();
  const { pool } = useGetPoolByUid(deal_hash as string);
  //console.log("Pool::",pool);
  const poolAddress=pool?.resource_addr;
  if (!pool) return null;
  return (
    <main className="flex flex-col gap-y-8 ">
      <div className="grid grid-cols-5 gap-10">
        <section className="col-span-3 flex flex-col gap-y-6">
          <PoolDescription {...PoolDescriptionData} />
          <PoolOverview pool={pool} />
          {/* <PoolReypaymentStructrue data={nu} /> */}
          <div className="flex flex-col gap-y-6">
          <DashboardSubTitle>Repayment  Schedule</DashboardSubTitle>
          
          <PoolRepaymentScheduleChart principal={pool?.principal ?? 0} poolTerm={pool?.repayment_period ?? 0} />
          
          </div>
          {/* <PoolRepaymentSchedule /> */}
          {/* <PoolTrancheStructure deal={data} /> */}
          <PoolRiskAnalysis
            data={[
              {
                label: "Probability of Default",
                data: "1,000 USD",
              },
              {
                label: "Expected Loss",
                data: "$20.96M ",
              },
              {
                label: "Junior Buffer",
                data: "$1 M",
              },
            ]}
          />
        </section>
        <div className="col-span-2">
          <DepositWithdraw poolAddress={poolAddress ?? ''}/>
        </div>
      </div>
    </main>
  );
}

export default PoolDetails;
