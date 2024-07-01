"use client";

import { Separator } from "@/components/ui/separator";
import {
  DashboardHeadline,
  DashboardStat,
  DashboardTitle,
} from "@/app/(dashboard)/componenets/dashboard-utils";
import { RepaymentsTable } from "./components/upcoming-repayments"; // Import RepaymentsTable
import { PoolsTable } from "@/components/pool-table";
import { useGetPools } from "@/hooks/aptos/useGetPools";
import { useGetInvestorPortfolio } from "@/hooks/aptos/useGetInvestorPortfolio";
import { useGetBorrowerPortfolio } from "@/hooks/aptos/useGetBorrowerPortfolio";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { WalletDisconnected } from "@/components/wallet-disconnected";

const RepaymentsData:Array<any> = [
  // {
  //   ID: "INV001",
  //   poolName: "Rigel Finance",
  //   dueDate: "June 5, 2024",
  //   amount: "10000 USDC",
  //   principal: "10000 USDC",
  //   interest: "100 USDC",
  //   status: "Active",
  // },
  // {
  //   ID: "INV002",
  //   poolName: "Fluxtream",
  //   dueDate: "July 6, 2024",
  //   amount: "50000 APT",
  //   principal: "50000 APT",
  //   interest: "500 APT",
  //   status: "Active",
  // },
];

function BorrowPage() {
  const { pools } = useGetPools();
  const {portfolio} =useGetInvestorPortfolio();
  const {borrowPortfolio} =useGetBorrowerPortfolio();
  const filteredPools=pools.filter(pool=>pool.isActivated);
  const { account } = useWallet();
  if (!account) {
    return (
    <div className="flex justify-center items-center">
      <WalletDisconnected />
    </div>
  )};
  return (
    <main className="flex flex-col gap-y-10">
      <div>
        <DashboardTitle>Borrow</DashboardTitle>
        <div className="mt-2.5 flex items-center justify-between">
          <DashboardHeadline>Use Petra Wallet</DashboardHeadline>
          <div className="flex items-center gap-6">
            <DashboardStat label="Total Deposits" data={portfolio?.total_portfolio_value} />
            <DashboardStat label="Total Borrows" data={borrowPortfolio?.borrowed_amount} />
          </div>
        </div>
        <Separator className="mt-8" />
      </div>
      <PoolsTable isBorrower data={pools} />
      <RepaymentsTable repaymentsData={RepaymentsData} />{" "}
      {/* Pass RepaymentsData as a prop */}
    </main>
  );
}

export default BorrowPage;
