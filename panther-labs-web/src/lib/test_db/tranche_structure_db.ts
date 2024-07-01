import { TrancheItemProps } from "@/components/tranche-structure";
import { TrancheColrs } from "../colors";
import { TRANCHE_TYPE } from "@/types/pool";

export const oneTrancheStructure: TrancheItemProps[] = [
  {
    active: true,
    color: TrancheColrs.senior,
    label: "Senior",
    expected_apy: 12,
    principal: 20000,
    principal_ratio: 80,
    id: 1,
    type: TRANCHE_TYPE.JUNIOR,
  },
  {
    active: false,
    color: TrancheColrs.Junior,
    label: "Junior",
    expected_apy: 12,
    principal: 20000,
    principal_ratio: 20,
    id: 2,
    type: TRANCHE_TYPE.SENIOR,
  },
];

export const twoTrancheStructure: TrancheItemProps[] = [
  {
    active: true,
    color: TrancheColrs.senior,
    label: "Senior",
    expected_apy: 12,
    principal: 20000,
    principal_ratio: 80,
    id: 1,
    type: TRANCHE_TYPE.JUNIOR,
  },
  {
    active: true,
    color: TrancheColrs.Junior,
    label: "Junior",
    expected_apy: 15,
    principal: 20000,
    principal_ratio: 20,
    id: 2,
    type: TRANCHE_TYPE.SENIOR,
  },
];
