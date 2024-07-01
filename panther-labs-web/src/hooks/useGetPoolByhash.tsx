import { useGetPools } from "./useGetPools";

export function useGetPoolsByHash(hash?: string) {
  const { data } = useGetPools();

  const matchedPool = data?.find(({ transactionHash }) => {
    return transactionHash == hash;
  });

  return matchedPool;
}
