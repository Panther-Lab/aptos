"use client";

import { Icons } from "@/components/icons";
import { SiteLogo } from "@/components/logo";
import { Sidebar, SidebarItem } from "@/components/sidebar";
import { siteRoutes } from "@/config/site";
import { useRoleStore } from "@/providers/role-provider";
import { Building2 } from "lucide-react";
import { usePathname } from "next/navigation";

export function DashboardSidebar() {
  const pathName = usePathname();
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
  const basePath =
    role === "admin"
      ? siteRoutes.underwriter
      : role === "invest"
        ? siteRoutes.earn
        : siteRoutes.borrow;

  return (
    <Sidebar className="sticky top-0 h-screen border-r border-r-[#E4E4E4]">
      <div className="flex flex-col">
        <SidebarItem
          isActive={pathName === basePath}
          icon={<Icons.deals />}
          href={basePath}
        >
          Deals
        </SidebarItem>
        <SidebarItem
          isActive={pathName.startsWith(`${basePath}/portfolio`)}
          icon={<Icons.portfolio />}
          href={`${basePath}/portfolio`}
        >
          Portfolio
        </SidebarItem>
        {role === "borrow" && (
          <SidebarItem
            isActive={pathName.startsWith(`${basePath}/assets`)}
            icon={<Building2 />}
            href={`${basePath}/tokenization`}
          >
            Assets
          </SidebarItem>
        )}
        <SidebarItem
          isActive={pathName.startsWith(`${basePath}/history`)}
          icon={<Icons.history />}
          href={`${basePath}/history`}
        >
          History
        </SidebarItem>
      </div>
    </Sidebar>
  );
}
