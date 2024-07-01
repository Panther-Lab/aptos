"use client";

import Link from "next/link";

import { DashboardTitle } from "../componenets/dashboard-utils";
import { Separator } from "@/components/ui/separator";
import { siteRoutes } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useAccount } from "wagmi";
import { useGetPools } from "@/hooks/aptos/useGetPools";
import { PoolsTable } from "@/components/pool-table";
import { getAptosClient } from "@/utils/aptosClient";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
const client = getAptosClient();
import { WalletDisconnected } from "@/components/wallet-disconnected";

function Deals() {
  const { pools,transactionInProgress } = useGetPools();
  const { account } = useWallet();
  if (!account) {
    return (
    <div className="flex justify-center items-center">
      <WalletDisconnected />
    </div>
  )};
  return (
    <>
      <main className="flex h-full flex-col gap-y-4">
        <div className="flex justify-between">
          <DashboardTitle>Pools</DashboardTitle>
          <Link href={`${siteRoutes.underwriter}/new-deal`}>
            <Button className="gap-4">
              <Icons.plusSquare />
              New Pool
            </Button>
          </Link>
        </div>
        <Separator />
        {pools && <PoolsTable toAdmin data={pools} />}
      </main>
    </>
  );
}

export default Deals;
