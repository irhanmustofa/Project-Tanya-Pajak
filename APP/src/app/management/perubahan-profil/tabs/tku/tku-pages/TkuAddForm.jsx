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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import { tkuCreate } from "@/app/management/perubahan-profil/tabs/tku/tku-components/TkuService";
import { clientFirst } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilService";
import {
  useClient,
  useClientDispatch,
} from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { provinceList } from "../../../data/province";
import { kppOption } from "@/helpers/variables";
import { jenisNitku, pengawasOption } from "../../../data/alamatDataList";
import { InputVertical } from "@/components/custom/input-custom";

export default function TkuAddForm({ onClose }) {
  const { clientAction } = useClient();
  const dialogDispatch = useDialogDispatch();
  const clientDispatch = useClientDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const [isPending, startTrasition] = useTransition();

  const clientId = useLocalStorage.get("clientId") ?? "";
  const [isOpen, setIsOpen] = useState(true);
  const [kodeArea, setKodeArea] = useState("");
  const [isDiSewa, setIsDiSewa] = useState(0);
  const [isRetail, setIsRetail] = useState(0);
  const [isKawasanBebas, setIsKawasanBebas] = useState(0);
  const [isKawasanKhusus, setIsKawasanKhusus] = useState(0);
  const [isPenimbun, setIsPenimbun] = useState(0);
  const [isVirtual, setIsVirtual] = useState(0);
  const [isUtama, setIsUtama] = useState(0);

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      jenis_pihak: "required|string",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("jenis_pihak", pihak);

      await tkuCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add TKU Success",
              message: "TKU added successfully",
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
              title: "Add TKU Failed",
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
          <DialogTitle>Input New TKU</DialogTitle>
          <DialogDescription>Add a new TKU to the system.</DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 my-4  items-end overflow-auto justify-center p-1">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mb-2">
                <InputVertical name="nitku" title="NITKU" />
                <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                  <h1 className="leading-none text-sm font-medium">
                    Jenis TKU{" "}
                    <span className="text-[13px] text-red-500">*</span>
                  </h1>
                  <Select
                    name="jenis_tku"
                    onVlueChange={(e) => {
                      handleChange("jenis_tku", e);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      {jenisNitku.map((item, key) => {
                        return (
                          <SelectItem key={key} value={item.kode}>
                            {item.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {errors.jenis_tku}
                </div>

                <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                  <h1 className="leading-none text-sm font-medium">
                    Nama TKU <span className="text-[13px] text-red-500">*</span>
                  </h1>
                  <Input
                    name="nama_tku"
                    onChange={(e) => {
                      handleChange("nama_tku", e.target.value);
                    }}
                  />
                  {errors.nama_tku}
                </div>

                <InputVertical name="deskripsi_tku" title="Deskripsi TKU" />

                <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                  <h1 className="leading-none text-sm font-medium">
                    KLU TKU <span className="text-[13px] text-red-500">*</span>
                  </h1>
                  <Input
                    name="klu_tku"
                    onChange={(e) => {
                      handleChange("klu_tku", e.target.value);
                    }}
                  />
                  {errors.klu_tku}
                </div>

                <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                  <h1 className="leading-none text-sm font-medium">
                    Deskripsi KLU TKU{" "}
                    <span className="text-[13px] text-red-500">*</span>
                  </h1>
                  <Input
                    name="deskripsi_klu_tku"
                    onChange={(e) => {
                      handleChange("deskripsi_klu_tku", e.target.value);
                    }}
                  />
                  {errors.deskripsi_klu_tku}
                </div>

                <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                  <h1 className="leading-none text-sm font-medium">
                    Tambah PIC TKU{" "}
                    <span className="text-[13px] text-red-500">*</span>
                  </h1>
                  <Input
                    name="pic"
                    onChange={(e) => {
                      handleChange("pic", e.target.value);
                    }}
                  />
                  {errors.pic}
                </div>

                <div>
                  <h1 className="font-medium mb-2">
                    Jenis Alamat{" "}
                    <span className="text-[13px] text-red-500">*</span>
                  </h1>
                  <Select
                    name="jenis_alamat"
                    disabled={true}
                    value={"" || undefined}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key={1} value="tku-01">
                        {"Tempat Kegiatan Usaha"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-6 grid-cols-1 gap-4 my-4">
                <Textarea
                  placeholder="Detail Alamat"
                  name="alamat"
                  className={"md:col-span-5 col-span-full"}
                  onChange={(e) => {
                    handleChange("alamat", e.target.value);
                  }}
                />

                <div className="col-span-1 grid md:grid-cols-1 grid-cols-2 gap-4">
                  <Input placeholder="RT" name="rt" className="my-1" />
                  <Input placeholder="RW" name="rw" className="my-1" />
                </div>
              </div>
              {errors.rt}
              {errors.rw}
              {errors.alamat}

              <div className="grid md:grid-cols-2 grid-cols-1 my-2 gap-4">
                <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                  <h1 className="leading-none text-sm font-medium">
                    Provinsi <span className="text-[13px] text-red-500">*</span>
                  </h1>
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
                  {errors.provinsi}
                </div>

                <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                  <h1 className="leading-none text-sm font-medium">
                    Kabupaten{" "}
                    <span className="text-[13px] text-red-500">*</span>
                  </h1>
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
                  {errors.kabupaten}
                </div>

                <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                  <h1 className="leading-none text-sm font-medium">
                    Kecamatan{" "}
                    <span className="text-[13px] text-red-500">*</span>
                  </h1>
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
                      {kppOption.map((item, key) => {
                        return (
                          <SelectItem key={key} value={String(item.kode)}>
                            {item.jenis_wp}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {errors.kecamatan}
                </div>

                <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                  <h1 className="leading-none text-sm font-medium">
                    Desa
                    <span className="text-[13px] text-red-500">*</span>
                  </h1>
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
                      {kppOption.map((item, key) => {
                        return (
                          <SelectItem key={key} value={String(item.kode)}>
                            {item.jenis_wp}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {errors.desa}
                </div>
              </div>

              <div className="grid grid-cols-6 gap-4 my-4">
                <div className="md:col-span-3 col-span-full flex gap-4">
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

                <div className="md:col-span-3 col-span-full">
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

              <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-2">
                <div>
                  <Label>
                    Kode KPP <span className="text-[13px] text-red-500">*</span>
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

              <div className="flex gap-4 my-4 items-center">
                <Label>Lokasi yang Disewa</Label>
                <Checkbox
                  name="lokasi_disewa"
                  className="mt-2"
                  onCheckedChange={(e) => {
                    handleChange("lokasi_disewa", isDiSewa);
                    setIsDiSewa(isDiSewa ? 0 : 1);
                  }}
                />
              </div>

              {Boolean(isDiSewa) && (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4  mb-8">
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

              <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-2">
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
                />
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4">
                <div className="grid grid-cols-3  items-center">
                  <Label className="col-span-2">Toko Retail</Label>
                  <Checkbox
                    name="toko_retail"
                    className="mt-2"
                    onCheckedChange={(e) => {
                      setIsRetail(isRetail ? 0 : 1);
                    }}
                  />
                </div>

                <div className="grid grid-cols-3  items-center">
                  <Label className="col-span-2">Kawasan Bebas</Label>
                  <Checkbox
                    name="kawasan_bebas"
                    className="mt-2"
                    onCheckedChange={(e) => {
                      setIsKawasanBebas(isKawasanBebas ? 0 : 1);
                    }}
                  />
                </div>

                <div className="grid grid-cols-3  items-center">
                  <Label className="col-span-2">Kawasan Ekonomi Khusus</Label>
                  <Checkbox
                    name="kawasan_ekonomi_khusus"
                    className="mt-2"
                    onCheckedChange={(e) => {
                      setIsKawasanKhusus(isKawasanKhusus ? 0 : 1);
                    }}
                  />
                </div>

                <div className="grid grid-cols-3  items-center">
                  <Label className="col-span-2">Tempat Penimbun Berikat?</Label>
                  <Checkbox
                    name="tempat_penimbun_berikat"
                    className="mt-2"
                    onCheckedChange={(e) => {
                      setIsPenimbun(isPenimbun ? 0 : 1);
                    }}
                  />
                </div>
              </div>

              <InputVertical
                name="nomor_surat_keputusan"
                placeholder="Nomor Surat Keputusan"
                className="my-4"
              />

              <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-2">
                <InputVertical
                  name="tanggal_mulai_keputusan"
                  type="date"
                  title="Decree Number Date Valid From"
                />

                <InputVertical
                  name="tanggal_keputusan_berakhir"
                  type="date"
                  title="Decree Number Date Valid To"
                />

                <div className="grid grid-cols-3 items-center">
                  <Label className="col-span-2">Kantor Virtual</Label>
                  <Checkbox
                    name="kantor_virtual"
                    className="mt-2"
                    onCheckedChange={(e) => {
                      setIsVirtual(isVirtual ? 0 : 1);
                    }}
                  />
                </div>

                <div className="grid grid-cols-3 items-center">
                  <Label className="col-span-2">Alamat Utama KPK</Label>
                  <Checkbox
                    name="alamat_utama_kpk"
                    className="mt-2"
                    onCheckedChange={(e) => {
                      setIsUtama(isUtama ? 0 : 1);
                    }}
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
