import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function StatCard({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-y-2 rounded-md border p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatCardItem({
  className,
  children,
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm font-medium", className)}>{children}</p>;
}
