import { getPoolDb } from "@/lib/pool-db";
import { NextResponse } from "next/server";
import { GRAPH_URI } from "@/lib/network";
import { getPoolsQuery } from "@/queries/getPool";

import { Client, fetchExchange } from "urql";
import { poolRes } from "@/types/pool";

const client = new Client({
  url: GRAPH_URI,
  exchanges: [fetchExchange],
});

type PoolWithGraphResponse = {
  pools: poolRes[];
};

export async function GET(req: Request) {
  let poolsResponse: poolRes[] = [];
  try {
    const { data: poolsFromGraph } = await client
      .query<PoolWithGraphResponse>(getPoolsQuery, {})
      .toPromise();

    console.log("pools From Graph", poolsFromGraph?.pools);

    const localData = await getPoolDb();
    // console.log(localData.data.pools);
    const poolsLocalData = localData?.data?.pools || [];

    const poolsResponse = poolsFromGraph?.pools
      .filter((pool) =>
        poolsLocalData.some(
          (poolDetails) => pool.transactionHash === poolDetails.txhash,
        ),
      )
      .map(({ seniorTranche, juniorTranche, ...pool }) => {
        const matchingPoolDetails = poolsLocalData.find(
          (poolDetails) => pool.transactionHash === poolDetails.txhash,
        );
        if (matchingPoolDetails) {
          const {
            juniorTranche: lj,
            seniorTranche: ls,
            ...ld
          } = matchingPoolDetails;
          return {
            seniorTranche: {
              apr: ls?.apr,
              celing: ls?.celing,
              ...seniorTranche,
            },
            juniorTranche: {
              apr: lj?.apr,
              celing: lj?.celing,
              ...juniorTranche,
            },
            ...ld,
            ...pool,
          };
        }
      });
    console.log("res", poolsResponse);
    return NextResponse.json(poolsResponse, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(
      "Could not post to subreddit at this time. Please try later",
      { status: 500 },
    );
  }
}
