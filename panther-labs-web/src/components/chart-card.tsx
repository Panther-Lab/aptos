import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ChartCardProps = HTMLAttributes<HTMLDivElement>;

export function ChartCard({ className, children, ...props }: ChartCardProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col gap-y-2.5 bg-card p-6 shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
