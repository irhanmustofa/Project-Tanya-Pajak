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
import { usePajakKeluaran } from "./PajakKeluaranProvider";
import { useExportPDF } from "@/hooks/use-export-pdf";
import { usePermissions } from "@/hooks/use-permissions";
import PajakKeluaranAddForm from "../pajak-keluaran-pages/PajakKeluaranAddForm";
import PajakKeluaranImportForm from "../pajak-keluaran-pages/PajakKeluaranImportForm";

export default function PajakKeluaranSubject() {
  const { checkPermission } = usePermissions();
  const { ExportPDF } = useExportPDF();
  const [openAdd, setOpenAdd] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [isExportExcel, setIsExportExcel] = useState(false);
  const [isExportPdf, setIsExportPdf] = useState(false);
  const [showExportPdf, setShowExportPdf] = useState(false);
  const [dataExport, setDataExport] = useState({
    head: [],
    body: [],
  });

  const { pajakKeluaranState } = usePajakKeluaran();

  useEffect(() => {
    if (isExportExcel || isExportPdf) {
      if (pajakKeluaranState.data.length > 0) {
        const exportExcel = [];
        setDataExport({ head: [], body: [] });

        dataExport.head = ["Name", "Email"];
        exportExcel.push(dataExport.head);

        pajakKeluaranState.data.map((item) =>
          dataExport.body.push([item.name, item.email])
        );

        dataExport.body.map((item) => exportExcel.push(Object.values(item)));

        if (isExportExcel) {
          setIsExportExcel(false);
          useExcelWriter(exportExcel, "Data Pajak Keluaran.xlsx");
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
        Pajak Keluaran <b>Management </b>
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideSettings className="h-4 w-4" />
            <span className="">Pajak Keluaran Manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-light w-36">
            Pajak Keluaran Manager
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {checkPermission("pajak-keluaran.create") && (
            <DropdownMenuItem onClick={() => setOpenAdd(true)}>
              <LucideFilePen className="mr-2 h-4 w-4" />
              <span>Add New</span>
            </DropdownMenuItem>
          )}
          {checkPermission("pajak-keluaran.import") && (
            <DropdownMenuItem onClick={() => setOpenImport(true)}>
              <LucideFilePen className="mr-2 h-4 w-4" />
              <span>Import</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {pajakKeluaranState.data.length > 0 && (
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
      {openAdd && <PajakKeluaranAddForm onClose={() => setOpenAdd(false)} />}
      {openImport && (
        <PajakKeluaranImportForm onClose={() => setOpenImport(false)} />
      )}
      {showExportPdf && (
        <ExportPDF
          title="Data Pajak Keluaran"
          columns={dataExport.head}
          data={dataExport.body}
          onClose={() => setShowExportPdf(false)}
        />
      )}
    </div>
  );
}
