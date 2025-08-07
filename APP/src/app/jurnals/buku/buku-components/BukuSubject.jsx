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

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useExcelWriter } from "@/hooks/use-excel-writer";
import { useBuku } from "./BukuProvider";
import BukuAddForm from "@/app/jurnals/buku/buku-pages/BukuAddForm";
import { useExportPDF } from "@/hooks/use-export-pdf";
import BukuImportForm from "../buku-pages/BukuImportForm";

export default function BukuSubject() {
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

  const { bukuState, params } = useBuku();
  const bukuName = params.buku || "";
  const tahun = params.tahun || "";
  const masa = params.masa || "";
  const [dataBuku, setDataBuku] = useState({});
  useEffect(() => {
    if (bukuName === "saldo-awal") {
      setDataBuku({ name: "Saldo Awal", code: "SA" });
    }
    if (bukuName === "buku-bank") {
      setDataBuku({ name: "Buku Bank", code: "BB" });
    }
    if (isExportExcel || isExportPdf) {
      if (bukuState.data.length > 0) {
        const exportExcel = [];
        setDataExport({ head: [], body: [] });

        dataExport.head = ["Name", "Email", "Level", "Status"];
        exportExcel.push(dataExport.head);

        bukuState.data.map((item) =>
          dataExport.body.push([item.name, item.email])
        );

        dataExport.body.map((item) => exportExcel.push(Object.values(item)));

        if (isExportExcel) {
          setIsExportExcel(false);
          useExcelWriter(exportExcel, "Data Buku.xlsx");
        } else if (isExportPdf) {
          setDataExport(dataExport);
          setIsExportPdf(false);
          setShowExportPdf(true);
        }
      }
    }
  }, [bukuName, isExportExcel, isExportPdf]);

  return (
    <div className="flex justify-between mb-4">
      <h2 className="text-2xl font-semibold">
        {dataBuku.name}
        {tahun && masa && (
          <span className="ml-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
            {tahun} - {masa}
          </span>
        )}
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideSettings className="h-4 w-4" />
            <span className="">Buku Manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-light w-36">
            Buku Manager
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
          {bukuState.data.length > 0 && (
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
      {openAdd && (
        <BukuAddForm onClose={() => setOpenAdd(false)} buku={dataBuku} />
      )}
      {openImport && (
        <BukuImportForm onClose={() => setOpenImport(false)} buku={dataBuku} />
      )}
      {showExportPdf && (
        <ExportPDF
          title="Data Bukus"
          columns={dataExport.head}
          data={dataExport.body}
          onClose={() => setShowExportPdf(false)}
        />
      )}
    </div>
  );
}
