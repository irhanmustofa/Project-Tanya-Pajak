import { useEffect, useState } from "react";
import { PieChart, Pie, Label, Cell, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const divisionsMap = {
  0: "Tax",
  1: "Accounting",
  2: "Legal",
};

const colors = {
  active: "hsl(var(--chart-1))",
  nonActive: "hsl(var(--chart-2))",
};

const ServiceDashboard = ({ service = [] }) => {
  const [divisionData, setDivisionData] = useState({});

  useEffect(() => {
    const data = {
      Tax: { active: 0, nonActive: 0 },
      Accounting: { active: 0, nonActive: 0 },
      Legal: { active: 0, nonActive: 0 },
    };

    service.forEach((item) => {
      const divisionLabel = divisionsMap[item.division];
      if (!divisionLabel) return;

      if (item.status === 1) {
        data[divisionLabel].active++;
      } else {
        data[divisionLabel].nonActive++;
      }
    });

    setDivisionData(data);
  }, [service]);

  const renderChart = (label, stats) => {
    const chartData = [
      { name: "Aktif", value: stats.active, color: colors.active },
      { name: "Tidak Aktif", value: stats.nonActive, color: colors.nonActive },
    ];

    const total = chartData.reduce((sum, d) => sum + d.value, 0);

    return (
      <Card key={label} className="flex flex-col w-full md:w-1/3">
        <CardHeader className="items-center pb-0">
          <CardTitle>{label} Services</CardTitle>
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
                    if (!viewBox) return null;
                    const { cx, cy } = viewBox;
                    return (
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={cx}
                          y={cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={cx}
                          y={cy + 24}
                          className="fill-muted-foreground"
                        >
                          Services
                        </tspan>
                      </text>
                    );
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

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {Object.entries(divisionData).map(([label, stats]) =>
        renderChart(label, stats)
      )}
    </div>
  );
};

export default ServiceDashboard;
