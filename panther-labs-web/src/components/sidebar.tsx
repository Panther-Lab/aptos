import { useState, type HTMLAttributes, type ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "./icons";

type SidebarProps = HTMLAttributes<HTMLDivElement>;

export function Sidebar({ children, className }: SidebarProps) {
  return (
    <div className={cn("flex w-[200px] flex-col gap-y-5 p-4", className)}>
      {children}
    </div>
  );
}

type SidebarItemProps = {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  isActive?: boolean;
};

export function SidebarItem({
  children,
  href,
  icon,
  className,
  isActive,
}: SidebarItemProps) {
  return (
    <Link
      className={cn(
        "flex h-10 w-full items-center gap-3 rounded-md px-3 font-medium hover:bg-secondary hover:text-secondary-foreground ",
        isActive && "bg-accent",
        className,
      )}
      href={href}
    >
      {icon}
      {children}
    </Link>
  );
}

type SidebarSubMenueProps = {
  label: string;
  isActve?: boolean;
  children: ReactNode;
};

export function SidebarSubMenue({
  label,
  children,
  isActve = false,
}: SidebarSubMenueProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col gap-y-2">
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        role="button"
        className={cn(
          "flex items-center gap-2 text-base",
          isActve && "text-primary",
        )}
      >
        {isOpen ? (
          <Icons.down className="h-5 w-5" />
        ) : (
          <Icons.chevRight className="h-5 w-5" />
        )}
        {label}
      </div>
      {isOpen && children}
    </div>
  );
}
