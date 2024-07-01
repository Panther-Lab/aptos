"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { EmptyData } from "@/components/empty-data";

import { ChartCard } from "@/components/chart-card";
import { PortfolioStatCard } from "@/components/portfolio-stat-card";
import TimeseriesChart from "@/components/timeseries-chart";
import { PICharts } from "@/components/pi-chart";
import { CustomAreaChart as PortfolioPerformanceChart } from "@/components/area-chart";

import { DashboardSubTitle } from "@/app/(dashboard)/componenets/dashboard-utils";
import { AllocationTable } from "@/app/(dashboard)/earn/portfolio/components/overview/alocation-table";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

//hooks
import { useGetInvestorPortfolio } from "@/hooks/aptos/useGetInvestorPortfolio";
import { useGetAllocations } from "@/hooks/aptos/useGetAllocation";

export function PortfolioOverview() {
  const {account} = useWallet();
  const { transactionInProgress, portfolio } = useGetInvestorPortfolio();
  const { allocations } = useGetAllocations();
  console.log("Portfolio::",portfolio)
  //console.log("Principal::",pools[0].principal)
  // if (transactionInProgress) {
  //   return <div>Fetching in progress...</div>;
  // }
  if (!account) return null;
  //console.log("Events::", events);
  return (
    <div className="flex flex-col gap-y-6">
      <div className="grid grid-cols-3 gap-8">
        <PortfolioStatCard label="Total Portolio Value" data={portfolio.total_portfolio_value} />
        <PortfolioStatCard label="Portfolio Interest Earned" data={portfolio.total_interest_earned} />
        <PortfolioStatCard label="Weighted Average APY" data={portfolio.weighted_apy}/>
      </div>
      <div className="grid grid-cols-5  gap-6">
        <div className="col-span-3 flex flex-col gap-y-8">
          <DashboardSubTitle className="h-10 font-normal">
            Portfolio
          </DashboardSubTitle>
          <ChartCard>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Historical Investment</h2>
              <Tabs>
                <TabsList className="bg-transparent">
                  <TabsTrigger value="days">1D</TabsTrigger>
                  <TabsTrigger value="weeks">1W</TabsTrigger>
                  <TabsTrigger value="month">1M</TabsTrigger>
                  <TabsTrigger value="year">1Y</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Separator />
            {/* if portfolio.invest_history is not null, then render TimeseriesChart with data as portfolio.invest_history otherwise render empty data component */}
            { portfolio.invest_history && portfolio.invest_history.length > 0 ? (
              <TimeseriesChart data={portfolio.invest_history} />
            ) : ( 
              <EmptyData />
            )}
           
          </ChartCard>
          <ChartCard>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Historical Interest Earned</h2>
              <Tabs>
                <TabsList className="bg-transparent">
                  <TabsTrigger value="days">MONTHLY</TabsTrigger>
                  <TabsTrigger value="weeks">YEARLY</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Separator />
            
            {portfolio.invest_history && portfolio.invest_history.length > 0 ?(
             <TimeseriesChart data={portfolio.invest_history} />
            ) : (
              <EmptyData />
            )}
          </ChartCard>
        </div>
        <div className="col-span-2 flex flex-col gap-y-8">
          <div className="flex items-center justify-between">
            <DashboardSubTitle className="flex h-10 w-full items-center justify-between font-normal">
              My Positions
              <Link
                href={"/all"}
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "",
                )}
              >
                See All
              </Link>
            </DashboardSubTitle>
          </div>
          <ChartCard>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Portfolio Distribution</h2>
              <Select defaultValue="deal">
                <SelectTrigger className="w-max gap-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deal">Pool</SelectItem>
                  <SelectItem value="m@google.com">Feal</SelectItem>
                  <SelectItem value="m@support.com">Zeal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            { 
              portfolio.invest_history && portfolio.invest_history.length > 0 ?
            (
              <PICharts data={portfolio.portfolio_distribution} />
            ):(
              <EmptyData />
            )}
          </ChartCard>
          <ChartCard>
            <h2 className="pb-3 text-lg font-semibold">
              Individual vs Portfolio Performance
            </h2>
            <Separator />
            {portfolio.invest_history && portfolio.invest_history.length > 0 ? (
              <PortfolioPerformanceChart />
            ):(
              <EmptyData />
            )}
            
          </ChartCard>
        </div>
      </div>
      <div className="flex flex-col gap-y-6 ">
        <DashboardSubTitle className="font-normal">
          Allocations
        </DashboardSubTitle>
        <AllocationTable allocations={allocations}/>
      </div>
    </div>
  );
}
