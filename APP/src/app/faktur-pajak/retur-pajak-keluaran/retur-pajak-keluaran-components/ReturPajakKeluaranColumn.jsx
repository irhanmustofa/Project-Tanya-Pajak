import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { statusType } from "@/helpers/variables";
import ReturPajakKeluaranAction from "./ReturPajakKeluaranAction";

export default function useReturPajakKeluaranTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);

  const returPajakKeluaranColumn = useMemo(
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
        accessorKey: "npwp_penjual",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="NPWP Penjual" />
        ),
        cell: ({ row }) => (
          <div className="">{row.getValue("npwp_penjual")}</div>
        ),
      },
      {
        accessorKey: "nama_penjual",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nama Penjual" />
        ),
        cell: ({ row }) => (
          <div className="">{row.getValue("nama_penjual")}</div>
        ),
      },
      {
        accessorKey: "nomor_faktur_pajak",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nomor Faktur Pajak" />
        ),
        cell: ({ row }) => (
          <div className="">{row.getValue("nomor_faktur_pajak")}</div>
        ),
      },
      {
        accessorKey: "tanggal_faktur_pajak",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tanggal Faktur Pajak" />
        ),

        cell: ({ row }) => {
          return (
            <div className="w-[150px] lowercase">
              {new Date(
                row.getValue("tanggal_faktur_pajak")
              ).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>
          );
        },
        filterFn: (row, id, value) => {
          const date = new Date(row.getValue(id));

          return value.includes(dateShort(date));
        },
      },
      {
        accessorKey: "masa_pajak",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Masa Pajak" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("masa_pajak")}</div>,
      },
      {
        accessorKey: "tahun",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tahun" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("tahun")}</div>,
      },
      {
        accessorKey: "masa_pajak_pengkreditkan",
        header: ({ column }) => (
          <DatatableColumnHeader
            column={column}
            title="Masa Pajak Pengkreditkan"
          />
        ),
        cell: ({ row }) => (
          <div className="">{row.getValue("masa_pajak_pengkreditan")}</div>
        ),
      },
      {
        accessorKey: "tahun_pajak_pengkreditkan",
        header: ({ column }) => (
          <DatatableColumnHeader
            column={column}
            title="Tahun Pajak Pengkreditkan"
          />
        ),
        cell: ({ row }) => (
          <div className="">{row.getValue("tahun_pajak_pengkreditan")}</div>
        ),
      },
      {
        accessorKey: "status_faktur",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Status Faktur" />
        ),
        cell: ({ row }) => {
          const status = row.getValue("status_faktur");
          const statusItem = statusType.find((item) => item.code === status);

          // Enhanced styling berdasarkan status
          const getStatusStyle = (statusCode) => {
            switch (statusCode) {
              case 0:
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
              case 1:
                return "bg-green-100 text-green-800 border-green-200";
              case 2:
                return "bg-red-100 text-red-800 border-red-200";
              case 3:
                return "bg-blue-100 text-blue-800 border-blue-200";
              default:
                return "bg-gray-100 text-gray-800 border-gray-200";
            }
          };

          return (
            <div className="w-[100px]">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
                  status
                )}`}
              >
                {statusItem
                  ? statusItem.name
                  : status === 0
                  ? "Pending"
                  : "Unknown"}
              </span>
            </div>
          );
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        },
      },
      {
        accessorKey: "dpp_nilai_lain",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="DPP Nilai Lain" />
        ),
        cell: ({ row }) => (
          <div className="">{row.getValue("dpp_nilai_lain")}</div>
        ),
      },
      {
        accessorKey: "ppn",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="PPN" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("ppn")}</div>,
      },
      {
        accessorKey: "ppnbm",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="PPnBM" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("ppnbm")}</div>,
      },
      {
        accessorKey: "perekam",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Perekam" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("perekam")}</div>,
      },
      {
        accessorKey: "nomor_sp2dk",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nomor SP2DK" />
        ),
        cell: ({ row }) => (
          <div className="">{row.getValue("nomor_sp2dk")}</div>
        ),
      },
      {
        accessorKey: "valid",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Valid" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("valid")}</div>,
      },
      {
        accessorKey: "dilaporkan",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Dilaporkan" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("dilaporkan")}</div>,
      },
      {
        accessorKey: "dilaporkan_penjual",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Dilaporkan Penjual" />
        ),
        cell: ({ row }) => (
          <div className="">{row.getValue("dilaporkan_penjual")}</div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ReturPajakKeluaranAction row={row} />,
      },
    ],
    []
  );

  const filterFields = useMemo(() => {
    const filterColumnStatusValue = statusType.map((item) => ({
      value: item.code,
      label: item.name,
    }));
    return {
      filterDate: {
        active: false,
        column: "tanggal_faktur",
      },
      filterColumnTeam: {
        active: false,
        column: "team",
        value: filterColumnTeamValue,
        setValue: setFilterColumnTeamValue,
      },
      filterColumn: {
        status: {
          title: "Status",
          values: filterColumnStatusValue,
        },
      },
    };
  }, [filterColumnTeamValue]);

  return { returPajakKeluaranColumn, filterFields };
}
