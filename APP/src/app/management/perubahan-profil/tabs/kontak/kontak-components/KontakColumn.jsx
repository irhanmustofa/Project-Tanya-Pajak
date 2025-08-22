import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import KontakAction from "@/app/management/perubahan-profil/tabs/kontak/kontak-components/KontakAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { useClient } from "../../../perubahan-profil-components/PerubahanProfilProvider";
import { dateShort } from "@/components/custom/DateFormatted";

export default function useKontakTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);
  const { clientState } = useClient();

  const kontakColumn = useMemo(
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
        accessorKey: "jenis_kontak",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Jenis Kontak" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("jenis_kontak") ?? ""}
          </div>
        ),
      },
      {
        accessorKey: "nomor_telepon",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nomor Telepon" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("nomor_telepon") ?? ""}
          </div>
        ),
      },
      {
        accessorKey: "nomor_handphone",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nomor Handphone" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("nomor_handphone") ?? ""}
          </div>
        ),
      },
      {
        accessorKey: "nomor_faksimile",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nomor Faksimile" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("nomor_faksimile") ?? ""}
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("email") ?? ""}</div>
        ),
      },
      {
        accessorKey: "website",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Website" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("website") ?? ""}</div>
        ),
      },
      {
        accessorKey: "keterangan",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Keterangan" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("keterangan") ?? ""}</div>
        ),
      },
      {
        accessorKey: "tanggal_mulai",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tanggal Mulai" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("tanggal_mulai")}</div>
        ),
      },
      {
        accessorKey: "tanggal_berakhir",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tanggal Berakhir" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("tanggal_berakhir")}</div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <KontakAction row={row} />,
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

  return { kontakColumn, filterFields };
}
