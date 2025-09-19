import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import BankAction from "@/app/management/perubahan-profil/tabs/bank/bank-components/BankAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";

export default function useBankTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);

  const bankColumn = useMemo(
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
        cell: ({ row }) => <BankAction row={row} />,
      },
      {
        accessorKey: "nama_bank",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nama Bank" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("nama_bank") ?? ""}</div>
        ),
      },
      {
        accessorKey: "nomor_rekening",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nomor Rekening" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("nomor_rekening") ?? ""}
          </div>
        ),
      },
      {
        accessorKey: "jenis_rekening",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Jenis Rekening" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("jenis_rekening") ?? ""}
          </div>
        ),
      },
      {
        accessorKey: "nama_pemilik_rekening",
        header: ({ column }) => (
          <DatatableColumnHeader
            column={column}
            title="Nama Pemilik Rekening"
          />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("nama_pemilik_rekening") ?? ""}
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

  return { bankColumn, filterFields };
}
