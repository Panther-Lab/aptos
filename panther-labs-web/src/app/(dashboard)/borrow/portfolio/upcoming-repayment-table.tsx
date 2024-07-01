import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BorrowPool } from "@/hooks/aptos/useGetBorrowerPools";
import { NoData } from "@/components/no-data";

const upcomingPayments = [
  {
    id: "Loan 13",
    poolName: "Pool A",
    dueDate: "2024-03-15",
    amount: 1000,
    principal: 800,
    interest: 200,
    status: "Pending",
    action: "Pay Now",
  },
  {
    id: "Loan 14",
    poolName: "Pool B",
    dueDate: "2024-03-20",
    amount: 1500,
    principal: 1200,
    interest: 300,
    status: "Paid",
    action: "View Details",
  },
  {
    id: "Loan 15",
    poolName: "Pool C",
    dueDate: "2024-03-25",
    amount: 2000,
    principal: 1600,
    interest: 400,
    status: "Pending",
    action: "Pay Now",
  },
  {
    id: "Loan 16",
    poolName: "Pool A",
    dueDate: "2024-03-15",
    amount: 1000,
    principal: 800,
    interest: 200,
    status: "Pending",
    action: "Pay Now",
  },
  {
    id: "Loan 17",
    poolName: "Pool B",
    dueDate: "2024-03-20",
    amount: 1500,
    principal: 1200,
    interest: 300,
    status: "Paid",
    action: "View Details",
  },
];

export function UpcomingRepaymentTable(data:any) {
  return (
    <Table>
      <TableHeader className="bg-accent border-solid border-2 border-gray-300">
        <TableRow>
          <TableHead>ID (Loan)</TableHead>
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
        (data?.length ?? 0) > 0 ? (
      <TableBody>
        {upcomingPayments.map(
          (
            { amount, dueDate, id, interest, poolName, principal, status },
            index,
          ) => (
            <TableRow key={index}>
              <TableCell>{id}</TableCell>
              <TableCell>{poolName}</TableCell>
              <TableCell>{dueDate}</TableCell>
              <TableCell>{amount}</TableCell>
              <TableCell>{principal}</TableCell>
              <TableCell>{interest}</TableCell>
              <TableCell>{status}</TableCell>
              <TableCell>
                <Button size={"sm"}>Repay</Button>
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
      ): ( 
        <TableBody className="border-solid border-2 bg-accent">
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              <NoData />
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
}
