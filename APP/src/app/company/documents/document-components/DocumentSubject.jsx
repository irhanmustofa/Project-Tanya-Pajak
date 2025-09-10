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
import { useDocument } from "./DocumentProvider";
import DocumentAddForm from "@/app/company/documents/document-pages/DocumentAddForm";
import { useExportPDF } from "@/hooks/use-export-pdf";
import { usePermissions } from "@/hooks/use-permissions";

export default function DocumentSubject() {
  const { checkPermission } = usePermissions();
  const { ExportPDF } = useExportPDF();
  const [openAdd, setOpenAdd] = useState(false);
  const [isExportExcel, setIsExportExcel] = useState(false);
  const [isExportPdf, setIsExportPdf] = useState(false);
  const [showExportPdf, setShowExportPdf] = useState(false);
  const [dataExport, setDataExport] = useState({
    head: [],
    body: [],
  });

  const { documentState } = useDocument();

  useEffect(() => {
    if (isExportExcel || isExportPdf) {
      if (documentState.data.length > 0) {
        const exportExcel = [];
        setDataExport({ head: [], body: [] });

        dataExport.head = ["Name", "Email"];
        exportExcel.push(dataExport.head);

        documentState.data.map((item) =>
          dataExport.body.push([item.name, item.email])
        );

        dataExport.body.map((item) => exportExcel.push(Object.values(item)));

        if (isExportExcel) {
          setIsExportExcel(false);
          useExcelWriter(exportExcel, "Data Documents.xlsx");
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
        Documents <b>Management </b>
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideSettings className="h-4 w-4" />
            <span className="">Document Manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-light w-36">
            Document Manager
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {checkPermission(["document.create"]) && (
            <DropdownMenuItem onClick={() => setOpenAdd(true)}>
              <LucideFilePen className="mr-2 h-4 w-4" />
              <span>Add New</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {documentState.data.length > 0 && (
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
      {openAdd && <DocumentAddForm onClose={() => setOpenAdd(false)} />}
      {showExportPdf && (
        <ExportPDF
          title="Data Documents"
          columns={dataExport.head}
          data={dataExport.body}
          onClose={() => setShowExportPdf(false)}
        />
      )}
    </div>
  );
}
