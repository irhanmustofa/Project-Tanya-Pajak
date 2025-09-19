import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import NomorEksternalAction from "@/app/management/perubahan-profil/tabs/nomor-eksternal/nomor-eksternal-components/NomorEksternalAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";

export default function useNomorEksternalTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);

  const nomorEksternalColumn = useMemo(
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
        cell: ({ row }) => <NomorEksternalAction row={row} />,
      },
      {
        accessorKey: "tipe",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tipe" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("tipe") ?? ""}</div>
        ),
      },

      {
        accessorKey: "nomor_identifikasi",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nomor Identifikasi" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("nomor_identifikasi") ?? ""}
          </div>
        ),
      },

      {
        accessorKey: "tanggal_mulai",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tanggal Mulai" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("tanggal_mulai") ?? ""}
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
            {row.getValue("tanggal_berakhir") ?? ""}
          </div>
        ),
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

  return { nomorEksternalColumn, filterFields };
}
