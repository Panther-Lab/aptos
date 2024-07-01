import { z } from "zod";

export const NFTFormSchema = z.object({
  id: z.number().optional(),
  documentName: z.string().min(2, {
    message: "Pool name must be at least 2 characters.",
  }),
  description: z.string(),
  principal: z.string(),
  No_of_Loan: z.string(),
  Total_Principal_Amount: z.string(),
  Average_Interest_Rate: z.string(),
  Portfolio_Term: z.string(),
  Portfolio_Status: z.string(),
  Writedown: z.string(),
  Writeoff: z.string(),
  Maturity_Date: z.string(),
  locked: z.boolean().optional(),
  minted: z.boolean().optional(),
});

export type NFT = z.infer<typeof NFTFormSchema>;

export const updateNFTSchema = z.object({
  id: z.number(),
});
