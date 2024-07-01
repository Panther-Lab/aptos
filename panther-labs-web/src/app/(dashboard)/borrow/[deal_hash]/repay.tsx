"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { DashboardSubTitle } from "@/app/(dashboard)/componenets/dashboard-utils";

const FormSchema = z.object({
  ammount: z.string(),
});

export function RepayForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex flex-col gap-y-4">
      <DashboardSubTitle>Repay</DashboardSubTitle>
      <Card>
        <CardHeader>
          <p className="font-medium">Your Balance 970 USDC</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-sm space-y-6"
            >
              <FormField
                control={form.control}
                name="ammount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AMOUNT</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center text-muted-foreground">
                        <Input placeholder="00.00" {...field} />
                        <p className="absolute  right-3 text-muted-foreground">
                          MAX
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Repay
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
