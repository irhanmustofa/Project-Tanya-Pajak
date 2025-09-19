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
import { nomorEksternalCreate } from "@/app/management/perubahan-profil/tabs/nomor-eksternal/nomor-eksternal-components/NomorEksternalService";
import { clientFirst } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilService";
import {
  useClient,
  useClientDispatch,
} from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { jenisNomorIdentifikasi } from "../../../data/nomorEksternalDataList";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NomorEksternalAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();
  const clientId = useLocalStorage.get("clientId") ?? "";
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction } = useClient();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      tipe: "required|string",
      nomor_identifikasi: "required|string",
      tanggal_mulai: "required|string",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("tipe", event.target.tipe.value);
      formData.append(
        "nomor_identifikasi",
        event.target.nomor_identifikasi.value
      );
      formData.append("tanggal_mulai", event.target.tanggal_mulai.value);
      formData.append("tanggal_berakhir", event.target.tanggal_berakhir.value);

      await nomorEksternalCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add nomor eksternal Success",
              message: "Nomor eksternal added successfully",
              status: "success",
            },
          });

          clientFirst(clientId).then((res) => {
            if (res.success) {
              console.log("response:", res);
              clientDispatch({ type: clientAction.SUCCESS, payload: res.data });
            }
          });

          handleOnClose();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add nomor eksternal Failed",
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
        <DialogContent className="sm:max-w-[600px] max-h-[100vh] overflow-auto">
          <DialogTitle>Input New External Identification Number</DialogTitle>
          <DialogDescription>
            Add a new External Identification Number to the system.
          </DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 my-4">
              <div className="grid grid-cols-4 gap-3 mb-4 items-center">
                <Label>
                  Tipe <span className="text-red-500 text-[13px]">*</span>
                </Label>
                <div className="col-span-3">
                  <Select
                    name="tipe"
                    onValueChange={(e) => {
                      handleChange("tipe", e);
                    }}
                    value={undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      {jenisNomorIdentifikasi.map((item, key) => {
                        return (
                          <SelectItem key={key} value={item.code}>
                            {item.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4 items-center">
                <Label>
                  Nomor Identifikasi{" "}
                  <span className="text-red-500 text-[13px]">*</span>
                </Label>
                <div className="col-span-3">
                  <Input
                    name="nomor_identifikasi"
                    onChange={(e) => {
                      handleChange("nomor_identifikasi", e.target.value);
                    }}
                  />
                  {errors.nomor_identifikasi}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4 items-center">
                <Label>
                  Tanggal Mulai
                  <span className="text-red-500 text-[13px]">*</span>
                </Label>
                <div className="col-span-3">
                  <Input
                    name="tanggal_mulai"
                    type="date"
                    onChange={(e) => {
                      handleChange("tanggal_mulai", e.target.value);
                    }}
                  />
                  {errors.tanggal_mulai}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4 items-center">
                <Label>Tanggal Berakhir</Label>
                <div className="col-span-3">
                  <Input name="tanggal_berakhir" type="date" />
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
