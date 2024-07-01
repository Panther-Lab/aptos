import { addresses } from "@/config/address";
import { config } from "@/config/wagmi";
import { SHELF_CONTRACT } from "@/contracts/shelf";
import { EVM_ADDRESS } from "@/types/chain";
import { useAsyncFn } from "../useAsync";
import { useReadContract, useWriteContract } from "wagmi";
import { toast } from "@/components/ui/use-toast";

export function useBorrowerWihdraw() {
  const { writeContract, isPending, isError } = useWriteContract({
    config,
    mutation: {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "withdraw Succesfull",
        });
      },
    },
  });

  return {
    borrwerWithdraw: ({
      shelf_address,
      amount,
      borrowerAddress,
    }: {
      shelf_address: EVM_ADDRESS;
      amount: string;
      borrowerAddress: EVM_ADDRESS;
    }) =>
      writeContract({
        address: shelf_address,
        abi: SHELF_CONTRACT,
        functionName: "withdraw",
        args: [BigInt(amount), borrowerAddress],
      }),
    borrwerWithdrawLoading: isPending,
    borrwerWithdrawError: isError,
  };
}

export function useBorrowerRepayAmount(
  shelf_address: EVM_ADDRESS,
  amount: number,
  borrwerAddress: EVM_ADDRESS,
) {
  const { data, isLoading, error } = useReadContract({
    address: addresses.shelf,
    abi: SHELF_CONTRACT,
    functionName: "expectedRepaymentAmount",
  });

  return {
    repayAmount: data ? data[0] : null,
    repayAmountLoading: isLoading,
    repayAmountError: error,
  };
}

export function useBorrwerRepay(amount: number) {
  const { writeContract } = useWriteContract({
    config,
    mutation: {
      onSuccess: () => {},
    },
  });
  function handleRepay() {
    return writeContract({
      address: addresses.shelf,
      abi: SHELF_CONTRACT,
      functionName: "repay",
      args: [BigInt(amount)],
    });
  }
  const { execute, loading, error } = useAsyncFn(handleRepay);
  return {
    repay: execute,
    repayLoading: loading,
    repayErro: error,
  };
}
