import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import { bankClientCreate } from "@/app/management/perubahan-profil/tabs/bank/bank-components/BankService";
import { clientFirst } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilService";
import {
  useClient,
  useClientDispatch,
} from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { InputHorizontal } from "@/components/custom/input-custom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { jenisRekening } from "../../../data/bankDataList";

export default function ClientAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();
  const clientId = useLocalStorage.get("clientId") ?? "";
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction } = useClient();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      nama_bank: "required|string",
      nomor_rekening: "required|string",
      jenis_rekening: "required|string",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("nama_bank", event.target.nama_bank.value);
      formData.append("nomor_rekening", event.target.nomor_rekening.value);
      formData.append("jenis_rekening", event.target.jenis_rekening.value);
      formData.append(
        "nama_pemilik_rekening",
        event.target.nama_pemilik_rekening.value
      );
      formData.append("tanggal_mulai", event.target.tanggal_mulai.value);
      formData.append("tanggal_berakhir", event.target.tanggal_berakhir.value);

      await bankClientCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add bank detail Success",
              message: "Bank detail added successfully",
              status: "success",
            },
          });

          clientFirst(clientId).then((res) => {
            if (res.success) {
              clientDispatch({ type: clientAction.SUCCESS, payload: res.data });
            }
          });

          handleOnClose();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add bank detail Failed",
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
        <DialogContent className="sm:max-w-[700px] max-h-[100vh] overflow-auto">
          <DialogTitle>Input New Bank Detail</DialogTitle>
          <DialogDescription>
            Add a new Bank Detail to the system.
          </DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 my-4">
              <div>
                <div className="grid grid-cols-1 gap-3 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-4  xl:mb-0 mb-2 items-center">
                    <h1 className="text-[14px] font-medium mb-2">
                      Nama Bank{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </h1>
                    <div className="col-span-3">
                      <Input
                        name="nama_bank"
                        onChange={(e) => {
                          handleChange("nama_bank", e.target.value);
                        }}
                      />
                      {errors.nama_bank}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 xl:mb-0 mb-2 items-center">
                    <h1 className="text-[14px] font-medium mb-2">
                      Nomor Rekening{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </h1>
                    <div className="col-span-3">
                      <Input
                        name="nomor_rekening"
                        onChange={(e) => {
                          handleChange("nomor_rekening", e.target.value);
                        }}
                      />
                      {errors.nama_bank}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4  items-center">
                    <h1 className="text-[14px] font-medium mb-2">
                      Jenis Rekening Bank{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </h1>
                    <div className="col-span-3 flex gap-2 flex-wrap">
                      {jenisRekening.map((item) => {
                        return (
                          <div className="me-4">
                            <input
                              type="radio"
                              name="jenis_rekening"
                              className="me-1"
                            />
                            <Label>{item.name}</Label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {errors.jenis_rekening}

                  <div className="grid grid-cols-1 md:grid-cols-4  items-center">
                    <h1 className="text-[14px] font-medium mb-2">
                      Nama Pemilik Rekening Bank
                    </h1>
                    <div className="col-span-3">
                      <Input name="nama_pemilik_rekening" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4  items-center">
                    <h1 className="text-[14px] font-medium mb-2">
                      Tanggal Mulai
                    </h1>
                    <div className="col-span-3">
                      <Input name="tanggal_mulai" type="date" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 items-center">
                    <h1 className="text-[14px] font-medium mb-2">
                      Tanggal Berakhir
                    </h1>
                    <div className="col-span-3">
                      <Input name="tanggal_berakhir" type="date" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" pending={isPending}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
