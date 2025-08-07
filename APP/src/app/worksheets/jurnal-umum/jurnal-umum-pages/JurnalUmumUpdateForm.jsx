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
import { useEffect, useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  useJurnalUmum,
  useJurnalUmumDispatch,
} from "../jurnal-umum-components/JurnalUmumProvider";
import {
  jurnalUmumGetBuku,
  jurnalUmumUpdate,
} from "../jurnal-umum-components/JurnalUmumService";

export default function JurnalUmumUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();
  const [akunKredit, setAkunKredit] = useState("");
  const [searchAkunKredit, setSearchAkunKredit] = useState("");
  const [akunDebet, setAkunDebet] = useState("");
  const [searchAkunDebet, setSearchAkunDebet] = useState("");
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const jurnalUmumDispatch = useJurnalUmumDispatch();
  const { jurnalUmumAction, jurnalUmumState, coas } = useJurnalUmum();

  const { handleChange, errors } = useValidateInput({
    schema: {
      tanggal: "required",
      voucher: "required|min:3",
      vendor: "required|min:3",
      keterangan: "required|min:3",
      currency: "required",
      kurs: "required|numeric",
      amount_1: "required|numeric",
      akun_debet_1: "required",
      akun_credit_1: "required",
    },
  });

  useEffect(() => {
    const data = jurnalUmumState.data.find((item) => item._id === id);

    if (data) {
      setInput({ ...data });
      setAkunDebet(data.akun_debet_1);
      setAkunKredit(data.akun_credit_1);
    }
  }, [id, jurnalUmumState.data]);
  console.log("input", input);
  const handleSubmit = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      for (let key in input) {
        if (input[key] !== undefined && input[key] !== null) {
          formData.append(key, input[key]);
        }
      }

      await jurnalUmumUpdate(id, formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Berhasil Update Data",
              message: "Data berhasil diupdate",
              status: "success",
            },
          });

          jurnalUmumGetBuku().then((res) => {
            if (res.success) {
              jurnalUmumDispatch({
                type: jurnalUmumAction.SUCCESS,
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
              title: "Gagal Update Data",
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
          <DialogTitle>Update Saldo Awal</DialogTitle>
          <DialogDescription>Update saldo awal .</DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <InputHorizontal
                title="Tanggal"
                type="date"
                name="tanggal"
                value={new Date(input.tanggal).toLocaleDateString("en-CA")}
                onChange={(e) => {
                  setInput({
                    ...input,
                    tanggal: e.target.value,
                  });
                  handleChange("tanggal", e.target.value);
                }}
                error={errors?.tanggal}
              />
              <InputHorizontal
                title="Voucher"
                name="voucher"
                value={input.voucher || ""}
                onChange={(e) => {
                  handleChange("voucher", e.target.value);
                  setInput({
                    ...input,
                    voucher: e.target.value,
                  });
                }}
                error={errors.voucher}
              />
              <InputHorizontal
                title="Vendor"
                name="vendor"
                value={input.vendor || ""}
                onChange={(e) => {
                  handleChange("vendor", e.target.value);
                  setInput({
                    ...input,
                    vendor: e.target.value,
                  });
                }}
                error={errors.vendor}
              />
              <InputHorizontal
                title="Keterangan"
                name="keterangan"
                value={input.keterangan || ""}
                onChange={(e) => {
                  handleChange("keterangan", e.target.value);
                  setInput({
                    ...input,
                    keterangan: e.target.value,
                  });
                }}
                error={errors.keterangan}
              />
              <InputHorizontal
                title="Currency"
                name="currency"
                value={input.currency || ""}
                onChange={(e) => {
                  handleChange("currency", e.target.value);
                  setInput({
                    ...input,
                    currency: e.target.value,
                  });
                }}
                error={errors.currency}
              />

              <InputHorizontal
                title="Kurs"
                type="number"
                name="kurs"
                value={input.kurs || ""}
                onChange={(e) => {
                  handleChange("kurs", e.target.value);
                  setInput({
                    ...input,
                    kurs: e.target.value,
                  });
                }}
                error={errors.kurs}
              />
              <InputHorizontal
                title="Valas"
                type="number"
                name="valas"
                value={input.valas}
                onChange={(e) => {
                  handleChange("valas", e.target.value);
                  setInput({
                    ...input,
                    valas: e.target.value,
                  });
                }}
                error={errors.valas}
              />
              <InputHorizontal
                title="IDR"
                type="number"
                name="amount_1"
                value={input.amount_1 || ""}
                onChange={(e) => {
                  handleChange("amount_1", e.target.value);
                  setInput({
                    ...input,
                    amount_1: e.target.value,
                  });
                }}
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
                    setInput({
                      ...input,
                      akun_debet_1: value,
                    });
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
                    setInput({
                      ...input,
                      akun_credit_1: value,
                    });
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
              <Button type="submit" pending={isPending}>
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
