import { TRANCHE_TYPE, poolRes } from "@/types/pool";
import { TrancheDistributionChart } from "./chart-tranche-distribution";
import { TrancehStructureContent } from "./tranche-structure";
import { Pool } from "@/hooks/aptos/useGetPools";

export function PoolTrancheStructure({ deal }: { deal?: Pool }) {
  return (
    <TrancehStructureContent
      trancheDistributionChart={
        <TrancheDistributionChart
          data={[
            {
              label: "senior",
              value: Number(deal?.senior_ratio!),
            },
            {
              label: "junior",
              value: Number(deal?.junior_ratio!),
            },
          ]}
        />
      }
      trancheData={[
        {
          type: TRANCHE_TYPE.SENIOR,
          active: true,
          apr: deal?.senior_apr!,
          label: TRANCHE_TYPE.SENIOR,
          celing: deal?.senior_ceiling!,
        },
        {
          type: TRANCHE_TYPE.JUNIOR,
          active: true,
          apr: deal?.junior_apr!,
          label: TRANCHE_TYPE.JUNIOR,
          celing: deal?.junior_ceiling!,
        },
      ]}
    />
  );
}
