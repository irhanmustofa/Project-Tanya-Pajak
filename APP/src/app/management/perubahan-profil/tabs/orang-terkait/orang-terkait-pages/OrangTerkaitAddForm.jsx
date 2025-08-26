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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { InputVertical } from "@/components/custom/input-custom";
import { useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import { orangTerkaitCreate } from "@/app/management/perubahan-profil/tabs/orang-terkait/orang-terkait-components/OrangTerkaitService";
import { clientFirst } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilService";
import {
  useClient,
  useClientDispatch,
} from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  jenisOrangTerkait,
  jenisPihak,
  jenisWajibPajakTerkait,
  kewarganegaraanTerkait,
  kriteriaPemilikManfaat,
  subJenisOrangTerkait,
} from "../../../data/orangTerkaitDataList";
import { countryList } from "../../../data/country";

export default function OrangTerkaitAddForm({ onClose }) {
  const { clientAction } = useClient();
  const dialogDispatch = useDialogDispatch();
  const clientDispatch = useClientDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const [isPending, startTrasition] = useTransition();

  const clientId = useLocalStorage.get("clientId") ?? "";
  const [isOpen, setIsOpen] = useState(true);
  const [isCheck, setIsCheck] = useState(0);

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      jenis_pihak: "required|string",
      jenis_orang_terkait: "required",
      identitas: "required|string|max:17|min:16",
      person_name: "required|string",
      email: "required|email",
      nomor_telepon: "required|string|max:14|min:10",
      jenis_wp: "required|string",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("jenis_pihak", input.jenis_pihak);
      formData.append("pic", input.pic);
      formData.append("jenis_orang_terkait", input.jenis_orang_terkait);
      formData.append("sub_jenis_orang_terkait", input.sub_jenis_orang_terkait);
      formData.append("identitas", input.identitas);
      formData.append("name", input.person_name);
      formData.append("nomor_paspor", input.nomor_paspor);
      formData.append("kewarganegaraan", input.kewarganegaraan);
      formData.append("negara_asal", input.negara_asal);
      formData.append("email", input.email);
      formData.append("nomor_telepon", input.nomor_telepon);
      formData.append("tanggal_mulai", input.tanggal_mulai);
      formData.append("tanggal_berakhir", input.tanggal_berakhir);
      formData.append("jenis_wp", input.jenis_wp);
      formData.append("keterangan", input.keterangan);
      formData.append(
        "kriteria_pemilik_manfaat",
        input.kriteria_pemilik_manfaat
      );

      await orangTerkaitCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Related Person Success",
              message: "Related Person added successfully",
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
              title: "Add Related Person Failed",
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
        <DialogContent className="sm:max-w-[700px] max-h-[100vh] overflow-auto ">
          <DialogTitle>Input New Related Person</DialogTitle>
          <DialogDescription>
            Add a new Related Person to the system.
          </DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 my-4  items-end overflow-auto justify-center">
              <div className="col-span-1">
                <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 mb-4 p-2">
                  <div>
                    <Label>Jenis Pihak Terkait</Label>
                    <Select
                      name="jenis_pihak"
                      onValueChange={(e) => {
                        handleChange("jenis_pihak", e);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                      <SelectContent>
                        {jenisPihak.map((item, key) => {
                          return (
                            <SelectItem key={key} value={String(item.kode)}>
                              {item.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-4 my-4 items-center">
                    <Label>PIC?</Label>
                    <Checkbox
                      name="pic"
                      className="mt-2"
                      onCheckedChange={(e) => {
                        handleChange("pic", isCheck);
                        setIsCheck(isCheck ? 0 : 1);
                      }}
                      checked={Boolean(isCheck)}
                    />
                  </div>
                  <div>
                    <Label>Jenis Orang Terkait</Label>
                    <Select
                      name="jenis_orang_terkait"
                      onValueChange={(e) => {
                        handleChange("jenis_orang_terkait", e);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                      <SelectContent>
                        {jenisOrangTerkait.map((item, key) => {
                          return (
                            <SelectItem key={key} value={String(item.kode)}>
                              {item.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Sub Jenis Orang Terkait</Label>
                    <Select
                      name="sub_jenis_orang_terkait"
                      onValueChange={(e) => {
                        handleChange("sub_jenis_orang_terkait", e);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                      <SelectContent>
                        {subJenisOrangTerkait.map((item, key) => {
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
                    name="identitas"
                    title="NIK/NPWP"
                    onChange={(e) => {
                      handleChange("identitas", e.value.target);
                    }}
                    error={errors.identitas}
                  />
                  <InputVertical
                    name="person_name"
                    title="NIK/NPWP"
                    onChange={(e) => {
                      handleChange("person_name", e.value.target);
                    }}
                    error={errors.person_name}
                  />
                  <InputVertical
                    name="nomor_paspor"
                    title="Nomor Paspor"
                    onChange={(e) => {
                      handleChange("nomor_paspor", e.value.target);
                    }}
                  />
                  <div>
                    <Label>Kewarganegaraan</Label>
                    <Select
                      name="kewarganegaraan"
                      onValueChange={(e) => {
                        handleChange("kewarganegaraan", e);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                      <SelectContent>
                        {kewarganegaraanTerkait.map((item, key) => {
                          return (
                            <SelectItem key={key} value={String(item.kode)}>
                              {item.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Negara Asal</Label>
                    <Select
                      name="negara_asal"
                      onValueChange={(e) => {
                        handleChange("negara_asal", e);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryList.map((item, key) => {
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
                    name="email"
                    title="Email"
                    type="email"
                    onChange={(e) => {
                      handleChange("email", e.value.target);
                    }}
                    error={errors.email}
                  />
                  <InputVertical
                    name="nomor_telepon"
                    title=" Nomor Telepon"
                    type="tel"
                    onChange={(e) => {
                      handleChange("nomor_telepon", e.value.target);
                    }}
                    error={errors.nomor_telepon}
                  />
                  <InputVertical
                    name="tanggal_mulai"
                    title=" Tanggal Mulai"
                    type="date"
                    onChange={(e) => {
                      handleChange("tanggal_mulai", e.value.target);
                    }}
                  />
                  <InputVertical
                    name="tanggal_berakhir"
                    title=" Tanggal Berakhir"
                    type="date"
                    onChange={(e) => {
                      handleChange("tanggal_berakhir", e.value.target);
                    }}
                  />
                  <Select
                    name="jenis_wp"
                    onValueChange={(e) => {
                      handleChange("jenis_wp", e);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      {jenisWajibPajakTerkait.map((item, key) => {
                        return (
                          <SelectItem key={key} value={String(item.kode)}>
                            {item.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  <InputVertical
                    name="keterangan"
                    title=" Keterangan"
                    onChange={(e) => {
                      handleChange("keterangan", e.value.target);
                    }}
                  />

                  <Select
                    name="kriteria_pemilik_manfaat"
                    onValueChange={(e) => {
                      handleChange("kriteria_pemilik_manfaat", e);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      {kriteriaPemilikManfaat.map((item, key) => {
                        return (
                          <SelectItem key={key} value={String(item.kode)}>
                            {item.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
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
