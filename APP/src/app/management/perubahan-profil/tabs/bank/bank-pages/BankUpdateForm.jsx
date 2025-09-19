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
import { useState, useEffect, useTransition } from "react";
import {
  useClient,
  useClientDispatch,
} from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import { LucideUserPlus2 } from "lucide-react";
import { clientFirst } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilService";

import { bankClientUpdate } from "@/app/management/perubahan-profil/tabs/bank/bank-components/BankService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useValidateInput } from "@/hooks/use-validate-input";
import { dateStrip } from "@/components/custom/DateFormatted";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { jenisRekening } from "../../../data/bankDataList";
import { Input } from "@/components/ui/input";
import { InputHorizontal } from "@/components/custom/input-custom";

export default function BanktUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction, clientState } = useClient();
  const clientId = useLocalStorage.get("clientId");

  const { errors, handleChange } = useValidateInput({
    schema: {
      nama_bank: "required|string",
      nomor_rekening: "required|string",
      jenis_rekening: "required|string",
    },
  });

  useEffect(() => {
    const getData = clientState.data[0].data_bank.find(
      (item) => item._id === id
    );

    setInput({
      nama_bank: getData.nama_bank,
      nomor_rekening: getData.nomor_rekening,
      jenis_rekening: getData.jenis_rekening,
      nama_pemilik_rekening: getData.nama_pemilik_rekening,
      tanggal_mulai: getData.tanggal_mulai,
      tanggal_berakhir: getData.tanggal_berakhir,
    });

    setIsOpen(true);
  }, [id, clientState]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("nama_bank", input.nama_bank);
      formData.append("nomor_rekening", input.nomor_rekening);
      formData.append("jenis_rekening", input.jenis_rekening);
      formData.append("nama_pemilik_rekening", input.nama_pemilik_rekening);
      formData.append("tanggal_mulai", input.tanggal_mulai);
      formData.append("tanggal_berakhir", input.tanggal_berakhir);

      await bankClientUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update bank data Failed",
              message: response.message,
              status: "error",
            },
          });

          handleCloseDialog();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update bank data Success",
              message: "Alamat updated successfully",
              status: "success",
            },
          });

          clientFirst(clientId).then((res) => {
            if (res.success) {
              clientDispatch({
                type: clientAction.SUCCESS,
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
              Update Bank Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[850px] max-h-[100vh] overflow-auto">
            <DialogTitle>Update Bank Client</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="grid grid-cols-1 my-4  ">
                <div>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      <h1 className="font-medium mb-2">
                        Nama Bank{" "}
                        <span className="text-[13px] text-red-500">*</span>
                      </h1>
                      <div className="col-span-3">
                        <Input
                          name="nama_bank"
                          value={input.nama_bank}
                          onChange={(e) => {
                            handleChange("nama_bank", e.target.value);
                            setInput({ ...input, nama_bank: e.target.value });
                          }}
                        />
                        {errors.nama_bank}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-2">
                      <h1 className="font-medium mb-2">
                        Nomor Rekening{" "}
                        <span className="text-[13px] text-red-500">*</span>
                      </h1>
                      <div className="col-span-3">
                        <Input
                          name="nomor_rekening"
                          value={input.nomor_rekening}
                          onChange={(e) => {
                            handleChange("nomor_rekening", e.target.value);
                            setInput({
                              ...input,
                              nomor_rekening: e.target.value,
                            });
                          }}
                        />
                        {errors.nama_bank}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-2">
                      <h1 className="font-medium mb-2">
                        Jenis Rekening Bank{" "}
                        <span className="text-[13px] text-red-500">*</span>
                      </h1>
                      <div className="col-span-3">
                        {jenisRekening.map((item) => {
                          return (
                            <div className="flex gap-4">
                              <input
                                type="radio"
                                name="jenis_rekening"
                                checked={Boolean(
                                  item.code == input.jenis_rekening
                                )}
                              />
                              <Label>{item.name}</Label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {errors.jenis_rekening}

                    <InputHorizontal
                      name="nama_pemilik_rekening"
                      value={input.nama_pemilik_rekening}
                      onChange={(e) => {
                        setInput({
                          ...input,
                          nama_pemilik_rekening: e.target.value,
                        });
                      }}
                    />

                    <InputHorizontal
                      name="tanggal_mulai"
                      type="date"
                      value={dateStrip(input.tanggal_mulai)}
                      onChange={(e) => {
                        setInput({
                          ...input,
                          tanggal_mulai: e.target.value,
                        });
                      }}
                    />

                    <InputHorizontal
                      name="tanggal_berakhir"
                      type="date"
                      value={dateStrip(input.tanggal_berakhir)}
                      onChange={(e) => {
                        setInput({
                          ...input,
                          tanggal_berakhir: e.target.value,
                        });
                      }}
                    />
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
