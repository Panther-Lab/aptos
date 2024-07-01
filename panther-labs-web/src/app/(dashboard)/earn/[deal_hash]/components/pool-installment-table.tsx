import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const installments = [
  {
    installmentNumber: 12,
    dueDate: "Feb 29",
    intrest: "12%",
    prinicpal: "100M",
    repaid: "10K",
  },
  {
    installmentNumber: 12,
    dueDate: "Feb 29",
    intrest: "12%",
    prinicpal: "100M",
    repaid: "10K",
  },
  {
    installmentNumber: 12,
    dueDate: "Feb 29",
    intrest: "12%",
    prinicpal: "100M",
    repaid: "10K",
  },
  {
    installmentNumber: 12,
    dueDate: "Feb 29",
    intrest: "12%",
    prinicpal: "100M",
    repaid: "10K",
  },
];

export function InstallmentsTable() {
  return (
    <Table>
      <TableHeader className="bg-accent">
        <TableRow>
          <TableHead>No. of Instalments</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Est Intrest</TableHead>
          <TableHead>Est Principal</TableHead>
          <TableHead>Total Repaid</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {installments.map(
          (
            { dueDate, installmentNumber, intrest, prinicpal, repaid },
            index,
          ) => (
            <TableRow key={index}>
              <TableCell>{installmentNumber}</TableCell>
              <TableCell>{dueDate}</TableCell>
              <TableCell>{intrest}</TableCell>
              <TableCell>{prinicpal}</TableCell>
              <TableCell>{repaid}</TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}
