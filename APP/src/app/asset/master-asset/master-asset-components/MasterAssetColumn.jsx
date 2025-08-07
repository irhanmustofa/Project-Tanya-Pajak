import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import MasterAssetAction from "@/app/asset/master-asset/master-asset-components/MasterAssetAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { useMasterAsset } from "./MasterAssetProvider";

export default function useMasterAssetTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);
  const { jenisHartaState, coas } = useMasterAsset();
  const masterAssetColumn = useMemo(
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
        accessorKey: "buku",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Buku" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">{row.getValue("buku")}</div>
        ),
      },
      {
        accessorKey: "jenis_asset",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Jenis Asset" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">
            {row.getValue("jenis_asset")}
          </div>
        ),
      },
      {
        accessorKey: "kategori_asset",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Kategori Asset" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">
            {row.getValue("kategori_asset")}
          </div>
        ),
      },
      {
        accessorKey: "golongan_asset",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Golongan Asset" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">
            {row.getValue("golongan_asset")}
          </div>
        ),
      },
      {
        accessorKey: "code_harta",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="No Urut Jenis Harta" />
        ),
        cell: ({ row }) => {
          const harta = row.getValue("jenis_harta");
          const jenisHarta = jenisHartaState.find(
            (item) => item.name === harta
          );
          return (
            <div className="w-[150px] capitalize">
              {jenisHarta ? jenisHarta.code : "-"}
            </div>
          );
        },
      },
      {
        accessorKey: "jenis_harta",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Jenis Harta" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">
            {row.getValue("jenis_harta")}
          </div>
        ),
      },
      {
        accessorKey: "nomor_fa",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nomor FA" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">{row.getValue("nomor_fa")}</div>
        ),
      },
      {
        accessorKey: "nama_aktiva_tetap",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nama Aktiva Tetap" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">
            {row.getValue("nama_aktiva_tetap")}
          </div>
        ),
      },
      {
        accessorKey: "qty",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Qty" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">{row.getValue("qty")}</div>
        ),
      },
      {
        accessorKey: "satuan",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Satuan" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] capitalize">{row.getValue("satuan")}</div>
        ),
      },
      {
        accessorKey: "periode_manfaat_k",
        header: ({ column }) => (
          <DatatableColumnHeader
            column={column}
            title="Periode Manfaat (Komersial) "
          />
        ),
        cell: ({ row }) => {
          return (
            <div className="w-[150px] lowercase">
              {row.getValue("periode_manfaat_k")}
            </div>
          );
        },
        filterFn: (row, id, value) => {
          const date = new Date(row.getValue(id));
          const formatted = date.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          });
          return value.includes(formatted);
        },
      },
      {
        accessorKey: "periode_manfaat_f",
        header: ({ column }) => (
          <DatatableColumnHeader
            column={column}
            title="Periode Manfaat (Komersial) "
          />
        ),
        cell: ({ row }) => {
          return (
            <div className="w-[150px] lowercase">
              {row.getValue("periode_manfaat_f")}
            </div>
          );
        },
        filterFn: (row, id, value) => {
          const date = new Date(row.getValue(id));
          const formatted = date.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          });
          return value.includes(formatted);
        },
      },
      {
        accessorKey: "metode_penyusutan",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Metode Penyusutan" />
        ),
        cell: ({ row }) => (
          <div className="w-[100px] lowercase">
            {row.getValue("metode_penyusutan")}
          </div>
        ),
      },
      {
        accessorKey: "voucher_asset_terjual",
        header: ({ column }) => (
          <DatatableColumnHeader
            column={column}
            title="Voucher Asset Terjual"
          />
        ),
        cell: ({ row }) => (
          <div className="w-[100px] lowercase">
            {row.getValue("voucher_asset_terjual")}
          </div>
        ),
      },
      {
        accessorKey: "kode_akun",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Akun" />
        ),
        cell: ({ row }) => {
          const code = row.getValue("kode_akun");
          const namaAkun = coas.find((item) => item.kode_akun === code);
          return (
            <div className="w-[150px] capitalize">
              {code}
              <span className="text-muted-foreground text-xs">
                <br />
                {namaAkun?.nama_akun.length > 25
                  ? namaAkun.nama_akun.slice(0, 20) + "..."
                  : ""}
              </span>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <MasterAssetAction row={row} />,
      },
    ],
    []
  );

  const filterFields = useMemo(() => {
    return {
      tanggal: {
        active: true,
        column: "tanggal",
        type: "date",
        placeholder: "Filter Tanggal",
      },
    };
  }, []);

  return { masterAssetColumn, filterFields };
}
