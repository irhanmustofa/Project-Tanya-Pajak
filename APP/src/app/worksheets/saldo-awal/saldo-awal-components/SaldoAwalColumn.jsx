import { useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { format } from "date-fns";
import SaldoAwalAction from "./SaldoAwalAction";
import { useSaldoAwal } from "./SaldoAwalProvider";

export default function useSaldoAwalTableConfig() {
  const { coas } = useSaldoAwal();
  console.log(coas);
  const saldoAwalColumn = useMemo(
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
        accessorKey: "tanggal",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tanggal" />
        ),
        cell: ({ row }) => (
          <div>{format(new Date(row.getValue("tanggal")), "dd-MM-yyyy")}</div>
        ),
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "vendor",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Vendor" />
        ),
        cell: ({ row }) => <div>{row.getValue("vendor")}</div>,
      },
      {
        accessorKey: "keterangan",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Deskripsi" />
        ),
        cell: ({ row }) => (
          <div>
            <div>{row.getValue("keterangan")}</div>
          </div>
        ),
      },
      {
        accessorKey: "akun_credit_1",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Akun Kredit" />
        ),
        cell: ({ row }) => {
          const code = row.getValue("akun_credit_1");
          const namaAkun = coas.find((item) => item.kode_akun === code);
          return (
            <div className="w-[150px] capitalize">
              {code}
              <span className="text-muted-foreground text-xs">
                <br />
                {namaAkun?.nama_akun.length > 25
                  ? namaAkun.nama_akun.slice(0, 20) + "..."
                  : ""}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "akun_debet_1",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Akun Debet" />
        ),
        cell: ({ row }) => {
          const code = row.getValue("akun_debet_1");
          const namaAkun = coas.find(
            (item) => String(item.kode_akun) === String(code)
          );
          return (
            <div className="w-[150px] capitalize">
              {code}
              <span className="text-muted-foreground text-xs">
                <br />
                {namaAkun
                  ? namaAkun.nama_akun.length > 25
                    ? namaAkun.nama_akun.slice(0, 20) + "..."
                    : namaAkun.nama_akun
                  : ""}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "valas",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Valas" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("valas")}</div>;
        },
      },
      {
        accessorKey: "kurs",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Kurs" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("kurs")}</div>;
        },
      },
      {
        accessorKey: "amount_1",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="IDR" />
        ),
        cell: ({ row }) => (
          <div>
            <div>{row.getValue("amount_1")}</div>
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <SaldoAwalAction row={row} />,
      },
    ],
    []
  );

  const filterFields = useMemo(() => {
    return {
      filterDate: {
        active: false,
        column: "tanggal",
      },
    };
  }, []);

  return { saldoAwalColumn, filterFields };
}
