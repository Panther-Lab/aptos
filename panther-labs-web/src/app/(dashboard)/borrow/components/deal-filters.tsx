"use client";
import { useState } from "react";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type filter = "open" | "progress" | "closed";

export function DealFilters() {
  const [activeFilter, setActiveFilter] = useState<filter>("open");
  return (
    <div className="box-border flex w-max rounded-md bg-secondary">
      <DealFilterItem
        onClick={() => setActiveFilter("open")}
        isActive={"open" === activeFilter}
      >
        Open For Funding
      </DealFilterItem>
      <DealFilterItem
        onClick={() => setActiveFilter("progress")}
        isActive={"progress" === activeFilter}
      >
        In Progress
      </DealFilterItem>
      <DealFilterItem
        onClick={() => setActiveFilter("closed")}
        isActive={"closed" === activeFilter}
      >
        Closed
      </DealFilterItem>
    </div>
  );
}

type FilterItemProps = HTMLAttributes<HTMLDivElement> & {
  isActive: boolean;
};

function DealFilterItem({ isActive, children, ...props }: FilterItemProps) {
  return (
    <div
      role="button"
      className={cn(
        "flex h-14 cursor-pointer items-center justify-center px-4",
        isActive && "border-b-4 border-b-primary font-medium",
      )}
      {...props}
    >
      {children}
    </div>
  );
}
