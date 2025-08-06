import { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Label, Cell, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ClientDashboard = ({ client = [] }) => {
  const [individualStats, setIndividualStats] = useState({
    active: 0,
    nonActive: 0,
  });
  const [companyStats, setCompanyStats] = useState({
    active: 0,
    nonActive: 0,
  });

  useEffect(() => {
    let indActive = 0;
    let indNonActive = 0;
    let comActive = 0;
    let comNonActive = 0;

    client.forEach((item) => {
      if (item.type === 0) {
        item.status === 4 ? indActive++ : indNonActive++;
      } else if (item.type === 1) {
        item.status === 4 ? comActive++ : comNonActive++;
      }
    });

    setIndividualStats({ active: indActive, nonActive: indNonActive });
    setCompanyStats({ active: comActive, nonActive: comNonActive });
  }, [client]);

  const individualData = useMemo(
    () => [
      {
        name: "Aktif",
        value: individualStats.active,
        color: "hsl(var(--chart-1))",
      },
      {
        name: "Tidak Aktif",
        value: individualStats.nonActive,
        color: "hsl(var(--chart-2))",
      },
    ],
    [individualStats]
  );

  const companyData = useMemo(
    () => [
      {
        name: "Aktif",
        value: companyStats.active,
        color: "hsl(var(--chart-3))",
      },
      {
        name: "Tidak Aktif",
        value: companyStats.nonActive,
        color: "hsl(var(--chart-4))",
      },
    ],
    [companyStats]
  );

  const renderChart = (data, title) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);

    return (
      <Card className="flex flex-col w-full md:w-1/2 mb-2">
        <CardHeader className="items-center pb-0">
          <CardTitle>{title}</CardTitle>
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
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={70}
                paddingAngle={5}
              >
                {data.map((entry, index) => (
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
                          Clients
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
      {renderChart(individualData, "Individual Clients")}
      {renderChart(companyData, "Company Clients")}
    </div>
  );
};

export default ClientDashboard;
