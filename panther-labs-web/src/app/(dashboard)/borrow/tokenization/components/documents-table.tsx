"use client";

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
import { MintNFT } from "./mint-nft";
import { useQuery } from "@tanstack/react-query";
import { getNFTService } from "@/services/nft";
import { TAGS } from "@/config/tags";

const documentData = [
  {
    name: "Test2May",
    schema: "AmberAO_Invoice_v1.2_oracleupdate",
    dataCreated: "2024-03-17, 5:34 PM",
    documentStatus: "Created",
    nftId: "35532682496846...",
  },
];

export function DocumentTable() {
  const { data, isPending } = useQuery({
    queryKey: [TAGS.NFT],
    queryFn: getNFTService,
  });

  if (isPending) {
    return <p>Loading....</p>;
  }

  return (
    <Table className="w-full overflow-x-hidden rounded-sm">
      <TableHeader className="bg-accent">
        <TableRow className="bg-[#F4F4F4]">
          <TableHead>Name</TableHead>
          <TableHead>Schema</TableHead>
          <TableHead>Data Created</TableHead>
          <TableHead>Mint NFT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data?.map((nft) => (
            <TableRow key={nft?.documentName}>
              <TableCell className="font-medium">
                <Link href={`${siteRoutes.borrow}/${name}`} className="w-full">
                  {nft?.documentName}
                </Link>
              </TableCell>
              <TableCell>{nft?.principal}</TableCell>
              <TableCell>{nft?.Maturity_Date}</TableCell>
              <TableCell>
                {nft.minted ? (
                  <a className="text-primary" href="">
                    Minted
                  </a>
                ) : (
                  <MintNFT data={nft} />
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
