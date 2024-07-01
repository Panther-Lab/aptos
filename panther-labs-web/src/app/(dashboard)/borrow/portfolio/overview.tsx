"use client"
import TimeseriesChart from "@/components/timeseries-chart";
import { PICharts } from "@/components/pi-chart";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardSubTitle } from "@/app/(dashboard)/componenets/dashboard-utils";
import { CustomAreaChart as PortfolioPerformanceChart } from "@/components/area-chart";
import { ChartCard } from "@/components/chart-card";
import { PortfolioStatCard } from "@/components/portfolio-stat-card";
import { UpcomingRepaymentTable } from "./upcoming-repayment-table";
import { ExistingCreditLineTable } from "./credit-line-table";
import { useGetBorrowerPortfolio } from "@/hooks/aptos/useGetBorrowerPortfolio";
import { useGetBorrowerPools } from "@/hooks/aptos/useGetBorrowerPools";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { use } from "react";
import { EmptyData } from "@/components/empty-data";


export function BorrowerPortfolioOverview() {
  const {account} = useWallet();
  const {borrowerPools} = useGetBorrowerPools();
  const {borrowPortfolio, transactionInProgress}=useGetBorrowerPortfolio();
  console.log(borrowPortfolio)
  if (!account) return null;
  console.log("Borrow Pools", borrowPortfolio);
  return (
    <div className="flex flex-col gap-y-6">
      <div className="grid grid-cols-3 gap-8">
        <PortfolioStatCard label="Available for withdrawal" data={borrowPortfolio.total_available_amount}/>
        <PortfolioStatCard label="Withdrawal Amount" data={borrowPortfolio.borrowed_amount} />
        <PortfolioStatCard label="Outstanding Loan Amount" data={borrowPortfolio.outstanding_loan_amount} />
      </div>
      <div className="grid grid-cols-5  gap-6">
        <div className="col-span-3 flex flex-col gap-y-8">
          <DashboardSubTitle className="h-10 font-normal">
            Portfolio
          </DashboardSubTitle>
          <ChartCard>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Payment Schedule</h2>
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
            {borrowPortfolio.borrow_history && borrowPortfolio.borrow_history.length > 0 ? (
                <TimeseriesChart data={borrowPortfolio.borrow_history} />
            ): (
              <EmptyData />
            )}
          </ChartCard>
          <ChartCard>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Payment Breakdown</h2>
              <Tabs>
                <TabsList className="bg-transparent">
                  <TabsTrigger value="days">MONTHLY</TabsTrigger>
                  <TabsTrigger value="weeks">YEARLY</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Separator />
            { borrowPortfolio.borrow_pool_distribution && borrowPortfolio.borrow_pool_distribution.length > 0 ? (
              <PICharts data={borrowPortfolio.borrow_pool_distribution} />
            ):(
              <EmptyData />
            )}
            
          </ChartCard>
        </div>
        <div className="col-span-2 flex flex-col gap-y-8">
          <div className="flex items-center justify-between">
            <DashboardSubTitle className="flex h-10 w-full items-center justify-between font-normal">
              My Positions
            </DashboardSubTitle>
          </div>
          <ChartCard>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Loan Balance Over Time</h2>
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
            {borrowPortfolio.borrow_history && borrowPortfolio.borrow_history.length > 0 ? (
              <PortfolioPerformanceChart />
            ):(
                <EmptyData />
            )}
          </ChartCard>
          <ChartCard>
            <h2 className="pb-3 text-lg font-semibold">Payment History</h2>
            <Separator />
            {borrowPortfolio.borrow_history && borrowPortfolio.borrow_history.length > 0 ? (
                <PortfolioPerformanceChart />
              ):(
                <EmptyData />
              )}
          </ChartCard>
        </div>
      </div>
      <div className="flex flex-col gap-y-6 ">
        <DashboardSubTitle className="font-normal">
          Existing Credit lines
        </DashboardSubTitle>
        <ExistingCreditLineTable data={borrowPortfolio.borrow_history ?? []} />
      </div>
      <div className="flex flex-col gap-y-6 ">
        <DashboardSubTitle className="font-normal">
          Upcoming Repayments
        </DashboardSubTitle>
        <UpcomingRepaymentTable data={borrowerPools[0]} />
      </div>
    </div>
  );
}
