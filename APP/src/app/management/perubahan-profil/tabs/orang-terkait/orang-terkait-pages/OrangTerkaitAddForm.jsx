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
  const [pihak, setPihak] = useState("");
  const [jenisOT, setJenisOT] = useState("");
  const [jenisWP, setJenisWP] = useState("");

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
      formData.append("jenis_pihak", pihak);
      formData.append("pic", isCheck);
      formData.append("jenis_orang_terkait", jenisOT);
      formData.append(
        "sub_jenis_orang_terkait",
        event.target.sub_jenis_orang_terkait !== undefined
          ? event.target.sub_jenis_orang_terkait.value
          : ""
      );
      formData.append("identitas", event.target.identitas.value);
      formData.append("name", event.target.person_name.value);
      formData.append(
        "nomor_paspor",
        event.target.nomor_paspor !== undefined
          ? event.target.nomor_paspor.value
          : ""
      );
      formData.append(
        "kewarganegaraan",
        event.target.kewarganegaraan !== undefined
          ? event.target.kewarganegaraan.value
          : ""
      );
      formData.append(
        "negara_asal",
        event.target.negara_asal !== undefined
          ? event.target.negara_asal.value
          : ""
      );
      formData.append(
        "email",
        event.target.email !== undefined ? event.target.email.value : ""
      );
      formData.append(
        "nomor_telepon",
        event.target.nomor_telepon !== undefined
          ? event.target.nomor_telepon.value
          : ""
      );
      formData.append(
        "tanggal_mulai",
        event.target.tanggal_mulai !== undefined
          ? event.target.tanggal_mulai.value
          : ""
      );
      formData.append(
        "tanggal_berakhir",
        event.target.tanggal_berakhir !== undefined
          ? event.target.tanggal_berakhir.value
          : ""
      );
      formData.append("jenis_wp", jenisWP);
      formData.append(
        "keterangan",
        event.target.keterangan !== undefined
          ? event.target.keterangan.value
          : ""
      );
      formData.append(
        "kriteria_pemilik_manfaat",
        event.target.kriteria_pemilik_manfaat !== undefined
          ? event.target.kriteria_pemilik_manfaat.value
          : ""
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
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mb-4 p-1">
                  <div className="grid grid-cols-1 md:col-span-1 col-span-2 content-between h-16 ">
                    <h1 className="leading-none text-sm font-medium">
                      Jenis Pihak Terkait
                    </h1>
                    <Select
                      name="jenis_pihak"
                      onValueChange={(e) => {
                        handleChange("jenis_pihak", e);
                        setPihak(e);
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

                  {pihak === "jp-1" && (
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
                  )}

                  {pihak === "jp-1" && (
                    <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                      <h1 className="leading-none text-sm font-medium">
                        Jenis Orang Terkait
                      </h1>
                      <Select
                        name="jenis_orang_terkait"
                        onValueChange={(e) => {
                          handleChange("jenis_orang_terkait", e);
                          setJenisOT(e);
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
                  )}

                  {jenisOT && jenisOT !== "jot-3" && (
                    <div className="grid grid-cols-1 md:col-span-1 col-span-2 content-between h-16 ">
                      <h1 className="leading-none text-sm font-medium">
                        Sub Jenis Orang Terkait
                      </h1>
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
                  )}

                  {/* <div className="grid  grid-cols-1 gap-5 col-span-2 md:col-span-1"> */}
                  <div className="col-span-2 md:col-span-1">
                    <InputVertical
                      name="identitas"
                      title="NIK/NPWP"
                      onChange={(e) => {
                        handleChange("identitas", e.value.target);
                      }}
                      error={errors.identitas}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <InputVertical
                      name="person_name"
                      title="Person Name"
                      onChange={(e) => {
                        handleChange("person_name", e.value.target);
                      }}
                      error={errors.person_name}
                    />
                  </div>
                  {/* </div> */}

                  {pihak === "jp-1" && isCheck === 0 && (
                    <InputVertical
                      name="nomor_paspor"
                      title="Nomor Paspor"
                      onChange={(e) => {
                        handleChange("nomor_paspor", e.value.target);
                      }}
                    />
                  )}

                  {pihak === "jp-1" && (
                    <>
                      <div className="grid grid-cols-1 content-between h-16">
                        <h1 className="leading-none text-sm font-medium">
                          Kewarganegaraan
                        </h1>
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
                      <div className="grid grid-cols-1 content-between h-16">
                        <h1 className="leading-none text-sm font-medium">
                          Negara Asal
                        </h1>
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
                    </>
                  )}

                  {pihak === "jp-2" && (
                    <div className="grid grid-cols-1 content-between h-16">
                      <h1 className="leading-none text-sm font-medium">
                        Jenis Wajib Pajak Terkait
                      </h1>
                      <Select
                        name="jenis_wp"
                        onValueChange={(e) => {
                          handleChange("jenis_wp", e);
                          setJenisWP(e);
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
                    </div>
                  )}

                  {jenisWP === "jwp-2" && (
                    <InputVertical
                      name="keterangan"
                      title=" Keterangan"
                      onChange={(e) => {
                        handleChange("keterangan", e.value.target);
                      }}
                    />
                  )}

                  {jenisWP === "jwp-3" && (
                    <div className="grid grid-cols-1 content-between h-16">
                      <h1 className="leading-none text-sm font-medium">
                        Kriteria Pemilik Manfaat
                      </h1>
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
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={!pihak} pending={isPending}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
