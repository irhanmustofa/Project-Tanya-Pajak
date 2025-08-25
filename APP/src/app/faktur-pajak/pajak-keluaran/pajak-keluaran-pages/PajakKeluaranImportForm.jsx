import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import * as XLSX from "xlsx";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  pajakKeluaranAll,
  pajakKeluaranImport,
} from "../pajak-keluaran-components/PajakKeluaranService";
import {
  usePajakKeluaran,
  usePajakKeluaranDispatch,
} from "../pajak-keluaran-components/PajakKeluaranProvider";
import { downloadPajakKeluaranTemplate } from "../utils/pajakKeluaranTemplate";

export default function PajakKeluaranImportForm({ onClose }) {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();
  const { pajakKeluaranAction } = usePajakKeluaran();
  const pajakKeluaranDispatch = usePajakKeluaranDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const dialogDispatch = useDialogDispatch();

  const handleLoadFile = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    if (!file) return;
    setFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "array" });

      const pajakSheet = XLSX.utils.sheet_to_json(workbook.Sheets["Transaksi"]);
      const itemsSheet = XLSX.utils.sheet_to_json(workbook.Sheets["Items"]);

      if (!pajakSheet.length) {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Error",
            message: "Sheet PajakKeluaran kosong!",
            status: "error",
          },
        });
        return;
      }

      // 🔑 Gabungkan items berdasarkan nomor faktur
      const groupedData = pajakSheet.map((row) => {
        const nomorFaktur = row["No Faktur"];

        // cari semua items yg punya nomor faktur sama
        const fakturItems = itemsSheet.filter(
          (i) => i["No Faktur"] === nomorFaktur
        );

        return {
          tipe_transaksi: row["Tipe Transaksi"],
          nomor_faktur: nomorFaktur,
          kode_transaksi: row["Kode Transaksi"],
          tanggal_faktur: row["Tanggal Faktur"],
          jenis_faktur: row["Jenis Faktur"],
          referensi_faktur: row["Referensi Faktur"],
          alamat: row["Alamat"],
          id_tku: row["IDTKU"],
          lawan_transaksi: {
            nama: row["Nama Pembeli"],
            npwp: row["NPWP Pembeli"],
            alamat: row["Alamat Pembeli"],
            idtku: row["IDTKU Pembeli"],
            email: row["Email Pembeli"],
          },
          items: fakturItems.map((i) => ({
            tipe: i["Tipe"],
            nama: i["Nama"],
            qty: i["Qty"],
            harga_satuan: i["Harga Satuan"],
            total_harga: i["Total Harga"],
            ppn: i["PPN"],
          })),
        };
      });

      setData(groupedData);
    };

    reader.readAsArrayBuffer(file);
  };
  console.log("Parsed data:", data);

  const handleSubmit = () => {
    startTransition(() => {
      if (!data.length) {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Peringatan",
            message: "Tidak ada data yang ditemukan di file.",
            status: "warning",
          },
        });
        return;
      }

      pajakKeluaranImport(data).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Gagal",
              message: response.message || "Gagal mengimpor data.",
              status: "error",
            },
          });
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Berhasil",
              message: "Data Pajak Keluaran berhasil diimpor.",
              status: "success",
            },
          });
          pajakKeluaranAll().then((res) => {
            if (res.success) {
              pajakKeluaranDispatch({
                type: pajakKeluaranAction.SUCCESS,
                payload: res.data,
              });
            }
          });
        }
      });

      onClose();
    });
  };

  return (
    <>
      {dialogState.isOpen && <DialogInfo />}
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>Import Data Pajak Keluaran</DialogTitle>
          <DialogDescription>
            Upload file Excel sesuai template untuk mengimpor banyak data faktur
            pajak sekaligus.
            <Button variant="outline" onClick={downloadPajakKeluaranTemplate}>
              Download Template Excel
            </Button>
          </DialogDescription>

          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Excel File</Label>
              <Input
                type="file"
                className="col-span-3"
                accept=".xlsx"
                onChange={handleLoadFile}
              />
            </div>

            {data.length > 0 && (
              <pre className="bg-muted p-4 text-xs max-h-60 overflow-auto rounded">
                {JSON.stringify(data, null, 2)}
              </pre>
            )}

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="button" onClick={handleSubmit} pending={isPending}>
                Import
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
