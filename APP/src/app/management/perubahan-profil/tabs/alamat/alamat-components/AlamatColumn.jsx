import { useEffect, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import AlamatAction from "@/app/management/perubahan-profil/tabs/alamat/alamat-components/AlamatAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { countryList } from "../../../data/country";
import { useClient } from "../../../perubahan-profil-components/PerubahanProfilProvider";

export default function useAlamatTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);
  const { clientState } = useClient();

  const alamatColumn = useMemo(
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
        accessorKey: "negara",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Negara" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("negara") ?? ""}</div>
        ),
      },
      {
        accessorKey: "alamat",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Alamat" />
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("alamat")}</div>
        ),
      },

      {
        accessorKey: "disewa",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Lokasi Disewa" />
        ),
        cell: ({ row }) => (
          <div className="uppercase">
            {row.getValue("disewa") === true ? "ya" : "no"}
          </div>
        ),
      },
      {
        accessorKey: "tanggal_mulai",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tanggal Mulai" />
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("tanggal_mulai")}</div>
        ),
      },
      {
        accessorKey: "tanggal_berakhir",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tanggal Berakhir" />
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("tanggal_berakhir")}</div>
        ),
      },
      {
        accessorKey: "kode_kpp",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="KPP" />
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("kode_kpp")}</div>
        ),
      },
      {
        accessorKey: "bagian_pengawasan",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Seksi Pengawasan" />
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("bagian_pengawasan")}</div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <AlamatAction row={row} />,
      },
    ],
    [clientState]
  );

  const filterFields = useMemo(() => {
    return {
      filterDate: {},
      filterColumn: {},
    };
  }, [filterColumnTeamValue]);

  return { alamatColumn, filterFields };
}
