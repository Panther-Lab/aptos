import Link from "next/link";

import { NavItem } from "@/types";

const navLinks: NavItem[] = [
  {
    label: "Investors",
    href: "",
  },
  {
    label: "Borrowers",
    href: "",
  },
  {
    label: "Blog",
    href: "",
  },
  {
    label: "Pages",
    href: "",
  },
  {
    label: "Contact",
    href: "",
  },
];

export function MainNav() {
  return (
    <nav className="flex items-center justify-center gap-5 text-sm">
      {navLinks.map(({ label, href }, index) => {
        return (
          <Link key={index} href={href}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
