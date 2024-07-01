"use client";

import { StatCard, StatCardItem } from "@/components/stat-card";

import { DashboardSubTitle } from "@/app/(dashboard)/componenets/dashboard-utils";
import { useGetPoolsByHash } from "@/hooks/useGetPoolByhash";
import { useParams } from "next/navigation";
import { EVM_ADDRESS } from "@/types/chain";
import {
  getDaysFromSeconds,
  getDaysToTimeString,
  getFormatedDate,
} from "@/lib/utils";
import { poolRes } from "@/types/pool";
import { Pool } from "@/hooks/aptos/useGetPools";

// capital formation period : seconds => days
// capital formation start datae: block timestamp => date
// capital formation end datae: => date
// grace period : seconds => days
// period length: seconds : => 30 > months,  yearly
// period count: total months : number  kitne saal ka loand
// loan End : loan meturity : timestamp

export function PoolReypaymentStructrue({ data }: { data?: Pool | null }) {
  function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  }
  function formatDate(date: Date) {
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();
    // Example: 24th April, 2024
    return `${day}${getOrdinal(day)} ${month}, ${year}`;
  }
  const unitTimestamp = data?.isActivatedTimeStamp ?? 0;
  const date = new Date(unitTimestamp * 1000);
  const formattedDate = formatDate(date);
  return (
    <section className="flex flex-col gap-y-4 mt-4">
      <DashboardSubTitle>Repayment Terms</DashboardSubTitle>
      <div className="grid grid-cols-6 gap-1">
        {/* <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Captial Formation Start Date
          </StatCardItem>
          <StatCardItem className="text-3xl font-semibold">
            {data?. && getFormatedDate(data?.blockTimestamp)}
          </StatCardItem>
        </StatCard> */}
        {/* <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Captial Formation End Date
          </StatCardItem>
          <StatCardItem className="text-3xl font-semibold">
            {data?.blockTimestamp &&
              getFormatedDate(data?.capitalFormationPeriodEnd)}
          </StatCardItem>
        </StatCard> */}
        <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Loan Term
          </StatCardItem>
          <StatCardItem className="text-xl font-semibold">
            {data?.repayment_period} Months
          </StatCardItem>
        </StatCard>
        <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Start Time
          </StatCardItem>
          <StatCardItem className="text-xl font-semibold">
            {formattedDate}
          </StatCardItem>
        </StatCard>
        <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Loan Maturity Date
          </StatCardItem>
          <StatCardItem className="text-xl font-semibold">
            {data?.deal_formation_period} Days
          </StatCardItem>
        </StatCard>
        <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Grace Period
          </StatCardItem>
          <StatCardItem className="text-xl font-semibold">
            {data?.deal_grace_period} Days
          </StatCardItem>
        </StatCard>
        <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Repayment Structure
          </StatCardItem>
          <StatCardItem className="text-xl font-semibold">
            {data?.loan_type}
          </StatCardItem>
        </StatCard>
        <StatCard className="px-6 py-4">
          <StatCardItem className="text-sm font-normal">
            Frequency
          </StatCardItem>
          <StatCardItem className="text-xl font-semibold">
            Monthly
          </StatCardItem>
        </StatCard>
      </div>
    </section>
  );
}
