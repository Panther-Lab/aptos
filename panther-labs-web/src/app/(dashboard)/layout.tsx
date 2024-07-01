import { type ReactNode } from "react";
import { DashboardSidebar } from "@/app/(dashboard)/componenets/dashboard-sidebar";
import { DashboardNavbar } from "@/app/(dashboard)/componenets/dashboard-nav";
import { RoleStoreProvider } from "@/providers/role-provider";


export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col overflow-hidden border">
      <RoleStoreProvider>
        <div className="relative flex h-screen w-full">
          <DashboardSidebar />
          <div className=" flex w-full flex-col gap-y-4 p-4">
            <DashboardNavbar />
            <div className="w-full overflow-y-scroll px-4">{children}</div>
          </div>
        </div>
      </RoleStoreProvider>
    </div>
  );
}

export default DashboardLayout;
