import { useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import ServiceAction from "@/app/management/service/service-components/ServiceAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { serviceDivision, serviceType, serviceUnit } from "@/helpers/variables";

export default function useServiceTableConfig() {
  const serviceColumn = useMemo(
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
        accessorKey: "division",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Division" />
        ),
        cell: ({ row }) => {
          const division = serviceDivision.find(
            (item) => item.code == row.getValue("division")
          );
          return <div className="capitalize">{division?.name || "-"}</div>;
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "type",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => {
          const type = serviceType.find(
            (item) => item.code == row.getValue("type")
          );
          return <div className="capitalize">{type?.name || "-"}</div>;
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "code",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Code" />
        ),
        cell: ({ row }) => <div>{row.getValue("code")}</div>,
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
        accessorKey: "max_price",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Max Price" />
        ),
        cell: ({ row }) => (
          <div>{row.getValue("max_price").toLocaleString("id-ID")}</div>
        ),
      },
      {
        accessorKey: "min_price",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Min Price" />
        ),
        cell: ({ row }) => (
          <div>{row.getValue("min_price").toLocaleString("id-ID")}</div>
        ),
      },
      {
        accessorKey: "unit",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Unit" />
        ),
        cell: ({ row }) => {
          const unit = serviceUnit.find(
            (item) => item.code == row.getValue("unit")
          );
          return <div className="capitalize">{unit?.name || "-"}</div>;
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ServiceAction row={row} />,
      },
    ],
    []
  );

  const filterFields = useMemo(() => {
    const divisionValues = serviceDivision.map((item) => ({
      value: String(item.code),
      label: item.name,
    }));
    const typeValues = serviceType.map((item) => ({
      value: item.code,
      label: item.name,
    }));

    return {
      filterDate: {
        active: false,
        column: "date",
      },
      filterColumn: {
        division: {
          title: "Division",
          values: divisionValues,
        },
        type: {
          title: "Type",
          values: typeValues,
        },
      },
    };
  }, []);

  return { serviceColumn, filterFields };
}
