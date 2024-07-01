"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { LucideEdit } from "lucide-react";
import { Separator } from "../ui/separator";
import { useDealStore } from "@/providers/new-deal-store-provider";
import { useState } from "react";
import { TRANCHE_TYPE } from "@/types/pool";

export function ModalEditTranche() {
  const [open, setOpen] = useState(false);
  const { dealDetails, updateDealTranche } = useDealStore((state) => state);

  const [senior_apr, setSeniorAPR] = useState<number>(12);
  const [seniorPrincipalRatio, setSeniorPrincipalRatio] = useState<number>(80);
  const junior_principal_ratio = 100 - seniorPrincipalRatio;
  const seniorCeling = (dealDetails?.principal * seniorPrincipalRatio) / 100;
  const juniorCeling = (dealDetails?.principal * junior_principal_ratio) / 100;
  const interestEarnedByJuniorPool = (dealDetails?.principal * dealDetails?.financingFee) - (seniorCeling * senior_apr);
  const juniorAPR = (interestEarnedByJuniorPool / juniorCeling);

  function onHandleSave() {
    console.log("dealDetails", dealDetails);
    console.log("Something")
    if (dealDetails) {
      updateDealTranche(
        {
          apr: senior_apr,
          celing: (dealDetails.principal * seniorPrincipalRatio) / 100,
          ratio: seniorPrincipalRatio,
        },
        TRANCHE_TYPE.SENIOR,
      );
      updateDealTranche(
        {
          apr: juniorAPR,
          celing: (dealDetails.principal * junior_principal_ratio) / 100,
          ratio: junior_principal_ratio,
        },
        TRANCHE_TYPE.JUNIOR,
      );
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button type="button" variant={"ghost"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row items-center gap-2">
          <LucideEdit />
          <DialogTitle className="text-2xl">Edit tranche structure</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-6">
            <h2 className="text-2xl font-semibold">Senior Tranche</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-y-3">
                <Label>Principal</Label>
                <Input
                  onChange={(e) => {
                    setSeniorPrincipalRatio(Number(e.target.value));
                  }}
                  value={seniorPrincipalRatio}
                />
              </div>
              <div>
                <Label>APR:</Label>
                <Input
                  type="number"
                  onChange={(e) => {
                    setSeniorAPR(Number(e.target.value));
                  }}
                  value={senior_apr}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-2xl font-semibold">Junior Tranche</h2>
            <div className="grid grid-cols-2 gap-6 opacity-45">
              <div className="flex flex-col gap-y-3">
                <Label>Principal:</Label>
                <Input readOnly value={junior_principal_ratio} />
              </div>
              <div>
                <Label>APR:</Label>
                <Input value={juniorAPR} readOnly />
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-6">
            <DialogClose onClick={() => setSeniorPrincipalRatio(0)}>
              Cancel
            </DialogClose>
            <Button onClick={onHandleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
