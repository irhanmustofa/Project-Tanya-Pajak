import { useEffect, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import CoaAction from "@/app/management/coa/master/coa-components/CoaAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { useCoa } from "./CoaProvider";

export default function useCoaTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);
  const { coaGroup } = useCoa();

  useEffect(() => {
    if (window.location.pathname === "/coa") {
      setFilterColumnTeamValue(
        coaGroup.map((item) => ({
          value: item._id,
          label: item.name,
        }))
      );
    }
  }, [coaGroup]);

  const coaColumn = useMemo(
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
        accessorKey: "nama_akun",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nama Akun" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">
            {row.getValue("nama_akun")}
          </div>
        ),
      },
      {
        accessorKey: "kode_akun",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Kode Akun" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] lowercase">{row.getValue("kode_akun")}</div>
        ),
      },
      {
        accessorKey: "nama_head",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nama Head" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">
            {row.getValue("nama_head")}
          </div>
        ),
      },
      {
        accessorKey: "kode_head",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Kode Head" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] lowercase">{row.getValue("kode_head")}</div>
        ),
      },
      {
        accessorKey: "jenis_asset",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Jenis Asset" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] lowercase">
            {row.getValue("jenis_asset")}
          </div>
        ),
      },
      {
        accessorKey: "nama_group",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Group" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">
            {row.getValue("nama_group")}
          </div>
        ),
      },
      {
        accessorKey: "kode_group",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Kode Group" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] lowercase">
            {row.getValue("kode_group")}
          </div>
        ),
      },
      {
        accessorKey: "klasifikasi_pajak",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Klasifikasi Pajak" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] lowercase">
            {row.getValue("klasifikasi_pajak")}
          </div>
        ),
      },
      {
        accessorKey: "pph",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="PPh" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] lowercase">{row.getValue("pph")}</div>
        ),
      },
      {
        accessorKey: "laba_kotor",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Laba Kotor" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] lowercase">
            {row.getValue("laba_kotor")}
          </div>
        ),
      },
      {
        accessorKey: "ebt",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="EBT" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] lowercase">{row.getValue("ebt")}</div>
        ),
      },
      {
        accessorKey: "arus_bank",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Arus Bank" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] lowercase">{row.getValue("arus_bank")}</div>
        ),
      },
      {
        accessorKey: "cf",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="CF" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] lowercase">{row.getValue("cf")}</div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <CoaAction row={row} />,
      },
    ],
    [coaGroup]
  );

  const filterFields = useMemo(() => {
    return {
      filterDate: {},
      filterColumn: {},
    };
  }, [filterColumnTeamValue]);

  return { coaColumn, filterFields };
}
