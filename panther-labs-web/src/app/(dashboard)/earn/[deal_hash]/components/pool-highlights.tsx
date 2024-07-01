import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { DashboardSubTitle } from "@/app/(dashboard)/componenets/dashboard-utils";

type PoolHighlightsProps = {
  title: string;
  description: string;
  link: {
    href: string;
    label: string;
  };
};

export function PoolHighlights(props: PoolHighlightsProps) {
  return (
    <section className="flex flex-col gap-y-4">
      <DashboardSubTitle>Highlights</DashboardSubTitle>
      <div className="flex max-w-2xl flex-col gap-y-4 rounded-md border px-6 py-4">
        <h3 className="text-xl font-semibold">{props.title}</h3>
        <p className="leading-loose">
          {props.description}{" "}
          <a
            href={props.link.href}
            className={cn(
              buttonVariants({
                variant: "link",
              }),
              "px-0 text-base",
            )}
          >
            {props.link.label}
          </a>
        </p>
      </div>
    </section>
  );
}
