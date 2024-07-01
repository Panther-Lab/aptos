"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { parseEther, formatEther } from "viem";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { MoveFunctionId, Aptos, MoveFunctionGenericTypeParam } from "@aptos-labs/ts-sdk";
import { getAptosClient } from "@/utils/aptosClient";
const client = getAptosClient();

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { HelpTooltip } from "@/components/help-tooltip";
import { Separator } from "@/components/ui/separator";

import {
  DashboardStat,
  DashboardSubTitle,
  DashboardTitle,
} from "@/app/(dashboard)/componenets/dashboard-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useBorrowerWihdraw } from "@/hooks/evm/useBorrower";
import { useGetPoolsByHash } from "@/hooks/useGetPoolByhash";
import { useParams } from "next/navigation";
import Link from "next/link";


const FormSchema = z.object({
  ammount: z.string(),
});

export function RepayWithdraw({poolAddress}: {poolAddress: string}) {
  return (
    <section className="flex w-full flex-col gap-y-6 rounded-xl border px-8 py-6">
      <DashboardSubTitle>Withdraw/Repay</DashboardSubTitle>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
            <Image src={"/logo.svg"} alt="Pool Logo" fill className="" />
          </div>
          <DashboardTitle>Panther</DashboardTitle>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <p>Aptos Explorer</p>
          <Link href={`https://explorer.aptoslabs.com/account/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}?network=devnet`} target="blank">
          <Icons.external_link className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <Tabs defaultValue="invest">
        <TabsList className="grid h-12 w-full grid-cols-2">
          <TabsTrigger className="h-10" value="invest">
            Withdraw
          </TabsTrigger>
          <TabsTrigger className="h-10" value="withdraw">
            Repay
          </TabsTrigger>
        </TabsList>
        <TabsContent className="py-4" value="invest">
          <Withdraw poolAddress={poolAddress}  />
        </TabsContent>
        <TabsContent className="py-4" value="withdraw">
          <Repay poolAddress={poolAddress}/>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function Repay({ poolAddress }: { poolAddress: string }) {
  const { wallets, connected, disconnect, isLoading, account, network, signAndSubmitTransaction } = useWallet();
  const [transactionInProgress, setTransactionInProgress] =useState<boolean>(false);
  const functionName=`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::repayLoan`;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let stringAmount=data.ammount;
    let parseAmount=parseFloat(stringAmount);
    let current_period=1;
    const deployer_address=`${process.env.NEXT_PUBLIC_DEPLOYER_ADDRESS}`;
    console.log("Deployer Address::",deployer_address);
    const functionArguments=[poolAddress,parseAmount,current_period, deployer_address];
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
                const response = await signAndSubmitTransaction(transaction);
                
                //await client.waitForTransaction(response.hash);
                console.log("Response Hash::",response.hash);
                console.log('Transaction successful!');
                toast({
                    title: "Transaction successful!",
                });
                console.log(transaction.data);
              } catch (error) {
                console.log('Error executing function:', error);
              } finally {
                setTransactionInProgress(false);
              }
        }
      executeFunction()
  }

  return (
    <div className="flex flex-col gap-y-6">
      {/* <Details
        rate={12}
        lockupPeriod={21}
      /> */}
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-6"
      >
        <FormField
          control={form.control}
          name="ammount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AMOUNT</FormLabel>
              <FormControl>
                <EthInputContainer>
                  <Input placeholder="0.0" {...field} />
                </EthInputContainer>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icons.formWarn />
          <p>{`You’ll need to reopen this position every 90 days`}</p>
        </div> */}

        <Separator />
        <Button type="submit" className="w-full">
          Repay
        </Button>
      </form>
    </Form>
    </div>
  );
}

function Withdraw({ poolAddress }: { poolAddress: string }) {
  const { wallets, connected, disconnect, isLoading, account, network, signAndSubmitTransaction } = useWallet();
  const [transactionInProgress, setTransactionInProgress] =useState<boolean>(false);
  const functionName=`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::borrow`;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });
  const { deal_id } = useParams();
  const deal = useGetPoolsByHash(deal_id as string);
  const { borrwerWithdraw } = useBorrowerWihdraw();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    let stringAmount=data.ammount;
    let parseAmount=parseFloat(stringAmount);
    const deployer_address=`${process.env.NEXT_PUBLIC_DEPLOYER_ADDRESS}`;
    console.log("Deployer Address::",deployer_address);
    const functionArguments=[poolAddress,parseAmount, deployer_address];
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
                const response = await signAndSubmitTransaction(transaction);
                
                //await client.waitForTransaction(response.hash);
                console.log("Response Hash::",response.hash);
                console.log('Transaction successful!');
                toast({
                    title: "Transaction successful!",
                });
                console.log(transaction.data);
              } catch (error) {
                console.log('Error executing function:', error);
              } finally {
                setTransactionInProgress(false);
              }
        }
      executeFunction()
  }

  return (
    <div className="flex flex-col gap-y-6">
      {/* <Details
        rate={12}
        lockupPeriod={21}
      /> */}
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-6"
      >
        <FormField
          control={form.control}
          name="ammount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AMOUNT</FormLabel>
              <FormControl>
                <EthInputContainer>
                  <Input placeholder="0.0" {...field} />
                </EthInputContainer>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icons.formWarn />
          <p>{`You’ll need to reopen this position every 90 days`}</p>
        </div> */}

        <Separator />
        <Button type="submit" className="w-full">
          Withdraw
        </Button>
      </form>
    </Form>
    </div>
  );
}

function EthInputContainer({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex items-center text-muted-foreground">
      {children}
      <p className="absolute  right-3 text-muted-foreground">APT</p>
    </div>
  );
}

function CurrentPeriodInputContainer({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex items-center text-muted-foreground">
      {children}
    </div>
  );
}

type DetailsProps = {
  lockupPeriod: number;
  rate: number;
};

function Details({ lockupPeriod, rate }: DetailsProps) {
  return (
    <div className="flex flex-col gap-y-3">
      <Label>DETAILS</Label>
      <div className="flex flex-wrap gap-4">
        <DashboardStat
          className="rounded-sm bg-accent px-4 py-1"
          data={`${lockupPeriod} Days`}
          label="Lock-up Period:"
        />
        <DashboardStat
          className="rounded-sm bg-accent px-4 py-1"
          data={`${rate}% variable`}
          label="Rate"
        />
        <div className="flex items-center gap-3 rounded-sm bg-accent px-4 py-1">
          <DashboardStat
            data="0.0001 APT (~$ 0.0005)"
            label="Predicted Gas Fees: "
          ></DashboardStat>
          <HelpTooltip className="w-max shrink-0">Some TOOL TIPE</HelpTooltip>
        </div>
      </div>
    </div>
  );
}
