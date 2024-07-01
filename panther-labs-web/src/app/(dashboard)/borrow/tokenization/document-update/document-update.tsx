"use-client";

import React from "react";
import Link from "next/link";
import { siteRoutes } from "@/config/site";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const documentData = [
  {
    TokenID: "There are no NFTs minted on this document",
    Registry: "",
    Owner: "",
    Actions: "",
  },
];

export function DocumentUpdateTable() {
  return (
    <>
      <Table style={{ tableLayout: "fixed" }}>
        <TableHeader className=" bg-[#F4F4F4]">
          <TableRow>
            <TableHead>TokenId</TableHead>
            <TableHead>Registry</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documentData.map(({ TokenID, Registry, Owner, Actions }) => (
            <TableRow key={TokenID}>
              <TableCell className="font-normal">
                <Link
                  href={`${siteRoutes.borrow}/${TokenID}`}
                  className="w-full"
                >
                  {TokenID}
                </Link>
              </TableCell>
              <TableCell>{Registry}</TableCell>
              <TableCell>{Owner}</TableCell>
              <TableCell>{Actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
