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
import { clientAll, clientImport } from "../client-components/ClientService";
import {
  useClient,
  useClientDispatch,
} from "../client-components/ClientProvider";

export default function ClientImportForm({ onClose }) {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();
  const { clientAction } = useClient();
  const clientDispatch = useClientDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const dialogDispatch = useDialogDispatch();

  const handleLoadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const informasi = XLSX.utils.sheet_to_json(workbook.Sheets["Informasi"]);
      const direktur = XLSX.utils.sheet_to_json(
        workbook.Sheets["DirekturPengurus"]
      );
      const periode = XLSX.utils.sheet_to_json(
        workbook.Sheets["PeriodeLaporan"]
      );
      const tarif = XLSX.utils.sheet_to_json(workbook.Sheets["TarifPPH"]);
      const legalitas = XLSX.utils.sheet_to_json(workbook.Sheets["Legalitas"]);

      const groupedData = informasi.map((info) => {
        const name = info.company_name;

        const companyDirektur = direktur.find((d) => d.company_name === name);
        const companyPeriode = periode.find((p) => p.company_name === name);
        const companyTarif = tarif.filter((t) => t.company_name === name);
        const companyLegalitas = legalitas.filter(
          (l) => l.company_name === name
        );

        return {
          company_name: info.company_name,
          address_company: info.address_company,
          no_npwp: info.no_npwp,
          no_pkp: info.no_pkp,
          director_name: companyDirektur?.director_name,
          no_ktp_director: companyDirektur?.no_ktp_director,
          address_director: companyDirektur?.address_director,
          rups_akhir_tahun: companyDirektur?.rups_akhir_tahun,
          pengurus: {
            name: companyDirektur?.pengurus_name,
            no_ktp: companyDirektur?.no_ktp,
            npwp: companyDirektur?.npwp,
            address: companyDirektur?.address,
            tempat_lahir: companyDirektur?.tempat_lahir,
            tanggal_lahir: companyDirektur?.tanggal_lahir,
            jabatan: companyDirektur?.jabatan,
            lembar_kepemilikan: companyDirektur?.lembar_kepemilikan,
            persen_kepemilikan: companyDirektur?.persen_kepemilikan,
          },
          periode_laporan: companyPeriode,
          tarif_pph: companyTarif,
          legalitas_perusahaan: groupLegalitas(companyLegalitas),
        };
      });

      setData(groupedData);
    };

    reader.readAsArrayBuffer(file);
  };

  const groupLegalitas = (rows) => {
    const grouped = [];
    let current = null;

    rows.forEach((row) => {
      if (row.jenis_akta || !current) {
        current = {
          jenis_akta: row.jenis_akta,
          nomor_akta: row.nomor_akta,
          tanggal: row.tanggal,
          nomor_sk: row.nomor_sk,
          nomor_nib: row.nomor_nib,
          alamat_perusahaan: row.alamat_perusahaan,
          total_saham: row.total_saham,
          harga_saham: row.harga_saham,
          jumlah_saham: row.jumlah_saham,
          link_akta: row.link_akta,
          pemegang_saham: [],
          pengurus: [],
        };
        grouped.push(current);
      }

      current.pemegang_saham.push({
        nama: row.pemegang_nama,
        jabatan: row.pemegang_jabatan,
        jumlah_saham: row.pemegang_jumlah_saham,
        persentase: row.pemegang_persen,
      });

      current.pengurus.push({
        nama: row.pengurus_nama,
        jabatan: row.pengurus_jabatan,
      });
    });

    return grouped;
  };

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

      clientImport(data).then((response) => {
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
              message: "Data perusahaan berhasil diimpor.",
              status: "success",
            },
          });
          clientAll().then((res) => {
            if (res.success) {
              clientDispatch({
                type: clientAction.SUCCESS,
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
          <DialogTitle>Import Data Perusahaan</DialogTitle>
          <DialogDescription>
            Upload file Excel sesuai template untuk mengimpor banyak data
            perusahaan sekaligus.
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
              <Button
                type="button"
                onClick={handleSubmit}
                pending={isPending}
                disabled={!data.length}
              >
                Import
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
