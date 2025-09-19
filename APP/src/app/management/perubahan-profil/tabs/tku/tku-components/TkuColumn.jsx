import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import TkuAction from "@/app/management/perubahan-profil/tabs/tku/tku-components/TkuAction";
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
        cell: ({ row }) => <TkuAction row={row} />,
      },

      {
        accessorKey: "nitku",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="NITKU" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("nitku") ?? ""}</div>
        ),
      },
      {
        accessorKey: "jenis_tku",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Jenis TKU" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("jenis_tku") ?? ""}</div>
        ),
      },
      {
        accessorKey: "nama_tku",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nama TKU" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("nama_tku") ?? ""}</div>
        ),
      },
      {
        accessorKey: "klu_tku",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="KLU TKU" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("klu_tku") ?? ""}</div>
        ),
      },
      {
        accessorKey: "alamat",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Alamat" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("alamat") ?? ""}</div>
        ),
      },
      {
        accessorKey: "lokasi_disewa",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Lokasi Disewa" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("lokasi_disewa") == 1 ? "YA" : "TIDAK"}
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
