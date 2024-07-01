import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NoData } from "@/components/no-data";

const existingCreditLines = [
  {
    poolName: "Pool A",
    interestRate: "5%",
    term: "24 months",
    maturity: "2026-02-28",
    amountBorrowed: "$10,000",
    principalOutstanding: "$5,000",
  },
  {
    poolName: "Pool B",
    interestRate: "4.5%",
    term: "36 months",
    maturity: "2026-05-15",
    amountBorrowed: "$15,000",
    principalOutstanding: "$7,500",
  },
];

export function ExistingCreditLineTable({data}: {data: any[]}) {
  return (
    <Table>
      <TableHeader className="bg-accent border-solid border-2 border-gray-300">
        <TableRow>
          <TableHead>Pool Name</TableHead>
          <TableHead>Interest rate</TableHead>
          <TableHead>Term</TableHead>
          <TableHead>Maturity</TableHead>
          <TableHead>Amount Borrowed</TableHead>
          <TableHead>Principal Outstading</TableHead>
        </TableRow>
      </TableHeader>
      {
        (data?.length ?? 0) > 0 ? (
      <TableBody className="border-solid border-2">
        {existingCreditLines.map(
          (
            {
              interestRate,
              poolName,
              principalOutstanding,
              term,
              amountBorrowed,
              maturity,
            },
            index,
          ) => (
            <TableRow key={index}>
              <TableCell>{poolName}</TableCell>
              <TableCell>{interestRate}</TableCell>
              <TableCell>{term}</TableCell>
              <TableCell>{maturity}</TableCell>
              <TableCell>{amountBorrowed}</TableCell>
              <TableCell>{principalOutstanding}</TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
      ): ( 
        <TableBody className="border-solid border-2 bg-accent">
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              <NoData />
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
}
