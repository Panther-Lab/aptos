"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { siteRoutes } from "@/config/site";

const FormSchema = z.object({
  documentName: z.string().min(2, {
    message: "Pool name must be at least 2 characters.",
  }),
  principal: z.string(),
  borrowerKey: z.string(),
  financingFee: z.string(),
  details: z.string(),
  timeOfMaturity: z.string(),
  repaymentPeriod: z.string(),
  loanType: z.enum(["bullet loan", "amortization loan"]),
});

const documentData = [
  {
    name: "Amber AO User ",
    Address: "0x25c25666cbd35mlml77..",
    Access: "write_access",
    Actions: "View",
  },
  {
    name: "0x25c25666cbd35mlml77..",
    Address: "0x25c25666cbd35mlml77..",
    Access: "write_access",
    Actions: "View",
  },
  {
    name: "Test2May3",
    Address: "0x25c25666cbd35mlml77..",
    Access: "write_access",
    Actions: "View",
  },
  {
    name: "Test2May123",
    Address: "0x25c25666cbd35mlml77..",
    Access: "write_access",
    Actions: "View",
  },
  {
    name: "Test2May123",
    Address: "0x25c25666cbd35mlml77..",
    Access: "write_access",
    Actions: "View",
  },
  {
    name: "Test2Feb",
    Address: "0x25c25666cbd35mlml77..",
    Access: "write_access",
    Actions: "View",
  },
];

const DocumentDemo: React.FC = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      documentName: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <h1 className="font-semibold">Document Details</h1>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="documentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Schema</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="documentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Originator</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="documentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Id</FormLabel>
                    <FormControl>
                      <Input placeholder="Type More Information" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>

      <h1 className="font-semibold">Collaborators</h1>
      <Table>
        <TableHeader className="bg-accent">
          <TableRow className=" bg-[#F4F4F4]">
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documentData.map(({ Access, Actions, Address, name }) => (
            <TableRow key={name}>
              <TableCell className="font-medium">
                <Link href={`${siteRoutes.borrow}/${name}`} className="w-full">
                  {name}
                </Link>
              </TableCell>
              <TableCell>{Address}</TableCell>
              <TableCell>{Access}</TableCell>
              <TableCell>
                <Button size="sm">{Actions}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DocumentDemo;
