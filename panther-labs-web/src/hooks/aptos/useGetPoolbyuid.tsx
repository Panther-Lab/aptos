import { useGetPools } from "./useGetPools";

export function useGetPoolByUid(uid: string) {
  const { pools, transactionInProgress } = useGetPools();
  const [addr, creation_num] = uid.split("_");
  if (pools) {
    const pool = pools.find(({ uid }) => {
      return uid.addr == addr && uid.creation_num == Number(creation_num);
    });
    return {
      pool,
      transactionInProgress,
    };
  }
  return {
    pool: null,
  };
}
