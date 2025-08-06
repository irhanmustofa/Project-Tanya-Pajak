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
  jurnalBankImport,
  jurnalBankAll,
} from "../master-asset-components/MasterAssetService";
import {
  useJurnalBank,
  useJurnalBankDispatch,
} from "../master-asset-components/MasterAssetProvider";

export default function JurnalBankImportForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState("");
  const [excelContent, setExcelContent] = useState([]);
  const [isPending, startTransition] = useTransition();

  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const dialogDispatch = useDialogDispatch();
  const { jurnalBankAction } = useJurnalBank();
  const jurnalBankDispatch = useJurnalBankDispatch();

  const { content } = useExcelReader(file || undefined);

  const handleDownloadTemplate = () => {
    useExcelWriter(
      [
        [
          "NAMA BANK",
          "TANGGAL",
          "TAHUN",
          "MASA",
          "VOUCHER",
          "VENDOR",
          "KETERANGAN",
          "DEBET",
          "KREDIT",
          "AKUN DEFAULT",
          "NAMA AKUN-DR",
          "NAMA AKUN-CR",
          "KODE AKUN-DR",
          "KODE AKUN-CR",
          "BUKU",
          "TB",
        ],
        [
          "BCA 8060322121",
          "2025-01-20",
          "2025",
          "1",
          "BANK-2025-00018",
          "BANK GARANSI",
          "KR OTOMATIS 2001/AUTCR",
          "200513058",
          "0",
          "Default",
          "dr-akun",
          "cr-akun",
          "dr-kode",
          "cr-kode",
          "BUKU BANK",
          "TB",
        ],
        [
          "BRI 8060322121",
          "2025-01-20",
          "2025",
          "1",
          "BANK-2025-00018",
          "BANK GARANSI",
          "KR OTOMATIS 2001/AUTCR",
          "200513058",
          "0",
          "Default",
          "dr-akun",
          "cr-akun",
          "dr-kode",
          "cr-kode",
          "BUKU BANK",
          "TB",
        ],
      ],
      "Template_Import_Jurnal_Bank.xlsx"
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
          title: "Import Data Jurnal Bank",
          message: "Tidak ada data yang bisa diimpor.",
          status: "error",
        },
      });
      return;
    }
    startTransition(() => {
      const inputData = excelContent.map((item) => ({
        nama_bank: item["NAMA BANK"] || "",
        tanggal: item["TANGGAL"] || "",
        tahun: parseInt(item["TAHUN"]) || null,
        masa: parseInt(item["MASA"]) || null,
        voucher: item["VOUCHER"] || "",
        vendor: item["VENDOR"] || "",
        keterangan: item["KETERANGAN"] || "",
        debet: item["DEBET"] ? parseFloat(item["DEBET"]) : 0,
        kredit: item["KREDIT"] ? parseFloat(item["KREDIT"]) : 0,
        akun_default: item["AKUN DEFAULT"] || "",
        nama_akun_dr: item["NAMA AKUN-DR"] || "",
        nama_akun_cr: item["NAMA AKUN-CR"] || "",
        kode_akun_dr: item["KODE AKUN-DR"] || "",
        kode_akun_cr: item["KODE AKUN-CR"] || "",
        buku: item["BUKU"] || "",
        tb: item["TB"] || "",
      }));
      jurnalBankImport(inputData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Data Jurnal Bank",
              message: "Data berhasil diimpor.",
              status: "success",
            },
          });

          jurnalBankAll().then((res) => {
            jurnalBankDispatch({
              type: jurnalBankAction.SUCCESS,
              payload: res.data,
            });
          });
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Gagal",
              message: "Terjadi kesalahan saat import: " + response.message,
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogTitle>Import Jurnal Bank</DialogTitle>
          <DialogDescription>
            Upload file Excel berisi data jurnal bank.
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
                onClick={handleDownloadTemplate}
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
