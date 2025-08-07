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
  useJurnalUmum,
  useJurnalUmumDispatch,
} from "../jurnal-umum-components/JurnalUmumProvider";
import {
  jurnalUmumGetBuku,
  jurnalUmumImport,
} from "../jurnal-umum-components/JurnalUmumService";

export default function JurnalUmumImportForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState("");
  const [excelContent, setExcelContent] = useState([]);
  const [isPending, startTrasition] = useTransition();

  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const dialogDispatch = useDialogDispatch();
  const { jurnalUmumAction } = useJurnalUmum();
  const jurnalUmumDispatch = useJurnalUmumDispatch();

  const { content } = useExcelReader(file || undefined);

  const hanldeDownloadTemplate = () => {
    useExcelWriter(
      [
        [
          "Tanggal",
          "Voucher",
          "Vendor",
          "Keterangan",
          "Currency",
          "Kurs",
          "Valas",
          "IDR",
          "Akun Debet",
          "Akun Kredit",
        ],
        [
          "2025-01-20",
          "BANK-2025-00018",
          "PT Bank Indonesia",
          "KR OTOMATIS 2001/AUTCR",
          "IDR",
          "1",
          "0",
          "10000000",
          "1001.10",
          "3000.10",
        ],
      ],
      "Template Import Jurnal Umum.xlsx"
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
          title: "Import Data",
          message: "Import Data Failed! No data to import.",
          status: "error",
        },
      });
      return;
    }

    startTrasition(() => {
      const inputData = excelContent.map((item) => ({
        tanggal: item["Tanggal"] || null,
        tahun: new Date(item["Tanggal"]).getFullYear(),
        masa: new Date(item["Tanggal"]).getMonth() + 1,
        voucher: item["Voucher"] || item["Voucher"] || null,
        vendor: item["Vendor"] || item["Vendor"] || null,
        keterangan: item["Keterangan"] || item["Keterangan"] || null,
        currency: item["Currency"] || item["Currency"] || null,
        kurs: item["Kurs"] || item["Kurs"] || null,
        valas: item["Valas"] || item["Valas"] || null,
        amount_1: item["IDR"] || item["IDR"] || null,
        akun_debet_1: item["Akun Debet"] || item["Akun Debet"] || null,
        akun_credit_1: item["Akun Kredit"] || item["Akun Kredit"] || null,
      }));

      jurnalUmumImport(inputData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Data",
              message: "Import Data Successfully",
              status: "success",
            },
          });

          jurnalUmumGetBuku().then((res) => {
            jurnalUmumDispatch({
              type: jurnalUmumAction.SUCCESS,
              payload: res.data,
            });
          });
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Data",
              message: "Import Data Failed!\n" + response.message,
              status: "error",
            },
          });
        }
      });
    });

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
          <DialogTitle>Import Jurnal Umum</DialogTitle>
          <DialogDescription>Add some data to the system.</DialogDescription>
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
              <Button type="submit" disabled={disabled} pending={isPending}>
                Upload Data
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
