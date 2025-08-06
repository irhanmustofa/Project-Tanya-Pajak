import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

export default function ProjectProgress({
  projects = [],
  clients = [],
  groups = [],
}) {
  const [project, setProject] = useState([]);
  const [client, setClient] = useState([]);
  const [group, setGroup] = useState([]);
  const [chartData, setChartData] = useState([]);

  const chartConfig = {
    over_due: {
      label: "Over Due",
      color: "hsl(var(--chart-1))",
    },
    open: {
      label: "Open",
      color: "hsl(var(--chart-2))",
    },
  };

  useEffect(() => {
    if (groups.length > 0) {
      const formattedGroup = groups
        .filter((item) => item.id != 1)
        .map((item) => ({
          code: item.id,
          name: item.name,
        }));
      setGroup(formattedGroup);
    }

    if (projects.length > 0) {
      const formattedProjects = projects
        .filter((item) => item.close_date == null)
        .map((item) => ({
          client_id: item.client_id,
          status: new Date(item.due_date) < new Date() ? 2 : 0,
        }));
      setProject(formattedProjects);
    }

    if (clients.length > 0) {
      const formattedClients = clients.map((item) => ({
        client_id: item.id,
        group: item.team,
      }));
      setClient(formattedClients);
    }
  }, [projects, clients, groups]);

  useEffect(() => {
    if (projects.length === 0 || clients.length === 0 || groups.length === 0)
      return;

    const updatedChartData = group.map((g) => {
      const groupClients = client.filter((c) => c.group === g.code);
      const groupProjects = project.filter((p) =>
        groupClients.some((c) => c.client_id === p.client_id)
      );

      const open = groupProjects.filter((p) => p.status === 0).length;
      const over_due = groupProjects.filter((p) => p.status === 2).length;

      return {
        team: g.name,
        open,
        over_due,
      };
    });

    setChartData(updatedChartData);
  }, [project, client, group]);

  return (
    <Card className="flex-1 h-full">
      <CardHeader>
        <CardTitle>Project Progress Overview</CardTitle>
        <CardDescription>Project Progress: Open and Over Due</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="team"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="open"
              stackId="a"
              fill={chartConfig.open.color}
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="over_due"
              stackId="a"
              fill={chartConfig.over_due.color}
              radius={[0, 0, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
