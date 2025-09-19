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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import { tkuCreate } from "@/app/management/perubahan-profil/tabs/tku/tku-components/TkuService";
import { clientFirst } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilService";
import {
  useClient,
  useClientDispatch,
} from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { kppOption } from "@/helpers/variables";
import { jenisNitku, pengawasOption } from "../../../data/alamatDataList";
import { InputVertical } from "@/components/custom/input-custom";
import provinceReq, {
  districtReq,
  regencyReq,
  villageReq,
} from "../../../data/wilayah";

export default function TkuAddForm({ onClose }) {
  const { clientAction } = useClient();
  const dialogDispatch = useDialogDispatch();
  const clientDispatch = useClientDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const [isPending, startTrasition] = useTransition();

  const clientId = useLocalStorage.get("clientId") ?? "";
  const [isOpen, setIsOpen] = useState(true);
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [province, setProvince] = useState("");
  const [districtOpen, setDistrictOpen] = useState(false);
  const [district, setDistrict] = useState("");
  const [subDistrictOpen, setSubDistrictOpen] = useState(false);
  const [subDistrict, setSubDistrict] = useState("");
  const [villageOpen, setVillageOpen] = useState(false);
  const [village, setVillage] = useState("");
  const [kodeArea, setKodeArea] = useState("");
  const [isDiSewa, setIsDiSewa] = useState(0);
  const [isRetail, setIsRetail] = useState(0);
  const [isKawasanBebas, setIsKawasanBebas] = useState(0);
  const [isKawasanKhusus, setIsKawasanKhusus] = useState(0);
  const [isPenimbun, setIsPenimbun] = useState(0);
  const [isVirtual, setIsVirtual] = useState(0);
  const [isUtama, setIsUtama] = useState(0);
  const [isDetailAlamat, setIsDetailAlamat] = useState(0);
  const [provinceState, setProvinceState] = useState([]);
  const [districtState, setDistrictState] = useState([]);
  const [subDistrictState, setSubDistrictState] = useState([]);
  const [villageState, setVillageState] = useState([]);
  const [isNSK, setIsNSK] = useState(0);

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      nitku: "required",
      jenis_tku: "required",
      nama_tku: "required",
      klu_tku: "required",
      pic_tku: "required",
      alamat: "required",
      rt: "required",
      rw: "required",
      provinsi: "required",
      kabupaten: "required",
      kecamatan: "required",
      desa: "required",
      kode_kpp: "required",
      seksi_pengawasan: "required",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("nitku", event.target.nitku.value);
      formData.append("jenis_tku", event.target.jenis_tku.value);
      formData.append("nama_tku", event.target.nama_tku.value);
      formData.append("deskripsi_tku", event.target.deskripsi_tku.value);
      formData.append("klu_tku", event.target.klu_tku.value);
      formData.append(
        "deskripsi_klu_tku",
        event.target.deskripsi_klu_tku.value
      );
      formData.append("pic_tku", event.target.pic_tku.value);
      formData.append("alamat", event.target.alamat.value);
      formData.append("rt", event.target.rt.value);
      formData.append("rw", event.target.rw.value);
      formData.append("provinsi", event.target.provinsi.value);
      formData.append("kabupaten", event.target.kabupaten.value);
      formData.append("kecamatan", event.target.kecamatan.value);
      formData.append("desa", event.target.desa.value);
      formData.append("kode_kpp", event.target.kode_kpp.value);
      formData.append("kode_wilayah", event.target.kode_wilayah.value);
      formData.append("kode_pos", event.target.kode_pos.value);
      formData.append("data_geometrik", event.target.data_geometrik.value);
      formData.append("seksi_pengawasan", event.target.seksi_pengawasan.value);
      formData.append("lokasi_disewa", isDiSewa);
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
        "tanggal_awal_sewa",
        event.target.tanggal_awal_sewa !== undefined
          ? event.target.tanggal_awal_sewa.value
          : ""
      );
      formData.append(
        "tanggal_akhir_sewa",
        event.target.tanggal_akhir_sewa !== undefined
          ? event.target.tanggal_akhir_sewa.value
          : ""
      );
      formData.append("tanggal_mulai", event.target.tanggal_mulai.value);
      formData.append("tanggal_berakhir", event.target.tanggal_berakhir.value);
      formData.append("toko_retail", isRetail);
      formData.append("kawasan_bebas", isKawasanBebas);
      formData.append("kawasan_ekonomi_khusus", isKawasanKhusus);
      formData.append("tempat_penimbunan_berikat", isPenimbun);
      formData.append("nomor_surat", event.target.nomor_surat.value);
      formData.append(
        "tanggal_awal_keputusan",
        event.target.tanggal_awal_keputusan.value
      );
      formData.append(
        "tanggal_akhir_keputusan",
        event.target.tanggal_akhir_keputusan.value
      );
      formData.append("kantor_virtual", isVirtual);
      formData.append("alamat_utama_pkp", isUtama);

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

  useEffect(() => {
    provinceReq(setProvinceState);

    if (province) {
      regencyReq(setDistrictState, province);
    }

    if (district) {
      districtReq(setSubDistrictState, district);
    }

    if (subDistrict) {
      villageReq(setVillageState, subDistrict);
    }
  }, [isDetailAlamat, province, district, subDistrict]);

  useEffect(() => {
    setDistrict("");
    setSubDistrict("");
    setVillage("");
    setKodeArea("");
  }, [province]);

  return (
    <div className="relative">
      {dialogState.isOpen && <DialogInfo />}
      <Dialog open={isOpen} onOpenChange={handleOnClose}>
        <DialogContent className="sm:max-w-[900px] max-h-[100vh] overflow-auto">
          <DialogTitle>Input New TKU</DialogTitle>
          <DialogDescription>Add a new TKU to the system.</DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 my-4  items-end overflow-auto justify-center p-1">
              <h1 className="text-slate-300/50 italic font-medium m-2 text-[13px]">
                TKU Information
              </h1>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mb-16 rounded-lg border p-4">
                <InputVertical
                  name="nitku"
                  title="NITKU"
                  error={errors.nitku}
                  onChange={(e) => {
                    handleChange("nitku", e.target.value);
                  }}
                />

                <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                  <h1 className="leading-none text-sm font-medium">
                    Jenis TKU{" "}
                    <span className="text-[13px] text-red-500">*</span>
                  </h1>

                  <Select
                    name="jenis_tku"
                    value={"" || undefined}
                    onValueChange={(e) => {
                      handleChange("jenis_tku", e);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih.." />
                    </SelectTrigger>
                    <SelectContent>
                      {jenisNitku.map((item, key) => {
                        return (
                          <SelectItem key={key} value={String(item.kode)}>
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

                <div className="grid  grid-cols-1 md:col-span-2 col-span-2 content-between h-16">
                  <h1 className="leading-none text-sm font-medium">
                    PIC TKU <span className="text-[13px] text-red-500">*</span>
                  </h1>
                  <Input
                    name="pic_tku"
                    onChange={(e) => {
                      handleChange("pic_tku", e.target.value);
                    }}
                  />
                  {errors.pic_tku}
                </div>
              </div>

              <h1 className="text-slate-300/50 italic font-medium m-2 text-[13px]">
                Address Information
              </h1>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-16 rounded-lg border p-4">
                <div className="col-span-1">
                  <h1 className="font-medium mb-2">Jenis Alamat</h1>
                  <Select name="jenis_alamat" disabled={true} value={"tku-01"}>
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

                <div className="col-span-full">
                  <Textarea
                    placeholder="Detail Alamat"
                    name="alamat"
                    onChange={(e) => {
                      handleChange("alamat", e.target.value);
                    }}
                  />
                  {errors.alamat}
                </div>

                <div className="col-span-full">
                  <div className=" grid  grid-cols-2 gap-4">
                    <Input placeholder="RT" name="rt" className="my-1" />
                    <Input placeholder="RW" name="rw" className="my-1" />
                  </div>
                  {errors.rt}
                  {errors.rw}
                </div>

                <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                  <h1 className="leading-none text-sm font-medium">
                    Provinsi <span className="text-[13px] text-red-500">*</span>
                  </h1>
                  <Popover
                    open={provinceOpen}
                    onOpenChange={setProvinceOpen}
                    name="provinsi"
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={provinceOpen}
                        className="w-full justify-between"
                      >
                        {province
                          ? provinceState.find((item) => item.code === province)
                              ?.name
                          : "Pilih..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] h-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Provinsi..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No Provinsi found.</CommandEmpty>
                          <CommandGroup>
                            {provinceState.map((item, key) => (
                              <CommandItem
                                key={key}
                                value={item.name}
                                onSelect={(myVal) => {
                                  setProvince(
                                    myVal === province ? "" : item.code
                                  );
                                  setProvinceOpen(false);
                                  handleChange(
                                    "provinsi",
                                    myVal === province ? "" : item.code
                                  );
                                }}
                              >
                                {item.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    province === item.code
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {errors.provinsi}
                </div>

                <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                  <h1 className="leading-none text-sm font-medium">
                    Kabupaten{" "}
                    <span className="text-[13px] text-red-500">*</span>
                  </h1>
                  <Popover
                    open={districtOpen}
                    onOpenChange={setDistrictOpen}
                    name="kabupaten"
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={districtOpen}
                        className="w-full justify-between"
                      >
                        {district
                          ? districtState.find((item) => item.code === district)
                              ?.name
                          : "Pilih..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] h-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Kabupaten..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No Kabupaten found.</CommandEmpty>
                          <CommandGroup>
                            {districtState.map((item, key) => (
                              <CommandItem
                                key={key}
                                value={item.name}
                                onSelect={(myVal) => {
                                  setDistrict(
                                    myVal === district ? "" : item.code
                                  );
                                  setDistrictOpen(false);
                                  handleChange(
                                    "kabupaten",
                                    myVal === district ? "" : item.code
                                  );
                                }}
                              >
                                {item.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    district === item.code
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {errors.kabupaten}
                </div>

                <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                  <h1 className="leading-none text-sm font-medium">
                    Kecamatan{" "}
                    <span className="text-[13px] text-red-500">*</span>
                  </h1>
                  <Popover
                    open={subDistrictOpen}
                    onOpenChange={setSubDistrictOpen}
                    name="kecamatan"
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={subDistrictOpen}
                        className="w-full justify-between"
                      >
                        {subDistrict
                          ? subDistrictState.find(
                              (item) => item.code === subDistrict
                            )?.name
                          : "Pilih..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] h-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Kecamatan..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No Kecamatan found.</CommandEmpty>
                          <CommandGroup>
                            {subDistrictState.map((item, key) => (
                              <CommandItem
                                key={key}
                                value={item.name}
                                onSelect={(myVal) => {
                                  setSubDistrict(
                                    myVal === subDistrict ? "" : item.code
                                  );
                                  setSubDistrictOpen(false);
                                  handleChange(
                                    "kecamatan",
                                    myVal === subDistrict ? "" : item.code
                                  );
                                }}
                              >
                                {item.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    subDistrict === item.code
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {errors.kecamatan}
                </div>

                <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                  <h1 className="leading-none text-sm font-medium">
                    Desa
                    <span className="text-[13px] text-red-500">*</span>
                  </h1>
                  <Popover
                    open={villageOpen}
                    onOpenChange={setVillageOpen}
                    name="desa"
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={villageOpen}
                        className="w-full justify-between"
                      >
                        {village
                          ? villageState.find((item) => item.code === village)
                              ?.name
                          : "Pilih..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] h-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Desa..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No Desa found.</CommandEmpty>
                          <CommandGroup>
                            {villageState.map((item, key) => (
                              <CommandItem
                                key={key}
                                value={item.name}
                                onSelect={(myVal) => {
                                  setVillage(
                                    myVal === village ? "" : item.code
                                  );
                                  setVillageOpen(false);
                                  handleChange("desa", item.code);
                                  setKodeArea(item.code);
                                }}
                              >
                                {item.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    village === item.code
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {errors.desa}
                </div>

                <div className="md:col-span-1 col-span-full flex gap-4">
                  <Input
                    value={kodeArea}
                    name="kode_wilayah"
                    onChange={(e) => {
                      handleChange("kode_wilayah", e.target.value);
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

                <div className="md:col-span-1 col-span-full">
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

              <div className="flex items-end gap-2 mb-6">
                <Checkbox
                  name="lokasi_disewa"
                  className="mt-2"
                  onCheckedChange={(e) => {
                    handleChange("lokasi_disewa", isDiSewa);
                    setIsDiSewa(isDiSewa ? 0 : 1);
                  }}
                />
                <Label className="col-span-2">Lokasi yang Disewa?</Label>
              </div>

              {Boolean(isDiSewa) && (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4  border rounded-lg p-4 mb-16">
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

                  <InputVertical
                    name="tanggal_awal_sewa"
                    type="date"
                    title="Tanggal Mulai Sewa"
                    onChange={(e) => {
                      handleChange("tanggal_awal_sewa", e.target.value);
                    }}
                  />

                  <InputVertical
                    name="tanggal_akhir_sewa"
                    type="date"
                    title="Tanggal Sewa Berakhir"
                    onChange={(e) => {
                      handleChange("tanggal_akhir_sewa", e.target.value);
                    }}
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-16 rounded-lg border p-4">
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
                    name="seksi_pengawasan"
                    onValueChange={(e) => {
                      handleChange("seksi_pengawasan", e);
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
                  {errors.seksi_pengawasan}
                </div>

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

              <div className="flex items-end gap-2 mb-6">
                <Checkbox
                  className="mt-2"
                  onCheckedChange={(e) => {
                    setIsNSK(isNSK ? 0 : 1);
                  }}
                />
                <Label className="col-span-2">Nomor Surat Keputusan?</Label>
              </div>

              {Boolean(isNSK) && (
                <>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4  border rounded-lg p-4">
                    <div className="flex items-end gap-2">
                      <Checkbox
                        className="mt-2"
                        onCheckedChange={(e) => {
                          setIsRetail(isRetail ? 0 : 1);
                        }}
                      />
                      <Label className="col-span-2">Toko Retail ?</Label>
                    </div>

                    <div className="flex items-end gap-2">
                      <Checkbox
                        className="mt-2"
                        onCheckedChange={(e) => {
                          setIsKawasanBebas(isKawasanBebas ? 0 : 1);
                        }}
                      />
                      <Label className="col-span-2">Kawasan Bebas ?</Label>
                    </div>

                    <div className="flex items-end gap-2">
                      <Checkbox
                        className="mt-2"
                        onCheckedChange={(e) => {
                          setIsKawasanKhusus(isKawasanKhusus ? 0 : 1);
                        }}
                      />
                      <Label>Kawasan Ekonomi Khusus ?</Label>
                    </div>

                    <div className="flex items-end gap-2">
                      <Checkbox
                        className="mt-2"
                        onCheckedChange={(e) => {
                          setIsPenimbun(isPenimbun ? 0 : 1);
                        }}
                      />
                      <Label>Tempat Penimbun Berikat ?</Label>
                    </div>

                    <div className="flex gap-2 mb-2 items-end">
                      <Checkbox
                        name="kantor_virtual"
                        className="mt-2"
                        onCheckedChange={(e) => {
                          setIsVirtual(isVirtual ? 0 : 1);
                        }}
                      />
                      <Label>Kantor Virtual ?</Label>
                    </div>

                    <div className="flex gap-2 mb-2 items-end">
                      <Checkbox
                        name="alamat_utama_pkp"
                        className="mt-2"
                        onCheckedChange={(e) => {
                          setIsUtama(isUtama ? 0 : 1);
                        }}
                      />
                      <Label>Alamat Utama KPK ?</Label>
                    </div>

                    <div className="col-span-2">
                      <InputVertical
                        name="nomor_surat"
                        placeholder="Nomor Surat Keputusan"
                      />
                    </div>

                    <InputVertical
                      name="tanggal_awal_keputusan"
                      type="date"
                      title="Decree Number Date Valid From"
                    />

                    <InputVertical
                      name="tanggal_akhir_keputusan"
                      type="date"
                      title="Decree Number Date Valid To"
                    />
                  </div>
                </>
              )}
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
