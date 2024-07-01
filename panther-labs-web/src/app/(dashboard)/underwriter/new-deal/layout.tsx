import { ReactNode } from "react";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { siteRoutes } from "@/config/site";
import { DashboardTitle } from "@/app/(dashboard)/componenets/dashboard-utils";
import { DealNav } from "./deal-nav";
import { Separator } from "@/components/ui/separator";
import { DealStoreProvider } from "@/providers/new-deal-store-provider";
import { DealNavStoreProvider } from "@/providers/new-deal-nav-provider";

function NewDealLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-full flex-col gap-y-7">
      <div className="flex flex-col gap-y-2">
        <Link
          className="flex items-center gap-2 text-xs text-[#000000B0]"
          href={siteRoutes.borrow}
        >
          <Icons.backArrow />
          Go Back To All Pools
        </Link>
        <DashboardTitle>Create A New Pool</DashboardTitle>
      </div>
      <DealNavStoreProvider>
        <DealNav />
        <Separator />
        <DealStoreProvider>{children}</DealStoreProvider>
      </DealNavStoreProvider>
    </main>
  );
}

export default NewDealLayout;
