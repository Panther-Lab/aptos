import { Cell, Pie, PieChart } from "recharts";

import { TrancheColrs } from "@/lib/colors";

type TrancheDistributionChartProps = {
  data: {
    label: string;
    value: number;
  }[];
  height?: number;
  width?: number;
};

export function TrancheDistributionChart({
  data,
  height,
  width,
}: TrancheDistributionChartProps) {
  return (
    <PieChart width={width ?? 300} height={height ?? 200}>
      <Pie
        data={data}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        <Cell fill={TrancheColrs.senior} />
        <Cell fill={TrancheColrs.mezzanine} />
        <Cell fill={TrancheColrs.Junior} />
      </Pie>
    </PieChart>
  );
}
