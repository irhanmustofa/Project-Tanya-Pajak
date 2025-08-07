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
  tarifCitImport,
  tarifCitAll,
} from "../tarif-cit-components/TarifCitService";
import {
  useTarifCit,
  useTarifCitDispatch,
} from "../tarif-cit-components/TarifCitProvider";
import { dateToday } from "@/components/custom/DateFormatted";

export default function tarifCitImportForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState("");
  const [excelContent, setExcelContent] = useState([]);
  const [isPending, startTrasition] = useTransition();

  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const dialogDispatch = useDialogDispatch();
  const { periodeLaporanAction } = useTarifCit();
  const tarifCitDispatch = useTarifCitDispatch();

  const { content } = useExcelReader(file || undefined);

  const hanldeDownloadTemplate = () => {
    useExcelWriter(
      [
        ["SPT", "Periode", "Tarif PPh", "View SPT"],
        ["1", dateToday().getFullYear() + "-12-31", "3", "View SPT"],
        ["2", dateToday().getFullYear() + "-12-31", "3", "View SPT"],
        ["3", dateToday().getFullYear() + "-12-31", "1", "View SPT"],
      ],
      "TemplateImportTarifCit.xlsx"
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
          title: "Import Tarif Perhitungan CIT Laporan",
          message: "Import Tarif Perhitungan CIT Laporan Failed!",
          status: "error",
        },
      });
      return;
    }
    startTrasition(() => {
      const inputData = excelContent.map((item) => ({
        spt: item["spt"] || item["SPT"] || "",
        periode: item["periode"] || item["Periode"] || "",
        tarif_pph: item["tarif pph"] || item["Tarif PPh"] || "",
        view_spt_ts: item["view spt"] || item["View SPT"] || "",
      }));

      tarifCitImport(inputData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Tarif Perhitungan CIT Laporan",
              message: "Import Tarif Perhitungan CIT Laporan Successfully",
              status: "success",
            },
          });

          tarifCitAll().then((res) => {
            if (res.success) {
              tarifCitDispatch({
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
              title: "Import Perhitungan Tarif CIT Laporan",
              message:
                "Import Perhitungan Tarif CIT Laporan Failed!\n" +
                response.message,
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
          <DialogTitle>Import New Tarif Perhitungan CIT</DialogTitle>
          <DialogDescription>
            Add some Tarif Perhitungan CIT to the system.
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
