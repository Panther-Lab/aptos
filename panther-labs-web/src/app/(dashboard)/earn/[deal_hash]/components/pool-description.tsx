"use client";

import Image from "next/image";

import { PoolDescriptionProps, PoolStatProps } from "@/types/pool.";

import {
  DashboardHeadline,
  DashboardTitle,
} from "@/app/(dashboard)/componenets/dashboard-utils";
import { useGetPools } from "@/hooks/useGetPools";
import { useParams } from "next/navigation";
import { useGetPoolByUid } from "@/hooks/aptos/useGetPoolbyuid";
import { useGetPoolsByHash } from "@/hooks/useGetPoolByhash";

export function PoolDescription(props: PoolDescriptionProps) {
  const { deal_hash } = useParams();
  const { pool } = useGetPoolByUid(deal_hash as string);
  // console.log("Pool::",pool);
  // const { deal_hash } = useParams();
  // const data = useGetPoolsByHash(deal_hash as string);
  console.log("Data::", pool)
  return (
    <section className="flex flex-col items-start gap-y-3 rounded-xl border p-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-14 w-14 shrink-0">
            <Image src={"/logo.svg"} alt="Pool Logo" fill className="" />
          </div>
          <DashboardTitle>{pool?.deal_name}</DashboardTitle>
        </div>
        <p className="rounded-md bg-secondary px-5 py-3 text-xs">
          FIXED APT <b className="font-bold">{pool?.principal}</b>
        </p>
      </div>
      <div className="flex flex-col">
        {/* Basic Description */}
        <DashboardHeadline className="font-medium">
          {props.headline}
        </DashboardHeadline>
        <div className="flex flex-col gap-y-4">
          <p className="max-w-md leading-relaxed">{pool?.credit_rating} Rated</p>
          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              className="flex h-10 items-center justify-center rounded-full border px-5 text-sm hover:bg-accent"
              href="#"
            >
              Website
            </a>
            <a
              className="flex h-10 items-center justify-center rounded-full border px-5 text-sm hover:bg-accent"
              href="#"
            >
              Linkedin
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
