import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import {
  DashboardHeadline,
  DashboardTitle,
} from "@/app/(dashboard)/componenets/dashboard-utils";

import { PortfolioOverview } from "@/app/(dashboard)/earn/portfolio/components/overview";

function PortfolioPage() {
  return (
    <main>
      <div className="flex flex-col gap-y-4">
        <DashboardTitle>Admin Portfolio</DashboardTitle>
        {/* <DashboardHeadline>
          You ve earnt <span className="text-primary">1,000 APT</span> $1,001
          USD <b className="font-bold"> since you were last here</b>.
        </DashboardHeadline> */}
        <Separator />
      </div>
      <Tabs className="mt-6" defaultValue="overview">
        <TabsList className="bg-transparent p-0">
          <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
          <TabsTrigger value="activity">ACTIVITY</TabsTrigger>
          <TabsTrigger value="performance">PERFORMANCE</TabsTrigger>
          <TabsTrigger value="insight">INSIGHT</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="py-6">
          <PortfolioOverview />
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default PortfolioPage;
