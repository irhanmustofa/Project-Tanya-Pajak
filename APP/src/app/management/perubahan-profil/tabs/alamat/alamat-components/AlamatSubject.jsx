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

import AlamatAddForm from "@/app/management/perubahan-profil/tabs/alamat/alamat-pages/AlamatAddForm";
import { dataAlamat } from "../../../data/alamatDataList";
import { dateShort } from "@/components/custom/DateFormatted";

export default function AlamatSubject() {
  const { ExportPDF } = useExportPDF();
  const [openAdd, setOpenAdd] = useState(false);
  const [isExportExcel, setIsExportExcel] = useState(false);
  const [isExportPdf, setIsExportPdf] = useState(false);
  const [showExportPdf, setShowExportPdf] = useState(false);
  const [dataExport, setDataExport] = useState({
    head: [],
    body: [],
  });

  const clientState = dataAlamat();

  useEffect(() => {
    if (isExportExcel || isExportPdf) {
      if (clientState.length > 0) {
        const exportExcel = [];
        setDataExport({ head: [], body: [] });
        dataExport.head = [
          "Negara",
          "Alamat",
          "Disewa",
          "Tanggal Mulai",
          "Tanggal Berakhir",
          "Kode KPP",
          "Bagian Pengawasan",
        ];
        clientState.map((item) => {
          dataExport.body.push([
            item.negara,
            item.alamat,
            item.disewa == "true" ? "Ya" : "Tidak",
            dateShort(item.tanggal_mulai),
            dateShort(item.tanggal_berakhir),
            item.kode_kpp,
            item.bagian_pengawasan,
          ]);
        });

        exportExcel.push(dataExport.head);

        dataExport.body.map((item) => exportExcel.push(Object.values(item)));

        if (isExportExcel) {
          setIsExportExcel(false);
          useExcelWriter(exportExcel, "Detail Address Data.xlsx");
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
        Address <b>Management </b>
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideSettings className="h-4 w-4" />
            <span className="">Address Manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-light w-36">
            Address Manager
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
      {openAdd && <AlamatAddForm onClose={() => setOpenAdd(false)} />}
      {showExportPdf && (
        <ExportPDF
          title="Address Detail Data"
          columns={dataExport.head}
          data={dataExport.body}
          onClose={() => setShowExportPdf(false)}
        />
      )}
    </div>
  );
}
