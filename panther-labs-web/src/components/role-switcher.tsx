"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoleStore } from "@/providers/role-provider";
import { usePathname, useRouter } from "next/navigation";
import { siteRoutes } from "@/config/site";

export function RoleSwitcher() {
  const pathname = usePathname();
  const { role, changeRole } = useRoleStore(({ role, ...state }) => {
    const isEarn = pathname.startsWith(siteRoutes.earn);
    const isBorrow = pathname.startsWith(siteRoutes.borrow);
    const iAdmin = pathname.startsWith(siteRoutes.underwriter);
    return {
      role: isEarn ? "invest" : isBorrow ? "borrow" : iAdmin ? "admin" : role,
      ...state,
    };
  });
  const router = useRouter();

  return (
    <Select
      defaultValue={role ?? "invest"}
      onValueChange={(value: "invest" | "borrow" | "admin") => {
        changeRole(value);
        if (value === "invest") {
          router.push(siteRoutes.earn);
        }

        if (value === "borrow") {
          router.push(siteRoutes.borrow);
        }
        if (value === "admin") {
          router.push(siteRoutes.underwriter);
        }
      }}
    >
      <SelectTrigger className="w-max gap-4">
        <SelectValue></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="invest">Earn</SelectItem>
        <SelectItem value="borrow">Borrow</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
      </SelectContent>
    </Select>
  );
}
