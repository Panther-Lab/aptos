"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NFT, NFTFormSchema } from "@/types/nft";
import { toast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { createNFTservice } from "@/services/nft";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { siteRoutes } from "@/config/site";
import { queryClient } from "@/providers/app-providers";
import { TAGS } from "@/config/tags";
import Link from "next/link";

export function CreateNFT() {
  const form = useForm<NFT>({
    resolver: zodResolver(NFTFormSchema),
    defaultValues: {
      minted: false,
      locked: false,
    },
  });
  const { data, error, isPending, mutate } = useMutation({
    mutationFn: createNFTservice,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TAGS.NFT],
      });
    },
  });
  const router = useRouter();

  async function onSubmit(data: NFT) {
    console.log("hi");
    try {
      mutate({ ...data });
      toast({
        title: "Success",
        description: "Document added successfully",
      });
      router.push(siteRoutes.tokenization);
    } catch (e) {
      console.log(e);
      toast({
        title: "Error",
        description: "Not able to create document",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6"
      >
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="documentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Document Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe Document" {...field} className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Portfolio_Term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio Term</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Portfolio Term" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 Year</SelectItem>
                    <SelectItem value="3">3 Year</SelectItem>
                    <SelectItem value="5">5 Year</SelectItem>
                    <SelectItem value="10">10 Year</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="principal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Principal Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Principal amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="No_of_Loan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of loans</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Number of loans" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Total_Principal_Amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Principal Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Average_Interest_Rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Average Interest Rate</FormLabel>
                <FormControl>
                  <Input placeholder="0.2%" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Portfolio_Status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Portfolio Term" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="open">Open For Funding</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Writedown"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Write Down</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Number of writedown" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Writeoff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Write Off</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Write Number of writeoff"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Maturity_Date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maturity Date</FormLabel>
                <FormControl>
                  <Input type="date" onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-4">
          <Link href={siteRoutes.tokenization}>
          <Button variant={"outline"}>Discard</Button>
          </Link>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
