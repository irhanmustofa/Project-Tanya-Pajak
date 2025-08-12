import { useEffect, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import DocumentAction from "@/app/company/documents/document-components/DocumentAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";

export default function useDocumentTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);

  const documentColumn = useMemo(
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
        accessorKey: "name",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("email")}</div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <DocumentAction row={row} />,
      },
    ],
    []
  );

  const filterFields = useMemo(() => {
    return {
      filterDate: {
        active: false,
        column: "date",
      },
    };
  }, [filterColumnTeamValue]);

  return { documentColumn, filterFields };
}
