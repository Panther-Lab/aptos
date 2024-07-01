import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type statusBadgeProps = HTMLAttributes<HTMLDivElement> & {
  varient: "active" | "inactice";
};

export function StatusBadge({
  varient,
  className,
  children,
  ...props
}: statusBadgeProps) {
  return (
    <div
      className={cn(
        "flex w-max items-center justify-center rounded-sm border-[0.5px] bg-opacity-10 px-3 py-1",
        varient === "active"
          ? "border-[#069855] bg-[#069855] text-[#069855]"
          : "border-[#991B1B] bg-[#991B1B] text-[#991B1B]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
