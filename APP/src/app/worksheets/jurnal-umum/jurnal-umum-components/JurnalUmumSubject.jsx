import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { useJurnalUmum } from "./JurnalUmumProvider";
import { useExportPDF } from "@/hooks/use-export-pdf";
import JurnalUmumAddForm from "../jurnal-umum-pages/JurnalUmumAddForm";
import JurnalUmumImportForm from "../jurnal-umum-pages/JurnalUmumImportForm";

export default function JurnalUmumSubject() {
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

  const { jurnalUmumState } = useJurnalUmum();

  useEffect(() => {
    if (isExportExcel || isExportPdf) {
      if (jurnalUmumState.data.length > 0) {
        const exportExcel = [];
        setDataExport({ head: [], body: [] });

        dataExport.head = [
          "Tanggal",
          "Voucher",
          "Vendor",
          "Keterangan",
          "Kurs",
          "Valas",
          "IDR",
          "Akun Debet",
          "Akun Kredit",
        ];

        exportExcel.push(dataExport.head);

        jurnalUmumState.data.map((item) =>
          dataExport.body.push([
            item.tanggal,
            item.voucher,
            item.vendor,
            item.keterangan,
            item.kurs,
            item.valas,
            item.amount_1,
            item.akun_debet_1,
            item.akun_kredit_1,
          ])
        );

        dataExport.body.map((item) => exportExcel.push(Object.values(item)));

        if (isExportExcel) {
          setIsExportExcel(false);
          useExcelWriter(exportExcel, "Data Jurnal Umum.xlsx");
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
      <h2 className="text-2xl font-semibold">Jurnal Umum</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideSettings className="h-4 w-4" />
            <span className="">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpenAdd(true)}>
            <LucideFilePen className="mr-2 h-4 w-4" />
            <span>Add New</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenImport(true)}>
            <LucideFileDown className="mr-2 h-4 w-4" />
            <span>Import Data</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {jurnalUmumState.data.length > 0 && (
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
      {openAdd && <JurnalUmumAddForm onClose={() => setOpenAdd(false)} />}
      {openImport && (
        <JurnalUmumImportForm onClose={() => setOpenImport(false)} />
      )}
      {showExportPdf && (
        <ExportPDF
          title="Data Jurnal Umum"
          columns={dataExport.head}
          data={dataExport.body}
          onClose={() => setShowExportPdf(false)}
        />
      )}
    </div>
  );
}
