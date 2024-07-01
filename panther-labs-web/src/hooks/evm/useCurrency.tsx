"use client";

import { addresses } from "@/config/address";
import { config } from "@/config/wagmi";
import { CURRENCY_CONTRACT } from "@/contracts/currency";

import { EVM_ADDRESS } from "@/types/chain";
import { useAccount, useReadContract } from "wagmi";
import { parseEther } from "viem";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";

export function useCurrencyApproval() {
  return {
    approve: async (
      trancheAddress: EVM_ADDRESS,
      amount: string,
      current_allowance: bigint,
    ) => {
      console.log(trancheAddress, amount, current_allowance);
      const hash = await writeContract(config, {
        address: addresses.currency,
        abi: CURRENCY_CONTRACT,
        functionName: "approve",
        args: [trancheAddress, parseEther(amount)],
      });
      await waitForTransactionReceipt(config, {
        hash: hash,
      });
    },
  };
}

export function useGetCurrecnyApprovalAmount(tranche_address: EVM_ADDRESS) {
  const { address: singerAddress } = useAccount();
  const {
    data: current_allowance,
    isLoading: allowanceIsLoading,
    error: allowanceError,
  } = useReadContract({
    address: addresses.currency,
    abi: CURRENCY_CONTRACT,
    functionName: "allowance",
    args: [singerAddress!, tranche_address],
  });
  return {
    current_allowance: current_allowance,
    allowanceIsLoading,
    allowanceError,
  };
}
