"use client"
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGetPoolByUid } from "@/hooks/aptos/useGetPoolbyuid";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { toast } from "@/components/ui/use-toast";
import { useGetTranches } from "@/hooks/aptos/useGetTranches";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { MoveFunctionId, Aptos, MoveFunctionGenericTypeParam } from "@aptos-labs/ts-sdk";

type InvestInTrancheFormPros = {
  type: "senior" | "junior";
  label: string;
  ratio1: number;
  ratio2: number;
  ceiling1: number;
  ceiling2: number;
  poolAddress: string;
  fn: (amount: string) => void;
};
const COLORS = ["#0088FE", "#00C49F"];

export function InvestInTrancheForm({
  label,
  fn,
  ratio1,
  ratio2,
  ceiling1,
  ceiling2,
  poolAddress,
}: InvestInTrancheFormPros) {
  const { wallets, connected, disconnect, isLoading, account, network, signAndSubmitTransaction } = useWallet();
  const [amount, setAmount] = useState<string>();
  const [transactionInProgress, setTransactionInProgress] =useState<boolean>(false);
  const data = [
    { name: "Junior", value: ratio1 },
    { name: "Senior", value: ratio2 },
  ];
  const {junior, senior} = useGetTranches(poolAddress);
  const handleSubmit = async (amount: string, label:string) => {
      let functionName=`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::juniorDeposit`;
      const seniorFunctionName=`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::seniorDeposit`;
      const parseAmount=parseInt(amount);
      if(label=="Junior"){
        functionName=`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::juniorDeposit`;
      }else{
        functionName=`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::lending_vault::seniorDeposit`;
      }
      const deployer_address=`${process.env.NEXT_PUBLIC_DEPLOYER_ADDRESS}`;
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
  const labelInLowerCase = label.toLocaleLowerCase()
  return (
    <div className="space-y-4 rounded-md border p-8 relative">
      
      <p>{label}</p>
      <div className="grid h-full grid-cols-3 gap-10">
        <div
          className={cn(
            "col-span-1 flex h-[400px] items-center justify-center text-lg text-white",
          )}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="col-span-2 flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-6">
            <p>Details</p>
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-6">
                <p className="w-32">Details</p>
                <p className="w-32">Ceiling</p>
              </div>
              <div className="flex items-center gap-6">
                <p className="w-32">{ratio2}%</p>
                <p className="w-32">{ceiling2} APT</p>
              </div>
            </div>
            <Separator />
          </div>
          <div className="flex flex-col gap-y-3 text-xl text-muted-foreground">
            <p className="text-foreground">Your Investment</p>
            <p>Current Amount: {junior?.current_amount}</p>
          </div>
          <div className="flex flex-col gap-y-3 pt-6">
            <Label>Invest In Tranche</Label>
            <div className="flex items-center gap-3">
              <Input
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                placeholder="Amount"
                className="max-w-xs"
              />
              <Button
                disabled={!amount}
                onClick={() => {
                  if (amount) {
                    handleSubmit(amount, label);
                  }
                }}
                className="gap-3"
              >
                <Icons.trending /> Invest
              </Button>
            </div>
            <p className="text-xs font-light">Maximum Amount: {ceiling2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
