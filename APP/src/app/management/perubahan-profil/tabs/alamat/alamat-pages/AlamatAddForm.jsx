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
  InputHorizontal,
  InputVertical,
} from "@/components/custom/input-custom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import { alamatClientCreate } from "@/app/management/perubahan-profil/tabs/alamat/alamat-components/AlamatService";
import { clientFirst } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilService";
import {
  useClient,
  useClientDispatch,
} from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { countryList } from "../../../data/country";
import { provinceList } from "../../../data/province";
import {
  jenisAlamat,
  jenisWpOption,
  kppOption,
  pengawasOption,
} from "@/helpers/variables";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { isValid } from "date-fns";

export default function ClientAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();
  const clientId = useLocalStorage.get("clientId") ?? "";
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction } = useClient();
  const [isCheck, setIsCheck] = useState(false);
  const [isCountry, setIsCountry] = useState("");
  const [kodeArea, setKodeArea] = useState("");

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      negara: "required",
      jenis_alamat: "required",
      alamat: "required|string",
      tanggal_mulai: "required",
      kode_kpp: "required",
      bagian_pengawasan: "required",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("clientId", clientId);
      formData.append("negara", event.target.negara.value);
      formData.append("jenis_alamat", event.target.jenis_alamat.value);
      formData.append("alamat", event.target.alamat.value);
      formData.append(
        "rt",
        event.target.rt !== undefined ? event.target.rt.value : ""
      );
      formData.append(
        "rw",
        event.target.rw !== undefined ? event.target.rw.value : ""
      );
      formData.append(
        "provinsi",
        event.target.provinsi !== undefined ? event.target.provinsi.value : ""
      );
      formData.append(
        "kabupaten",
        event.target.kabupaten !== undefined ? event.target.kabupaten.value : ""
      );
      formData.append(
        "kecamatan",
        event.target.kecamatan !== undefined ? event.target.kecamatan.value : ""
      );
      formData.append(
        "desa",
        event.target.desa !== undefined ? event.target.desa.value : ""
      );
      formData.append("kode_area", kodeArea);
      formData.append(
        "kode_pos",
        event.target.kode_pos !== undefined ? event.target.kode_pos.value : ""
      );
      formData.append(
        "data_geometrik",
        event.target.data_geometrik !== undefined
          ? event.target.data_geometrik.value
          : ""
      );
      formData.append("disewa", isCheck);
      formData.append("tanggal_mulai", event.target.tanggal_mulai.value);
      formData.append("tanggal_berakhir", event.target.tanggal_berakhir.value);
      formData.append("kode_kpp", event.target.kode_kpp.value);
      formData.append(
        "bagian_pengawasan",
        event.target.bagian_pengawasan.value
      );
      formData.append(
        "identitas_pemilik",
        event.target.identitas_pemilik !== undefined
          ? event.target.identitas_pemilik.value
          : ""
      );
      formData.append(
        "nama_pemilik",
        event.target.nama_pemilik !== undefined
          ? event.target.nama_pemilik.value
          : ""
      );
      formData.append(
        "tanggal_mulai_sewa",
        event.target.tanggal_mulai_sewa !== undefined
          ? event.target.tanggal_mulai_sewa.value
          : ""
      );
      formData.append(
        "tanggal_sewa_berakhir",
        event.target.tanggal_sewa_berakhir !== undefined
          ? event.target.tanggal_sewa_berakhir.value
          : ""
      );

      await alamatClientCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Client Success",
              message: "Client added successfully",
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
              title: "Add User Failed",
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
        <DialogContent className="sm:max-w-[850px] max-h-[800px] overflow-auto">
          <DialogTitle>Input New Client</DialogTitle>
          <DialogDescription>Add a new Client to the system.</DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 my-4  items-end overflow-auto">
              <div className="col-span-1">
                <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 mb-4">
                  <div>
                    <h1 className="font-medium mb-2">
                      Negara <span className="text-[13px] text-red-500">*</span>
                    </h1>
                    <Select
                      name="negara"
                      onValueChange={(e) => {
                        handleChange("negara", e);
                        setIsCountry(e);
                      }}
                      value={"" || undefined}
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
                      }}
                      value={"" || undefined}
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
                <div className="grid xl:grid-cols-6 grid-cols-1 gap-4 my-4">
                  <Textarea
                    placeholder="Detail Alamat"
                    name="alamat"
                    className={
                      isCountry === "ID"
                        ? "xl:col-span-5 col-span-full"
                        : "col-span-full"
                    }
                    onChange={(e) => {
                      handleChange("alamat", e.target.value);
                    }}
                  />

                  {isCountry === "ID" && (
                    <div className="col-span-1 grid xl:grid-cols-1 grid-cols-2 gap-4">
                      <Input placeholder="RT" name="rt" className="my-2" />
                      <Input placeholder="RW" name="rw" className="my-2" />
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
                        }}
                        value={"" || undefined}
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
                        }}
                        value={"" || undefined}
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
                      <h1 className="mb-2">Kecamatan</h1>
                      <Select
                        name="kecamatan"
                        onValueChange={(e) => {
                          handleChange("kecamatan", e);
                        }}
                        value={"" || undefined}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih" />
                        </SelectTrigger>
                        <SelectContent>
                          {jenisWpOption.map((item, key) => {
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
                        }}
                        value={"" || undefined}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih" />
                        </SelectTrigger>
                        <SelectContent>
                          {jenisWpOption.map((item, key) => {
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
                        }}
                        disabled={true}
                        placeholder="Kode Wilayah automatically"
                      />
                      <Input
                        name="kode_pos"
                        title="Kode Pos"
                        onChange={(e) => {
                          handleChange("kode_pos", e.target.value);
                        }}
                        placeholder="Kode Pos"
                      />
                    </div>

                    <div className="xl:col-span-3 col-span-full">
                      <Input
                        name="data_geometrik"
                        placeholder="Data Geometrik"
                        onChange={(e) => {
                          handleChange("data_geometrik", e.target.value);
                        }}
                        className="w-full"
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
                    }}
                  />
                </div>

                {isCheck && (
                  <div className="grid xl:grid-cols-2 grid-cols-1 gap-4  mb-8">
                    <Input
                      placeholder="NIK/NPWP Pemilik Tempat Sewa"
                      name="identitas_pemilik"
                      onChange={(e) => {
                        handleChange("identitas_pemilik", e.target.value);
                      }}
                    />

                    <Input
                      name="nama_pemilik"
                      placeholder="Nama Pemilik Tempat Sewa"
                      onChange={(e) => {
                        handleChange("nama_pemilik", e.target.value);
                      }}
                    />
                    {errors.identitas_pemilik}

                    <InputVertical
                      name="tanggal_mulai_sewa"
                      type="date"
                      title="Tanggal Mulai Sewa"
                      onChange={(e) => {
                        handleChange("tanggal_mulai_sewa", e.target.value);
                      }}
                    />

                    <InputVertical
                      name="tanggal_sewa_berakhir"
                      type="date"
                      title="Tanggal Sewa Berakhir"
                      onChange={(e) => {
                        handleChange("tanggal_sewa_berakhir", e.target.value);
                      }}
                    />
                  </div>
                )}

                <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 my-2">
                  <div>
                    <Label>
                      Tanggal Mulai{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </Label>
                    <Input
                      name="tanggal_mulai"
                      type="date"
                      onChange={(e) => {
                        handleChange("tanggal_mulai", e.target.value);
                      }}
                      error={errors.tanggal_mulai}
                    />
                  </div>

                  <InputVertical
                    name="tanggal_berakhir"
                    type="date"
                    title="Tanggal Berakhir"
                    className="my-2"
                    onChange={(e) => {
                      handleChange("tanggal_berakhir", e.target.value);
                    }}
                  />
                </div>
                <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 my-2">
                  <div>
                    <Label>
                      Kode KPP{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </Label>
                    <Select
                      value={"" || undefined}
                      name="kode_kpp"
                      onValueChange={(e) => {
                        handleChange("kode_kpp", e);
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

                  <div>
                    <Label>
                      Seksi Pengawasan{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </Label>
                    <Select
                      value={"" || undefined}
                      name="bagian_pengawasan"
                      onValueChange={(e) => {
                        handleChange("bagian_pengawasan", e);
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
                    {errors.bagian_pengawasan}
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
