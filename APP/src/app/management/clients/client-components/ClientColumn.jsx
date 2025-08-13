import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import ClientAction from "@/app/management/clients/client-components/ClientAction";
import { clientType, clientStatus } from "@/helpers/variables";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { useClient } from "./ClientProvider";

export default function useClientTableConfig() {
  const [filterGroup, setFilterGroup] = useState([]);
  const [filterCity, setFilterCity] = useState([]);
  const { clientState, clientGroup } = useClient();

  useEffect(() => {
    if (window.location.pathname === "/client") {
      if (clientState) {
        const uniqueCities = [];
        clientState.data.forEach((item) => {
          if (!uniqueCities.some((city) => city.value === item.city)) {
            uniqueCities.push({ value: item.city, label: item.city });
          }
        });
        setFilterCity(uniqueCities);
      }

      if (clientGroup) {
        const uniqueGroups = [];
        clientGroup.forEach((item) => {
          if (!uniqueGroups.some((group) => group.value === item.id)) {
            uniqueGroups.push({ value: item.id, label: item.name });
          }
        });
        setFilterGroup(uniqueGroups);
      }
    }
  }, []);

  const clientColumn = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-0.5"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-0.5"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "no",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="No" />
        ),
        cell: ({ row }) => <div>{row.index + 1}</div>,
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "company",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Company" />
        ),
        cell: ({ row }) => {
          return (
            <div className="capitalize">{row.getValue("company") || "-"}</div>
          );
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "type",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => {
          const type = clientType.find(
            (item) => item.code == row.getValue("type")
          );
          return <div className="capitalize">{type?.name || "-"}</div>;
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "city",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="City" />
        ),
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("city")}</div>
        ),
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "team",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Team" />
        ),
        cell: ({ row }) => {
          const group = filterGroup.find(
            (group) => group.value === row.getValue("team")
          );
          return group ? (
            <div className="flex items-center space-x-2">
              <span className="capitalize">{group.label}</span>
            </div>
          ) : null;
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "admin",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Admin" />
        ),
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("admin")}</div>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = clientStatus.find(
            (item) => item.code == row.getValue("status")
          );
          return <div className="capitalize">{status?.name || "-"}</div>;
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ClientAction row={row} />,
      },
    ],
    [filterGroup]
  );

  const filterFields = useMemo(() => {
    const typeValues = clientType.map((item) => ({
      value: item.code,
      label: item.name,
    }));
    const statusValues = clientStatus.map((item) => ({
      value: item.code,
      label: item.name,
    }));

    return {
      filterDate: {
        active: false,
        column: "date",
      },
      searchColumn: {
        placeholder: "Search by Client Name",
        value: "name",
      },
      filterColumn: {
        type: {
          title: "Type",
          values: typeValues,
        },
        status: {
          title: "Status",
          values: statusValues,
        },
        team: {
          title: "Team",
          values: filterGroup,
        },
        city: {
          title: "City",
          values: filterCity,
        },
      },
    };
  }, [filterGroup, filterCity]);

  return { clientColumn, filterFields };
}
