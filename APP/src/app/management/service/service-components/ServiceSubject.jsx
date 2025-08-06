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
  LucideUserRoundPlus,
  LucideFileText,
  LucideFileSpreadsheet,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useExcelWriter } from "@/hooks/use-excel-writer";
import { useService } from "./ServiceProvider";
import { useExportPDF } from "@/hooks/use-export-pdf";
import ServiceAddForm from "@/app/management/service/service-pages/ServiceAddForm";
import ServiceImportForm from "@/app/management/service/service-pages/ServiceImportForm";
import { serviceDivision, serviceUnit, statusType } from "@/helpers/variables";

export default function ServiceSubject() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [isExportExcel, setIsExportExcel] = useState(false);
  const [isExportPdf, setIsExportPdf] = useState(false);
  const [showExportPdf, setShowExportPdf] = useState(false);
  const { ExportPDF } = useExportPDF();
  const [dataExport, setDataExport] = useState({
    head: [],
    body: [],
  });

  const { serviceState } = useService();

  useEffect(() => {
    if (isExportExcel || isExportPdf) {
      if (serviceState.data.length > 0) {
        setDataExport({ head: [], body: [] });
        const exportExcel = [];

        dataExport.head = [
          "Division",
          "Code",
          "Name",
          "Price",
          "Unit",
          "Status",
        ];

        exportExcel.push(dataExport.head);

        const data = serviceState.data.sort((a, b) => a.division - b.division);

        data.map((item) =>
          dataExport.body.push([
            serviceDivision.find((x) => String(x.code) === item.division)
              ?.name || "",
            item.code,
            item.name,
            Number(item.max_price).toLocaleString("id-ID"),
            serviceUnit.find((x) => String(x.code) === item.unit)?.name || "",
            statusType.find((x) => x.code === item.status)?.name || "",
          ])
        );

        dataExport.body.map((item) => exportExcel.push(Object.values(item)));

        if (isExportExcel) {
          setIsExportExcel(false);
          useExcelWriter(exportExcel, "Data Services.xlsx");
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
        Services <b>Management </b>
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideUserRoundPlus className="h-4 w-4" />
            <span className="">Services Manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-light w-36">
            Service Manager
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
          {serviceState.data.length > 0 && (
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
      {openAdd && <ServiceAddForm onClose={() => setOpenAdd(false)} />}
      {openImport && <ServiceImportForm onClose={() => setOpenImport(false)} />}
      {showExportPdf && (
        <ExportPDF
          config={{ size: "A4", orientation: "landscape" }}
          title="Data Services"
          columns={dataExport.head}
          data={dataExport.body}
          onClose={() => setShowExportPdf(false)}
        />
      )}
    </div>
  );
}
