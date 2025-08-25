import { useEffect, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { statusType } from "@/helpers/variables";
import { base_url } from "@/api/http-endpoints";
import KonsepSptAction from "./KonsepSptAction";

export default function useKonsepSptTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);

  const konsepSptColumn = useMemo(
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
        accessorKey: "file",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="File" />
        ),
        cell: ({ row }) => (
          <div className=" ">
            <a
              href={`${base_url + row.getValue("file")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="dark:bg-gray-100 bg-gray-800 hover:bg-gray-200 dark:text-gray-800 text-gray-200 font-semibold py-1 px-2 rounded-md"
            >
              View
            </a>
          </div>
        ),
      },
      {
        accessorKey: "nama_jenis_dokumen",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nama Jenis Dokumen" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("nama_jenis_dokumen")}
          </div>
        ),
      },
      {
        accessorKey: "nomor_dokumen",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nomor Dokumen" />
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("nomor_dokumen")}</div>
        ),
      },
      {
        accessorKey: "tanggal_dokumen",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tanggal Dokumen" />
        ),

        cell: ({ row }) => {
          return (
            <div className="w-[150px] lowercase">
              {new Date(row.getValue("tanggal_dokumen")).toLocaleDateString(
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
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <KonsepSptAction row={row} />,
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
        column: "tanggal_dokumen",
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

  return { konsepSptColumn, filterFields };
}
