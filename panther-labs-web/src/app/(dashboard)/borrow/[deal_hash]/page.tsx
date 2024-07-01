"use client";

import Link from "next/link";

import { siteRoutes } from "@/config/site";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";

import {
  DashboardStat,
  DashboardTitle,
} from "@/app/(dashboard)/componenets/dashboard-utils";

import { Button } from "@/components/ui/button";
import { RepayWithdraw } from "./repay-withdraw";
import { RepaymentsTable } from "../components/upcoming-repayments";
import { useParams } from "next/navigation";
import { PoolOverview } from "@/components/pool-overview-stats";
import { PoolReypaymentStructrue } from "@/components/pool-repayment-structure";
import { useGetPoolsByHash } from "@/hooks/useGetPoolByhash";
import { useGetPoolByUid } from "@/hooks/aptos/useGetPoolbyuid";
import { truncate } from "@/lib/utils";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

function DealDetail() {
  const { deal_hash } = useParams();
  const { pool } = useGetPoolByUid(deal_hash as string);
  const [toggleState, setToggleState] = useState(false);
  const {
    wallets,
    connected,
    disconnect,
    isLoading,
    account,
    network,
    signAndSubmitTransaction,
  } = useWallet();
  if (!account) return null;

  // const { deal_id } = useParams();
  // const deal = useGetPoolsByHash(deal_id as string);

  const handleToggle = () => {
    setToggleState(!toggleState);
  };
  const poolAddress=pool?.resource_addr;

  return (
    <main className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2">
        <Link
          className="flex items-center gap-2 text-xs text-[#000000B0]"
          href={siteRoutes.borrow}
        >
          <Icons.backArrow />
          Go Back To All Pools
        </Link>
        <div className="flex items-center gap-8">
          <DashboardTitle>{pool?.deal_name}</DashboardTitle>
          <div className="flex flex-grow items-center justify-between">
            <Button style={{ borderRadius: "20px" }}>Open to Borrow</Button>
          </div>
        </div>
        <Separator className="mt-2" />
      </div>
      <div className="grid grid-cols-5 gap-10">
        <div className="col-span-3">
          <PoolOverview pool={pool} />
          <div className="flex flex-col gap-y-6">
            <PoolReypaymentStructrue data={pool} />
            <RepaymentsTable repaymentsData={[]} />
          </div>
        </div>
        <div className="col-span-2">
          <RepayWithdraw poolAddress={poolAddress ?? ''} />
        </div>
      </div>
    </main>
  );
}

export default DealDetail;
