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

import { dataOrangTerkait } from "@/app/management/perubahan-profil/data/orangTerkaitDataList";
import OrangTerkaitAddForm from "@/app/management/perubahan-profil/tabs/orang-terkait/orang-terkait-pages/OrangTerkaitAddForm";
import { dateShort } from "@/components/custom/DateFormatted";

export default function KontakSubject() {
  const { ExportPDF } = useExportPDF();
  const [openAdd, setOpenAdd] = useState(false);
  const [isExportExcel, setIsExportExcel] = useState(false);
  const [isExportPdf, setIsExportPdf] = useState(false);
  const [showExportPdf, setShowExportPdf] = useState(false);
  const [dataExport, setDataExport] = useState({
    head: [],
    body: [],
  });

  const clientState = dataOrangTerkait();

  useEffect(() => {
    if (isExportExcel || isExportPdf) {
      if (clientState.length > 0) {
        const exportExcel = [];
        setDataExport({ head: [], body: [] });

        dataExport.head = [
          "NIK/NPWP",
          "Name Pengurus",
          "Kewarganegaraan",
          "Nomor Paspor",
          "Negara Asal",
          "NPWP Negara Asal",
          "Jenis Orang Terkait",
          "Sub Jenis Orang Terkait",
          "Jenis Wajib Pajak Terkait",
          "Keterangan",
          "Apakah Penanggung Jawab",
          "Tanggal Mulai",
          "Tanggal Berakhir",
        ];
        exportExcel.push(dataExport.head);

        clientState.map((item) =>
          dataExport.body.push([
            item.identitas,
            item.name,
            item.kewarganegaraan,
            item.nomor_paspor,
            item.negara_asal,
            "",
            item.jenis_orang_terkait,
            item.sub_jenis_orang_terkait,
            item.jenis_wp,
            item.keterangan,
            item.pic ? "Ya" : "Tidak",
            dateShort(item.tanggal_mulai),
            dateShort(item.tanggal_berakhir),
          ])
        );

        dataExport.body.map((item) => exportExcel.push(Object.values(item)));

        if (isExportExcel) {
          setIsExportExcel(false);
          useExcelWriter(exportExcel, "Detail Related Person Data.xlsx");
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
        Related Person <b>Management </b>
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideSettings className="h-4 w-4" />
            <span className="">Related Person Manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-light w-36">
            Related Person Manager
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
      {openAdd && <OrangTerkaitAddForm onClose={() => setOpenAdd(false)} />}
      {showExportPdf && (
        <ExportPDF
          title="Related Person Data"
          columns={dataExport.head}
          data={dataExport.body}
          onClose={() => setShowExportPdf(false)}
        />
      )}
    </div>
  );
}
