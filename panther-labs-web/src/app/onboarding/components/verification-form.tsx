"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { locations } from "@/types/locations";
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"


import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { verificationInputSchema } from "@/types/verification";
import { Icons } from "./icons";

export function VerificationForm() {
    const form = useForm<z.infer<typeof verificationInputSchema>>({
        resolver: zodResolver(verificationInputSchema),
    });

    return(
      <div className="-mt-12">
      <Form {...form}>
      <form>
      <h1 className="text-2xl font-bold mb-2">Verification</h1>
      <p className="text-sm mb-5">Add you information to complete verification</p>
      <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <Input
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  type="string"
                  placeholder="JohnDoe"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  type="string"
                  placeholder="Days"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                >
                  <FormControl>
                  <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.code} value={location.code}>
                      {location.name.toString()}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Residency</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                >
                  <FormControl>
                  <SelectTrigger>
                          <SelectValue placeholder="Select Residency" />
                  </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.code} value={location.code}>
                      {location.name.toString()}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
      </form>
      </Form>
      </div>
    )

}