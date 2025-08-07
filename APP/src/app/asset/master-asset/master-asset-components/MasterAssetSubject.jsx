import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

import {
  LucideFileUp,
  LucideFilePen,
  LucideFileText,
  LucideFileSpreadsheet,
  LucideSettings,
  LucideFileDown,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useExcelWriter } from "@/hooks/use-excel-writer";
import { useMasterAsset } from "./MasterAssetProvider";
import MasterAssetAddForm from "@/app/asset/master-asset/master-asset-pages/MasterAssetAddForm";
import { useExportPDF } from "@/hooks/use-export-pdf";
// import AktivaTetapImportForm from "../aktiva-tetap-pages/AktivaTetapImportForm";

export default function MasterAssetSubject() {
  const { ExportPDF } = useExportPDF();
  const [openAdd, setOpenAdd] = useState(false);
  const [isExportExcel, setIsExportExcel] = useState(false);
  const [isExportPdf, setIsExportPdf] = useState(false);
  const [showExportPdf, setShowExportPdf] = useState(false);
  const [dataExport, setDataExport] = useState({
    head: [],
    body: [],
  });
  const [openImport, setOpenImport] = useState(false);

  const { masterAssetState, jenisHartaState } = useMasterAsset();

  useEffect(() => {
    if (isExportExcel || isExportPdf) {
      if (masterAssetState.data.length > 0) {
        // Header
        const head = [
          "BUKU",
          "JENIS ASSET",
          "KATEGORI ASSET",
          "GOLONGAN ASSET",
          "NO URUT JENIS HARTA",
          "JENIS HARTA",
          "NOMOR FA",
          "NAMA AKTIVA TETAP",
          "QTY",
          "SATUAN",
          "NOMOR AKUN",
          "NAMA AKUN",
          "PERIODE MANFAAT (KOMERSIAL)",
          "MASA MANFAAT (KOMERSIAL)",
          "PERIODE MANFAAT (Fiskal)",
          "MASA MANFAAT (Fiskal)",
          "TANGGAL PEROLEHAN",
          "BULAN PEROLEHAN (F)",
          "BULAN PEROLEHAN +15",
          "TANGGAL (K)",
          "TAHUN PEROLEHAN (F)",
          "TANGGAL PEROLEHAN (F)",
          "PERHITUNGAN TANGGAL APABILA DIATAS TGL 15",
          "SAK2",
          "TANGGAL PEROLEHAN (SAK)",
          "HARGA PEROLEHAN",
          "METODE PENYUSUTAN",
          "TANGGAL PENJUALAN AKTIVA TETAP ",
          "TANGGAL PENYUSUTAN AKHIR TAHUN SEBELUMNYA",
          "MASA S/D TERJUAL",
          "AKUMULASI MANFAAT S/D TERJUAL",
          "MASA MANFAAT DIGUNAKAN",
          "MAKSIMAL DAYS",
          "TANGGAL AKHIR PENYUSUTAN",
          "VOUCHER ASET TERJUAL",
          "HARGA JUAL AKTIVA TETAP",
        ];

        // Body
        const body = masterAssetState.data.map((item, idx) => {
          // Pastikan jenisHartaState.data sudah array
          const jenisHartaArr = Array.isArray(jenisHartaState.data)
            ? jenisHartaState.data
            : [];
          const jenisHarta = jenisHartaArr.find(
            (jenis) => jenis.id === item.jenis_harta
          );
          const kodeJenisHarta = jenisHarta ? jenisHarta.kode_jenis_harta : "";
          const masaManfaatKomersialValue =
            Number(item.periode_manfaat_k) * 12 || "";
          console.log("masaManfaatKomersialValue", masaManfaatKomersialValue);
          return [
            item.buku,
            item.jenis_asset,
            item.kategori_asset,
            item.golongan_asset,
            kodeJenisHarta,
            item.jenis_harta,
            item.nomor_fa,
            item.nama_aktiva_tetap,
            item.qty,
            item.satuan,
            item.kode_akun,
            item.nama_akun,
            item.periode_manfaat_k,
            masaManfaatKomersialValue,
            item.periode_manfaat_f,
            item.masa_manfaat_fiskal,
            item.tanggal_perolehan,
            item.bulan_perolehan_fiskal,
            item.bulan_perolehan_plus15,
            item.tanggal_kapitalisasi,
            item.tahun_perolehan_fiskal,
            item.tanggal_perolehan_fiskal,
            item.perhitungan_tanggal_apabila_diatas_tgl15,
            item.sak2,
            item.tanggal_perolehan_sak2,
            item.harga_perolehan,
            item.metode_penyusutan,
            item.tanggal_penjualan_aktiva_tetap,
            item.tanggal_penyusutan_akhir_tahun_sebelumnya,
            item.masa_sd_terjual,
            item.akumulasi_manfaat_sd_terjual,
            item.masa_manfaat_digunakan,
            item.maksimal_days,
            item.tanggal_akhir_penyusutan,
            item.voucher_aset_terjual,
            item.harga_jual_aktiva_tetap,
          ];
        });

        const exportExcel = [head, ...body];

        setDataExport({ head, body });

        if (isExportExcel) {
          setIsExportExcel(false);
          useExcelWriter(exportExcel, "Data Master Asset.xlsx");
        } else if (isExportPdf) {
          setIsExportPdf(false);
          setShowExportPdf(true);
        }
      }
    }
  }, [isExportExcel, isExportPdf, masterAssetState.data, jenisHartaState.data]);

  return (
    <div className="flex justify-between mb-4">
      <h2 className="text-2xl font-semibold">
        Master Asset <b>Management </b>
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideSettings className="h-4 w-4" />
            <span className="">Master Asset Manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-light w-36">
            Master Asset Manager
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenAdd(true)}>
            <LucideFilePen className="mr-2 h-4 w-4" />
            <span>Add New</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenImport(true)}>
            <LucideFileDown className="mr-2 h-4 w-4" />
            <span>Import</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {masterAssetState.data.length > 0 && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <LucideFileUp className="mr-2 h-4 w-4" />
                Export Data
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setIsExportExcel(true)}>
                    <LucideFileSpreadsheet className="mr-2 h-4 w-4" />
                    <span>Excel</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {openAdd && <MasterAssetAddForm onClose={() => setOpenAdd(false)} />}
      {/* {openImport && (
        <AktivaTetapImportForm onClose={() => setOpenImport(false)} />
      )} */}
    </div>
  );
}
