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

import BankAddForm from "@/app/management/perubahan-profil/tabs/bank/bank-pages/BankAddForm";
import { useClient } from "../../../perubahan-profil-components/PerubahanProfilProvider";
import bankDataStructure from "../../../data/bankDataList";

export default function BankSubject() {
  const { ExportPDF } = useExportPDF();
  const [openAdd, setOpenAdd] = useState(false);
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
      if (clientState.success) {
        if (clientState.data[0].data_bank.length > 0) {
          const data = bankDataStructure(clientState.data[0].data_bank);
          const exportExcel = [];
          setDataExport({ head: [], body: [] });

          dataExport.head = [
            "Nama Bank",
            "Nomor Rekening Bank",
            "Jenis Rekening Bank",
            "Nama Pemilik Rekening Bank",
            "Tanggal Mulai",
            "Tanggal Berakhir",
          ];

          data.map((item) => {
            dataExport.body.push([
              item.anam_bank,
              item.nomor_rekening,
              item.jenis_rekening,
              item.nama_pemilik_rekening,
              item.tanggal_mulai,
              item.tanggal_berakhir,
            ]);
          });

          exportExcel.push(dataExport.head);

          dataExport.body.map((item) => exportExcel.push(Object.values(item)));

          if (isExportExcel) {
            setIsExportExcel(false);
            useExcelWriter(exportExcel, "Bank Detail Data.xlsx");
          } else if (isExportPdf) {
            setDataExport(dataExport);
            setIsExportPdf(false);
            setShowExportPdf(true);
          }
        }
      }
    }
  }, [isExportExcel, isExportPdf]);

  return (
    <div className="flex justify-between mb-4">
      <h2 className="text-2xl font-semibold">
        Bank Detail <b>Management </b>
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideSettings className="h-4 w-4" />
            <span className="">Bank Detail Manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-light w-36">
            Bank Detail Manager
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenAdd(true)}>
            <LucideFilePen className="mr-2 h-4 w-4" />
            <span>Add New</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {clientState?.data.length > 0 && (
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
      {openAdd && <BankAddForm onClose={() => setOpenAdd(false)} />}
      {showExportPdf && (
        <ExportPDF
          title="Bank Detail Data"
          columns={dataExport.head}
          data={dataExport.body}
          onClose={() => setShowExportPdf(false)}
        />
      )}
    </div>
  );
}
