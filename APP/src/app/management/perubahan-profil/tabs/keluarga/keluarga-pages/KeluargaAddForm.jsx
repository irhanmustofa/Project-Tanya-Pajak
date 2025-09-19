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
import { keluargaClientCreate } from "@/app/management/perubahan-profil/tabs/keluarga/keluarga-components/KeluargaService";
import { clientFirst } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilService";
import {
  useClient,
  useClientDispatch,
} from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { hubunganKeluarga } from "@/helpers/variables";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusUnitPerpajakan } from "../../../data/keluargaDataList";

export default function KeluargaAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();
  const clientId = useLocalStorage.get("clientId") ?? "";
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction } = useClient();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      nik: "required|string",
      jenis_kelamin: "required|string",
      tempat_lahir: "required|string",
      tanggal_lahir: "required|string",
      nomor_kk: "required|string",
      nama: "required|string",
      status_unit_pajak: "required|string",
      status_ptkp: "required|string",
      tanggal_mulai: "required|string",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("nik", event.target.nik.value);
      formData.append("jenis_kelamin", event.target.jenis_kelamin.value);
      formData.append("tempat_lahir", event.target.tempat_lahir.value);
      formData.append("tanggal_lahir", event.target.tanggal_lahir.value);
      formData.append("nomor_kk", event.target.nomor_kk.value);
      formData.append("nama", event.target.nama.value);
      formData.append("status_keluarga", event.target.status_keluarga.value);
      formData.append("pekerjaan", event.target.pekerjaan.value);
      formData.append(
        "status_unit_pajak",
        event.target.status_unit_pajak.value
      );
      formData.append("status_ptkp", event.target.status_ptkp.value);
      formData.append("tanggal_mulai", event.target.tanggal_mulai.value);
      formData.append("tanggal_berakhir", event.target.tanggal_berakhir.value);

      await keluargaClientCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add unit keluarga Success",
              message: "Unit keluarga added successfully",
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
              title: "Add unit keluarga Failed",
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
        <DialogContent className="sm:max-w-[580px] max-h-[100vh] overflow-auto">
          <DialogTitle>Input New Unit Keluarga</DialogTitle>
          <DialogDescription>
            Add a new Unit Keluarga to the system.
          </DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 gap-3 p-2 my-2">
              <div className="grid md:grid-cols-4 grid-cols-1 gap-2 mb-2 items-center">
                <Label>
                  NIK <span className="text-red-500 tex-[13px]">*</span>
                </Label>
                <div className="md:col-span-3 col-span-full">
                  <Input
                    name="nik"
                    onChange={(e) => {
                      handleChange("nik", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-4 grid-cols-1 gap-2 mb-2 items-center">
                <Label className="leading-[20px]">
                  Nama Anggota Keluarga{" "}
                  <span className="text-red-500 tex-[13px]">*</span>
                </Label>
                <div className="md:col-span-3 col-span-full">
                  <div className="gap-3 flex">
                    <div>
                      <input
                        type="radio"
                        name="jenis_kelamin"
                        onChange={(e) => {
                          handleChange("jenis_kelamin", e.target.value);
                        }}
                      />{" "}
                      <Label>Laki-Laki</Label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="jenis_kelamin"
                        onChange={(e) => {
                          handleChange("jenis_kelamin", e.target.value);
                        }}
                      />{" "}
                      <Label>Perempuan</Label>
                    </div>
                  </div>
                  {errors.jenis_kelamin}
                </div>
              </div>
              <div className="grid md:grid-cols-4 grid-cols-1 gap-2 mb-2 items-center">
                <Label>
                  Tempat Lahir{" "}
                  <span className="text-red-500 tex-[13px]">*</span>
                </Label>
                <div className="md:col-span-3 col-span-full">
                  <Input
                    name="tempat_lahir"
                    onChange={(e) => {
                      handleChange("tempat_lahir", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-4 grid-cols-1 gap-2 mb-2 items-center">
                <Label>
                  Tanggal Lahir{" "}
                  <span className="text-red-500 tex-[13px]">*</span>
                </Label>
                <div className="md:col-span-3 col-span-full">
                  <Input
                    name="tanggal_lahir"
                    type="date"
                    onChange={(e) => {
                      handleChange("tanggal_lahir", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-4 grid-cols-1 gap-2 mb-2 items-center">
                <Label>
                  Nomor Kartu Keluarga{" "}
                  <span className="text-red-500 tex-[13px]">*</span>
                </Label>
                <div className="md:col-span-3 col-span-full">
                  <Input
                    name="nomor_kk"
                    onChange={(e) => {
                      handleChange("nomor_kk", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-4 grid-cols-1 gap-2 mb-2 items-center">
                <Label>
                  Nama Anggota Keluarga{" "}
                  <span className="text-red-500 tex-[13px]">*</span>
                </Label>
                <div className="md:col-span-3 col-span-full">
                  <Input
                    name="nama"
                    onChange={(e) => {
                      handleChange("nama", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-4 grid-cols-1 gap-2 mb-2 items-center">
                <Label>
                  Status Hubungan Keluarga{" "}
                  <span className="text-red-500 tex-[13px]">*</span>
                </Label>
                <div className="md:col-span-3 col-span-full">
                  <Select
                    name="status_keluarga"
                    onValueChange={(e) => {
                      handleChange("status_keluarga", e);
                    }}
                    value={undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      {hubunganKeluarga.map((item) => {
                        return (
                          <SelectItem key={key} value={item.kode}>
                            {item.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid md:grid-cols-4 grid-cols-1 gap-2 mb-2 items-center">
                <Label>
                  Pekerjaan <span className="text-red-500 tex-[13px]">*</span>
                </Label>
                <div className="md:col-span-3 col-span-full">
                  <Input
                    name="pekerjaan"
                    onChange={(e) => {
                      handleChange("pekerjaan", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-4 grid-cols-1 gap-2 mb-2 items-center">
                <Label>
                  Status Unit Perpajakan{" "}
                  <span className="text-red-500 tex-[13px]">*</span>
                </Label>
                <div className="md:col-span-3 col-span-full">
                  <Select
                    name="status_unit_pajak"
                    onValueChange={(e) => {
                      handleChange("status_unit_pajak", e);
                    }}
                    value={undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusUnitPerpajakan.map((item) => {
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
              pekerjaan, status_unit_pajak, status_ptkp, tanggal_mulai,
              tanggal_berakhir,
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
