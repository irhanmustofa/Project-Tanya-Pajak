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
  LucideFilePlus,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useExcelWriter } from "@/hooks/use-excel-writer";
import { useKonsepSpt } from "./KonsepSptProvider";
import { useExportPDF } from "@/hooks/use-export-pdf";
import { usePermissions } from "@/hooks/use-permissions";
import { useNavigate } from "react-router-dom";
import KonsepSptAddForm from "../konsep-spt-pages/KonsepSptAddForm";

export default function KonsepSptSubject() {
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
  const navigate = useNavigate();

  const { konsepSptState } = useKonsepSpt();

  useEffect(() => {
    if (isExportExcel || isExportPdf) {
      if (konsepSptState.data.length > 0) {
        const exportExcel = [];
        setDataExport({ head: [], body: [] });

        dataExport.head = ["Name", "Email"];
        exportExcel.push(dataExport.head);

        konsepSptState.data.map((item) =>
          dataExport.body.push([item.name, item.email])
        );

        dataExport.body.map((item) => exportExcel.push(Object.values(item)));

        if (isExportExcel) {
          setIsExportExcel(false);
          useExcelWriter(exportExcel, "Data Konsep SPT.xlsx");
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
      <h2 className="text-2xl font-semibold">Konsep SPT</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideSettings className="h-4 w-4" />
            <span className="">Konsep SPT Manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-light w-36">
            Konsep SPT Manager
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {checkPermission("konsep-spt.create") && (
            <DropdownMenuItem
              onClick={() => navigate("/konsep-/create-konsep-konsep-")}
            >
              <LucideFilePlus className="mr-2 h-4 w-4" />
              <span>Buat Konsep SPT</span>
            </DropdownMenuItem>
          )}
          {checkPermission("konsep-spt.create") && (
            <DropdownMenuItem onClick={() => setOpenAdd(true)}>
              <LucideFilePen className="mr-2 h-4 w-4" />
              <span>Add New</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {konsepSptState.data.length > 0 && (
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
        <KonsepSptAddForm
          openAdd={openAdd}
          setOpenAdd={setOpenAdd}
          title="Add Konsep SPT"
        />
      )}

      {showExportPdf && (
        <ExportPDF
          title="Data Konsep SPT"
          columns={dataExport.head}
          data={dataExport.body}
          onClose={() => setShowExportPdf(false)}
        />
      )}
    </div>
  );
}
