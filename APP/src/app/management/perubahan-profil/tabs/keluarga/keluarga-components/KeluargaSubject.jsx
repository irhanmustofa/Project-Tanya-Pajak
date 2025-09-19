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

import KeluargaAddForm from "@/app/management/perubahan-profil/tabs/keluarga/keluarga-pages/KeluargaAddForm";
import { useClient } from "../../../perubahan-profil-components/PerubahanProfilProvider";
import keluargaDataStructure from "../../../data/keluargaDataList";

export default function KeluargaSubject() {
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
        if (clientState.data[0].data_keluarga.length > 0) {
          const data = keluargaDataStructure(clientState.data[0].data_keluarga);
          const exportExcel = [];
          setDataExport({ head: [], body: [] });

          dataExport.head = [
            "NIK",
            "Nama",
            "Jenis Kelamin",
            "Tempat Lahir",
            "Tanggal Lahir",
            "NO. Kartu Keluarga",
            "Status Keluarga",
            "Pekerjaan",
            "Status Unit Pajak",
            "Status PTKP",
            "Tanggal Mulai",
            "Tanggal Berakhir",
          ];

          data.map((item) => {
            dataExport.body.push([
              item.nik,
              item.nama,
              item.jenis_kelamin,
              item.tempat_lahir,
              item.tanggal_lahir,
              item.nomor_kk,
              item.status_keluarga,
              item.pekerjaan,
              item.status_unit_pajak,
              item.status_ptkp,
              item.tanggal_mulai,
              item.tanggal_berakhir,
            ]);
          });

          exportExcel.push(dataExport.head);

          dataExport.body.map((item) => exportExcel.push(Object.values(item)));

          if (isExportExcel) {
            setIsExportExcel(false);
            useExcelWriter(exportExcel, "Unit Keluarga Detail Data.xlsx");
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
        Keluarga Detail <b>Management </b>
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideSettings className="h-4 w-4" />
            <span className="">Keluarga Detail Manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-light w-36">
            Keluarga Detail Manager
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenAdd(true)}>
            <LucideFilePen className="mr-2 h-4 w-4" />
            <span>Add New</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {clientState?.data[0]?.data_keluarga.length > 0 && (
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
      {openAdd && <KeluargaAddForm onClose={() => setOpenAdd(false)} />}
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
