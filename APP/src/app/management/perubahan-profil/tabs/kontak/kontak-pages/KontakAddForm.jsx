import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { jenisKontak } from "@/app/management/perubahan-profil/data/kontakDataList";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function KontakAddForm({ onClose }) {
  const { clientAction } = useClient();
  const dialogDispatch = useDialogDispatch();
  const clientDispatch = useClientDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const [isPending, startTrasition] = useTransition();

  const clientId = useLocalStorage.get("clientId") ?? "";
  const [isOpen, setIsOpen] = useState(true);

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      jenis_kontak: "required",
      nomor_telepon: "required",
      nomor_handphone: "required",
      email: "required",
      tanggal_mulai: "required",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("jenis_kontak", event.target.jenis_kontak.value);
      formData.append("nomor_telepon", event.target.nomor_telepon.value);
      formData.append("nomor_handphone", event.target.nomor_handphone.value);
      formData.append("nomor_faksimile", event.target.nomor_faksimile.value);
      formData.append("email", event.target.email.value);
      formData.append("website", event.target.website.value);
      formData.append("keterangan", event.target.keterangan.value);
      formData.append("tanggal_mulai", event.target.tanggal_mulai.value);
      formData.append("tanggal_berakhir", event.target.tanggal_berakhir.value);

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
        <DialogContent className="sm:max-w-[625px] max-h-[100vh] overflow-auto ">
          <DialogTitle>Input New Contact</DialogTitle>
          <DialogDescription>
            Add a new Contact to the system.
          </DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 my-4  items-end overflow-auto justify-center">
              <div className="col-span-1">
                <div className="grid xl:grid-cols-2 grid-cols-1 gap-3 mb-2 p-1">
                  <div className="col-span-2 items-center grid md:grid-cols-4 grid-cols-1 gap-2 xl:mb-0 mb-2">
                    <Label>
                      Jenis Kontak{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </Label>
                    <div className="md:col-span-3 col-span-full">
                      <Select
                        name="jenis_kontak"
                        onValueChange={(e) => {
                          handleChange("jenis_kontak", e);
                        }}
                        value={undefined}
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
                      {errors.jenis_kontak}
                    </div>
                  </div>

                  <div className="col-span-2 items-center grid md:grid-cols-4 grid-cols-1 gap-2 xl:mb-0 mb-2">
                    <Label>
                      Nomor Telepon{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </Label>
                    <div className="md:col-span-3 col-span-full">
                      <Input
                        name="nomor_telepon"
                        type="tel"
                        onChange={(e) => {
                          handleChange("nomor_telepon", e.target.value);
                        }}
                      />
                      {errors.nomor_telepon}
                    </div>
                  </div>

                  <div className="col-span-2 items-center grid md:grid-cols-4  gap-2 xl:mb-0 mb-2">
                    <Label>
                      Nomor Handphone{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </Label>
                    <div className="md:col-span-3 col-span-full">
                      <Input
                        name="nomor_handphone"
                        type="tel"
                        onChange={(e) => {
                          handleChange("nomor_handphone", e.target.value);
                        }}
                      />
                      {errors.nomor_handphone}
                    </div>
                  </div>

                  <div className="col-span-2 grid md:grid-cols-4 grid-cols-1 gap-2 xl:mb-0 mb-2 items-center">
                    <Label>Nomor Faksimile</Label>
                    <Input
                      name="nomor_faksimile"
                      className="md:col-span-3 col-span-full"
                      onChange={(e) => {
                        handleChange("nomor_faksimile", e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-span-2 items-center grid md:grid-cols-4 grid-cols-1 gap-2 xl:mb-0 mb-2">
                    <Label>
                      Email <span className="text-[13px] text-red-500">*</span>
                    </Label>
                    <div className="md:col-span-3 col-span-1">
                      <Input
                        name="email"
                        type="email"
                        onChange={(e) => {
                          handleChange("email", e.target.value);
                        }}
                      />
                      {errors.email}
                    </div>
                  </div>

                  <div className="col-span-2 items-center grid md:grid-cols-4 grid-cols-1 gap-2 xl:mb-0 mb-2">
                    <Label>Website</Label>
                    <Input
                      className="md:col-span-3 col-span-full"
                      name="website"
                      onChange={(e) => {
                        handleChange("website", e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-span-2 grid md:grid-cols-4 grid-cols-1 gap-2 xl:mb-0 mb-2 items-center">
                    <Label>Keterangan</Label>
                    <Input
                      className="md:col-span-3 col-span-full"
                      name="keterangan"
                      onChange={(e) => {
                        handleChange("keterangan", e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-span-2 items-center grid md:grid-cols-4 grid-cols-1 gap-2 xl:mb-0 mb-2">
                    <Label>
                      Tanggal Mulai{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </Label>
                    <Input
                      className="md:col-span-3 col-span-full"
                      name="tanggal_mulai"
                      type="date"
                      onChange={(e) => {
                        handleChange("tanggal_mulai", e.target.value);
                      }}
                      error={errors.tanggal_mulai}
                    />
                  </div>

                  <div className="col-span-2 grid md:grid-cols-4 grid-cols-1 items-center gap-2 xl:mb-0 mb-2">
                    <Label>Tanggal Berakhir</Label>
                    <Input
                      name="tanggal_berakhir"
                      type="date"
                      onChange={(e) => {
                        handleChange("tanggal_berakhir", e.target.value);
                      }}
                      title="Tanggal Berakhir"
                      error={errors.tanggal_berakhir}
                      className="md:col-span-3 col-span-full"
                    />
                  </div>
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
