"use client";

import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";


const data01 = [
  { name: "Active Campagins", value: 90 },
  { name: "Inactive Campagins", value: 25 },
  { name: "ICPs with no campagins", value: 10 },
];

const COLORS = ["#9292FF", "#C0C0FF", "#5656F2", "#2B2BBB"];

type BulletProps = {
  backgroundColor: string;
  size: string;
};

const Bullet = ({ backgroundColor, size }: BulletProps) => {
  return (
    <div
      className="CirecleBullet"
      style={{
        backgroundColor,
        width: size,
        height: size,
      }}
    ></div>
  );
};

const CustomizedLegend = ({ payload }: { payload: any }) => {
  return (
    <ul className="flex flex-wrap gap-4">
      {payload.map((entry: any, index: number) => (
        <li className="flex gap-2.5" key={`item-${index}`}>
          <div className="flex items-center gap-2">
            <Bullet backgroundColor={entry.payload.fill} size="10px" />
            <div className="text-xs">{entry.value}</div>
          </div>
          <div>{entry.payload.value}</div>
        </li>
      ))}
    </ul>
  );
};

const CustomLabel = ({ viewBox, labelText, value }: any) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text
        x={cx}
        y={cy}
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fontSize="15"
      >
        {labelText}
      </text>
      <text
        x={cx}
        y={cy + 20}
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fill="#0088FE"
        fontSize="26"
        fontWeight="600"
      >
        {value}
      </text>
    </g>
  );
};

export function PICharts({data}: {data: any}) {
  const poolDistribution=data?.pool_distribution;
  console.log("Pool Distribution",poolDistribution);
  console.log("Data",data);
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart className="flex">
          <Pie
            className="h-20"
            data={data01}
            dataKey="value"
            innerRadius={80}
            outerRadius={100}
          >
            {data01.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <Label
              content={<CustomLabel labelText="ICPs" value={data?.no_of_pools} />}
              position="center"
            />
          </Pie>
          <Legend
            className="absolute top-0"
            content={({ payload }) => <CustomizedLegend payload={payload} />}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
