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

import { alamatClientUpdate } from "@/app/management/perubahan-profil/tabs/alamat/alamat-components/AlamatService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { InputVertical } from "@/components/custom/input-custom";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useValidateInput } from "@/hooks/use-validate-input";
import { dateStrip } from "@/components/custom/DateFormatted";
import {
  jenisAlamat,
  kppOption,
  pengawasOption,
} from "@/app/management/perubahan-profil/data/alamatDataList";
import { countryList } from "@/app/management/perubahan-profil/data/country";
import { provinceList } from "@/app/management/perubahan-profil/data/province";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function AlamatClientUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isCheck, setIsCheck] = useState(false);
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction, clientState } = useClient();
  const clientId = useLocalStorage.get("clientId");
  const [isCountry, setIsCountry] = useState("");
  const [kodeArea, setKodeArea] = useState("");

  const { errors, handleChange } = useValidateInput({
    schema: {
      negara: "required",
      jenis_alamat: "required",
      alamat: "required|string",
      tanggal_mulai: "required",
      kode_kpp: "required",
      bagian_pengawasan: "required",
    },
  });

  useEffect(() => {
    const getData = clientState.data[0].alamat.find((item) => item._id === id);

    setInput({
      negara: getData.negara,
      jenis_alamat: getData.jenis_alamat,
      alamat: getData.alamat,
      rt: getData.rt,
      rw: getData.rw,
      provinsi: getData.provinsi,
      kabupaten: getData.kabupaten,
      kecamatan: getData.kecamatan,
      desa: getData.desa,
      kode_area: getData.kode_area,
      kode_pos: getData.kode_pos,
      data_geometrik: getData.data_geometrik,
      disewa: getData.disewa,
      identitas_pemilik: getData.identitas_pemilik ?? "",
      nama_pemilik: getData.nama_pemilik ?? "",
      tanggal_mulai_sewa: getData.tanggal_mulai_sewa ?? "yyyy-mm-dd",
      tanggal_sewa_berakhir: getData.tanggal_sewa_berakhir ?? "yyyy-mm-dd",
      tanggal_mulai: getData.tanggal_mulai ?? "yyyy-mm-dd",
      tanggal_berakhir: getData.tanggal_berakhir ?? "yyyy-mm-dd",
      kode_kpp: getData.kode_kpp,
      bagian_pengawasan: getData.bagian_pengawasan,
    });
    setIsCountry(getData.negara);
    setIsCheck(getData.disewa);
    setKodeArea(getData.kode_area);

    setIsOpen(true);
  }, [id, clientState]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("clientId", clientId);
      formData.append("negara", input.negara);
      formData.append("jenis_alamat", input.jenis_alamat);
      formData.append("alamat", input.alamat);
      formData.append("rt", input.rt);
      formData.append("rw", input.rw);
      formData.append("provinsi", input.provinsi);
      formData.append("kabupaten", input.kabupaten);
      formData.append("kecamatan", input.kecamatan);
      formData.append("desa", input.desa);
      formData.append("kode_area", kodeArea);
      formData.append("kode_pos", input.kode_pos);
      formData.append("data_geometrik", input.data_geometrik);
      formData.append("disewa", input.disewa);
      formData.append("identitas_pemilik", input.identitas_pemilik);
      formData.append("nama_pemilik", input.nama_pemilik);
      formData.append("tanggal_mulai_sewa", input.tanggal_mulai_sewa);
      formData.append("tanggal_sewa_berakhir", input.tanggal_sewa_berakhir);
      formData.append("tanggal_mulai", input.tanggal_mulai);
      formData.append("tanggal_berakhir", input.tanggal_berakhir);
      formData.append("kode_kpp", input.kode_kpp);
      formData.append("bagian_pengawasan", input.bagian_pengawasan);

      await alamatClientUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update Alamat Failed",
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
              title: "Update Alamat Success",
              message: "Alamat updated successfully",
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
          <DialogContent className="sm:max-w-[850px] max-h-[100vh] overflow-auto">
            <DialogTitle>Update User</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="grid grid-cols-1 my-4  items-end">
                <div className="col-span-1">
                  <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 mb-4">
                    <div>
                      <h1 className="font-medium mb-2">
                        Negara{" "}
                        <span className="text-[13px] text-red-500">*</span>
                      </h1>
                      <Select
                        name={input.negara}
                        onValueChange={(e) => {
                          handleChange("negara", e);
                          setIsCountry(e);
                          setInput({
                            ...input,
                            negara: e,
                          });
                        }}
                        value={String(input.negara)}
                      >
                        <SelectTrigger className="w-full">
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
                      {errors.negara}
                    </div>

                    <div>
                      <h1 className="font-medium mb-2">
                        Jenis Alamat{" "}
                        <span className="text-[13px] text-red-500">*</span>
                      </h1>
                      <Select
                        name="jenis_alamat"
                        onValueChange={(e) => {
                          handleChange("jenis_alamat", e);
                          setInput({
                            ...input,
                            jenis_alamat: e,
                          });
                        }}
                        value={input.jenis_alamat}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih" />
                        </SelectTrigger>
                        <SelectContent>
                          {jenisAlamat.map((item, key) => {
                            return (
                              <SelectItem key={key} value={String(item.kode)}>
                                {item.jenis}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      {errors.jenis_alamat}
                    </div>
                  </div>

                  <div className="grid xl:grid-cols-6 grid-cols-4 gap-4 my-4">
                    <Textarea
                      placeholder="Alamat"
                      name="alamat"
                      className={
                        isCountry === "ID"
                          ? "xl:col-span-5 col-span-6"
                          : "col-span-6"
                      }
                      value={input.alamat}
                      onChange={(e) => {
                        handleChange("alamat", e.target.value);
                        setInput({
                          ...input,
                          alamat: e.target.value,
                        });
                      }}
                    />

                    {isCountry === "ID" && (
                      <div className="xl:col-span-1 col-span-6 grid xl:grid-cols-1 grid-cols-2 gap-4">
                        <Input
                          placeholder="RT"
                          name="rt"
                          className="my-2"
                          value={input.rt}
                          onChange={(e) => {
                            handleChange("rt", e.target, value);
                            setInput({
                              ...input,
                              rt: e.target.value,
                            });
                          }}
                        />
                        <Input
                          placeholder="RW"
                          name="rw"
                          className="my-2"
                          value={input.rw}
                          onChange={(e) => {
                            handleChange("rw", e.target, value);
                            setInput({
                              ...input,
                              rw: e.target.value,
                            });
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {errors.alamat}

                  {isCountry === "ID" && (
                    <div className="grid xl:grid-cols-2 grid-cols-1 my-2 gap-4">
                      <div>
                        <h1 className="mb-2">Provinsi</h1>
                        <Select
                          name="provinsi"
                          onValueChange={(e) => {
                            handleChange("provinsi", e);
                            setInput({
                              ...input,
                              provinsi: e,
                            });
                          }}
                          value={String(input.provinsi)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih" />
                          </SelectTrigger>
                          <SelectContent>
                            {provinceList.map((item, key) => {
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
                        <h1 className="mb-2">Kabupaten</h1>
                        <Select
                          name="kabupaten"
                          onValueChange={(e) => {
                            handleChange("kabupaten", e);
                            setInput({
                              ...input,
                              kabupaten: e,
                            });
                          }}
                          value={String(input.kabupaten)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih" />
                          </SelectTrigger>
                          <SelectContent>
                            {provinceList.map((item, key) => {
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
                  )}

                  {isCountry === "ID" && (
                    <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 my-2">
                      <div>
                        <h1 className="mb-2">Kecamatan</h1>
                        <Select
                          name="kecamatan"
                          onValueChange={(e) => {
                            handleChange("kecamatan", e);
                            setInput({
                              ...input,
                              kecamatan: e,
                            });
                          }}
                          value={String(input.kecamatan)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih" />
                          </SelectTrigger>
                          <SelectContent>
                            {kppOption.map((item, key) => {
                              return (
                                <SelectItem key={key} value={String(item.kode)}>
                                  {item.jenis_wp}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <h1 className="mb-2">Desa</h1>
                        <Select
                          name="desa"
                          onValueChange={(e) => {
                            handleChange("desa", e);
                            setKodeArea(e);
                            setInput({
                              ...input,
                              desa: e,
                            });
                          }}
                          value={String(input.desa)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih" />
                          </SelectTrigger>
                          <SelectContent>
                            {kppOption.map((item, key) => {
                              return (
                                <SelectItem key={key} value={String(item.kode)}>
                                  {item.jenis_wp}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {isCountry === "ID" && (
                    <div className="grid grid-cols-6 gap-4 my-4">
                      <div className="xl:col-span-3 col-span-full flex gap-4">
                        <Input
                          value={kodeArea}
                          name="kode_area"
                          onChange={(e) => {
                            handleChange("kode_area", e.target.value);
                            setInput({
                              ...input,
                              kode_area: e.target.value,
                            });
                          }}
                          disabled={true}
                          placeholder="Kode Wilayah automatically"
                        />
                        <Input
                          name="kode_pos"
                          onChange={(e) => {
                            handleChange("kode_pos", e.target.value);
                            setInput({
                              ...input,
                              kode_pos: e.target.value,
                            });
                          }}
                          placeholder="Kode Pos"
                          value={input.kode_pos}
                        />
                      </div>

                      <div className="xl:col-span-3 col-span-full">
                        <Input
                          name="data_geometrik"
                          placeholder="Data Geometrik"
                          onChange={(e) => {
                            handleChange("data_geometrik", e.target.value);
                            setInput({
                              ...input,
                              data_geometrik: e.target.value,
                            });
                          }}
                          className="w-full"
                          value={input.data_geometrik}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 my-4 items-center">
                    <Label>Lokasi yang Disewa</Label>
                    <Checkbox
                      name="disewa"
                      className="mt-2"
                      onCheckedChange={(e) => {
                        handleChange("disewa", isCheck);
                        setIsCheck(isCheck ? false : true);
                        setInput({ ...input, disewa: isCheck });
                      }}
                      checked={isCheck}
                    />
                  </div>

                  {isCheck && (
                    <div className="grid xl:grid-cols-2 grid-cols-1 gap-4  mb-8">
                      <Input
                        placeholder="NIK/NPWP Pemilik Tempat Sewa"
                        name="identitas_pemilik"
                        onChange={(e) => {
                          handleChange("identitas_pemilik", e.target.value);
                          setInput({
                            ...input,
                            identitas_pemilik: e.target.value,
                          });
                        }}
                        value={String(input.identitas_pemilik)}
                      />

                      <Input
                        name="nama_pemilik"
                        placeholder="Nama Pemilik Tempat Sewa"
                        onChange={(e) => {
                          handleChange("nama_pemilik", e.target.value);
                          setInput({ ...input, nama_pemilik: e.target.value });
                        }}
                        value={String(input.nama_pemilik)}
                      />
                      {errors.identitas_pemilik}

                      <InputVertical
                        name="tanggal_mulai_sewa"
                        type="date"
                        title="Tanggal Mulai Sewa"
                        onChange={(e) => {
                          handleChange("tanggal_mulai_sewa", e.target.value);
                          setInput({
                            ...input,
                            tanggal_mulai_sewa: e.target.value,
                          });
                        }}
                        value={dateStrip(input.tanggal_mulai_sewa)}
                      />

                      <InputVertical
                        name="tanggal_sewa_berakhir"
                        type="date"
                        title="Tanggal Sewa Berakhir"
                        onChange={(e) => {
                          handleChange("tanggal_sewa_berakhir", e.target.value);
                          setInput({
                            ...input,
                            tanggal_sewa_berakhir: e.target.value,
                          });
                        }}
                        value={dateStrip(input.tanggal_sewa_berakhir)}
                      />
                    </div>
                  )}

                  <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 my-2">
                    <div className="grid gap-1">
                      <Label className="text-[14px] font-medium">
                        Tanggal Mulai{" "}
                        <span className="text-[13px] text-red-500">*</span>
                      </Label>
                      <Input
                        name="tanggal_mulai"
                        type="date"
                        onChange={(e) => {
                          handleChange("tanggal_mulai", e.target.value);
                          setInput({ ...input, tanggal_mulai: e.target.value });
                        }}
                        value={dateStrip(input.tanggal_mulai)}
                      />
                    </div>

                    <InputVertical
                      title="Tanggal Berakhir"
                      type="date"
                      name="tanggal_berakhir"
                      className="my-2"
                      onChange={(e) => {
                        handleChange("tanggal_berakhir", e.target.value);
                        setInput({
                          ...input,
                          tanggal_berakhir: e.target.value,
                        });
                      }}
                      value={dateStrip(input.tanggal_berakhir)}
                    />
                  </div>

                  <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 my-2">
                    <div className="grid gap-2">
                      <Label>
                        Kode KPP{" "}
                        <span className="text-[13px] text-red-500">*</span>
                      </Label>
                      <Select
                        value={input.kode_kpp}
                        name="kode_kpp"
                        onValueChange={(e) => {
                          handleChange("kode_kpp", e);
                          setInput({ ...input, kode_kpp: e });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih" />
                        </SelectTrigger>
                        <SelectContent>
                          {kppOption.map((item, key) => {
                            return (
                              <SelectItem key={key} value={item.kode}>
                                {item.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      {errors.kode_kpp}
                    </div>

                    <div className="grid gap-2">
                      <Label>
                        Bagian Pengawasan{" "}
                        <span className="text-[13px] text-red-500">*</span>
                      </Label>
                      <Select
                        value={String(input.bagian_pengawasan)}
                        name="bagian_pengawasan"
                        onValueChange={(e) => {
                          handleChange("bagian_pengawasan", e);
                          setInput({ ...input, bagian_pengawasan: e });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih" />
                        </SelectTrigger>
                        <SelectContent>
                          {pengawasOption.map((item, key) => {
                            return (
                              <SelectItem key={key} value={item.kode}>
                                {item.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      {errors.bagian_pegawasan}
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
