import { type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { TRANCHE_TYPE, Tranche } from "@/types/pool";
import { TrancheColrs } from "@/lib/colors";

type TrancehStructureContentProps = {
  trancheData: TrancheItemProps[];
  trancheDistributionChart: ReactNode;
  noHead?: boolean;
};

export function TrancehStructureContent({
  trancheData,
  trancheDistributionChart,
  noHead,
}: TrancehStructureContentProps) {
  return (
    <div className="flex items-center">
      {trancheDistributionChart}
      <div className="flex w-full flex-col gap-y-4">
        {noHead ? null : <TrancehStructureHead />}
        {trancheData.map(({ active, label, type, apr, celing }, index) => {
          return (
            <TrancheItem
              apr={apr}
              celing={celing}
              key={index}
              label={label}
              active={active}
              color={
                type == TRANCHE_TYPE.JUNIOR
                  ? TrancheColrs.Junior
                  : TrancheColrs.senior
              }
              type={type}
            />
          );
        })}
      </div>
    </div>
  );
}

export type TrancheItemProps = Tranche & {
  color?: string;
  active: boolean;
  label: TRANCHE_TYPE;
  type: TRANCHE_TYPE;
};

function TrancheItem({ color, active, label, celing, apr }: TrancheItemProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 text-sm text-muted-foreground",
        active && "text-foreground",
      )}
    >
      <div className="flex items-center gap-1.5">
        <div
          className={cn("h-2 w-2 rounded-full", !active && "opacity-0")}
          style={{
            backgroundColor: color,
          }}
        ></div>
        <p>{label}</p>
      </div>
      <p>{active ? `$${celing}` : "/"}</p>
      <p>{active ? apr : "/"}</p>
    </div>
  );
}
function TrancehStructureHead() {
  return (
    <div className="grid grid-cols-3 text-sm">
      <p></p>
      <div className="flex items-center gap-1.5">
        <Icons.piChart />
        <p>Principal</p>
      </div>
      <div className="flex items-center gap-1.5">
        <Icons.growth />
        <p>APR</p>
      </div>
    </div>
  );
}
