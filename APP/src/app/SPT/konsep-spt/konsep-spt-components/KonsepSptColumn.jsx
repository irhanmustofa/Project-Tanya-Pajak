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
        accessorKey: "jenis_pajak",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Jenis Pajak" />
        ),
        cell: ({ row }) => (
          <div className=" ">{row.getValue("jenis_pajak")}</div>
        ),
      },
      {
        accessorKey: "jenis_surat_pemberitahuan",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nama Jenis Dokumen" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("jenis_surat_pemberitahuan")}
          </div>
        ),
      },
      {
        accessorKey: "masa_pajak",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Masa Pajak" />
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("masa_pajak")}</div>
        ),
      },
      {
        accessorKey: "nop",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="NOP" />
        ),

        cell: ({ row }) => {
          return <div className="lowercase">{row.getValue("nop")}</div>;
        },
      },
      {
        accessorKey: "nama_object_pajak",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nama Object Pajak" />
        ),

        cell: ({ row }) => {
          return (
            <div className="lowercase">{row.getValue("nama_object_pajak")}</div>
          );
        },
      },
      {
        accessorKey: "model_spt",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Model SPT" />
        ),

        cell: ({ row }) => {
          return (
            <div className="Capitalize">
              {row.getValue("model_spt") === 1 ? "Pembetulan" : "Normal"}
            </div>
          );
        },
      },
      {
        accessorKey: "tanggal_jatuh_tempo",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tanggal Jatuh Tempo" />
        ),

        cell: ({ row }) => {
          return (
            <div className="w-[150px] lowercase">
              {new Date(row.getValue("tanggal_jatuh_tempo")).toLocaleDateString(
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
        accessorKey: "status_spt",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.getValue("status_spt");
          const statusItem = statusType.find((item) => item.code === status);
          return (
            <div className="capitalize">
              {statusItem ? statusItem.name : status}
            </div>
          );
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
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
      filterColumn: {},
    };
  }, [filterColumnTeamValue]);

  return { konsepSptColumn, filterFields };
}
