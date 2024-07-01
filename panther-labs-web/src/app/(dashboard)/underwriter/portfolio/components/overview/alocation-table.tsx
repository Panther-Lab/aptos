import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  const allocations = [
    {
      pool_name: "TAXOS",
      rate: "10%",
      term: "MONTHALY",
      meturity: "TBD",
      ammount: "$400M",
      principal_outstanding: "$200k",
    },
    {
      pool_name: "TAXOS",
      rate: "10%",
      term: "MONTHALY",
      meturity: "TBD",
      ammount: "$400M",
      principal_outstanding: "$200k",
    },
    {
      pool_name: "TAXOS",
      rate: "10%",
      term: "MONTHALY",
      meturity: "TBD",
      ammount: "$400M",
      principal_outstanding: "$200k",
    },
  ];
  
  export function AllocationTable({ allocations}: { allocations: any[]}) {
    return (
      <Table>
        <TableHeader className="bg-accent">
          <TableRow>
            <TableHead>Pool Name</TableHead>
            <TableHead>Interest rate</TableHead>
            <TableHead>Term</TableHead>
            <TableHead>Maturity</TableHead>
            <TableHead>Amount Invested</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allocations.map(
            (
              { pool_name, interest_rate, term, maturity, total_deposit },
              index,
            ) => (
              <TableRow key={index}>
                <TableCell>{pool_name}</TableCell>
                <TableCell>{interest_rate}</TableCell>
                <TableCell>{term}</TableCell>
                <TableCell>{maturity}</TableCell>
                <TableCell>{total_deposit}</TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    );
  }
  