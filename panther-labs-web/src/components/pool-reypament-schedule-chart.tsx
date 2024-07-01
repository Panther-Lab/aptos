import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { addMonths, format } from "date-fns"; // for date manipulation and formatting

interface PoolRepaymentScheduleChartProps {
  principal: number;
  poolTerm: number;
}

function generateChartData(principal: number, poolTerm: number) {
  const data = [];

  // Get the current month
  const now = new Date();

  // Calculate the monthly EMI (equal installment)
  const monthlyRepayment = principal / poolTerm;

  // Generate data for each month of the pool term
  for (let i = 0; i < poolTerm; i++) {
    // Determine the name of the month by adding 'i' months to the current date
    const monthName = format(addMonths(now, i), "MMM");

    data.push({
      name: monthName, // Use the month name for the x-axis
      total: Math.floor(monthlyRepayment), // Equal repayment every month
    });
  }

  return data;
}

export function PoolRepaymentScheduleChart({ principal, poolTerm }: PoolRepaymentScheduleChartProps) {
  const data = generateChartData(principal, poolTerm);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke={"#888888"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          content={({ active, payload }) => (
            <>
              {active && payload?.length && (
                <div className="rounded-sm bg-secondary p-3">
                  <p>Principal: {payload[0]?.value}</p>
                  <p>
                    Interest: {payload[1]?.value}{" "}
                    <span className="text-sm"></span>
                  </p>
                </div>
              )}
            </>
          )}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
