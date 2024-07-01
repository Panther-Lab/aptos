"use client";

import { type HTMLAttributes, type ReactNode, useState } from "react";

import { chains } from "@/lib/chains";
import { Chain } from "@/types/chain";
import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";

export function ChainMenue() {
  const [open, setOpen] = useState(false);
  const [currentChain, setCurrentChain] = useState<Chain>(chains[0]);
  return (
    <div className="relative flex w-max flex-col gap-y-2">
      <ChainSelectTrigger onClick={() => setOpen(!open)}>
        {currentChain && <currentChain.Icon className="h-6 w-6" />}
      </ChainSelectTrigger>
      <div
        className={cn(
          "absolute top-[68px] hidden",
          open && "flex flex-col bg-card shadow-sm",
        )}
      >
        {chains.map((chain, index) => (
          <ChainSelectItem
            key={index}
            value={chain.value}
            onChange={() => {
              setCurrentChain(chain);
              setOpen(false);
            }}
            currentSelectedValue={chain}
          >
            <chain.Icon className="h-6 w-6" />
            {chain.label}
          </ChainSelectItem>
        ))}
      </div>
    </div>
  );
}

export function ChainSelectTrigger({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn("flex h-10 w-24 items-center gap-3", className)}
      {...props}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary">
        {children}
      </div>
      <Icons.down className="h-5 w-4 stroke-primary" />
    </button>
  );
}

type ChainSelectItemProps = {
  currentSelectedValue?: Chain;
  onChange: (value: string) => void;
  children: ReactNode;
  value: string;
};

export function ChainSelectItem(props: ChainSelectItemProps) {
  return (
    <div
      role="button"
      onClick={() => props.onChange(props.value)}
      className={cn("flex gap-3 px-4 py-2 hover:bg-accent")}
    >
      {props.children}
    </div>
  );
}
