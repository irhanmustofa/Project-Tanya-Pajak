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
} from "lucide-react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useExcelWriter } from "@/hooks/use-excel-writer";
import { useExportPDF } from "@/hooks/use-export-pdf";

import { dataTku } from "@/app/management/perubahan-profil/data/tkuDataList";
import TkuAddForm from "@/app/management/perubahan-profil/tabs/tku/tku-pages/TkuAddForm";
import { dateShort } from "@/components/custom/DateFormatted";

export default function TkuSubject() {
  const { ExportPDF } = useExportPDF();
  const [openAdd, setOpenAdd] = useState(false);
  const [isExportExcel, setIsExportExcel] = useState(false);
  const [isExportPdf, setIsExportPdf] = useState(false);
  const [showExportPdf, setShowExportPdf] = useState(false);
  const [dataExport, setDataExport] = useState({
    head: [],
    body: [],
  });

  const clientState = dataTku();

  useEffect(() => {
    if (isExportExcel || isExportPdf) {
      if (clientState.length > 0) {
        const exportExcel = [];
        setDataExport({ head: [], body: [] });

        dataExport.head = [
          "NITKU",
          "Jenis TKU",
          "Nama TKU",
          "DeskripsiTKU",
          "KLU TKU",
          "Deskripsi KLU TKU",
          "Alamat",
          "RT",
          "RW",
          "Provinsi",
          "Kabupaten",
          "Kecamatan",
          "Desa",
          "Kode KPP",
          "Kode Wilayah",
          "Kode Pos",
          "Data Geometrik",
          "Seksi Pengawasan",
          "Lokasi Disewa",
          "Tanggal Mulai",
          "Tanggal Berakhir",
          "Toko Retail",
          "Kawasan Bebas",
          "Kawasan Ekonomi Khusus",
          "Tempat Penimbunan Berikat",
          "Nomor Surat",
          "Tanggal Surat Keputusan Dari",
          "Tanggal Berakhirnya Surat Keputusan",
          "Kantor Virtual",
          "Alamat Utama PKP",
        ];
        exportExcel.push(dataExport.head);

        clientState.map((item) =>
          dataExport.body.push([
            item.nitku,
            item.jenis_tku,
            item.nama_tku,
            item.deskripsi_tku,
            item.klu_tku,
            item.deskripsi_klu_tku,
            item.alamat,
            item.rt,
            item.rw,
            item.provinsi,
            item.kabupaten,
            item.kecamatan,
            item.desa,
            item.kode_kpp,
            item.kode_wilayah,
            item.kode_pos,
            item.data_geometrik,
            item.seksi_pengawasan,
            item.lokasi_disewa,
            dateShort(item.tanggal_mulai),
            dateShort(item.tanggal_berakhir),
            item.toko_retail,
            item.kawasan_bebas,
            item.kawasan_ekonomi_khusus,
            item.tempat_penimbunan_berikat,
            item.nomor_surat,
            dateShort(item.date_valid_from),
            dateShort(item.date_valid_to),
            item.kantor_virtual,
            item.alamat_utama_pkp,
          ])
        );

        dataExport.body.map((item) => exportExcel.push(Object.values(item)));

        if (isExportExcel) {
          setIsExportExcel(false);
          useExcelWriter(exportExcel, "Detail TKU Data.xlsx");
        } else if (isExportPdf) {
          setDataExport(dataExport);
          setIsExportPdf(false);
          setShowExportPdf(true);
        }
      }
    }
  }, [isExportExcel, isExportPdf]);

  return (
    <div className="flex justify-between mb-4">
      <h2 className="text-2xl font-semibold">
        TKU <b>Management </b>
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideSettings className="h-4 w-4" />
            <span className="">TKU Manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-light w-36">
            TKU Manager
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenAdd(true)}>
            <LucideFilePen className="mr-2 h-4 w-4" />
            <span>Add New</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {clientState.length > 0 && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <LucideFileUp className="mr-2 h-4 w-4" />
                Export Data
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setIsExportPdf(true)}>
                    <LucideFileText className="mr-2 h-4 w-4" />
                    <span>P D F</span>
                  </DropdownMenuItem>
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
      {openAdd && <TkuAddForm onClose={() => setOpenAdd(false)} />}
      {showExportPdf && (
        <ExportPDF
          title="TKU Data"
          columns={dataExport.head}
          data={dataExport.body}
          onClose={() => setShowExportPdf(false)}
        />
      )}
    </div>
  );
}
