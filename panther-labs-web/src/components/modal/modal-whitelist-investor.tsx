"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { config } from "@/config/wagmi";
import { useGetPoolsByHash } from "@/hooks/useGetPoolByhash";
import { useParams } from "next/navigation";
import { useWriteContract } from "wagmi";
import { toast } from "../ui/use-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { EVM_ADDRESS } from "@/types/chain";
import { OPRATOR_ABI } from "@/contracts/oprator";
import { Button } from "../ui/button";

export function ModalWhiteListInvestor() {
  const { deal_hash } = useParams();
  const [InvestorAddress, setInvestorAddress] = useState<EVM_ADDRESS>();
  const deal = useGetPoolsByHash(deal_hash as string);
  const { writeContract } = useWriteContract({
    config,
    mutation: {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Investor Added Successfully",
        });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Investor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-y-3">
            <Label>Investor Address</Label>
            <Input
              placeholder="0x..."
              onChange={(e) => {
                setInvestorAddress(e.target.value as EVM_ADDRESS);
              }}
            />
            <Button
              onClick={() => {
                writeContract({
                  address: deal?.operator! as EVM_ADDRESS,
                  abi: OPRATOR_ABI.abi,
                  functionName: "relyInvestor",
                  args: [InvestorAddress!, "senior"],
                });
                writeContract({
                  address: deal?.operator! as EVM_ADDRESS,
                  abi: OPRATOR_ABI.abi,
                  functionName: "relyInvestor",
                  args: [InvestorAddress!, "junior"],
                });
              }}
            >
              Add
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
