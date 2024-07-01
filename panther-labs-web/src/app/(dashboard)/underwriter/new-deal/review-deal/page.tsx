"use client";

import { DashboardTitle } from "@/app/(dashboard)/componenets/dashboard-utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { NEXT_PUBLIC_CONTRACT_ADDRESS } from "@/utils/aptosEnv";
import { getAptosClient } from "@/utils/aptosClient";
import { MoveFunctionId, Aptos, MoveFunctionGenericTypeParam } from "@aptos-labs/ts-sdk";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { siteRoutes } from "@/config/site";
// import { useFactoryCreate } from "@/hooks/evm/useFactory";
import { cn } from "@/lib/utils";
import { useDealStore } from "@/providers/new-deal-store-provider";
import Link from "next/link";
import { parseEther } from "viem";
import { useState } from "react";
import { set } from "date-fns";
import { useRouter } from "next/navigation";

function ReviewDeal() {
  const router = useRouter();
  const { wallets, connected, disconnect, isLoading, account, network, signAndSubmitTransaction } = useWallet();
  const [transactionInProgress, setTransactionInProgress] =useState<boolean>(false);
  const functionName=`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::deploy_pool`;
  const dealDetails = useDealDetails();
  const { dealDetails: Deal } = useDealStore((state) => state);
  const ReviewDealData: {
    title: string;
    data: {
      parameter: string;
      set?: any;
      info: string;
    }[];
  }[] = [
    {
      title: "Pool Details",
      data: dealDetails,
    },
    {
      title: "Senior Tranche",
      data: [
        {
          parameter: "Principal Amount",
          info: "",
          set: Deal?.seniorTranche?.celing,
        },

        {
          parameter: "Intrest Rate",
          info: "",
          set: Deal?.seniorTranche?.apr,
        },
      ],
    },
    {
      title: "Junior Tranche",
      data: [
        {
          parameter: "Principal Amount",
          info: "",
          set: Deal?.juniorTranche?.celing,
        },
        {
          parameter: "Intrest Rate",
          info: "",
          set: Deal?.juniorTranche?.apr,
        },
      ],
    },
  ];
  const financing_fee=Deal?.financingFee;
  const deal_name=Deal?.dealName;
  const principal=Deal?.principal;
  const borrower_address=Deal?.borrwerKey;
  //const interest_rate=Deal?.interestRate;
  const deal_formation_period=Deal?.capitalFormationPeriod;
  const deal_grace_period=Deal?.gracePeriod;
  const repayment_period=Deal?.repaymentPeriod;
  const credit_rating=Deal?.rating;
  const loan_type=Deal?.loanTypes;
  const tranches_structure="Double Tranche";
  const senior_ratio=Deal?.seniorTranche?.ratio;
  const junior_ratio=Deal?.juniorTranche?.ratio;
  const senior_apr=Deal?.seniorTranche?.apr;
  const junior_apr=Deal?.juniorTranche?.apr;
  const funds=1;
  const seeds = Array.from({ length: 3 }, () => Math.floor(Math.random() * 99) + 1);
  const senior_ceiling=Deal?.seniorTranche?.celing;
  const junior_ceiling=Deal?.juniorTranche?.celing;
  const borrower_origination_fees=Deal?.borrowerOriginationFees;
  const lender_performance_fees=Deal?.lenderPerformanceFees;

  const functionArguments=[financing_fee,seeds,funds,deal_name,principal,borrower_address,deal_formation_period,deal_grace_period,repayment_period,credit_rating,loan_type,tranches_structure,senior_ratio,junior_ratio,senior_apr, junior_apr,senior_ceiling,junior_ceiling,borrower_origination_fees,lender_performance_fees];
  const executeFunction = async () => {
    if (!account) return;
        setTransactionInProgress(true);
        const transaction:InputTransactionData = {
        data:{
            function: functionName as MoveFunctionId,
            typeArguments: ["0x1::aptos_coin::AptosCoin"],
            functionArguments: functionArguments,
        }
    };
    try {
        console.log('Executing function');
        const response = await signAndSubmitTransaction(transaction);
        console.log('Response successful!');
        const client = getAptosClient();
        //await client.waitForTransaction(response.hash);
        console.log(response);
        console.log('Transaction successful!');
        router.push(siteRoutes.underwriter);
      } catch (error) {
        console.log('Error executing function:', error);
      } finally {
        setTransactionInProgress(false);
      }
  }

  // const { createPool, creating, creationError } = useFactoryCreate();
  return (
    <div className="flex flex-col gap-y-10">
      {ReviewDealData.map(({ data, title }) => {
        return (
          <div className="flex flex-col gap-y-4" key={title}>
            <DashboardTitle>{title}</DashboardTitle>
            <Table>
              <TableHeader>
                <TableRow className="border-none bg-secondary">
                  <TableHead>Parameter</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Additional Info</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map(({ info, set, parameter }, index) => (
                  <TableRow
                    className={cn(
                      "border-none",
                      index % 2 != 0 && "bg-secondary",
                    )}
                    key={parameter}
                  >
                    <TableCell>{parameter}</TableCell>
                    <TableCell>
                      {typeof set === "object" ? set.toLocaleDateString() : set}
                    </TableCell>
                    <TableCell>{info}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}
      <div className="py-10">
        <Separator className="mb-4" />
        <div className="flex items-center gap-6 py-10">
          <Link href={`${siteRoutes.borrow}/new-deal`}>
            <Button variant={"outline"} className="gap-3" type="submit">
              <Icons.backArrow />
              Go Back
            </Button>
          </Link>
          <Button
            onClick={executeFunction}
            className="gap-3"
            type="submit"
          >
            Deploy Pool
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewDeal;

function useDealDetails() {
  const { dealDetails } = useDealStore((state) => state);
  return [
    {
      parameter: "Pool Name",
      set: dealDetails?.dealName,
      info: "",
    },
    {
      parameter: "Principal",
      set: dealDetails?.principal,
      info: "",
    },
    {
      parameter: "APR",
      set: dealDetails?.financingFee,
      info: "",
    },
    {
      parameter: "Repayment Period",
      set: dealDetails?.repaymentPeriod,
      info: "",
    },
    {
      parameter: "Borrwer Address",
      set: dealDetails?.borrwerKey,
      info: "",
    },
    {
      parameter: "Pool Term",
      set: dealDetails?.repaymentPeriod,
      info: "",
    },
    {
      parameter: "Grace Period",
      set: dealDetails?.gracePeriod,
      info: "",
    },
    {
      parameter: "Credit Rating",
      set: dealDetails?.rating,
      info: "",
    },
    {
      parameter: "Network",
      set: dealDetails?.network,
      info: "",
    }
  ];
}
