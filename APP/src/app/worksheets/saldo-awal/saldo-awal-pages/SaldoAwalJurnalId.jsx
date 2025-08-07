import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState, useTransition } from "react";
import { useDialog } from "@/dialogs/DialogProvider";
import { saldoAwalGetJurnalById } from "../saldo-awal-components/SaldoAwalService";

export default function SaldoAwalJurnalId({ id, onClose }) {
  console.log("SaldoAwalJurnalId", id);
  const [isOpen, setIsOpen] = useState(true);
  const [jurnalData, setJurnalData] = useState(null);
  const { dialogState, DialogInfo } = useDialog();

  useEffect(() => {
    const fetchJurnalData = async () => {
      const response = await saldoAwalGetJurnalById(id);
      if (response.success) {
        setJurnalData(response.data);
      } else {
        console.error("Failed to fetch jurnal data:", response.message);
      }
    };

    fetchJurnalData();
  }, [id]);
  console.log("jurnalData", jurnalData);
  const handleOnClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div className="relative">
      {dialogState.isOpen && <DialogInfo />}
      <Dialog open={isOpen} onOpenChange={handleOnClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle>Jurnal Saldo Awal</DialogTitle>
          <DialogDescription>Jurnal</DialogDescription>
          {jurnalData && Array.isArray(jurnalData) && jurnalData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border px-2 py-1">Tanggal</th>
                    <th className="border px-2 py-1">Kode Akun</th>
                    <th className="border px-2 py-1">Debet</th>
                    <th className="border px-2 py-1">Kredit</th>
                    <th className="border px-2 py-1">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {jurnalData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="border px-2 py-1">
                        {row.tanggal
                          ? new Date(row.tanggal).toLocaleDateString("id-ID")
                          : ""}
                      </td>
                      <td className="border px-2 py-1">
                        {row.kode_akun || ""}
                      </td>
                      <td className="border px-2 py-1" align="right">
                        {row.debet ? row.debet.toLocaleString("id-ID") : 0}
                      </td>
                      <td className="border px-2 py-1" align="right">
                        {row.credit ? row.credit.toLocaleString("id-ID") : 0}
                      </td>
                      <td className="border px-2 py-1">
                        {row.keterangan || ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-4">
              Tidak ada data jurnal
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
