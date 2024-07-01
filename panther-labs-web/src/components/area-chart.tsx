"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "FEB",
    uv: 100,
    amt: 200,
  },
  {
    name: "FEB",
    uv: 300,
    amt: 210,
  },
  {
    name: "FEB",
    uv: 400,
    amt: 290,
  },
  {
    name: "FEB",
    uv: 430,
    amt: 300,
  },
  {
    name: "FEB",
    uv: 500,
    amt: 400,
  },
  {
    name: "FEB",
    uv: 590,
    amt: 500,
  },
  {
    name: "FEB",
    uv: 690,
    amt: 600,
  },
];

export function CustomAreaChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart className="-mx-4" data={data}>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Average
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {payload[0].value}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Today
                        </span>
                        <span className="font-bold">{payload[1].value}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            }}
          />
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis tickLine={false} className="text-xs" dataKey="name" />
          <YAxis tickCount={12} tickLine={false} className="text-xs" />
          <Area
            type="monotone"
            dataKey="uv"
            stackId="1"
            stroke="#4F4FDF80"
            fill="#4F4FDF80"
          />

          <Area
            type="monotone"
            dataKey="amt"
            stackId="1"
            stroke="#3290ED"
            fill="#3290ED80"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
