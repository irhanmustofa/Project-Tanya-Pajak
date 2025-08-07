import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  InputHorizontal,
  InputHorizontalDate,
} from "@/components/custom/input-custom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  useSaldoAwal,
  useSaldoAwalDispatch,
} from "../saldo-awal-components/SaldoAwalProvider";
import {
  saldoAwalCreate,
  saldoAwalGetBuku,
} from "../saldo-awal-components/SaldoAwalService";

export default function SaldoAwalAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [akunKredit, setAkunKredit] = useState("");
  const [searchAkunKredit, setSearchAkunKredit] = useState("");
  const [akunDebet, setAkunDebet] = useState("");
  const [searchAkunDebet, setSearchAkunDebet] = useState("");
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const saldoAwalDispatch = useSaldoAwalDispatch();
  const { saldoAwalAction, coas } = useSaldoAwal();

  const { valid, handleChange, errors, values } = useValidateInput({
    schema: {
      tanggal: "required",
      voucher: "required|min:3",
      vendor: "required|min:3",
      keterangan: "required|min:3",
      currency: "required",
      kurs: "required|numeric",
      valas: "required|numeric",
      amount_1: "required|numeric",
      akun_debet_1: "required",
      akun_credit_1: "required",
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const tanggalValue = event.target.tanggal.value;
      const selectedDate = new Date(tanggalValue);

      const tahun = selectedDate.getFullYear();
      const masa = selectedDate.getMonth() + 1;

      const formData = new FormData();
      formData.append("tanggal", tanggalValue);
      formData.append("tahun", tahun);
      formData.append("masa", masa);
      formData.append("voucher", event.target.voucher.value);
      formData.append("vendor", event.target.vendor.value);
      formData.append("keterangan", event.target.keterangan.value);
      formData.append("currency", event.target.currency.value);
      formData.append("kurs", event.target.kurs.value);
      formData.append("valas", event.target.valas.value);
      formData.append("amount_1", event.target.amount_1.value);
      formData.append("akun_debet_1", akunDebet);
      formData.append("akun_credit_1", akunKredit);

      await saldoAwalCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Tambah Saldo Awal",
              message: "Data berhasil ditambahkan",
              status: "success",
            },
          });

          saldoAwalGetBuku().then((res) => {
            if (res.success) {
              saldoAwalDispatch({
                type: saldoAwalAction.SUCCESS,
                payload: res.data,
              });
            }
          });

          handleOnClose();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Gagal Tambah Data",
              message: response.message,
              status: "error",
            },
          });
        }
      });
    });
  };

  const handleOnClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div className="relative">
      {dialogState.isOpen && <DialogInfo />}
      <Dialog open={isOpen} onOpenChange={handleOnClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle>Input Saldo Awal</DialogTitle>
          <DialogDescription>
            Tambah saldo awal secara manual.
          </DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <InputHorizontal
                title="Tanggal"
                type="date"
                name="tanggal"
                onChange={(e) => {
                  handleChange("tanggal", e.target.value);
                }}
                error={errors?.tanggal}
              />
              <InputHorizontal
                title="Voucher"
                name="voucher"
                onChange={(e) => handleChange("voucher", e.target.value)}
                error={errors.voucher}
              />
              <InputHorizontal
                title="Vendor"
                name="vendor"
                onChange={(e) => handleChange("vendor", e.target.value)}
                error={errors.vendor}
              />
              <InputHorizontal
                title="Keterangan"
                name="keterangan"
                onChange={(e) => handleChange("keterangan", e.target.value)}
                error={errors.keterangan}
              />
              <InputHorizontal
                title="Currency"
                name="currency"
                onChange={(e) => handleChange("currency", e.target.value)}
                error={errors.currency}
              />

              <InputHorizontal
                title="Kurs"
                type="number"
                name="kurs"
                onChange={(e) => handleChange("kurs", e.target.value)}
                error={errors.kurs}
              />
              <InputHorizontal
                title="Valas"
                type="number"
                name="valas"
                onChange={(e) => handleChange("valas", e.target.value)}
                error={errors.valas}
              />
              <InputHorizontal
                title="IDR"
                type="number"
                name="amount_1"
                onChange={(e) => handleChange("amount_1", e.target.value)}
                error={errors.amount_1}
              />
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Akun Debet</Label>
                <Select
                  name="akun_debet_1"
                  value={akunDebet || ""}
                  onValueChange={(value) => {
                    handleChange("akun_debet_1", value);
                    setAkunDebet(value);
                  }}
                >
                  <SelectTrigger className="col-span-3 rounded-md border">
                    <SelectValue placeholder="Select Akun" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Cari akun..."
                        value={searchAkunDebet}
                        onChange={(e) => setSearchAkunDebet(e.target.value)}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="w-full border rounded px-2 py-1 mb-1 bg-gray-50 dark:bg-gray-800"
                      />
                    </div>
                    {coas
                      .filter(
                        (coa) =>
                          coa.kode_akun
                            .toLowerCase()
                            .includes(searchAkunDebet.toLowerCase()) ||
                          coa.nama_akun
                            .toLowerCase()
                            .includes(searchAkunDebet.toLowerCase())
                      )
                      .map((coa) => (
                        <SelectItem key={coa.kode_akun} value={coa.kode_akun}>
                          {coa.kode_akun} -{" "}
                          {coa.nama_akun.length > 25
                            ? coa.nama_akun.slice(0, 25) + "..."
                            : coa.nama_akun}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Akun Kredit</Label>
                <Select
                  name="akun_credit_1"
                  value={akunKredit || ""}
                  onValueChange={(value) => {
                    handleChange("akun_credit_1", value);
                    setAkunKredit(value);
                  }}
                >
                  <SelectTrigger className="col-span-3 rounded-md border">
                    <SelectValue placeholder="Select Akun" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Cari akun..."
                        value={searchAkunKredit}
                        onChange={(e) => setSearchAkunKredit(e.target.value)}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="w-full border rounded px-2 py-1 mb-1 bg-gray-50 dark:bg-gray-800"
                      />
                    </div>
                    {coas
                      .filter(
                        (coa) =>
                          coa.kode_akun
                            .toLowerCase()
                            .includes(searchAkunKredit.toLowerCase()) ||
                          coa.nama_akun
                            .toLowerCase()
                            .includes(searchAkunKredit.toLowerCase())
                      )
                      .map((coa) => (
                        <SelectItem key={coa.kode_akun} value={coa.kode_akun}>
                          {coa.kode_akun} -{" "}
                          {coa.nama_akun.length > 25
                            ? coa.nama_akun.slice(0, 25) + "..."
                            : coa.nama_akun}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={!valid} pending={isPending}>
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
