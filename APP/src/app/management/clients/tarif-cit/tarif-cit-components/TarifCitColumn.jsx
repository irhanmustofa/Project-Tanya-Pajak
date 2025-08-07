import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { dateShort, dateLong } from "@/components/custom/DateFormatted";
import TarifCitAction from "@/app/management/clients/tarif-cit/tarif-cit-components/TarifCitAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { useTarifCit } from "./TarifCitProvider";
import { sptTarifCit, tarifPph } from "@/helpers/variables";

export default function useTarifCitTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);
  const { tarifCitGroup } = useTarifCit();

  const tarifCitColumn = useMemo(
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
        accessorKey: "spt",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="SPT" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px]">
            {sptTarifCit[row.getValue("spt") - 1]}
          </div>
        ),
      },
      {
        accessorKey: "periode",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Periode" />
        ),

        cell: ({ row }) => {
          return (
            <div className="w-[150px] lowercase">
              {dateShort(new Date(row.getValue("periode")))}
            </div>
          );
        },
        filterFn: (row, id, value) => {
          const date = new Date(row.getValue(id));

          return value.includes(dateShort(date));
        },
      },
      {
        accessorKey: "tarif_pph",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tarif PPh" />
        ),

        cell: ({ row }) => {
          return (
            <div className="w-[150px] ">
              {tarifPph[row.getValue("tarif_pph") - 1]}
            </div>
          );
        },
        filterFn: (row, id, value) => {
          const date = new Date(row.getValue(id));
          return value.includes(row.getValue("tarif_pph"));
        },
      },
      {
        accessorKey: "view_spt",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Periode Akhir" />
        ),
        cell: ({ row }) => {
          const documentLink = `http://localhost:5000/public/${row.getValue(
            "view_spt"
          )}`;

          if (row.getValue("view_spt")) {
            return (
              <div className="w-[150px] lowercase text-md border border-blue-400 text-center p-1 rounded-lg hover:text-blue-400 ">
                <a href={documentLink} target="_blank">
                  View SPT
                </a>
              </div>
            );
          } else {
            return <h1> No Document Uploaded</h1>;
          }
        },
        filterFn: (row, id, value) => {
          const date = new Date(row.getValue(id));
          return value.includes(row.getValue("view_spt"));
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <TarifCitAction row={row} />,
      },
    ],
    [tarifCitGroup]
  );

  const filterFields = useMemo(() => {
    return {
      filterDate: {},
      filterColumn: {},
    };
  }, [filterColumnTeamValue]);

  return { tarifCitColumn, filterFields };
}
