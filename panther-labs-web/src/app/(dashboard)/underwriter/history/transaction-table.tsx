"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetHistory } from "@/hooks/aptos/useGetHistory";
import { useGetAdmin } from "@/hooks/aptos/useGetAdmin";

export function TransactionTable() {
  const {events} = useGetAdmin();
  // if (transactionInProgress) {
  //   return <p>isLoading</p>;
  // }
  console.log(events);
  const convertTimestampToDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); 
    return date.toLocaleDateString(); 
  };
  return (
    <Table>
      <TableHeader className="bg-accent">
        <TableRow>
        <TableHead>Date</TableHead>
          <TableHead>Principal</TableHead>
          <TableHead>Pool Name</TableHead>
          <TableHead>Financing Fee</TableHead>
          <TableHead>Formation Period</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map(
          ({ principal, timestamp, pool_name, financing_fee, deal_formation_period}, index) => (
            <TableRow key={index}>
              <TableCell>{convertTimestampToDate(timestamp)}</TableCell>
              <TableCell>{principal}</TableCell>
              <TableCell>{pool_name}</TableCell>
              <TableCell>{financing_fee}</TableCell>
              <TableCell>{deal_formation_period} Days</TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}
