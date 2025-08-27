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
import { orangTerkaitUpdate } from "@/app/management/perubahan-profil/tabs/orang-terkait/orang-terkait-components/OrangTerkaitService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useValidateInput } from "@/hooks/use-validate-input";
import { dateStrip } from "@/components/custom/DateFormatted";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  jenisOrangTerkait,
  jenisPihak,
  jenisWajibPajakTerkait,
  kewarganegaraanTerkait,
  kriteriaPemilikManfaat,
  subJenisOrangTerkait,
} from "../../../data/orangTerkaitDataList";
import { InputVertical } from "@/components/custom/input-custom";
import { Checkbox } from "@/components/ui/checkbox";
import { countryList } from "../../../data/country";

export default function OrangTerkaitUpdateForm({ id, onClose }) {
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction, clientState } = useClient();
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(0);
  const [input, setInput] = useState({});
  const [isCheck, setIsCheck] = useState(false);
  const [pihak, setPihak] = useState("");
  const [jenisOT, setJenisOT] = useState("");
  const [jenisWP, setJenisWP] = useState("");
  const clientId = useLocalStorage.get("clientId");

  const { errors, handleChange } = useValidateInput({
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

  useEffect(() => {
    const getData = clientState.data[0].orang_terkait.find(
      (item) => item._id === id
    );

    setInput({
      jenis_pihak: getData.jenis_pihak,
      pic: getData.pic,
      jenis_orang_terkait: getData.jenis_orang_terkait,
      sub_jenis_orang_terkait: getData.sub_jenis_orang_terkait,
      identitas: getData.identitas,
      person_name: getData.name,
      nomor_paspor: getData.nomor_paspor,
      kewarganegaraan: getData.kewarganegaraan,
      negara_asal: getData.negara_asal,
      email: getData.email,
      nomor_telepon: getData.nomor_telepon,
      tanggal_mulai: getData.tanggal_mulai,
      tanggal_berakhir: getData.tanggal_berakhir,
      jenis_wp: getData.jenis_wp,
      keterangan: getData.keterangan,
      kriteria_pemilik_manfaat: getData.kriteria_pemilik_manfaat,
    });

    setPihak(getData.jenis_pihak);
    setIsCheck(getData.pic);
    setJenisOT(getData.jenis_orang_terkait);
    setJenisWP(getData.jenis_wp);
    setIsOpen(true);
  }, [id, clientState]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("jenis_pihak", pihak);
      formData.append("pic", isCheck);
      formData.append("jenis_orang_terkait", jenisOT);
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
      formData.append("jenis_wp", jenisWP);
      formData.append("keterangan", input.keterangan);
      formData.append(
        "kriteria_pemilik_manfaat",
        input.kriteria_pemilik_manfaat
      );

      await orangTerkaitUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update Related Person Failed",
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
              title: "Update Related Person Success",
              message: "Related Person updated successfully",
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
              Update Related Person
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px] max-h-[100vh] overflow-auto">
            <DialogTitle>Update Related Person</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="grid grid-cols-1 my-4  items-end">
                <div className="col-span-1">
                  <div className="grid xl:grid-cols-2 grid-cols-1 gap-5 mb-4 p-1">
                    <div className="grid grid-cols-1 content-between h-16">
                      <h1 className="leading-none text-sm font-medium">
                        Jenis Pihak Terkait
                      </h1>
                      <Select
                        name="jenis_pihak"
                        value={String(input.jenis_pihak)}
                        onValueChange={(e) => {
                          handleChange("jenis_pihak", e);
                          setInput({ ...input, jenis_pihak: e });
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
                            setInput({ ...input, pic: isCheck });
                          }}
                          checked={Boolean(isCheck)}
                        />
                      </div>
                    )}

                    {pihak === "jp-1" && (
                      <div className="grid grid-cols-1 content-between h-16">
                        <h1 className="leading-none text-sm font-medium">
                          Jenis Orang Terkait
                        </h1>
                        <Select
                          name="jenis_orang_terkait"
                          value={String(input.jenis_orang_terkait)}
                          onValueChange={(e) => {
                            handleChange("jenis_orang_terkait", e);
                            setInput({ ...input, jenis_orang_terkait: e });
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
                      <div className="grid grid-cols-1 content-between h-16">
                        <h1 className="leading-none text-sm font-medium">
                          Sub Jenis Orang Terkait
                        </h1>
                        <Select
                          name="sub_jenis_orang_terkait"
                          value={String(input.sub_jenis_orang_terkait)}
                          onValueChange={(e) => {
                            handleChange("sub_jenis_orang_terkait", e);
                            setInput({ ...input, sub_jenis_orang_terkait: e });
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

                    <InputVertical
                      name="identitas"
                      title="NIK/NPWP"
                      onChange={(e) => {
                        handleChange("identitas", e.value.target);
                        setInput({ ...input, identitas: e.value.target });
                      }}
                      value={String(input.identitas)}
                      error={errors.identitas}
                    />

                    <InputVertical
                      name="person_name"
                      title="Person Name"
                      onChange={(e) => {
                        handleChange("person_name", e.value.target);
                        setInput({ ...input, person_name: e.value.target });
                      }}
                      value={String(input.person_name)}
                      error={errors.person_name}
                    />

                    {isCheck === true && (
                      <InputVertical
                        name="nomor_paspor"
                        title="Nomor Paspor"
                        onChange={(e) => {
                          handleChange("nomor_paspor", e.value.target);
                          setInput({ ...input, nomor_paspor: e.value.target });
                        }}
                        value={String(input.nomor_paspor)}
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
                            value={String(input.kewarganegaraan)}
                            onValueChange={(e) => {
                              handleChange("kewarganegaraan", e);
                              setInput({ ...input, kewarganegaraan: e });
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih" />
                            </SelectTrigger>
                            <SelectContent>
                              {kewarganegaraanTerkait.map((item, key) => {
                                return (
                                  <SelectItem
                                    key={key}
                                    value={String(item.kode)}
                                  >
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
                            value={String(input.negara_asal)}
                            onValueChange={(e) => {
                              handleChange("negara_asal", e);
                              setInput({ ...input, negara_asal: e });
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih" />
                            </SelectTrigger>
                            <SelectContent>
                              {countryList.map((item, key) => {
                                return (
                                  <SelectItem
                                    key={key}
                                    value={String(item.kode)}
                                  >
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
                            setInput({ ...input, email: e.value.target });
                          }}
                          value={String(input.email)}
                          error={errors.email}
                        />

                        <InputVertical
                          name="nomor_telepon"
                          title=" Nomor Telepon"
                          type="tel"
                          onChange={(e) => {
                            handleChange("nomor_telepon", e.value.target);
                            setInput({
                              ...input,
                              nomor_telepon: e.value.target,
                            });
                          }}
                          value={String(input.nomor_telepon)}
                          error={errors.nomor_telepon}
                        />

                        <InputVertical
                          name="tanggal_mulai"
                          title=" Tanggal Mulai"
                          type="date"
                          onChange={(e) => {
                            handleChange("tanggal_mulai", e.value.target);
                            setInput({
                              ...input,
                              tanggal_mulai: e.value.target,
                            });
                          }}
                          value={dateStrip(input.tanggal_mulai)}
                        />

                        <InputVertical
                          name="tanggal_berakhir"
                          title=" Tanggal Berakhir"
                          type="date"
                          onChange={(e) => {
                            handleChange("tanggal_berakhir", e.value.target);
                            setInput({
                              ...input,
                              tanggal_berakhir: e.value.target,
                            });
                          }}
                          value={dateStrip(input.tanggal_berakhir)}
                        />
                      </>
                    )}

                    <div className="grid grid-cols-1 content-between h-16">
                      <h1 className="leading-none text-sm font-medium">
                        Jenis Wajib Pajak Terkait {jenisWP}
                      </h1>
                      <Select
                        name="jenis_wp"
                        value={String(input.jenis_wp)}
                        onValueChange={(e) => {
                          handleChange("jenis_wp", e);
                          setInput({ ...input, jenis_wp: e });
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

                    {jenisWP === "jwp-2" && (
                      <InputVertical
                        name="keterangan"
                        title=" Keterangan"
                        onChange={(e) => {
                          handleChange("keterangan", e.target.value);
                          setInput({
                            ...input,
                            keterangan: e.target.value,
                          });
                        }}
                        value={String(input.keterangan)}
                      />
                    )}

                    {jenisWP === "jwp-3" && (
                      <div className="grid grid-cols-1 content-between h-16">
                        <h1 className="leading-none text-sm font-medium">
                          Kriteria Pemilik Manfaat
                        </h1>
                        <Select
                          name="kriteria_pemilik_manfaat"
                          value={String(input.kriteria_pemilik_manfaat)}
                          onValueChange={(e) => {
                            handleChange("kriteria_pemilik_manfaat", e);
                            setInput({ ...input, kriteria_pemilik_manfaat: e });
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
