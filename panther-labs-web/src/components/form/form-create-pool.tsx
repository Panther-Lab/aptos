"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState} from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { siteRoutes } from "@/config/site";
import { useRouter } from "next/navigation";
import { useDealStore } from "@/providers/new-deal-store-provider";
import { useNavDealStore } from "@/providers/new-deal-nav-provider";
import { TRANCHE_TYPE, poolInputSchema } from "@/types/pool";
import { creditRatings } from "@/types/rating";
import {repaymentPeriod} from "@/types/repayment";
import { PoolRepaymentScheduleChart } from "../pool-reypament-schedule-chart";
import { InstallmentsTable } from "../pool-installment-table";

export function FormCreateDeal() {
  const form = useForm<z.infer<typeof poolInputSchema>>({
    resolver: zodResolver(poolInputSchema),
    defaultValues: {
      repaymentPeriod: 30,
      principal: 10000,
      capitalFormationPeriod: 30,
      gracePeriod: 15,
    },
  });
  const [showInstallmentsTable, setShowInstallmentsTable] = useState(false);
  const router = useRouter();
  const { addDealInfo, updateDealTranche } = useDealStore((state) => state);
  const { updateStep } = useNavDealStore((state) => state);
  const [selectedLoanType, setSelectedLoanType] = useState(null);
  const handleLoanTypeChange = (value:any) => {
    setSelectedLoanType(value);
  };
  const toggleInstallmentsTable = () => {
    setShowInstallmentsTable((prev) => !prev);
  };

  async function onSubmit(data: z.infer<typeof poolInputSchema>) {
    addDealInfo(data);
    const seniorCeling = (data.principal * 80) / 100;
    const seniorAPR = data.financingFee - 2;
    const juniorCeling = (data.principal * 20) / 100;
    const interestEarnedByJuniorPool = (data.principal * data.financingFee) - (seniorCeling * seniorAPR);
    const juniorAPR = (interestEarnedByJuniorPool / juniorCeling);
    updateDealTranche(
      {
        apr: seniorAPR,
        celing: seniorCeling,
        ratio: 80,
      },
      TRANCHE_TYPE.SENIOR,
    );
    updateDealTranche(
      {
        apr: juniorAPR,
        celing: juniorCeling,
        ratio: 20,
      },
      TRANCHE_TYPE.JUNIOR,
    );
    console.log(data);
    updateStep("first");
    console.log("FIFIFIFI");
    router.push(`${siteRoutes.underwriter}/new-deal/tranches`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-20 gap-y-6 overscroll-auto">
          <FormField
            control={form.control}
            name="dealName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deal Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Deal Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public deal name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>More Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter More Information Here..."
                    {...field}
                    className="resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Borrower Website (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter website url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logoLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Borrower Logo Link (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter website url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Borrower Linkedin Profile (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Linkedin url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="principal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Principal</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Principal Amount"
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="borrwerKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Borrower Key</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Borrower Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="financingFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Financing Fee</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                    placeholder="Enter Fee Amount"
                  />
                </FormControl>
                <FormDescription>
                  Financing fee should be in percentage
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capitalFormationPeriod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pool Fomation Period</FormLabel>
                <Input
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                  type="number"
                  placeholder="Days"
                />
                <FormDescription>
                  Pool formation period should be in days
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gracePeriod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pool Grace Period</FormLabel>
                <Input
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                  type="number"
                  placeholder="Days"
                />
                <FormDescription>
                  Pool grace period should be a number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="repaymentPeriod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pool Term</FormLabel>
                <Input
                  placeholder="Months"
                  type="number"
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
                <FormDescription>Repayment period is in months</FormDescription>
                <FormMessage />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="borrowerOriginationFees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Borrower Origination Fees</FormLabel>
                <Input
                  placeholder="Enter Fee Amount"
                  type="number"
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
                <FormMessage />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lenderPerformanceFees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lender Performance Fees</FormLabel>
                <Input
                  placeholder="Enter Fee Amount"
                  type="number"
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
                <FormMessage />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repayment Period</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Repayment Period" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {repaymentPeriod.map(({ name }: { name: string }) => {
                      return (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credit Rating</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Credit Rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {creditRatings.map(({ name }) => {
                      return (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="network"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Network" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MATIC">Polygon</SelectItem>
                    <SelectItem value="APT">Aptos</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="loanTypes"
          render={({ field }) => (
            <FormItem className="py-10">
              <FormControl>
                <RadioGroup
                  onValueChange={(value)=>{
                    handleLoanTypeChange(value);
                    field.onChange(value)}}
                  defaultValue={field.value}
                  className="flex flex-col space-y-4 w-full"
                >
                  <div className="flex flex-col">
                  <FormItem className="border rounded-md p-4 flex gap-3 radio-item mb-3">
                    <FormControl>
                      <RadioGroupItem value="Amortization" className="mt-4" />
                    </FormControl>
                    <div className="flex-grow flex flex-col">
                      <FormLabel className="text-base font-medium">Amortization Loan</FormLabel>
                      <p className="text-xs text-muted-foreground mb-4">Pay off a debt over time in equal installments.</p>
                      {selectedLoanType === 'Amortization' && (
                        <>
                          <div className="w-full h-64"> {/* Consistent chart size */}
                            <PoolRepaymentScheduleChart principal={form.watch('principal')} poolTerm={form.watch('repaymentPeriod')} />
                          </div>
                          <Button type="button" onClick={(e) => {
                            e.stopPropagation();
                            console.log("Toggle button clicked");
                            toggleInstallmentsTable();
                            }} variant="link" className="text-xs mt-5">
                            {showInstallmentsTable ? 'Hide Table' : 'Show Table'}
                          </Button>
                          {showInstallmentsTable && (
                            <InstallmentsTable
                              principal={form.watch('principal')}
                              poolTerm={form.watch('repaymentPeriod')}
                              financingFee={form.watch('financingFee')}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </FormItem>
                  <FormItem className="border rounded-md p-4 flex gap-3 radio-item">
                    <FormControl>
                      <RadioGroupItem value="Bullet" className="mt-4" />
                    </FormControl>
                    <div className="flex-grow flex flex-col gap-y-1">
                      <FormLabel className="text-base font-medium">Bullet Loan</FormLabel>
                      <p className="text-xs text-muted-foreground mb-4">The principal is paid back in full at the end of the loan term.</p>
                      {selectedLoanType === 'Bullet' && (
                        <>
                          <div className="w-full h-64"> {/* Consistent chart size */}
                            <PoolRepaymentScheduleChart principal={form.watch('principal')} poolTerm={form.watch('repaymentPeriod')} />
                          </div>
                          <Button type="button" onClick={toggleInstallmentsTable} variant="link" className="text-sm mt-5">
                            {showInstallmentsTable ? 'Hide Table' : 'Show Table'}
                          </Button>
                          {showInstallmentsTable && (
                            <InstallmentsTable
                              principal={form.watch('principal')}
                              poolTerm={form.watch('repaymentPeriod')}
                              financingFee={form.watch('financingFee')}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </FormItem>
                </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Separator />
        
        <div className="py-10">
          <Button type="submit" className="gap-3">
            <Icons.plusSquare />
            Add tranche structure
          </Button>
        </div>  
      </form>
      
    </Form>
  );
}
