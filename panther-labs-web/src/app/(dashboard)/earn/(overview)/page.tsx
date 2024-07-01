"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { NoData } from "@/components/no-data";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { WalletDisconnected } from "@/components/wallet-disconnected";


import {
  DashboardHeadline,
  DashboardSubTitle,
  DashboardTitle,
} from "@/app/(dashboard)/componenets/dashboard-utils";

import { StatCard, StatCardItem } from "@/components/stat-card";
import { DealFilters } from "../../borrow/components/deal-filters";
import { useGetPools } from "@/hooks/aptos/useGetPools";
import { useGetInvestorPortfolio } from "@/hooks/aptos/useGetInvestorPortfolio";
import { PoolsTable } from "@/components/pool-table";

function Dashboard() {
  const { pools, transactionInProgress } = useGetPools();
  const {portfolio} =useGetInvestorPortfolio();
  const {account} = useWallet();


  const filteredPools = pools.filter(pool => pool.isJuniorLocked);
  console.log("Earn Pools", pools);
  const poolBalance = Number(1000000);
  return (
    <main className="flex flex-col gap-y-10">
      <div>
        <DashboardTitle>Invest</DashboardTitle>
        <div className="flex items-center justify-between">
          <DashboardHeadline>
            Panther Labs. Learn More
          </DashboardHeadline>
          <div className="flex items-center gap-6">
            <StatCard className="w-max gap-y-1 border bg-secondary px-5 py-2">
              <StatCardItem className="text-sm font-normal">
                Total Deposits
              </StatCardItem>
              <StatCardItem className="text-2xl">{portfolio?.total_portfolio_value} APT</StatCardItem>
            </StatCard>
          </div>
        </div>
        <Separator className="mt-8" />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <DashboardSubTitle>Pools</DashboardSubTitle>
          <Button variant={"outline"} className="gap-3">
            Filter <Icons.filter />
          </Button>
        </div>
        <div className="flex flex-col gap-y-6">
          <DealFilters />
          <PoolsTable data={pools} />
          {/* {filteredPools.length > 0 ? (
            <PoolsTable data={filteredPools} /> // Display the filtered pools
          ) : (
            <NoData />
          )} */}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
