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
import {
  bukuAll,
  bukuCreate,
} from "@/app/jurnals/buku/buku-components/BukuService";
import {
  useBuku,
  useBukuDispatch,
} from "@/app/jurnals/buku/buku-components/BukuProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { Textarea } from "@/components/ui/textarea";

export default function BukuAddForm({ onClose, buku }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const bukuDispatch = useBukuDispatch();
  const { bukuAction, jurnalCoa, params } = useBuku();
  const [kodeAkunDr, setKodeAkunDr] = useState("");
  const [kodeAkunCr, setKodeAkunCr] = useState("");
  const [searchCr, setSearchCr] = useState("");
  const [searchDr, setSearchDr] = useState("");

  const { valid, handleChange, errors, values } = useValidateInput({
    schema: {
      nama: "required|string|max:255",
      tanggal: "required|date",
      voucher: "required",
      vendor: "required",
      keterangan: "string|nullable",
      amount: "required|numeric|min:0",
      akun_default: "required",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      // Get tanggal value and extract tahun & masa
      const tanggalValue = event.target.tanggal.value;
      const selectedDate = new Date(tanggalValue);

      // Extract tahun dan masa from selected date
      const tahun = selectedDate.getFullYear();
      const masa = selectedDate.getMonth() + 1;

      const formData = new FormData();
      formData.append("nama", event.target.nama.value);
      formData.append("slug", params.buku);
      formData.append("buku", buku.name);
      formData.append("code", buku.code);
      formData.append("tanggal", tanggalValue);
      formData.append("tahun", tahun);
      formData.append("masa", masa);
      formData.append("voucher", event.target.voucher.value);
      formData.append("vendor", event.target.vendor.value);
      formData.append("keterangan", event.target.keterangan.value);
      formData.append("amount", event.target.amount.value);
      formData.append("akun_default", event.target.akun_default.value);
      formData.append("kode_akun_dr", kodeAkunDr);
      formData.append("kode_akun_cr", kodeAkunCr);

      await bukuCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Success",
              message: "Buku added successfully",
              status: "success",
            },
          });

          bukuAll(params).then((res) => {
            if (res.success) {
              bukuDispatch({
                type: bukuAction.SUCCESS,
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
              title: "Failed",
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
        <DialogContent className="sm:max-w-5xl">
          <DialogTitle>Input New Buku</DialogTitle>
          <DialogDescription>Isi data Buku sesuai transaksi</DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full">
                <div className="grid gap-4 py-4 w-full border border-gray-200 rounded-lg p-4">
                  <InputHorizontal
                    title="Nama"
                    type="text"
                    name="nama"
                    onChange={(e) => handleChange("nama", e.target.value)}
                    error={errors.nama}
                  />
                  <InputHorizontalDate
                    title="Tanggal"
                    name="tanggal"
                    onChange={(e) => {
                      handleChange("tanggal", e.target.value);
                    }}
                    error={errors?.tanggal}
                  />
                  <InputHorizontal
                    title="Voucher"
                    type="text"
                    name="voucher"
                    onChange={(e) => handleChange("voucher", e.target.value)}
                    error={errors.voucher}
                  />
                  <InputHorizontal
                    title="Vendor"
                    type="text"
                    name="vendor"
                    onChange={(e) => handleChange("vendor", e.target.value)}
                    error={errors.vendor}
                  />
                  <div>
                    <Label>Keterangan</Label>
                    <Textarea
                      name="keterangan"
                      onChange={(e) =>
                        handleChange("keterangan", e.target.value)
                      }
                      error={errors.keterangan}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="grid gap-4 py-4 w-full border border-gray-200 rounded-lg p-4 mb-3">
                  <InputHorizontal
                    title="Amount"
                    type="number"
                    name="amount"
                    onChange={(e) => handleChange("amount", e.target.value)}
                    error={errors.amount}
                  />
                  <InputHorizontal
                    title="Akun Default"
                    type="text"
                    name="akun_default"
                    onChange={(e) =>
                      handleChange("akun_default", e.target.value)
                    }
                    error={errors.akun_default}
                  />
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Akun DR</Label>
                    <Select
                      name="kode_akun_dr"
                      value={kodeAkunDr || ""}
                      onValueChange={(value) => {
                        handleChange("kode_akun_dr", value);
                        const coa = jurnalCoa.find(
                          (c) => String(c.kode_akun) === String(value)
                        );
                        setKodeAkunDr(coa ? coa.kode_akun : "");
                      }}
                      onOpenChange={(open) => {
                        if (!open) setSearchDr("");
                      }}
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue
                          placeholder={(() => {
                            const coa = jurnalCoa.find(
                              (c) => String(c.kode_akun) === String(kodeAkunDr)
                            );
                            return coa
                              ? `(${coa.kode_akun}) - ${coa.nama_akun}`
                              : "Select Akun";
                          })()}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="px-2 py-1 sticky top-0 bg-white dark:bg-gray-900 z-10">
                          <input
                            autoFocus
                            type="text"
                            placeholder="Cari akun..."
                            value={searchDr}
                            onChange={(e) => setSearchDr(e.target.value)}
                            className="w-full border rounded px-2 py-1 mb-1 bg-gray-50 dark:bg-gray-800"
                          />
                        </div>
                        {(() => {
                          const filtered = jurnalCoa.filter(
                            (coa) =>
                              coa.nama_akun
                                .toLowerCase()
                                .includes(searchDr.toLowerCase()) ||
                              coa.kode_akun
                                .toLowerCase()
                                .includes(searchDr.toLowerCase())
                          );
                          const selected = jurnalCoa.find(
                            (coa) =>
                              String(coa.kode_akun) === String(kodeAkunDr)
                          );
                          const options = filtered.some(
                            (coa) =>
                              String(coa.kode_akun) === String(kodeAkunDr)
                          )
                            ? filtered
                            : selected
                            ? [selected, ...filtered]
                            : filtered;

                          return (
                            <>
                              {options.map((coa) => (
                                <SelectItem
                                  value={String(coa.kode_akun)}
                                  key={coa.coa_id}
                                >
                                  ({coa.kode_akun}) - {coa.nama_akun}
                                </SelectItem>
                              ))}
                              {filtered.length === 0 && (
                                <div className="px-4 py-2 text-gray-400">
                                  Tidak ditemukan
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Akun CR</Label>
                    <Select
                      name="kode_akun_cr"
                      value={kodeAkunCr || ""}
                      onValueChange={(value) => {
                        handleChange("kode_akun_cr", value);
                        const coa = jurnalCoa.find(
                          (c) => String(c.kode_akun) === String(value)
                        );
                        setKodeAkunCr(coa ? coa.kode_akun : "");
                      }}
                      onOpenChange={(open) => {
                        if (!open) setSearchCr("");
                      }}
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue
                          placeholder={(() => {
                            const coa = jurnalCoa.find(
                              (c) => String(c.kode_akun) === String(kodeAkunCr)
                            );
                            return coa
                              ? `(${coa.kode_akun}) - ${coa.nama_akun}`
                              : "Select Akun";
                          })()}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="px-2 py-1 sticky top-0 bg-white dark:bg-gray-900 z-10">
                          <input
                            autoFocus
                            type="text"
                            placeholder="Cari akun..."
                            value={searchCr}
                            onChange={(e) => setSearchCr(e.target.value)}
                            className="w-full border rounded px-2 py-1 mb-1 bg-gray-50 dark:bg-gray-800"
                          />
                        </div>
                        {(() => {
                          const filtered = jurnalCoa.filter(
                            (coa) =>
                              coa.nama_akun
                                .toLowerCase()
                                .includes(searchCr.toLowerCase()) ||
                              coa.kode_akun
                                .toLowerCase()
                                .includes(searchCr.toLowerCase())
                          );
                          const selected = jurnalCoa.find(
                            (coa) =>
                              String(coa.kode_akun) === String(kodeAkunCr)
                          );
                          const options = filtered.some(
                            (coa) =>
                              String(coa.kode_akun) === String(kodeAkunCr)
                          )
                            ? filtered
                            : selected
                            ? [selected, ...filtered]
                            : filtered;

                          return (
                            <>
                              {options.map((coa) => (
                                <SelectItem
                                  value={String(coa.kode_akun)}
                                  key={coa.coa_id}
                                >
                                  ({coa.kode_akun}) - {coa.nama_akun}
                                </SelectItem>
                              ))}
                              {filtered.length === 0 && (
                                <div className="px-4 py-2 text-gray-400">
                                  Tidak ditemukan
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className={"mt-4"}>
              <Button type="submit" disabled={!valid} pending={isPending}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
