import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type PortfolioStatCardProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  data: string | number;
};

export function PortfolioStatCard({
  className,
  label,
  data,
  ...props
}: PortfolioStatCardProps) {
  return (
    <div
      className={cn(
        "flex h-[150px] flex-col justify-center gap-y-3 rounded-sm bg-primary p-8 text-primary-foreground shadow-sm",
        className,
      )}
      {...props}
    >
      <p className="text-sm font-semibold">{label}</p>
      <p className="flex gap-2">
        <span className="text-2xl font-semibold">$</span>
        <span className="text-5xl">{data}</span>
      </p>
    </div>
  );
}
