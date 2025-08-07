import { useEffect, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import GroupAction from "@/app/management/groups/group-components/GroupAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { useGroup } from "./GroupProvider";

export default function useGroupTableConfig() {
  const groupColumn = useMemo(
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
        accessorKey: "name",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">{row.getValue("name")}</div>
        ),
      },

      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <GroupAction row={row} />,
      },
    ],
    []
  );

  const filterFields = useMemo(() => {
    return {
      filterColumn: {
        name: {
          title: "Name",
        },
      },
    };
  }, []);

  return { groupColumn, filterFields };
}
