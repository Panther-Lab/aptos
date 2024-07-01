import { cn } from "@/lib/utils";
import { Dice1 } from "lucide-react";
import { type HTMLAttributes } from "react";

type DashboardTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function DashboardTitle({
  className,
  children,
  ...props
}: DashboardTitleProps) {
  return (
    <h2
      className={cn("text-2xl font-bold text-[#333333]", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export function DashboardSubTitle({
  className,
  children,
  ...props
}: DashboardTitleProps) {
  return (
    <h2
      className={cn("text-lg font-bold text-[#333333]", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

type DashboardHeadlineProps = HTMLAttributes<HTMLParagraphElement>;

export function DashboardHeadline({
  className,
  children,
  ...props
}: DashboardHeadlineProps) {
  return (
    <p className={cn("text-[#333333]", className)} {...props}>
      {children}
    </p>
  );
}

type DashboardStatProps = {
  label: string;
  data: string;
  className?: string;
};

export function DashboardStat({ label, data, className }: DashboardStatProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-[#454545]",
        className,
      )}
    >
      <p>{label}</p>
      <p className="font-semibold">{data}</p>
    </div>
  );
}
