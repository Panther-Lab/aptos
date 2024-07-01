import React from "react";
import Link from "next/link";
import { siteRoutes } from "@/config/site";
import { Icons } from "@/components/icons";
import { DashboardTitle } from "@/app/(dashboard)/componenets/dashboard-utils";
import { Button } from "@/components/ui/button";
import { CreateNFT } from "@/components/form/create-nft";

function DocumentDetailsPage() {
  return (
    <main className="flex flex-col gap-y-7">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-y-2">
          <Link
            className="flex items-center gap-2 text-xs text-[#000000B0]"
            href={`${siteRoutes.tokenization}`}
          >
            <Icons.backArrow />
            Go Back To All Pools
          </Link>
          <DashboardTitle>New Document</DashboardTitle>
        </div>
      </div>
      <CreateNFT />
    </main>
  );
}

export default DocumentDetailsPage;
