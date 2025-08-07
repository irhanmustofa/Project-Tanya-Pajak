import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import jurnalAction from "@/app/jurnals/jurnal/jurnal-components/jurnalAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import JurnalAction from "@/app/jurnals/jurnal/jurnal-components/jurnalAction";

export default function useJurnalTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);

  const jurnalColumn = useMemo(
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
        accessorKey: "buku_name",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Buku" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">
            {row.getValue("buku_name")}
          </div>
        ),
      },
      {
        accessorKey: "voucher",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Voucher" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">{row.getValue("voucher")}</div>
        ),
      },
      {
        accessorKey: "vendor",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Vendor" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">{row.getValue("vendor")}</div>
        ),
      },
      {
        accessorKey: "tanggal",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }) => {
          const date = new Date(row.getValue("tanggal"));
          const formatted = date.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          });
          return <div className="w-[150px] lowercase">{formatted}</div>;
        },
        filterFn: (row, id, value) => {
          const date = new Date(row.getValue(id));
          const formatted = date.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          });
          return value.includes(formatted);
        },
      },
      {
        accessorKey: "kode_akun_dr",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Kode Akun DR" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">
            {row.getValue("kode_akun_dr")}
          </div>
        ),
      },
      {
        accessorKey: "kode_akun_cr",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Kode Akun CR" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">
            {row.getValue("kode_akun_cr")}
          </div>
        ),
      },
      {
        accessorKey: "debet",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Debet" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">{row.getValue("debet")}</div>
        ),
      },
      {
        accessorKey: "kredit",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Credit" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">{row.getValue("kredit")}</div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <JurnalAction row={row} />,
      },
    ],
    []
  );

  const filterFields = useMemo(() => {
    return {
      tanggal: {
        active: true,
        column: "tanggal",
        type: "date",
        placeholder: "Filter Tanggal",
      },
    };
  }, []);

  return { jurnalColumn, filterFields };
}
