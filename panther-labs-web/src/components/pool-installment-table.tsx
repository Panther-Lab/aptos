import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

// Function to generate the installment schedule
function generateInstallmentData(principal: number, poolTerm: number, financingFee: number) {
  const now = new Date(); // Get the current date
  const schedule = [];
  const monthlyPrincipal = principal / poolTerm; // Principal per month
  const monthlyInterest = (principal * financingFee) / (100 * poolTerm); // Interest per month
  let balance = principal + principal * (financingFee / 100); // Initial balance

  for (let i = 0; i < poolTerm; i++) {
    const dueDate = new Date(now);
    dueDate.setMonth(now.getMonth() + i); // Set the due date for the installment

    schedule.push({
      date: dueDate,
      principal: monthlyPrincipal.toFixed(2),
      interest: monthlyInterest.toFixed(2),
      balance: balance.toFixed(2),
    });

    // Update the remaining balance
    balance -= (monthlyPrincipal + monthlyInterest);
  }

  return schedule;
}

export function InstallmentsTable({
  principal,
  poolTerm,
  financingFee,
}: {
  principal: number;
  poolTerm: number;
  financingFee: number;
}) {
  const [schedule, setSchedule] = useState<{ date: Date; principal: string; interest: string; balance: string; }[]>([]);

  useEffect(() => {
    if (principal > 0 && poolTerm > 0 && financingFee > 0) {
      const installmentData = generateInstallmentData(principal, poolTerm, financingFee);
      setSchedule(installmentData);
    }
  }, [principal, poolTerm, financingFee]); // Re-generate schedule if any of the inputs change

  // Formatter to display dates in the dd/mm/yyyy format
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Table>
      <TableHeader className="bg-accent">
        <TableRow>
          <TableHead>No. of Instalment</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Principal</TableHead>
          <TableHead>Interest</TableHead>
          <TableHead>Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedule?.map(
          ({ date, principal, interest, balance }, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{dateFormatter.format(date)}</TableCell>
              <TableCell>${principal}</TableCell>
              <TableCell>${interest}</TableCell>
              <TableCell>${balance}</TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}
