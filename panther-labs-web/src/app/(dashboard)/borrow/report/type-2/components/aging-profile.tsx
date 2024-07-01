import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const data = [
  {
    per: "2.1%",
    label: "current",
    balance: "1,0000",
  },
  { per: "12%", balance: "1,00000", label: "1-7 days" },
];

export function AgingProfile() {
  return (
    <div className="bg-secondary p-6">
      <Table className="bg-white">
        <TableHeader>
          <TableRow className="border-none bg-secondary">
            <TableHead></TableHead>
            <TableHead>Percentage</TableHead>
            <TableHead>Principal Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(({ per, balance, label }, index) => (
            <TableRow
              className={cn("border-none", index % 2 != 0 && "bg-secondary")}
              key={label}
            >
              <TableCell>{label}</TableCell>
              <TableCell>{per}</TableCell>
              <TableCell>{balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
