import { Tranche, poolInput, pool, updatePoolType } from "@/types/pool";
import { JSONFilePreset } from "lowdb/node";

type PoolData = {
  pools: poolInput[];
};

const defaultDb: PoolData = {
  pools: [],
};

export async function getPoolDb() {
  return await JSONFilePreset("pool.json", defaultDb);
}

export async function createPool(data: poolInput) {
  const db = await getPoolDb();
  db.data.pools.push(data);
  db.write();
  return;
}

export async function updatePool(data: updatePoolType) {
  const db = await getPoolDb();
  let pool = db.data.pools.find((pool) => pool?.id === data.id);
  if (pool) {
    (pool.txhash = data.txhash!), (pool.nftId = data.nftId);
  }

  db.write();
}
