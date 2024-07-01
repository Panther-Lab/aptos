import { Icons } from "@/components/icons";
import { PoolDescriptionProps } from "@/types/pool.";

export const PoolDescriptionData: PoolDescriptionProps = {
  title: "Fazz",
  headline: "SME Loans in Southeast Asia",
  description:
    "Proceeds from this pool will be used by Fazz to provide short-duration loans to businesses in Indonesia and Singapore. Fazz is a Southeast Asian payment and SME lending provider whose book mainly consists of loans with tenors less than 90 days.",
  APY: "12.4%",
  poolStats: [
    {
      label: "Loan term",
      data: "24 Months",
      toolTip: "SOME TOOL TIP HERE",
    },
    {
      label: "Liquidity",
      data: "Quarterly",
      toolTip: "SOME TOOL TIP HERE",
    },
  ],
  links: [
    {
      label: "Website",
      href: "http://qiro.fi",
    },
    {
      label: "Linkedin",
      href: "https://qiro.fi",
    },
  ],
};

export const poolStatsData = [
  {
    label: "Total exposure",
    data: "140",
  },
  {
    label: "Interest",
    data: "12%",
  },
  {
    label: "Total",
    data: "100M",
  },
  {
    label: "Repayment Status",
    data: "PAID",
  },
];

export const poolReypaymentStructure = [
  {
    label: "Loan Term",
    data: "Yearly",
  },
  {
    label: "Start Date",
    data: "Jun 8, 2022",
  },
  {
    label: "Loan Maturity Date",
    data: "Nov 5, 2023",
  },
  {
    label: "Loan Maturity Date",
    data: "Nov 5, 2023",
  },
  {
    label: "Repayment Structure",
    data: "TBD",
  },
  {
    label: "Frequency",
    data: "Monthly",
  },
];
