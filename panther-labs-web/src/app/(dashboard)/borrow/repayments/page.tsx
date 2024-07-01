import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import { DashboardTitle } from "@/app/(dashboard)/componenets/dashboard-utils";

import { RepaymentsTable } from "@/app/(dashboard)/borrow/repayments/repayment-table";

function RepaymentsPage() {
  return (
    <main>
      <DashboardTitle>Your Repayments</DashboardTitle>
      <div className="mb-4 mt-8 flex justify-between">
        <div className="flex h-10 w-full max-w-sm items-center gap-2 rounded-md  border p-3">
          <Icons.search className="h-5 w-5" />
          <input
            className="w-max bg-transparent text-sm font-semibold placeholder:text-muted-foreground focus-within:outline-none"
            placeholder="Search by pool name"
          />
        </div>
        <Button variant={"outline"} className="gap-3">
          Export CSV
          <Icons.cloud />
        </Button>
      </div>
      <RepaymentsTable />
    </main>
  );
}

export default RepaymentsPage;
