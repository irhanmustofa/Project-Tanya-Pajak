import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect, useTransition } from "react";
import { useBuku, useBukuDispatch } from "../buku-components/BukuProvider";
import { LucideUserPlus2 } from "lucide-react";
import { bukuUpdate, bukuAll } from "../buku-components/BukuService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";
import { Textarea } from "@/components/ui/textarea";

export default function BukuUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const bukuDispatch = useBukuDispatch();
  const { bukuAction, bukuState, jurnalCoa, params } = useBuku();
  const [kodeAkunDr, setKodeAkunDr] = useState("");
  const [kodeAkunCr, setKodeAkunCr] = useState("");
  const [searchCr, setSearchCr] = useState("");
  const [searchDr, setSearchDr] = useState("");

  const { errors, handleChange } = useValidateInput({
    schema: {
      nama: "required",
      buku: "string|nullable",
      tanggal: "required|date",
      voucher: "required",
      vendor: "required",
      keterangan: "string|nullable",
      amount: "required|number",
      akun_default: "required|string|nullable",
      kode_akun_dr: "required|string|nullable",
      kode_akun_cr: "required|string|nullable",
    },
  });

  useEffect(() => {
    const data = bukuState.data.find((item) => item._id === id);
    if (data) {
      setInput({ ...data });
      setIsOpen(true);
    }
  }, [id, bukuState.data]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      for (let key in input) {
        if (input[key] !== undefined && input[key] !== null) {
          formData.append(key, input[key]);
        }
        if (input[key] === "kode_akun_dr") {
          formData.append("kode_akun_dr", kodeAkunDr);
        }
        if (input[key] === "kode_akun_cr") {
          formData.append("kode_akun_cr", kodeAkunCr);
        }
      }
      await bukuUpdate(id, formData).then((response) => {
        const successPayload = {
          isOpen: true,
          title: response.success ? "Update Success" : "Update Failed",
          message: response.message || "Update operation executed",
          status: response.success ? "success" : "error",
        };

        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: successPayload,
        });

        if (response.success) {
          bukuAll(params).then((res) => {
            if (res.success) {
              bukuDispatch({
                type: bukuAction.SUCCESS,
                payload: res.data,
              });
            }
          });
          handleCloseDialog();
        }
      });
    });
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setInput({});
    onClose();
  };

  return (
    <>
      {dialogState.isOpen && <DialogInfo />}
      {isOpen && (
        <Dialog onOpenChange={handleCloseDialog} open={isOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <LucideUserPlus2 className="mr-2 h-4 w-4" />
              Update Buku
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-5xl">
            <DialogTitle>Update Buku</DialogTitle>
            <DialogDescription>
              Update transaksi Buku yang ada.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full">
                  <div className="grid gap-4 py-4 w-full border border-gray-200 rounded-lg p-4">
                    <InputHorizontal
                      title="Nama Bank"
                      type="text"
                      name="nama"
                      value={input.nama || ""}
                      onChange={(e) => {
                        setInput({ ...input, nama: e.target.value });
                        handleChange("nama", e.target.value);
                      }}
                      error={errors.nama}
                    />
                    <InputHorizontal
                      title="Tanggal"
                      type="date"
                      name="tanggal"
                      value={
                        Date.parse(input.tanggal)
                          ? new Date(input.tanggal).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        setInput({ ...input, tanggal: e.target.value });
                        handleChange("tanggal", e.target.value);
                      }}
                      error={errors.tanggal}
                    />
                    <InputHorizontal
                      title="Voucher"
                      type="text"
                      name="voucher"
                      value={input.voucher || ""}
                      onChange={(e) => {
                        setInput({ ...input, voucher: e.target.value });
                        handleChange("voucher", e.target.value);
                      }}
                      error={errors.voucher}
                    />
                    <InputHorizontal
                      title="Vendor"
                      type="text"
                      name="vendor"
                      value={input.vendor || ""}
                      onChange={(e) => {
                        setInput({ ...input, vendor: e.target.value });
                        handleChange("vendor", e.target.value);
                      }}
                      error={errors.vendor}
                    />
                    <div>
                      <Label>Keterangan</Label>
                      <Textarea
                        name="keterangan"
                        value={input.keterangan || ""}
                        onChange={(e) => {
                          setInput({ ...input, keterangan: e.target.value });
                          handleChange("keterangan", e.target.value);
                        }}
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
                      value={input.amount || ""}
                      onChange={(e) => {
                        setInput({ ...input, amount: e.target.value });
                        handleChange("amount", e.target.value);
                      }}
                      error={errors.amount}
                    />
                    <InputHorizontal
                      title="Akun Default"
                      type="text"
                      name="akun_default"
                      value={input.akun_default || ""}
                      onChange={(e) => {
                        setInput({ ...input, akun_default: e.target.value });
                        handleChange("akun_default", e.target.value);
                      }}
                      error={errors.akun_default}
                    />
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Akun DR</Label>
                      <Select
                        name="kode_akun_dr"
                        value={input.kode_akun_dr || ""}
                        onValueChange={(value) => {
                          setInput({ ...input, kode_akun_dr: value });
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
                                (jcoa) => jcoa.kode_akun === input.kode_akun_dr
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
                                String(coa.kode_akun) ===
                                String(input.kode_akun_dr)
                            );
                            const options = filtered.some(
                              (coa) =>
                                String(coa.kode_akun) ===
                                String(input.kode_akun_dr)
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
                                    key={coa.kode_akun}
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
                        value={input.kode_akun_cr || ""}
                        onValueChange={(value) => {
                          setInput({ ...input, kode_akun_cr: value });
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
                                (jcoa) => jcoa.kode_akun === input.kode_akun_cr
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
                                String(coa.kode_akun) ===
                                String(input.kode_akun_cr)
                            );
                            const options = filtered.some(
                              (coa) =>
                                String(coa.kode_akun) ===
                                String(input.kode_akun_cr)
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
                                    key={coa.kode_akun}
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
              <DialogFooter>
                <Button type="submit" pending={isPending}>
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
