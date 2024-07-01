"use client";

import { Icons } from "@/components/icons";
import { newDealRoutes } from "@/config/site";
import { cn } from "@/lib/utils";
import { useNavDealStore } from "@/providers/new-deal-nav-provider";
import { usePathname } from "next/navigation";

type TabStatus = "active" | "pending" | "done";

export function DealNav() {
  const pathName = usePathname();
  const { steps } = useNavDealStore((state) => state);
  console.log(pathName);
  return (
    <nav className="grid grid-cols-5 gap-4">
      <NavItem
        href={newDealRoutes.root}
        label={"Deal Details"}
        index={1}
        status={
          steps.first
            ? "done"
            : newDealRoutes.root == pathName
              ? "active"
              : "pending"
        }
      />
      <NavItem
        href={newDealRoutes.tranches}
        label={"Tranche Structure"}
        index={2}
        status={
          steps.second
            ? "done"
            : newDealRoutes.tranches == pathName
              ? "active"
              : "pending"
        }
      />
      <NavItem
        href={newDealRoutes.review}
        label={"Review"}
        index={3}
        status={
          steps.third
            ? "done"
            : newDealRoutes.review == pathName
              ? "active"
              : "pending"
        }
      />
    </nav>
  );
}

type NavItem = {
  href: string;
  label: string;
  status?: TabStatus;
  index?: number;
};

function NavItem({ href, label, status = "pending", index }: NavItem) {
  console.log(status, href);
  return (
    <div
      className={cn(
        "flex h-12 items-center gap-2 border-b-4 border-b-muted text-muted-foreground",
        status == "active" && "border-b-black font-medium text-foreground",
        status == "done" && "border-b-primary font-medium text-foreground",
      )}
    >
      {status == "done" && (
        <div className="flex h-5 w-5 items-center justify-center rounded bg-primary ">
          <Icons.check className="h-3 w-3 stroke-white" />
        </div>
      )}
      {status !== "done" && `${index}. `}
      {label}
    </div>
  );
}
