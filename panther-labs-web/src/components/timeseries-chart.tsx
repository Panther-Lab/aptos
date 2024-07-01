"use client";

import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, fromUnixTime, parseISO, subDays } from "date-fns";

type InvestHistory = {
  amount: string;
  timestamp: string;
};

type TimeseriesChartData = {
  value: number;
  date: string;
};
interface TimeseriesChartProps {
  data: InvestHistory[];
}

export default function TimeseriesChart({ data }: TimeseriesChartProps) {
  const chartData: TimeseriesChartData[] = data.map((item) => ({
    value: parseFloat(item.amount), // Convert amount to a number
    date: format(fromUnixTime(Number(item.timestamp)), "MMM d yyyy"), // Format date
  }));
  console.log("Chart Data",chartData);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4F4FDF80" stopOpacity={0.9} />
            <stop offset="20%" stopColor="#4F4FDF80" stopOpacity={0.7} />
          </linearGradient>
        </defs>

        <Area dataKey="value" stroke="#4F4FDF80" fill="url(#color)" />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            const date = parseISO(str);
            if (date.getDate()) {
              return format(date, "MMM, d");
            }
            return "";
          }}
        />

        <YAxis
          dataKey="value"
          axisLine={false}
          tickLine={false}
          tickCount={20}
          tickFormatter={() => ""}
          //   tickFormatter={(number) => `$${number.toFixed(2)}`}
        />

        <Tooltip
          content={({ active, payload, label }) => (
            <CustomTooltip label={label} payload={payload} active={active} />
          )}
        />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

type CustomTooltipProps = {
  active?: boolean;
  payload?: any;
  label?: string;
};

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  //console.log("Label",label);
  if (active && label) {
    return (
      <div className="tooltip">
        <h4>{label}</h4>
        <p>{payload[0].value.toFixed(2)} APT</p>
      </div>
    );
  }
  return null;
}
