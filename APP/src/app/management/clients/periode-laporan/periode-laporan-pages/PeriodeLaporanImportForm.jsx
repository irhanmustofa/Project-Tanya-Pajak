import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useTransition } from "react";
import { useExcelReader } from "@/hooks/use-excel-reader";
import { useExcelWriter } from "@/hooks/use-excel-writer";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  periodeLaporanImport,
  periodeLaporanAll,
} from "../periode-laporan-components/PeriodeLaporanService";
import {
  usePeriodeLaporan,
  usePeriodeLaporanDispatch,
} from "../periode-laporan-components/PeriodeLaporanProvider";

export default function PeriodeLaporanImportForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState("");
  const [excelContent, setExcelContent] = useState([]);
  const [isPending, startTrasition] = useTransition();

  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const dialogDispatch = useDialogDispatch();
  const { periodeLaporanAction } = usePeriodeLaporan();
  const periodeLaporanDispatch = usePeriodeLaporanDispatch();

  const { content } = useExcelReader(file || undefined);

  const hanldeDownloadTemplate = () => {
    useExcelWriter(
      [
        [
          "Tahun Buku",
          "Periode Awal",
          "Periode Akhir",
          "Tempat TTD SPT",
          "Tanggal TTD SPT",
        ],
        ["2025", "2025-01-01", "2025-12-31", "Jakarta", "2025-12-31"],
        ["2024", "2024-01-01", "2024-12-31", "Cengkareng", "2024-12-31"],
        [
          "2023",
          "2023-01-01",
          "2023-12-31",
          "Pantai Indah Kapuk",
          "2023-12-31",
        ],
      ],
      "TemplateImportPeriodeLaporan.xlsx"
    );
  };

  useEffect(() => {
    if (file) {
      setDisabled(false);
      setExcelContent(content);
    } else {
      setDisabled(true);
    }
  }, [file, content]);

  const loadFile = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleImportData = (event) => {
    event.preventDefault();
    if (!excelContent || excelContent.length === 0) {
      dialogDispatch({
        type: dialogAction.DIALOG_INFO,
        payload: {
          isOpen: true,
          title: "Import Data Periode Laporan",
          message: "Import Data Periode Laporan Failed!",
          status: "error",
        },
      });
      return;
    }
    startTrasition(() => {
      const inputData = excelContent.map((item) => ({
        tahun_buku: item["tahun buku"] || item["Tahun Buku"] || "",
        periode_awal: item["periode awal"] || item["Periode Awal"] || "",
        periode_akhir: item["periode akhir"] || item["Periode Akhir"] || "",
        tempat_ttd: item["tempat TTD SPT"] || item["Tempat TTD SPT"] || "",
        tanggal_ttd: item["tanggal TTD SPT"] || item["Tanggal TTD SPT"] || "",
      }));

      periodeLaporanImport(inputData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Data Periode Laporan",
              message: "Import Data Periode Laporan Successfully",
              status: "success",
            },
          });

          periodeLaporanAll().then((res) => {
            if (res.success) {
              periodeLaporanDispatch({
                type: periodeLaporanAction.SUCCESS,
                payload: res.data,
              });
            }
          });
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Data Peiode Laporan",
              message:
                "Import Data Peiode Laporan Failed!\n" + response.message,
              status: "error",
            },
          });
        }
        handleOnClose();
      });
    });
  };

  const handleOnClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <>
      {dialogState.isOpen && <DialogInfo />}
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false), onClose();
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Import New Periode Laporan</DialogTitle>
          <DialogDescription>
            Add some Periode Laporan to the system.
          </DialogDescription>
          <form onSubmit={handleImportData}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Excel File</Label>
                <Input
                  type="file"
                  name="excel"
                  className="col-span-3 rounded-md border"
                  onChange={loadFile}
                />
              </div>
            </div>
            <div className="flex justify-between mt-10">
              <Button
                type="button"
                variant="outline"
                onClick={hanldeDownloadTemplate}
              >
                Template Excel
              </Button>
              <Button type="submit" pending={isPending}>
                Upload Data
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
