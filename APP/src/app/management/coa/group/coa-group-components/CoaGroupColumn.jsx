import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import CoaGroupAction from "@/app/management/coa/group/coa-group-components/CoaGroupAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { useCoaGroup } from "./CoaGroupProvider";

export default function useCoaGroupTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);
  const { coaGroupState } = useCoaGroup();

  const coaGroupColumn = useMemo(
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
        accessorKey: "nama_group",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nama Group" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">
            {row.getValue("nama_group")}
          </div>
        ),
      },
      {
        accessorKey: "kode_group",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Kode Group" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] lowercase">
            {row.getValue("kode_group")}
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <CoaGroupAction row={row} />,
      },
    ],
    [coaGroupState]
  );

  const filterFields = useMemo(() => {
    return {
      filterDate: {},
      filterColumn: {},
    };
  }, [filterColumnTeamValue]);

  return { coaGroupColumn, filterFields };
}
