import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputVertical } from "@/components/custom/input-custom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import { kontakClientCreate } from "@/app/management/perubahan-profil/tabs/kontak/kontak-components/KontakService";
import { clientFirst } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilService";
import {
  useClient,
  useClientDispatch,
} from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { jenisKontak } from "@/helpers/variables";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function KontakAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();
  const clientId = useLocalStorage.get("clientId") ?? "";
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction } = useClient();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      negara: "required",
      jenis_kontak: "required",
      nomor_telepon: "string",
      nomor_handphone: "string",
      email: "string",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData("jenis_kontak", event.target.jenis_kontak.value);
      formData("nomor_telepon", event.target.nomor_telepon.value);
      formData("nomor_handphone", event.target.nomor_handphone.value);
      formData("nomor_faksimile", event.target.nomor_faksimile.value);
      formData("email", event.target.email.value);
      formData("website", event.target.website.value);
      formData("keterangan", event.target.keterangan.value);
      formData("tanggal_mulai", event.target.tanggal_mulai.value);
      formData("tanggal_berakhir", event.target.tanggal_berakhir.value);

      console.log("jenis_kontak.value:", event.target.jenis_kontak.value);
      console.log("nomor_telepon.value:", event.target.nomor_telepon.value);
      console.log("nomor_handphone.value:", event.target.nomor_handphone.value);
      console.log("nomor_faksimile.value:", event.target.nomor_faksimile.value);
      console.log("email.value:", event.target.email.value);
      console.log("website.value:", event.target.website.value);
      console.log("keterangan.value:", event.target.keterangan.value);
      console.log("tanggal_mulai.value:", event.target.tanggal_mulai.value);
      console.log(
        "tanggal_berakhir.value:",
        event.target.tanggal_berakhir.value
      );

      await kontakClientCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Contact Success",
              message: "Contact added successfully",
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
              title: "Add Contact Failed",
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
        <DialogContent className="sm:max-w-[850px] max-h-[400px] overflow-auto">
          <DialogTitle>Input New Address</DialogTitle>
          <DialogDescription>
            Add a new Address to the system.
          </DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 my-4  items-end overflow-auto justify-center">
              <div className="col-span-1">
                <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 mb-4">
                  <div>
                    <Label>Jenis Kontak</Label>
                    <Select
                      name="jenis_kontak"
                      onValueChange={(e) => {
                        handleChange("jenis_kontak", e);
                      }}
                      value={""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                      <SelectContent>
                        {jenisKontak.map((item, key) => {
                          return (
                            <SelectItem key={key} value={String(item.kode)}>
                              {item.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <InputVertical
                    name="nomor_telepon"
                    type="tel"
                    onChange={(e) => {
                      handleChange("nomor_telepon", e.target.value);
                    }}
                    title="Nomor Telepon"
                  />

                  <InputVertical
                    name="nomor_handphone"
                    type="tel"
                    onChange={(e) => {
                      handleChange("nomor_handphone", e.target.value);
                    }}
                    title="Nomor Handphone"
                  />

                  <InputVertical
                    name="nomor_faksimile"
                    onChange={(e) => {
                      handleChange("nomor_faksimile", e.target.value);
                    }}
                    title="Nomor Faksimile"
                  />

                  <InputVertical
                    name="email"
                    type="email"
                    onChange={(e) => {
                      handleChange("email", e.target.value);
                    }}
                    title="Email"
                  />

                  <InputVertical
                    name="website"
                    onChange={(e) => {
                      handleChange("website", e.target.value);
                    }}
                    title="Website"
                  />

                  <div className="col-span-2">
                    <InputVertical
                      name="keterangan"
                      onChange={(e) => {
                        handleChange("keterangan", e.target.value);
                      }}
                      title="Keterangan"
                    />
                  </div>

                  <InputVertical
                    name="tanggal_mulai"
                    type="date"
                    onChange={(e) => {
                      handleChange("tanggal_mulai", e.target.value);
                    }}
                    title="Tanggal Mulai"
                  />

                  <InputVertical
                    name="tanggal_berakhir"
                    type="date"
                    onChange={(e) => {
                      handleChange("tanggal_berakhir", e.target.value);
                    }}
                    title="Tanggal Berakhir"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
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
