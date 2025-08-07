import { useEffect, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import CoaHeadAction from "@/app/management/coa/head/coa-head-components/CoaHeadAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
// import { useCoaHead } from "./CoaHeadProvider";

export default function useCoaHeadTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);
  // const { coaHeadGroup } = useCoaHead();

  const coaHeadColumn = useMemo(
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
        accessorKey: "nama_head",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nama Head" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">
            {row.getValue("nama_head")}
          </div>
        ),
      },
      {
        accessorKey: "kode_head",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Kode Head" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] lowercase">{row.getValue("kode_head")}</div>
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
        cell: ({ row }) => <CoaHeadAction row={row} />,
      },
    ],
    []
  );

  const filterFields = useMemo(() => {
    return {
      filterDate: {},
      filterColumn: {},
    };
  }, [filterColumnTeamValue]);

  return { coaHeadColumn, filterFields };
}
