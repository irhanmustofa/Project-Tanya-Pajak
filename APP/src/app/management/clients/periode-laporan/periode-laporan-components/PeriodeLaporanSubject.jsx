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
import { usePeriodeLaporan } from "./PeriodeLaporanProvider";
import PeriodeLaporanAddForm from "@/app/management/clients/periode-laporan/periode-laporan-pages/PeriodeLaporanAddForm";
import { useExportPDF } from "@/hooks/use-export-pdf";
import PeriodeLaporanImportForm from "@/app/management/clients/periode-laporan/periode-laporan-pages/PeriodeLaporanImportForm";
import { dateLong, dateShort } from "@/components/custom/DateFormatted";

export default function UserSubject() {
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

  const { periodeLaporanState } = usePeriodeLaporan();

  useEffect(() => {
    if (isExportExcel || isExportPdf) {
      if (periodeLaporanState.data.length > 0) {
        const exportExcel = [];
        setDataExport({ head: [], body: [] });

        dataExport.head = [
          "Tahun Buku",
          "Periode",
          "Periode Awal",
          "Periode Akhir",
          "Tanggal & Tempat(TTD SPT)",
        ];
        exportExcel.push(dataExport.head);

        periodeLaporanState.data.map((item) =>
          dataExport.body.push([
            item.tahun_buku,
            dateShort(new Date(item.periode_awal)) +
              " - " +
              dateShort(new Date(item.periode_akhir)),
            dateShort(new Date(item.periode_awal)),
            dateShort(new Date(item.periode_akhir)),
            item.tempat_ttd + ", " + dateLong(new Date(item.tanggal_ttd)),
          ])
        );

        dataExport.body.map((item) => exportExcel.push(Object.values(item)));

        if (isExportExcel) {
          setIsExportExcel(false);
          useExcelWriter(exportExcel, "Data Periode Laporan.xlsx");
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
        Periode Laporan <b>Management </b>
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideSettings className="h-4 w-4" />
            <span className="">Periode Laporan Manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-light w-36">
            Periode Laporan Manager
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenAdd(true)}>
            <LucideFilePen className="mr-2 h-4 w-4" />
            <span>Add New</span>
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => setOpenImport(true)}>
            <LucideFileDown className="mr-2 h-4 w-4" />
            <span>Import</span>
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          {periodeLaporanState.data.length > 0 && (
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
      {openAdd && <PeriodeLaporanAddForm onClose={() => setOpenAdd(false)} />}
      {openImport && (
        <PeriodeLaporanImportForm onClose={() => setOpenImport(false)} />
      )}
      {showExportPdf && (
        <ExportPDF
          title="Data Users"
          columns={dataExport.head}
          data={dataExport.body}
          onClose={() => setShowExportPdf(false)}
        />
      )}
    </div>
  );
}
