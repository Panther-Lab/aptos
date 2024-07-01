"use client";

import { TAGS } from "@/config/tags";
import { getPoolsService } from "@/services/pool";
import { useQuery } from "@tanstack/react-query";

export function useGetPools() {
  const poolsResult = useQuery({
    queryKey: [TAGS.POOL],
    queryFn: getPoolsService,
  });

  return poolsResult;
}
