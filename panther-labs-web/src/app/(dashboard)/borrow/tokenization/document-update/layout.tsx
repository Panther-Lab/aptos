import { ReactNode } from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DashboardTitle } from "@/app/(dashboard)/componenets/dashboard-utils";

function DocumentDetailsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col gap-y-7">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-y-2">
          <Link
            className="flex items-center gap-2 text-xs text-[#000000B0]"
            href="/tokenization/document-demo"
          >
            <Icons.backArrow />
            Go Back To Document #Demo TestRun 1
          </Link>
          <DashboardTitle>Update Document</DashboardTitle>
        </div>
        <div className="flex items-center gap-4">
          <Button variant={"outline"}>Discard</Button>
          <Button style={{ backgroundColor: "black" }}>Update</Button>
        </div>
      </div>
      {children}
    </main>
  );
}

export default DocumentDetailsLayout;
