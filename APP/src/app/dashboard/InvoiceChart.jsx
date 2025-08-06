import { PieChart, Pie, Label, Cell, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useEffect, useState } from "react";

const InvoiceChart = ({ invoices = [] }) => {
  const [chartData, setChartData] = useState([]);

  const rawData = [
    { name: "Outstanding", value: 0, color: "hsl(var(--chart-2))" },
    { name: "Over Due", value: 0, color: "hsl(var(--chart-1))" },
  ];

  useEffect(() => {
    if (invoices.length > 0) {
      rawData[0].value = 0;
      rawData[1].value = 0;
      rawData[0].value = 0;
      rawData[1].value = 0;

      invoices.forEach((item) => {
        if (item.status === 0) {
          const is_due = new Date(item.due_date) < new Date();
          if (!is_due) {
            rawData[0].value += 1;
          } else if (is_due) {
            rawData[1].value += 1;
          }
        }
      });
    }

    setChartData(rawData);
  }, [invoices]);

  const totalData = chartData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Invoices</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={70}
              paddingAngle={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalData.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Invoices
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default InvoiceChart;
