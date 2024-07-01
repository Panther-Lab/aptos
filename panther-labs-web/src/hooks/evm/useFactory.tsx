import { toast } from "@/components/ui/use-toast";
import { addresses } from "@/config/address";
import { TAGS } from "@/config/tags";
import { config } from "@/config/wagmi";
import { FACTORY_CONTRACT } from "@/contracts/factory";
import { useDealStore } from "@/providers/new-deal-store-provider";
import { createPoolService } from "@/services/pool";
import { useMutation } from "@tanstack/react-query";
import { useAccount, useWriteContract } from "wagmi";

type useFactoryCreateProps = {
  juniorTokenName: string;
  juniorTokenSymbol: string;
  seniorRate: bigint;
  seniorTokenName: string;
  seniorTokenSymbol: string;
  lenderParams: [bigint, bigint, bigint, bigint];
  shelfParams: [bigint, bigint, bigint, bigint, bigint];
  isBulletLoan: boolean;
  orignatorFee: number;
  underwrterFee: number;
};

export function useFactoryCreate() {
  const { mutate, isPending: ISLOADING } = useMutation({
    mutationFn: createPoolService,
    mutationKey: [TAGS.POOL],
  });
  const { dealDetails } = useDealStore((state) => state);
  const { address: admingAddress } = useAccount();
  const { writeContract, isError, isPending } = useWriteContract({
    config: config,
    mutation: {
      onSuccess: (data) => {
        mutate({
          txhash: data,
          ...dealDetails,
        });
        toast({
          title: "Success 🎉",
          description: "Pool created successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
        });
      },
    },
  });

  return {
    createPool: ({
      juniorTokenName,
      juniorTokenSymbol,
      seniorTokenName,
      seniorTokenSymbol,
      shelfParams,
      lenderParams,
      isBulletLoan,
      orignatorFee,
      underwrterFee,
    }: useFactoryCreateProps) => {
      console.log(
        shelfParams,
        lenderParams,
        isBulletLoan,
        orignatorFee,
        underwrterFee,
        juniorTokenName,
        seniorTokenName,
        seniorTokenSymbol,
      );
      writeContract({
        address: addresses.factory,
        abi: FACTORY_CONTRACT,
        functionName: "createPool",
        args: [
          admingAddress!,
          juniorTokenName,
          juniorTokenSymbol,
          seniorTokenName,
          seniorTokenSymbol,
          lenderParams,
          shelfParams,
          isBulletLoan,
          [orignatorFee, underwrterFee],
        ],
      });
    },
    creating: isPending,
    creationError: isError,
  };
}
