import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/app/(dashboard)/componenets/status-badge";
import Link from "next/link";
import { siteRoutes } from "@/config/site";
import { Pool } from "@/hooks/aptos/useGetPools";
import { NoData } from "./no-data";

type PoolTableProps = {
  data?: Pool[];
  toAdmin?: boolean;
  isBorrower?: boolean;
  noData?: boolean;
};

export function PoolsTable({ data, toAdmin, isBorrower }: PoolTableProps) {
  return (
    <Table>
      <TableHeader className="bg-accent">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Pool Principal</TableHead>
          <TableHead>Estimated APY</TableHead>
          <TableHead>Tranches</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      {
        (data?.length ?? 0) > 0 ? (
          <TableBody>
          {data?.map((pool) => (
            <TableRow key={pool?.deal_name}>
              <TableCell className="font-medium">
                <Link href={`${siteRoutes.earn}/pool`} className="w-full">
                  {pool?.deal_name}
                </Link>
              </TableCell>
              <TableCell>${pool?.principal}</TableCell>
              <TableCell>{pool?.senior_apr}</TableCell>
              <TableCell>{"Junior"}</TableCell>
              <TableCell>{pool?.credit_rating}</TableCell>
              <TableCell>
                <StatusBadge varient={"active"}>{"Active"}</StatusBadge>
              </TableCell>
              <TableCell>
                {isBorrower ? (
                  <Link
                    href={`${siteRoutes.borrow}/${pool?.uid?.addr + "_" + pool?.uid?.creation_num}`}
                  >
                    <Button size={"sm"}>Withdraw</Button>
                  </Link>
                ) : (
                  <Link
                    href={
                      toAdmin
                        ? `${siteRoutes.underwriter}/${pool?.uid?.addr + "_" + pool?.uid?.creation_num}`
                        : `${siteRoutes.earn}/${pool?.uid?.addr + "_" + pool?.uid?.creation_num}`
                    }
                  >
                    <Button size={"sm"}>Invest</Button>
                  </Link>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        ): ( 
        <TableBody>
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              <NoData />
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
}
