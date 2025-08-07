import { useEffect, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import ClientAction from "@/app/management/clients/profile/client-components/ClientAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { statusType } from "@/helpers/variables";
import { useClient } from "./ClientProvider";

export default function useClientTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);

  const clientColumn = useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
      accessorKey: "company_name",
      header: ({ column }) => (
        <DatatableColumnHeader column={column} title="Company" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize">
          {row.getValue("company_name")}
        </div>
      ),
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: "address_company",
      header: ({ column }) => (
        <DatatableColumnHeader column={column} title="Address" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize">
          {row.getValue("address_company")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DatatableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <div>
          {
            statusType.find((item) => item.code === row.getValue("status"))
              ?.name
          }
        </div>
      ),
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <ClientAction row={row} />,
    },
  ]);

  const filterFields = useMemo(() => {
    const filterColumnStatusValue = statusType.map((item) => ({
      value: item.code,
      label: item.name,
    }));

    return {
      filterDate: {
        active: false,
        column: "date",
      },
      filterColumn: {
        status: {
          title: "Status",
          values: filterColumnStatusValue,
        },
      },
    };
  }, [filterColumnTeamValue]);

  return { clientColumn, filterFields };
}
