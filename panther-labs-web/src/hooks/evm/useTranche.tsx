import { TRANCHE_CONTRACT } from "@/contracts/tranche";
import { EVM_ADDRESS } from "@/types/chain";
import { useReadContract } from "wagmi";

export function useTrancheToken(tranche_address: EVM_ADDRESS) {
  const { data, isLoading, error } = useReadContract({
    address: tranche_address,
    abi: TRANCHE_CONTRACT.abi,
    functionName: "token",
  });

  return {
    token_address: data,
    tokenIsLoading: isLoading,
    tokenError: error,
  };
}
