"use client";

import { DashboardTitle } from "@/app/(dashboard)/componenets/dashboard-utils";
import { Breadcrumbs } from "@/components/breadcrumb";
import { TrancheDistributionChart } from "@/components/chart-tranche-distribution";
import { StatCard, StatCardItem } from "@/components/stat-card";
import { TrancehStructureContent } from "@/components/tranche-structure";
import { CovenantsTable } from "./components/convents";
import { AgingProfile } from "./components/aging-profile";
import { Collections } from "./components/collections";

const basicData = [
  {
    label: "Interest calculation period",
    data: "01/31/2023 - 02/28/2023",
  },
  {
    label: "Asset class",
    data: "Trade receivables",
  },
  {
    label: "USD/BRL used ",
    data: "5.24",
  },
  {
    label: "Public Key",
    data: "CDa4H...xQmRH",
  },
];

function Page() {
  return (
    <main className="flex flex-col gap-y-8">
      <div>
        <Breadcrumbs
          segments={[
            {
              href: "/",
              title: "home",
            },
            {
              href: "/borrower/fazz",
              title: "Fazz",
            },
            {
              href: "/borrower/fazz/report",
              title: "Fazz Risk Report",
            },
          ]}
        />
        <h1 className="text-[42px]">Monthly facility report</h1>
        <h2 className="text-4xl">Divi bank - Deal 1 (bis II)</h2>
        <p>Report date: 02/28/2023</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {basicData.map(({ label, data }) => {
          return (
            <StatCard key={label} className="border-none">
              <StatCardItem>{label}</StatCardItem>
              <StatCardItem className="font-semibold">{data}</StatCardItem>
            </StatCard>
          );
        })}
      </div>
      <div className="flex flex-col gap-y-6">
        <DashboardTitle>Facility terms</DashboardTitle>
        <div className="grid grid-cols-4 gap-4 rounded-xl border p-6">
          {basicData.map(({ label, data }) => {
            return (
              <StatCard key={label} className="border-none">
                <StatCardItem>{label}</StatCardItem>
                <StatCardItem className="font-semibold">{data}</StatCardItem>
              </StatCard>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <DashboardTitle>Tranche Structure</DashboardTitle>
        <div className="rounded-xl border p-6">
          <TrancehStructureContent
            trancheDistributionChart={
              <TrancheDistributionChart
                data={[
                  {
                    label: "senior",
                    value: 80,
                  },
                  {
                    label: "junior",
                    value: 20,
                  },
                ]}
              />
            }
            trancheData={[]}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <DashboardTitle>Covenants</DashboardTitle>
        <CovenantsTable />
      </div>

      <div className="flex flex-col gap-y-6">
        <DashboardTitle>Portfolio Summary</DashboardTitle>
        <div className="grid grid-cols-4 gap-4 rounded-xl border p-6">
          {basicData.map(({ label, data }) => {
            return (
              <StatCard key={label} className="border-none">
                <StatCardItem>{label}</StatCardItem>
                <StatCardItem className="font-semibold">{data}</StatCardItem>
              </StatCard>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <DashboardTitle>Delinquencies aging profile</DashboardTitle>
        <AgingProfile />
      </div>
      <div className="flex flex-col gap-6">
        <DashboardTitle>Collections</DashboardTitle>
        <Collections />
      </div>
      <div className="flex flex-col gap-6">
        <DashboardTitle>Local SPV fees & expenses</DashboardTitle>
        <Collections />
      </div>
      <div className="flex flex-col gap-6">
        <DashboardTitle>Distributions</DashboardTitle>
        <Collections />
      </div>
    </main>
  );
}

export default Page;
