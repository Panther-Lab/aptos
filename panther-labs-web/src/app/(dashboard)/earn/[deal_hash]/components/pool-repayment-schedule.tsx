import { DashboardSubTitle } from "@/app/(dashboard)/componenets/dashboard-utils";
import { InstallmentsTable } from "@/app/(dashboard)/earn/[deal_hash]/components/pool-installment-table";
import { PoolRepaymentScheduleChart } from "@/app/(dashboard)/earn/[deal_hash]/components/pool-reypament-schedule-chart";

export function PoolRepaymentSchedule() {
  return (
    <section className="flex flex-col gap-y-4">
      <DashboardSubTitle>Repayment Schedule</DashboardSubTitle>
      <PoolRepaymentScheduleChart />
      <InstallmentsTable />
    </section>
  );
}
