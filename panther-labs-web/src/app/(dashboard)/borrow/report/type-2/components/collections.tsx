import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  TableFooter,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const data = [
  {
    label: "current",
    balance: "1,0000",
  },
  { balance: "1,00000", label: "1-7 days" },
];

export function Collections() {
  return (
    <div className="bg-secondary p-6 py-20">
      <Table className="bg-white">
        <TableBody>
          {data.map(({ balance, label }, index) => (
            <TableRow
              className={cn("border-none", index % 2 != 0 && "bg-secondary")}
              key={label}
            >
              <TableCell>{label}</TableCell>
              <TableCell className="text-right">{balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
