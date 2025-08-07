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
import { bukuImport, bukuAll } from "../buku-components/BukuService";
import { useBuku, useBukuDispatch } from "../buku-components/BukuProvider";
import LoaderOverlay from "@/components/custom/loader-overlay";

export default function BukuImportForm({ onClose, buku }) {
  const [isOpen, setIsOpen] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState("");
  const [excelContent, setExcelContent] = useState([]);
  const [isPending, startTransition] = useTransition();

  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const dialogDispatch = useDialogDispatch();
  const { bukuAction, params } = useBuku();
  const bukuDispatch = useBukuDispatch();
  const [loading, setLoading] = useState(false);

  const { content } = useExcelReader(file || undefined);
  const title = `Import ${buku.name}`;
  const handleDownloadTemplate = () => {
    useExcelWriter(
      [
        [
          "NAMA",
          "TANGGAL",
          "VOUCHER",
          "VENDOR",
          "KETERANGAN",
          "AMOUNT",
          "KODE AKUN-DR",
          "KODE AKUN-CR",
        ],
        [
          "BCA 8060322121",
          "2025-01-20",
          "BANK-2025-00018",
          "BANK GARANSI",
          "KR OTOMATIS 2001/AUTCR",
          "200513058",
          "dr-kode",
          "cr-kode",
        ],
        [
          "BRI 8060322121",
          "2025-01-20",
          "BANK-2025-00018",
          "BANK GARANSI",
          "KR OTOMATIS 2001/AUTCR",
          "11111",
          "dr-kode",
          "cr-kode",
        ],
      ],
      "Template_Import_Jurnal_Umum.xlsx"
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
          title: "Import Data Jurnal",
          message: "Tidak ada data yang bisa diimpor.",
          status: "error",
        },
      });
      return;
    }

    startTransition(() => {
      setLoading(true);
      const inputData = excelContent.map((item) => {
        const tanggalValue = item["TANGGAL"] || "";
        const tahun = tanggalValue.split("-")[0];
        const masa = tanggalValue.split("-")[1];

        return {
          buku: buku.name,
          code: buku.code,
          nama: item["NAMA"] || "",
          slug: params.buku || "",
          tanggal: tanggalValue,
          tahun: tahun,
          masa: masa,
          voucher: item["VOUCHER"] || "",
          vendor: item["VENDOR"] || "",
          keterangan: item["KETERANGAN"] || "",
          amount: item["AMOUNT"] ? parseFloat(item["AMOUNT"]) : 0,
          kode_akun_debet: item["KODE AKUN-DR"] || "",
          kode_akun_kredit: item["KODE AKUN-CR"] || "",
        };
      });

      bukuImport(inputData).then((response) => {
        if (response.success) {
          setLoading(false);
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Data Jurnal",
              message: "Data berhasil diimpor.",
              status: "success",
            },
          });

          bukuAll(params).then((res) => {
            bukuDispatch({
              type: bukuAction.SUCCESS,
              payload: res.data,
            });
          });
          onClose();
        } else {
          setLoading(false);
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
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Upload file Excel berisi data jurnal.
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
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 mr-2 inline"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Importing...
                  </>
                ) : (
                  "Upload Data"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
