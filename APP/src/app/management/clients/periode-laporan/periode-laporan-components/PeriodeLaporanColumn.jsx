import { useEffect, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { dateShort, dateLong } from "@/components/custom/DateFormatted";
import PeriodeLaporanAction from "@/app/management/clients/periode-laporan/periode-laporan-components/PeriodeLaporanAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { usePeriodeLaporan } from "./PeriodeLaporanProvider";

export default function usePeriodeLaporanTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);
  const { periodeLaporanGroup } = usePeriodeLaporan();

  const periodeLaporanColumn = useMemo(
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
        accessorKey: "tahun_buku",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tahun Buku" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">
            {row.getValue("tahun_buku")}
          </div>
        ),
      },
      {
        accessorKey: "periode",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Periode" />
        ),

        cell: ({ row }) => {
          const startDate = new Date(row.getValue("periode_awal"));
          const endDate = new Date(row.getValue("periode_akhir"));
          return (
            <div className="w-[150px] lowercase">
              {dateShort(startDate) + " S/D " + dateShort(endDate)}
            </div>
          );
        },
        filterFn: (row, id, value) => {
          const date = new Date(row.getValue(id));

          return value.includes(dateShort(date));
        },
      },
      {
        accessorKey: "periode_awal",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Periode Awal" />
        ),

        cell: ({ row }) => {
          const date = new Date(row.getValue("periode_awal"));
          return <div className="w-[150px] lowercase">{dateShort(date)}</div>;
        },
        filterFn: (row, id, value) => {
          const date = new Date(row.getValue(id));
          return value.includes(dateShort(date));
        },
      },
      {
        accessorKey: "periode_akhir",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Periode Akhir" />
        ),
        cell: ({ row }) => {
          const date = new Date(row.getValue("periode_akhir"));
          return <div className="w-[150px] lowercase">{dateShort(date)}</div>;
        },
        filterFn: (row, id, value) => {
          const date = new Date(row.getValue(id));
          return value.includes(dateShort(date));
        },
      },
      {
        accessorKey: "tanggal_ttd",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tempat & Tanggal TTD" />
        ),

        cell: ({ row }) => {
          return (
            <div className="w-[150px] lowercase">
              {row.original.tempat_ttd +
                ", " +
                dateLong(new Date(row.getValue("tanggal_ttd")))}
            </div>
          );
        },
        filterFn: (row, id, value) => {
          const date = new Date(row.getValue(id));

          return value.includes(dateShort(date));
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <PeriodeLaporanAction row={row} />,
      },
    ],
    [periodeLaporanGroup]
  );

  const filterFields = useMemo(() => {
    return {
      filterDate: {},
      filterColumn: {},
    };
  }, [filterColumnTeamValue]);

  return { periodeLaporanColumn, filterFields };
}
