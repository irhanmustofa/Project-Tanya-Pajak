import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import CoaHeadAction from "@/app/management/coa/jenis-asset/jenis-asset-components/JenisAssetAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { useJenisAsset } from "./JenisAssetProvider";

export default function useJenisAssetTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);
  const { jenisAssetGroup } = useJenisAsset();

  const jenisAssetColumn = useMemo(
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
        accessorKey: "jenis_asset",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Jenis Asset" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">
            {row.getValue("jenis_asset")}
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <CoaHeadAction row={row} />,
      },
    ],
    [jenisAssetGroup]
  );

  const filterFields = useMemo(() => {
    return {
      filterDate: {},
      filterColumn: {},
    };
  }, [filterColumnTeamValue]);

  return { jenisAssetColumn, filterFields };
}
