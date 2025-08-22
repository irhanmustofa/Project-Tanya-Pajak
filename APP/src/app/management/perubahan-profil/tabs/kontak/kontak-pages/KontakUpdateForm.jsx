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
import {
  useClient,
  useClientDispatch,
} from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import { LucideUserPlus2 } from "lucide-react";
import { clientFirst } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilService";
import { kontakClientUpdate } from "@/app/management/perubahan-profil/tabs/kontak/kontak-components/KontakService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { Input } from "@/components/ui/input";
import { useValidateInput } from "@/hooks/use-validate-input";
import { dateStrip } from "@/components/custom/DateFormatted";
import { jenisKontak } from "@/app/management/perubahan-profil/data/kontakDataList";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function KontakUpdateForm({ id, onClose }) {
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction, clientState } = useClient();
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const clientId = useLocalStorage.get("clientId");

  const { errors, handleChange } = useValidateInput({
    schema: {
      jenis_kontak: "required",
      nomor_telepon: "required",
      nomor_handphone: "required",
      email: "required",
      tanggal_mulai: "required",
    },
  });

  useEffect(() => {
    const getData = clientState.data[0].data_kontak.find(
      (item) => item._id === id
    );

    setInput({
      jenis_kontak: getData.jenis_kontak,
      nomor_telepon: getData.nomor_telepon,
      nomor_handphone: getData.nomor_handphone,
      nomor_faksimile: getData.nomor_faksimile,
      email: getData.email,
      website: getData.website,
      keterangan: getData.keterangan,
      tanggal_mulai: getData.tanggal_mulai || "yyyy-mm-dd",
      tanggal_berakhir: getData.tanggal_berakhir || "yyyy-mm-dd",
    });

    setIsOpen(true);
  }, [id, clientState]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("jenis_kontak", input.jenis_kontak);
      formData.append("nomor_telepon", input.nomor_telepon);
      formData.append("nomor_handphone", input.nomor_handphone);
      formData.append("nomor_faksimile", input.nomor_faksimile);
      formData.append("email", input.email);
      formData.append("website", input.website);
      formData.append("keterangan", input.keterangan);
      formData.append("tanggal_mulai", input.tanggal_mulai);
      formData.append("tanggal_berakhir", input.tanggal_berakhir);

      await kontakClientUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update Contact Failed",
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
              title: "Update Contact Success",
              message: "Contact updated successfully",
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
              Update User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px] max-h-[100vh] overflow-auto">
            <DialogTitle>Update User</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="grid grid-cols-1 my-4  items-end">
                <div className="col-span-1">
                  <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 mb-4">
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
                            setInput({ ...input, jenis_kontak: e });
                          }}
                          value={String(input.jenis_kontak)}
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
                            setInput({
                              ...input,
                              nomor_telepon: e.target.value,
                            });
                          }}
                          value={input.nomor_telepon}
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
                            setInput({
                              ...input,
                              nomor_handphone: e.target.value,
                            });
                          }}
                          value={input.nomor_handphone}
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
                          setInput({
                            ...input,
                            nomor_faksimile: e.target.value,
                          });
                        }}
                        value={input.faksimile}
                      />
                    </div>

                    <div className="col-span-2 items-center grid md:grid-cols-4 grid-cols-1 gap-2 xl:mb-0 mb-2">
                      <Label>
                        Email{" "}
                        <span className="text-[13px] text-red-500">*</span>
                      </Label>
                      <div className="md:col-span-3 col-span-1">
                        <Input
                          name="email"
                          type="email"
                          onChange={(e) => {
                            handleChange("email", e.target.value);
                            setInput({ ...input, email: e.target.value });
                          }}
                          value={input.email}
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
                          setInput({ ...input, website: e.target.value });
                        }}
                        value={input.website}
                      />
                    </div>

                    <div className="col-span-2 grid md:grid-cols-4 grid-cols-1 gap-2 xl:mb-0 mb-2 items-center">
                      <Label>Keterangan</Label>
                      <Input
                        className="md:col-span-3 col-span-full"
                        name="keterangan"
                        onChange={(e) => {
                          handleChange("keterangan", e.target.value);
                          setInput({ ...input, keterangan: e.target.value });
                        }}
                        value={input.keterangan}
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
                          setInput({ ...input, tanggal_mulai: e.target.value });
                        }}
                        value={dateStrip(input.tanggal_mulai)}
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
                          setInput({
                            ...input,
                            tanggal_berakhir: e.target.value,
                          });
                        }}
                        title="Tanggal Berakhir"
                        value={dateStrip(input.tanggal_berakhir)}
                        error={errors.tanggal_berakhir}
                        className="md:col-span-3 col-span-full"
                      />
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
