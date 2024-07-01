"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { siteRoutes } from "@/config/site";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { TrancheDistributionChart } from "@/components/chart-tranche-distribution";
import { TrancehStructureContent } from "@/components/tranche-structure";

import { TrancheFileUpload } from "./form-tranche-fileupload";
import { ModalEditTranche } from "@/components/modal/modal-edit-tranche";
import { useRouter } from "next/navigation";
import { useDealStore } from "@/providers/new-deal-store-provider";
import { useNavDealStore } from "@/providers/new-deal-nav-provider";
import { TRANCHE_TYPE } from "@/types/pool";

const FormSchema = z.object({
  transtructureType: z.enum(["1", "2", "3"]),
});

export function TrancehStructureForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      transtructureType: "1",
    },
  });

  const routee = useRouter();
  const { dealDetails } = useDealStore((state) => state);
  const { updateStep } = useNavDealStore((state) => state);

  console.log(dealDetails?.juniorTranche, dealDetails?.seniorTranche);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      updateStep("second");
      routee.push(`${siteRoutes.underwriter}/new-deal/review-deal`);
      toast({
        title: "Success",
        description: "Pool Added Successfully",
      });
    } catch (e) {
      toast({
        title: "Erro",
        description: "Try Again Later",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="transtructureType"
          render={({ field }) => (
            <FormItem className="py-10">
              <FormControl>
                <RadioGroup
                  onValueChange={(e) => {
                    field.onChange(e);
                  }}
                  defaultValue={field.value}
                  className="flex flex-col space-y-9"
                >
                  <FormItem
                    className={cn(
                      "max-w-3xl rounded-md border bg-secondary p-6 shadow-sm",
                      field.value == "1" && "bg-card",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value={"1"} />
                      </FormControl>
                      <FormLabel className="text-base font-medium">
                        One tranche structure
                      </FormLabel>
                    </div>
                    <Separator />
                    <TrancehStructureContent
                      trancheDistributionChart={
                        <TrancheDistributionChart
                          data={[
                            {
                              label: "senior",
                              value: 100,
                            },
                          ]}
                        />
                      }
                      trancheData={[
                        {
                          active: true,
                          apr: dealDetails?.juniorTranche?.apr ?? 0,
                          celing: dealDetails?.juniorTranche?.celing! ?? 0,
                          label: TRANCHE_TYPE.JUNIOR,
                          type: TRANCHE_TYPE.JUNIOR,
                        },
                        {
                          active: false,
                          apr: 0,
                          celing: 0,
                          label: TRANCHE_TYPE.SENIOR,
                          type: TRANCHE_TYPE.SENIOR,
                        },
                      ]}
                    />
                  </FormItem>
                  <FormItem
                    className={cn(
                      "max-w-3xl rounded-md border bg-secondary p-6 shadow-sm",
                      field.value == "2" && "bg-card",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value={"2"} />
                      </FormControl>
                      <FormLabel className="text-base font-medium">
                        Two tranche structure
                      </FormLabel>
                      <div className="ml-auto">
                        <ModalEditTranche />
                      </div>
                    </div>
                    <Separator />
                    <TrancehStructureContent
                      trancheDistributionChart={
                        <TrancheDistributionChart
                          data={[
                            {
                              label: "senior",
                              value: dealDetails?.seniorTranche?.ratio ?? 0,
                            },
                            {
                              label: "junior",
                              value: dealDetails?.juniorTranche?.ratio ?? 0,
                            },
                          ]}
                        />
                      }
                      trancheData={[
                        {
                          active: true,
                          apr: dealDetails?.juniorTranche?.apr ?? 0,
                          celing: dealDetails?.juniorTranche?.celing! ?? 0,
                          label: TRANCHE_TYPE.JUNIOR,
                          type: TRANCHE_TYPE.JUNIOR,
                        },
                        {
                          active: true,
                          apr: dealDetails?.seniorTranche?.apr ?? 0,
                          celing: dealDetails?.seniorTranche?.celing ?? 0,
                          label: TRANCHE_TYPE.SENIOR,
                          type: TRANCHE_TYPE.SENIOR,
                        },
                      ]}
                    />
                  </FormItem>
                  {/* Three Tranche Structure */}
                  <FormItem
                    className={cn(
                      "max-w-3xl rounded-md border bg-secondary p-6 shadow-sm",
                      field.value == "3" && "bg-card",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value={"3"} disabled={true} />
                      </FormControl>
                      <FormLabel className="text-base font-medium">
                        Three tranche structure
                      </FormLabel>
                    </div>
                    <Separator />
                    <TrancehStructureContent
                      trancheDistributionChart={
                        <TrancheDistributionChart
                          data={[
                            {
                              label: "Tranche A",
                              value: 20, // 20% ratio
                            },
                            {
                              label: "Tranche B",
                              value: 30, // 30% ratio
                            },
                            {
                              label: "Tranche C",
                              value: 50, // 50% ratio
                            },
                          ]}
                        />
                      }
                      trancheData={[
                        {
                          active: true,
                          apr: dealDetails?.juniorTranche?.apr ?? 0,
                          celing: dealDetails?.juniorTranche?.celing! ?? 0,
                          label: TRANCHE_TYPE.JUNIOR,
                          type: TRANCHE_TYPE.JUNIOR,
                        },
                        {
                          active: true,
                          apr: dealDetails?.seniorTranche?.apr ?? 0,
                          celing: dealDetails?.seniorTranche?.celing ?? 0,
                          label: TRANCHE_TYPE.MEZZANINE,
                          type: TRANCHE_TYPE.MEZZANINE,
                        },
                        {
                          active: true,
                          apr: 0, // Placeholder for future configuration
                          celing: 0, // Placeholder for future configuration
                          label: TRANCHE_TYPE.SENIOR,
                          type: TRANCHE_TYPE.SENIOR,
                        },
                      ]}
                    />
                  </FormItem>
                  
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TrancheFileUpload />
        <Separator />
        <div className="flex items-center gap-6 py-10">
          <Link href={`${siteRoutes.borrow}/new-deal`}>
            <Button variant={"outline"} className="gap-3" type="submit">
              <Icons.backArrow />
              Go Back
            </Button>
          </Link>
          <Button className="gap-3" type="submit">
            <Icons.plusSquare />
            Review Pool 
          </Button>
        </div>
      </form>
    </Form>
  );
}
