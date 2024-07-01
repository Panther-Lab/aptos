import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardSubTitle, DashboardTitle } from "@/app/(dashboard)/componenets/dashboard-utils";
import { NoData } from "@/components/no-data";

interface RepaymentData {
  ID: string;
  poolName: string;
  dueDate: string;
  amount: string;
  principal: string;
  interest: string;
  status: string;
}

interface RepaymentsTableProps {
  repaymentsData: RepaymentData[];
}

export function RepaymentsTable({ repaymentsData }: RepaymentsTableProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <DashboardSubTitle>Upcoming Repayments</DashboardSubTitle>
      <Table>
        <TableHeader className="bg-accent">
          <TableRow>
            <TableHead>ID(loan)</TableHead>
            <TableHead>Pool Name</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Principal</TableHead>
            <TableHead>Interest</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        {
        (repaymentsData?.length ?? 0) > 0 ? (
        <TableBody>
          {repaymentsData.map(({ ID, poolName, dueDate, amount, principal, interest, status }) => (
            <TableRow key={ID}>
              <TableCell>{ID}</TableCell>
              <TableCell>{poolName}</TableCell>
              <TableCell>{dueDate}</TableCell>
              <TableCell>{amount}</TableCell>
              <TableCell>{principal}</TableCell>
              <TableCell>{interest}</TableCell>
              <TableCell>{status}</TableCell>
              <TableCell>
                <Button size={"sm"}>Coming Soon</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        ): ( 
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                <NoData />
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
}
