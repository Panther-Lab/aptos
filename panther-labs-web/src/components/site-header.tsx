import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteRoutes } from "@/config/site";

import { SiteLogo } from "@/components/logo";
import { MainNav } from "@/components/main-nav";
import { buttonVariants } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="container flex h-16 items-center justify-between border-b">
      <SiteLogo size="small" />
      <div className="hidden md:block">
        <MainNav />
      </div>
      <div className="hidden md:block">
        <Link
          className={cn(
            buttonVariants({
              variant: "default",
            }),
          )}
          href={siteRoutes.earn}
        >
          Open App
        </Link>
      </div>
    </header>
  );
}
