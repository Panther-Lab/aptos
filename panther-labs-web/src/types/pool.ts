import { z } from "zod";

export const poolInputSchema = z.object({
  dealName: z.string().min(2, {
    message: "Deal name must be at least 2 characters.",
  }),
  capitalFormationPeriod: z.number(),
  gracePeriod: z.number(),
  principal: z.number(),
  borrwerKey: z.string(),
  financingFee: z.number(),
  details: z.string(),
  repaymentPeriod: z.number(),
  borrowerOriginationFees:z.number(),
  lenderPerformanceFees:z.number(),
  loanTypes: z.string(),
  rating: z.string(),
  network: z.string(),
  website: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  logoLink: z.string().url().optional()
});

export type poolInput = z.infer<typeof poolInputSchema> & {
  id?: number;
  txhash?: string;
  nftId?: number;
  juniorTranche?: Tranche;
  seniorTranche?: Tranche;
};

export enum TRANCHE_TYPE {
  JUNIOR = "junior",
  SENIOR = "senior",
  MEZZANINE="mezzanine"
}

export type pool = {
  poolAddress: string;
  apy: bigint;
  blockTimestamp: number;
  capitalFormationPeriodEnd: number;
  interestRepaid: bigint;
  loanMaturityTimestamp: number;
  loanTerm: string;
  operator: string;
  periodCount: number;
  periodLength: number;
  poolId: string;
  principalRepaid: string;
  shelf: string;
  poolStatus: string;
  startTimestamp: number;
  totalBalance: bigint;
  totalRepaid: bigint;
  transactionHash: string;
};

const trancheInputSchema = z.object({
  apr: z.number(),
  celing: z.number(),
  ratio: z.number().optional(),
});

export type trancheInput = z.infer<typeof trancheInputSchema>;

export type Tranche = Partial<{
  id: string;
  poolId: bigint;
  tokenAddress: string;
  tokenPrice: bigint;
  totalBalance: bigint;
  totalTokenSupply: bigint;
  trancheAddress: string;
  trancheType: TRANCHE_TYPE;
}> &
  trancheInput;

export const updatePoolSchema = poolInputSchema
  .extend({
    id: z.number(),
    txhash: z.string(),
    nftId: z.number(),
  })
  .partial();

export type updatePoolType = z.infer<typeof updatePoolSchema>;

export type poolRes = poolInput & pool;
