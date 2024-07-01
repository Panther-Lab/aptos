import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const repayments = [
  {
    date: "02/01/2024",
    pool: "FAZZ",
    repaid: "$250.00",
    tranches: "Junior",
  },
  {
    date: "02/01/2024",
    pool: "Faa",
    repaid: "$250.00",
    tranches: "Junior",
  },
  {
    date: "02/01/2024",
    pool: "Sooo",
    repaid: "$250.00",
    tranches: "Junior",
  },
  {
    date: "02/01/2024",
    pool: "Cool",
    repaid: "$250.00",
    tranches: "Junior",
  },
  {
    date: "02/01/2024",
    pool: "TAKE",
    repaid: "$250.00",
    tranches: "Junior",
  },
];

export function RepaymentsTable() {
  return (
    <Table>
      <TableHeader className="bg-accent">
        <TableRow>
          <TableHead>Payment date</TableHead>
          <TableHead>Pool</TableHead>
          <TableHead>Amount repaid</TableHead>
          <TableHead>Tranches</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {repayments.map(({ date, repaid, pool, tranches }, index) => (
          <TableRow key={index}>
            <TableCell>{date}</TableCell>
            <TableCell>{repaid}</TableCell>
            <TableCell>{pool}</TableCell>
            <TableCell>{tranches}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
