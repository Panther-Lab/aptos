import { ReactNode } from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteRoutes } from "@/config/site";
import { Button } from "@/components/ui/button";
import { DashboardTitle } from "@/app/(dashboard)/componenets/dashboard-utils";

function DocumentDemo({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col gap-y-7">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-y-2">
          <Link
            className="flex items-center gap-2 text-xs text-[#000000B0]"
            href={`${siteRoutes.tokenization}/document-details`}
          >
            <Icons.backArrow />
            Go Back To All Pools
          </Link>
          <DashboardTitle>Document #Demo TestRun 1</DashboardTitle>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`${siteRoutes.tokenization}/document-update`}>
            <Button>Edit</Button>
          </Link>
        </div>
      </div>
      {children}
    </main>
  );
}

export default DocumentDemo;
