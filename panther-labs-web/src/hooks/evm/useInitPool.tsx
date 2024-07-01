import { addresses } from "@/config/address";
import { config } from "@/config/wagmi";
import { SHELF_CONTRACT } from "@/contracts/shelf";
import { EVM_ADDRESS } from "@/types/chain";
import { writeContract } from "@wagmi/core";
import { useAsyncFn } from "../useAsync";

export function useInitPool(
  borrwer_address: EVM_ADDRESS,
  shelf_address: EVM_ADDRESS,
  token_id: number,
  nft_address: EVM_ADDRESS,
) {
  function handleInitPool() {
    return writeContract(config, {
      address: shelf_address,
      abi: SHELF_CONTRACT,
      functionName: "init_borrow",
      args: [borrwer_address, nft_address, BigInt(token_id)],
    });
  }
  const { execute, loading, error } = useAsyncFn(handleInitPool);
  return {
    initPool: execute,
    initPoolLoading: loading,
    initPoolError: error,
  };
}
