"use client";

import Link from "next/link";

import { siteRoutes } from "@/config/site";
import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons } from "@/components/icons";

import { DashboardTitle } from "@/app/(dashboard)/componenets/dashboard-utils";
import { DealFilters } from "@/app/(dashboard)/borrow/components/deal-filters";
import { useGetPools } from "@/hooks/aptos/useGetPools";
//import { useGetPools } from "@/hooks/useGetPools";
//import { formatEther } from "viem";

const PoolsData = [
  {
    name: "Fazz",
    capitalLocked: "100M",
    APY: "$250.00",
    tranches: "Junior",
    rating: "A",
    status: "active",
  },
  {
    name: "FAZZ",
    capitalLocked: "50M",
    APY: "$250.00",
    tranches: "Junior",
    rating: "A",
    status: "active",
  },
  {
    name: "FAS",
    capitalLocked: "200M",
    APY: "$250.00",
    tranches: "junior",
    rating: "A",
    status: "inactive",
  },
  {
    name: "FFF",
    capitalLocked: "200",
    APY: "$250.00",
    tranches: "Junior",
    rating: "A",
    status: "active",
  },
  {
    name: "INV001",
    capitalLocked: "Paid",
    APY: "$250.00",
    tranches: "Senior",
    rating: "A",
    status: "active",
  },
];

export function DealTable() {
  const { pools, transactionInProgress } = useGetPools();
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <DashboardTitle>Pool</DashboardTitle>
        <div className="flex items-center justify-between">
          <DealFilters />
          <Link
            className={cn(buttonVariants(), "gap-3")}
            href={`${siteRoutes.borrow}/new-deal`}
          >
            <Icons.plusSquare />
            Create New Pool
          </Link>
        </div>
      </div>
      <Table>
        <TableHeader className="bg-accent">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Finacing Fee</TableHead>
            <TableHead>Tranches</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pools?.map(({ principal, deal_name, financing_fee, borrower_address }) => (
            <TableRow key={deal_name}>
              <TableCell className="font-medium">
                <Link href={`${siteRoutes.earn}/${borrower_address}`} className="w-full">
                  {deal_name}
                </Link>
              </TableCell>
              <TableCell>${principal}</TableCell>
              <TableCell>{financing_fee}%</TableCell>
              <TableCell>Senior Tranche</TableCell>
              <TableCell>
                
                <Link href={`${siteRoutes.borrow}/${borrower_address}`}>
                  <Button size={"sm"}>Repay</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
