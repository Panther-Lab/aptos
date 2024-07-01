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

export function TransactionTable() {
  const {events} = useGetHistory();
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
          <TableHead>Event Type</TableHead>
          <TableHead>Pool</TableHead>
          <TableHead>Tranches</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map(
          ({ amount, tranche, event_type, timestamp, pool_address}, index) => (
            <TableRow key={index}>
              <TableCell>{convertTimestampToDate(timestamp)}</TableCell>
              <TableCell>{event_type}</TableCell>
              <TableCell>{pool_address?.slice(0, 6)}...{pool_address?.slice(-4)}</TableCell>
              <TableCell>{tranche}</TableCell>
              <TableCell>{amount} APT</TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}
