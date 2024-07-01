import { DashboardSubTitle } from "@/app/(dashboard)/componenets/dashboard-utils";
import { Icons } from "@/components/icons";
import { StatCard, StatCardItem } from "@/components/stat-card";
import { Button } from "@/components/ui/button";

type PoolAnalyticsProps = {
  data: {
    label: string;
    data: string;
  }[];
};

export function PoolRiskAnalysis(props: PoolAnalyticsProps) {
  return (
    <section className="flex flex-col gap-y-6">
      <DashboardSubTitle>Risk Analysis</DashboardSubTitle>

      <section className="flex flex-col gap-4 rounded-md border px-7 py-6">
        <div className="grid grid-cols-3 gap-4">
          {props.data?.map(({ label, data }) => {
            return (
              <StatCard className="bg-secondary">
                <StatCardItem className="text-sm">{label}</StatCardItem>
                <StatCardItem className="text-2xl font-medium">
                  {data}
                </StatCardItem>
              </StatCard>
            );
          })}
        </div>
        <a href="">
          <Button className="w-full gap-3">
            See Report <Icons.external_link className="h-4 w-4" />
          </Button>
        </a>
      </section>
    </section>
  );
}
