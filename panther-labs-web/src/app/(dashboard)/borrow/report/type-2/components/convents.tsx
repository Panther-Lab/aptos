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
    min: "MIN",
    APR: "5.1%",
    value: "5.1%",
    label: "Over collateral",
  },
  { min: "MIN", APR: "5.1%", value: "5.1%", label: "Npl over 60 days" },
];

export function CovenantsTable() {
  return (
    <Table className="rounded-xl border px-6">
      <TableHeader>
        <TableRow className="border-none bg-secondary">
          <TableHead></TableHead>
          <TableHead>Min / Max</TableHead>
          <TableHead>APR</TableHead>
          <TableHead>Value Covenant Met</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ min, APR, value, label }, index) => (
          <TableRow
            className={cn("border-none", index % 2 != 0 && "bg-secondary")}
            key={label}
          >
            <TableCell>{label}</TableCell>
            <TableCell>{min}</TableCell>
            <TableCell>{APR}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
