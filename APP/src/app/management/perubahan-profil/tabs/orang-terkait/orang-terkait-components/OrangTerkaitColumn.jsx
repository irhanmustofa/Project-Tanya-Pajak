import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import OrangTerkaitAction from "@/app/management/perubahan-profil/tabs/orang-terkait/orang-terkait-components/OrangTerkaitAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { useClient } from "../../../perubahan-profil-components/PerubahanProfilProvider";
import { dateShort } from "@/components/custom/DateFormatted";

export default function useOrangTerkaitTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);
  const { clientState } = useClient();

  const orangTerkaitColumn = useMemo(
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
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <OrangTerkaitAction row={row} />,
      },
      {
        accessorKey: "identitas",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="NIK/NPWP Orang" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("identitas") ?? ""}</div>
        ),
      },
      {
        accessorKey: "jenis_wajib_pajak",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Jenis Wajib Pajak" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{"tarikan ikut npwp"}</div>
        ),
      },
      {
        accessorKey: "kategori_wajib_pajak",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Kategori Wajib Pajak" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{"tarikan ikut npwp"}</div>
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nama Pengurus" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("name") ?? ""}</div>
        ),
      },
      {
        accessorKey: "kewarganegaraan",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Kewarganegaraan" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("kewarganegaraan") ?? ""}
          </div>
        ),
      },
      {
        accessorKey: "nomor_paspor",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nomor Paspor" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("nomor_paspor") ?? ""}
          </div>
        ),
      },
      {
        accessorKey: "negara_asal",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Negara Asal" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("negara_asal") ?? ""}</div>
        ),
      },
      {
        accessorKey: "identitas_negara_asal",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="NPWP Negara Asal" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("identitas") ?? ""}</div>
        ),
      },
      {
        accessorKey: "jenis_orang_terkait",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Jenis Orang Terkait" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("jenis_orang_terkait") ?? ""}
          </div>
        ),
      },
      {
        accessorKey: "sub_jenis_orang_terkait",
        header: ({ column }) => (
          <DatatableColumnHeader
            column={column}
            title="Sub Jenis Orang Terkait"
          />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("sub_jenis_orang_terkait") ?? ""}
          </div>
        ),
      },
      {
        accessorKey: "jenis_wp",
        header: ({ column }) => (
          <DatatableColumnHeader
            column={column}
            title="Jenis Wajib Pajak Terkait"
          />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("jenis_wp") ?? ""}</div>
        ),
      },
      {
        accessorKey: "keterangan",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Keterangan" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("keterangan") ?? ""}</div>
        ),
      },
      {
        accessorKey: "pic",
        header: ({ column }) => (
          <DatatableColumnHeader
            column={column}
            title="Apakah Penanggung Jawab"
          />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {row.getValue("pic") === 1 ? "Ya" : "Tidak"}
          </div>
        ),
      },
      {
        accessorKey: "tanggal_mulai",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tanggal Mulai" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {dateShort(row.getValue("tanggal_mulai")) ?? ""}
          </div>
        ),
      },
      {
        accessorKey: "tanggal_berakhir",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Tanggal Berakhir" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">
            {dateShort(row.getValue("tanggal_berakhir")) ?? ""}
          </div>
        ),
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

  return { orangTerkaitColumn, filterFields };
}
