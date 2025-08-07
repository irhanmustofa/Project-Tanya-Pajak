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
import { useClient } from "./ClientProvider";
import { useExportPDF } from "@/hooks/use-export-pdf";
import { statusType } from "@/helpers/variables";
import ClientImportForm from "../client-pages/ClientImportForm";
import ClientFormTabs from "../client-pages/client-add-form/ClientFormTabs";
import ClientImportData from "../client-pages/ClientImportData";

export default function ClientSubject() {
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
  const [importData, setImportData] = useState(false);

  const { clientState } = useClient();

  useEffect(() => {
    if (isExportExcel || isExportPdf) {
      if (clientState.data.length > 0) {
        const exportExcel = [];
        setDataExport({ head: [], body: [] });

        dataExport.head = ["Name", "Email", "Level", "Status"];
        exportExcel.push(dataExport.head);

        clientState.data.map((item) =>
          dataExport.body.push([
            item.name,
            item.email,
            statusType.find((x) => x.code === item.status).name,
          ])
        );

        dataExport.body.map((item) => exportExcel.push(Object.values(item)));

        if (isExportExcel) {
          setIsExportExcel(false);
          useExcelWriter(exportExcel, "Data Clients.xlsx");
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
        Clients <b>Management </b>
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideSettings className="h-4 w-4" />
            <span className="">Client Manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-light w-36">
            Client Manager
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
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <LucideFileUp className="mr-2 h-4 w-4" />
              Import
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setImportData(true)}>
                  <LucideFileText className="mr-2 h-4 w-4" />
                  <span>Import Data</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenImport(true)}>
                  <LucideFileSpreadsheet className="mr-2 h-4 w-4" />
                  <span>Import Detail</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          {clientState.data.length > 0 && (
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
      {openAdd && <ClientFormTabs onClose={() => setOpenAdd(false)} />}
      {openImport && <ClientImportForm onClose={() => setOpenImport(false)} />}
      {importData && <ClientImportData onClose={() => setImportData(false)} />}
      {showExportPdf && (
        <ExportPDF
          title="Data Clients"
          columns={dataExport.head}
          data={dataExport.body}
          onClose={() => setShowExportPdf(false)}
        />
      )}
    </div>
  );
}
