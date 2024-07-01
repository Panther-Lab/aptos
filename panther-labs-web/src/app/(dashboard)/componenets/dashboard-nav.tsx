"use client"
import { AptosWalletButton } from "@/components/aptos-connect-wallet/aptos-wallet-button";
import { Breadcrumbs } from "@/components/breadcrumb";
import { RoleSwitcher } from "@/components/role-switcher";
import { Search } from "@/components/search";
import { WalletConnector } from "@aptos-labs/wallet-adapter-mui-design";



export function DashboardNavbar() {
  return (
    <header className="flex w-full justify-between border-b pb-4 ">
      <RoleSwitcher />
      <Search />
      {/* <WalletConnector /> */}
      
      <AptosWalletButton /> 
      
      
    </header>
  );
}
