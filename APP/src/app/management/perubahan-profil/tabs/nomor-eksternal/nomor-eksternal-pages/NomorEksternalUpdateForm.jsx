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

import { nomorEksternalUpdate } from "@/app/management/perubahan-profil/tabs/nomor-eksternal/nomor-eksternal-components/NomorEksternalService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useValidateInput } from "@/hooks/use-validate-input";
import { dateStrip } from "@/components/custom/DateFormatted";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jenisNomorIdentifikasi } from "../../../data/nomorEksternalDataList";

export default function NomorEksternaltUpdateForm({ id, onClose }) {
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
      tipe: "required|string",
      nomor_identifikasi: "required|string",
      tanggal_mulai: "required|string",
    },
  });

  useEffect(() => {
    const getData = clientState.data[0].nomor_eksternal.find(
      (item) => item._id === id
    );

    setInput({
      tipe: getData.tipe,
      nomor_identifikasi: getData.nomor_identifikasi,
      tanggal_mulai: getData.tanggal_mulai,
      tanggal_berakhir: getData.tanggal_berakhir,
    });

    setIsOpen(true);
  }, [id, clientState]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("tipe", input.tipe);
      formData.append("nomor_identifikasi", input.nomor_identifikasi);
      formData.append("tanggal_mulai", input.tanggal_mulai);
      formData.append("tanggal_berakhir", input.tanggal_berakhir);

      await nomorEksternalUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update nomor identifikasi eksternal Failed",
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
              title: "Update nomor identifikasi eksternal Success",
              message: "updated successfully",
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
              Update External Identification Number
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[850px] max-h-[100vh] overflow-auto">
            <DialogTitle>Update External Identification Number</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
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
                        setInput({ ...input, tipe: e });
                      }}
                      value={String(input.tipe)}
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
                      value={input.nomor_identifikasi}
                      onChange={(e) => {
                        handleChange("nomor_identifikasi", e.target.value);
                        setInput({
                          ...input,
                          nomor_identifikasi: e.target.value,
                        });
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
                      value={dateStrip(input.tanggal_mulai)}
                      type="date"
                      onChange={(e) => {
                        handleChange("tanggal_mulai", e.target.value);
                        setInput({ ...input, tanggal_mulai: e.target.value });
                      }}
                    />
                    {errors.tanggal_mulai}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-4 items-center">
                  <Label>Tanggal Berakhir</Label>
                  <div className="col-span-3">
                    <Input
                      name="tanggal_berakhir"
                      value={dateStrip(input.tanggal_berakhir)}
                      type="date"
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
