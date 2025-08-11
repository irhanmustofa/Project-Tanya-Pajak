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
  LucideFileDown,
  LucideFilePen,
  LucideFileText,
  LucideFileSpreadsheet,
  LucideSettings,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useExcelWriter } from "@/hooks/use-excel-writer";
import { useClient } from "./ClientProvider";
import { useExportPDF } from "@/hooks/use-export-pdf";
import { clientType, clientStatus } from "@/helpers/variables";
import ClientAddForm from "@/app/management/clients/client-pages/ClientAddForm";

export default function ClientSubject() {
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

  const { clientState } = useClient();

  useEffect(() => {
    if (isExportExcel || isExportPdf) {
      if (clientState.data.length > 0) {
        const exportExcel = [];
        setDataExport({ head: [], body: [] });

        dataExport.head = [
          "Type",
          "Name",
          "PIC",
          "Address",
          "City",
          "Company",
          "Status",
          "Email",
          "Phone",
          "Refferal",
        ];

        exportExcel.push(dataExport.head);
        const data = clientState.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        data.map((item) =>
          dataExport.body.push([
            clientType.find((x) => x.code === item.type).name,
            item.name,
            item.pic,
            item.address,
            item.city,
            item.company,
            clientStatus.find((x) => x.code === item.status).name,
            item.email,
            item.phone,
            item.refferal,
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
    <div className="flex justify-between mb-2">
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
          <DropdownMenuItem onClick={() => setOpenImport(true)}>
            <LucideFileDown className="mr-2 h-4 w-4" />
            <span>Bulk Import</span>
          </DropdownMenuItem>
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
      {openAdd && <ClientAddForm onClose={() => setOpenAdd(false)} />}
      {showExportPdf && (
        <ExportPDF
          title="Data Clients"
          columns={dataExport.head}
          data={dataExport.body}
          config={{
            orientation: "landscape",
          }}
          onClose={() => {
            setDataExport({ head: [], body: [] });
            setShowExportPdf(false);
          }}
        />
      )}
    </div>
  );
}
