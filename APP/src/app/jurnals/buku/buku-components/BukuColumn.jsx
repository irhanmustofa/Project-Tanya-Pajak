import { useEffect, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import BukuAction from "@/app/jurnals/buku/buku-components/BukuAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";

export default function useBukuTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);

  const bukuColumn = useMemo(
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
        accessorKey: "nama",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nama" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">{row.getValue("nama")}</div>
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
        cell: ({ row }) => (
          <div className="capitalize">
            {new Date(row.getValue("tanggal")).toLocaleDateString("en-CA", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
        ),
        filterFn: (row, id, value) => {
          // Validasi input filter
          if (!Array.isArray(value) || value.length !== 2) {
            return true;
          }

          const [from, to] = value;

          if (!from || !to) {
            return true;
          }

          try {
            // Create new Date objects untuk menghindari mutasi
            const rowDate = new Date(row.getValue(id));
            const fromDate = new Date(from);
            const toDate = new Date(to);

            // Normalize ke UTC untuk menghindari timezone issues
            const normalizeToUTC = (date) => {
              return new Date(
                Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
              );
            };

            const normalizedRowDate = normalizeToUTC(rowDate);
            const normalizedFromDate = normalizeToUTC(fromDate);
            const normalizedToDate = normalizeToUTC(toDate);

            // Set explicit time boundaries tanpa mutasi original dates
            const startOfDay = new Date(normalizedFromDate.getTime());
            startOfDay.setUTCHours(0, 0, 0, 0);

            const endOfDay = new Date(normalizedToDate.getTime());
            endOfDay.setUTCHours(23, 59, 59, 999);

            return (
              normalizedRowDate >= startOfDay && normalizedRowDate <= endOfDay
            );
          } catch (error) {
            console.error("Date filter error:", error);
            return true;
          }
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
        accessorKey: "amount",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">{row.getValue("amount")}</div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <BukuAction row={row} />,
      },
    ],
    []
  );

  const filterFields = useMemo(() => {
    return {
      filterDate: {
        active: true,
        column: "tanggal",
      },
    };
  }, []);

  return {
    bukuColumn,
    filterFields,
  };
}
