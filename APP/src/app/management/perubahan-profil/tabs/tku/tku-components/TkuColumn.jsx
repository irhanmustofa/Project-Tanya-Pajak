import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import OrangTerkaitAction from "@/app/management/perubahan-profil/tabs/orang-terkait/orang-terkait-components/OrangTerkaitAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { useClient } from "../../../perubahan-profil-components/PerubahanProfilProvider";
import { dateShort } from "@/components/custom/DateFormatted";

export default function useTkuTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);
  const { clientState } = useClient();

  const tkuColumn = useMemo(
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
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <OrangTerkaitAction row={row} />,
      },

      {
        accessorKey: "identitas",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="NIK/NPWP Orang" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("identitas") ?? ""}</div>
        ),
      },
      {
        accessorKey: "tanggal_mulai",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tanggal Mulai" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {dateShort(row.getValue("tanggal_mulai")) ?? ""}
          </div>
        ),
      },
      {
        accessorKey: "tanggal_berakhir",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tanggal Berakhir" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {dateShort(row.getValue("tanggal_berakhir")) ?? ""}
          </div>
        ),
      },
    ],
    [clientState]
  );

  const filterFields = useMemo(() => {
    return {
      filterDate: {},
      filterColumn: {},
    };
  }, [filterColumnTeamValue]);

  return { tkuColumn, filterFields };
}
