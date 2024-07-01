import { DashboardSubTitle } from "@/app/(dashboard)/componenets/dashboard-utils";

type PoolHighlightsProps = {
  description: string;
  headline: string;
};

export function PoolAnalytics(props: PoolHighlightsProps) {
  return (
    <section className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <DashboardSubTitle>Analysis</DashboardSubTitle>
        <p>{props.headline}</p>
      </div>
      <div className="flex max-w-2xl flex-col gap-y-4 rounded-md border px-6 py-4">
        <p className="leading-loose">{props.description} </p>
      </div>
    </section>
  );
}
