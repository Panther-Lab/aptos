"use client";

import { config } from "@/config/wagmi";
import { OPRATOR_ABI } from "@/contracts/oprator";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { EVM_ADDRESS } from "@/types/chain";
import { parseEther } from "viem";
import { toast } from "@/components/ui/use-toast";
import { TRANCHE_TYPE } from "@/types/pool";

export function useDeposit(trancheName: "junior" | "senior") {
  const { address } = useAccount();
  const { writeContract, isPending, isError } = useWriteContract({
    config: config,
    mutation: {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Transection submited",
        });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  });

  return {
    deposit: (amount: string, oprator_address: EVM_ADDRESS) =>
      writeContract({
        address: oprator_address,
        abi: OPRATOR_ABI.abi,
        functionName:
          trancheName === "junior" ? "supplyJunior" : "supplySenior",
        args:
          trancheName == "junior"
            ? [parseEther(amount)]
            : [parseEther(amount), address!],
      }),

    deposit_loading: isPending,
    deposit_err: isError,
  };
}

export function useWithdraw() {
  const { writeContract, isPending, isError } = useWriteContract({
    config: config,
    mutation: {
      onSuccess: () => {},
      onError: (e) => {
        console.log(e);
      },
    },
  });
  return {
    withdraw: (amount: string, oprator_address: EVM_ADDRESS) =>
      writeContract({
        address: oprator_address,
        abi: OPRATOR_ABI.abi,
        functionName: "redeemSenior",
        args: [parseEther(amount)],
      }),
    withdraw_loading: isPending,
    withdraw_err: isError,
  };
}

export function useTokens(oprator_address: EVM_ADDRESS) {
  const { data: juniorTokenAddress, isPending: juniorPending } =
    useReadContract({
      address: oprator_address,
      abi: OPRATOR_ABI.abi,
      functionName: "junior",
    });
  const { data: seniorTokenAddress, isPending: seniorPending } =
    useReadContract({
      address: oprator_address,
      abi: OPRATOR_ABI.abi,
      functionName: "senior",
    });

  console.log("JuNIOR*SENIOR", juniorTokenAddress, seniorTokenAddress);

  return {
    juniorTokenAddress,
    seniorTokenAddress,
    isLoading: juniorPending || seniorPending,
  };
}
