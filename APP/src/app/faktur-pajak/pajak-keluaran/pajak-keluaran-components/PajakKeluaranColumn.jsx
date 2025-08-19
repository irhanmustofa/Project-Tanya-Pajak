import { useEffect, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import PajakKeluaranAction from "@/app/faktur-pajak/pajak-keluaran/pajak-keluaran-components/PajakKeluaranAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { statusType } from "@/helpers/variables";
import { base_url } from "@/api/http-endpoints";

export default function usePajakKeluaranTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);

  const pajakKeluaranColumn = useMemo(
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
        accessorKey: "nomor_faktur",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nomor Faktur" />
        ),
        cell: ({ row }) => (
          <div className="">{row.getValue("nomor_faktur")}</div>
        ),
      },
      {
        accessorKey: "tanggal_faktur",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tanggal Faktur" />
        ),

        cell: ({ row }) => {
          return (
            <div className="w-[150px] lowercase">
              {new Date(row.getValue("tanggal_faktur")).toLocaleDateString(
                "id-ID",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }
              )}
            </div>
          );
        },
        filterFn: (row, id, value) => {
          const date = new Date(row.getValue(id));

          return value.includes(dateShort(date));
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.getValue("status");
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
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <PajakKeluaranAction row={row} />,
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

  return { pajakKeluaranColumn, filterFields };
}
