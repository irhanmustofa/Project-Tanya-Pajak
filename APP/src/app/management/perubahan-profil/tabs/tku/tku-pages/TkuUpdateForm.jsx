import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { LucideUserPlus2, Check, ChevronsUpDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useClient,
  useClientDispatch,
} from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import { useState, useEffect, useTransition } from "react";
import { clientFirst } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilService";
import { tkuUpdate } from "@/app/management/perubahan-profil/tabs/tku/tku-components/TkuService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useValidateInput } from "@/hooks/use-validate-input";
import { dateStrip } from "@/components/custom/DateFormatted";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { InputVertical } from "@/components/custom/input-custom";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { jenisNitku, pengawasOption } from "../../../data/alamatDataList";
import { provinceList } from "../../../data/province";
import { kppOption } from "@/helpers/variables";

export default function TkuUpdateForm({ id, onClose }) {
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction, clientState } = useClient();
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState({});
  const clientId = useLocalStorage.get("clientId");
  const [open, setOpen] = useState(false);
  const [jenisTkuVal, setJenisTkuVal] = useState("");
  const [kodeArea, setKodeArea] = useState("");
  const [isDiSewa, setIsDiSewa] = useState(0);
  const [isRetail, setIsRetail] = useState(0);
  const [isKawasanBebas, setIsKawasanBebas] = useState(0);
  const [isKawasanKhusus, setIsKawasanKhusus] = useState(0);
  const [isPenimbun, setIsPenimbun] = useState(0);
  const [isVirtual, setIsVirtual] = useState(0);
  const [isUtama, setIsUtama] = useState(0);

  const { errors, handleChange } = useValidateInput({
    schema: {
      nitku: "required",
      jenis_tku: "required",
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

  useEffect(() => {
    const getData = clientState.data[0].orang_terkait.find(
      (item) => item._id === id
    );

    setInput({
      nitku: getData.nitku,
      jenis_tku: getData.jenis_tku,
      nama_tku: getData.nama_tku,
      deskripsi_tku: getData.deskripsi_tku,
      klu_tku: getData.klu_tku,
      deskripsi_klu_tku: getData.deskripsi_klu_tku,
      alamat: getData.alamat,
      rt: getData.rt,
      rw: getData.rw,
      provinsi: getData.provinsi,
      kabupaten: getData.kabupaten,
      kecamatan: getData.kecamatan,
      desa: getData.desa,
      kode_kpp: getData.kode_kpp,
      kode_wilayah: getData.kode_wilayah,
      kode_pos: getData.kode_pos,
      data_geometrik: getData.data_geometrik,
      seksi_pengawasan: getData.seksi_pengawasan,
      lokasi_disewa: getData.lokasi_disewa,
      identitas_pemilik: getData.identitas_pemilik,
      nama_pemilik: getData.nama_pemilik,
      tanggal_awal_sewa: getData.tanggal_awal_sewa,
      tanggal_akhir_sewa: getData.tanggal_akhir_sewa,
      tanggal_mulai: getData.tanggal_mulai,
      tanggal_berakhir: getData.tanggal_berakhir,
      toko_retail: getData.toko_retail,
      kawasan_bebas: getData.kawasan_bebas,
      kawasan_ekonomi_khusus: getData.kawasan_ekonomi_khusus,
      tempat_penimbunan_berikat: getData.tempat_penimbunan_berikat,
      nomor_surat: getData.nomor_surat,
      tanggal_awal_keputusan: getData.tanggal_awal_keputusan,
      tanggal_akhir_keputusan: getData.tanggal_akhir_keputusan,
      kantor_virtual: getData.kantor_virtual,
      alamat_utama_pkp: getData.alamat_utama_pkp,
    });

    setJenisTkuVal(getData.jenis_tku);
    setKodeArea(getData.kode_wilayah);
    setIsDiSewa(getData.lokasi_disewa);
    setIsRetail(getData.toko_retail);
    setIsKawasanBebas(getData.kawasan_bebas);
    setIsKawasanKhusus(getData.kawasan_ekonomi_khusus);
    setIsPenimbun(getData.tempat_penimbunan_berikat);
    setIsVirtual(getData.kantor_virtual);
    setIsUtama(getData.alamat_utama_pkp);
    setIsOpen(true);
    setOpen(false);
  }, [id, clientState]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("nitku", input.nitku);
      formData.append("jenis_tku", jenisTkuVal);
      formData.append("nama_tku", input.nama_tku);
      formData.append("deskripsi_tku", input.deskripsi_tku);
      formData.append("klu_tku", input.klu_tku);
      formData.append("deskripsi_klu_tku", input.deskripsi_klu_tku);
      formData.append("alamat", input.alamat);
      formData.append("rt", input.rt);
      formData.append("rw", input.rw);
      formData.append("provinsi", input.provinsi);
      formData.append("kabupaten", input.kabupaten);
      formData.append("kecamatan", input.kecamatan);
      formData.append("desa", input.desa);
      formData.append("kode_kpp", input.kode_kpp);
      formData.append("kode_wilayah", input.kode_wilayah);
      formData.append("kode_pos", input.kode_pos);
      formData.append("data_geometrik", input.data_geometrik);
      formData.append("seksi_pengawasan", input.seksi_pengawasan);
      formData.append("lokasi_disewa", isDiSewa);
      formData.append("identitas_pemilik", input.identitas_pemilik);
      formData.append("nama_pemilik", input.nama_pemilik);
      formData.append("tanggal_awal_sewa", input.tanggal_awal_sewa);
      formData.append("tanggal_akhir_sewa", input.tanggal_akhir_sewa);
      formData.append("tanggal_mulai", input.tanggal_mulai);
      formData.append("tanggal_berakhir", input.tanggal_berakhir);
      formData.append("toko_retail", isRetail);
      formData.append("kawasan_bebas", isKawasanBebas);
      formData.append("kawasan_ekonomi_khusus", isKawasanKhusus);
      formData.append("tempat_penimbunan_berikat", isPenimbun);
      formData.append("nomor_surat", input.nomor_surat);
      formData.append("tanggal_awal_keputusan", input.tanggal_awal_keputusan);
      formData.append("tanggal_akhir_keputusan", input.tanggal_akhir_keputusan);
      formData.append("kantor_virtual", isVirtual);
      formData.append("alamat_utama_pkp", isUtama);

      await tkuUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update TKU Failed",
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
              title: "Update TKU Success",
              message: "TKU updated successfully",
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
              Update TKU
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px] max-h-[100vh] overflow-auto">
            <DialogTitle>Update TKU</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="grid grid-cols-1 my-4  items-end overflow-auto justify-center p-1">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mb-2">
                  <InputVertical
                    name="nitku"
                    title="NITKU"
                    value={input.nitku}
                    onChange={(e) => {
                      handleChange("nitku", e.target.value);
                      setInput({ ...input, nitku: e.target.value });
                    }}
                  />

                  <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                    <h1 className="leading-none text-sm font-medium">
                      Jenis TKU{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </h1>

                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          {String(jenisTkuVal)
                            ? jenisNitku.find(
                                (item) => item.kode === String(jenisTkuVal)
                              )?.name
                            : "Pilih..."}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] h-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {jenisNitku.map((item, key) => (
                                <CommandItem
                                  key={key}
                                  value={item.name}
                                  onSelect={(myVal) => {
                                    setJenisTkuVal(
                                      myVal === jenisTkuVal ? "" : item.kode
                                    );
                                    setOpen(false);
                                    handleChange(
                                      "jenis_tku",
                                      myVal === jenisTkuVal ? "" : item.kode
                                    );
                                  }}
                                >
                                  {item.name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      jenisTkuVal === item.kode
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
                    {errors.jenis_tku}
                  </div>

                  <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                    <h1 className="leading-none text-sm font-medium">
                      Nama TKU{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </h1>
                    <Input
                      name="nama_tku"
                      onChange={(e) => {
                        handleChange("nama_tku", e.target.value);
                      }}
                      value={String(input.nama_tku)}
                    />
                    {errors.nama_tku}
                  </div>

                  <InputVertical
                    name="deskripsi_tku"
                    title="Deskripsi TKU"
                    value={String(input.deskripsi_tku)}
                    onChange={(e) => {
                      setInput({ ...Input, deskripsi_tku: e.target.value });
                    }}
                  />

                  <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                    <h1 className="leading-none text-sm font-medium">
                      KLU TKU{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </h1>
                    <Input
                      name="klu_tku"
                      value={String(input.klu_tku)}
                      onChange={(e) => {
                        handleChange("klu_tku", e.target.value);
                        setInput({ ...input, klu_tku: e.target.value });
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
                      value={String(input.deskripsi_klu_tku)}
                      onChange={(e) => {
                        handleChange("deskripsi_klu_tku", e.target.value);
                        setInput({
                          ...input,
                          deskripsi_klu_tku: e.target.value,
                        });
                      }}
                    />
                    {errors.deskripsi_klu_tku}
                  </div>

                  <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                    <h1 className="leading-none text-sm font-medium">
                      PIC TKU{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </h1>
                    <Input
                      name="pic"
                      value={String(input.pic)}
                      onChange={(e) => {
                        handleChange("pic", e.target.value);
                        setInput({ ...input, pic: e.target.value });
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
                    name="alamat"
                    placeholder="Detail Alamat"
                    className={"md:col-span-5 col-span-full"}
                    value={String(input.alamat)}
                    onChange={(e) => {
                      handleChange("alamat", e.target.value);
                      setInput({ ...input, alamat: e.target.value });
                    }}
                  />

                  <div className="col-span-1 grid md:grid-cols-1 grid-cols-2 gap-4">
                    <Input
                      name="rt"
                      placeholder="RT"
                      className="my-1"
                      value={String(input.rt)}
                      onChange={(e) => {
                        handleChange("rt", e.target.value);
                        setInput({ ...input, rt: e.target.value });
                      }}
                    />
                    <Input
                      name="rw"
                      placeholder="RW"
                      className="my-1"
                      value={String(input.rw)}
                      onChange={(e) => {
                        handleChange("rw", e.target.value);
                        setInput({ ...input, rw: e.target.value });
                      }}
                    />
                  </div>
                </div>
                {errors.rt}
                {errors.rw}
                {errors.alamat}

                <div className="grid md:grid-cols-2 grid-cols-1 my-2 gap-4">
                  <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                    <h1 className="leading-none text-sm font-medium">
                      Provinsi{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </h1>
                    <Select
                      name="provinsi"
                      onValueChange={(e) => {
                        handleChange("provinsi", e);
                        setInput({ ...input, provinsi: e });
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
                        setInput({ ...input, kabupaten: e });
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
                        setInput({ ...input, kecamatan: e });
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
                              {item.name}
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
                      value={String(input.desa)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                      <SelectContent>
                        {kppOption.map((item, key) => {
                          return (
                            <SelectItem key={key} value={String(item.kode)}>
                              {item.name}
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
                      name="kode_wilayah"
                      value={kodeArea}
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
                        setInput({ ...input, kode_pos: e.target.value });
                      }}
                      value={String(input.kode_pos)}
                      placeholder="Kode Pos"
                    />
                  </div>

                  <div className="md:col-span-3 col-span-full">
                    <Input
                      name="data_geometrik"
                      placeholder="Data Geometrik"
                      onChange={(e) => {
                        handleChange("data_geometrik", e.target.value);
                        setInput({ ...input, data_geometrik: e.target.value });
                      }}
                      value={String(input.data_geometrik)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-2">
                  <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                    <h1 className="leading-none text-sm font-medium">
                      Kode KPP{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </h1>
                    <Select
                      value={String(input.kode_kpp)}
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

                  <div className="grid  grid-cols-1 md:col-span-1 col-span-2 content-between h-16">
                    <h1 className="leading-none text-sm font-medium">
                      Seksi Pengawasan{" "}
                      <span className="text-[13px] text-red-500">*</span>
                    </h1>
                    <Select
                      value={String(input.seksi_pengawasan)}
                      name="seksi_pengawasan"
                      onValueChange={(e) => {
                        handleChange("seksi_pengawasan", e);
                        setInput({ ...input, seksi_pengawasan: e });
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
                </div>

                <div className="flex items-end gap-2 my-4">
                  <Checkbox
                    name="lokasi_disewa"
                    className="mt-2"
                    onCheckedChange={(e) => {
                      handleChange("lokasi_disewa", isDiSewa);
                      setIsDiSewa(isDiSewa ? 0 : 1);
                    }}
                  />
                  <Label className="col-span-2">Lokasi yang Disewa</Label>
                </div>

                {Boolean(isDiSewa) && (
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-2 border rounded p-2">
                    <Input
                      name="identitas_pemilik"
                      placeholder="NIK/NPWP Pemilik Tempat Sewa"
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

                    <InputVertical
                      name="tanggal_awal_sewa"
                      type="date"
                      title="Tanggal Mulai Sewa"
                      onChange={(e) => {
                        handleChange("tanggal_awal_sewa", e.target.value);
                        setInput({
                          ...input,
                          tanggal_awal_sewa: e.target.value,
                        });
                      }}
                      value={dateStrip(input.tanggal_awal_sewa)}
                    />

                    <InputVertical
                      name="tanggal_akhir_sewa"
                      type="date"
                      title="Tanggal Sewa Berakhir"
                      onChange={(e) => {
                        handleChange("tanggal_akhir_sewa", e.target.value);
                        setInput({
                          ...input,
                          tanggal_akhir_sewa: e.target.value,
                        });
                      }}
                      value={dateStrip(input.tanggal_akhir_sewa)}
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
                        setInput({ ...input, tanggal_mulai: e.target.value });
                      }}
                      value={dateStrip(input.tanggal_mulai)}
                      error={errors.tanggal_mulai}
                    />
                  </div>

                  <InputVertical
                    name="tanggal_berakhir"
                    type="date"
                    title="Tanggal Berakhir"
                    className="my-2"
                    value={dateStrip(input.tanggal_berakhir)}
                    onChange={(e) => {
                      setInput({ ...input, tanggal_berakhir: e });
                    }}
                  />
                </div>

                <div className="grid md:grid-cols-1 grid-cols-1 gap-4 my-4">
                  <div className="flex items-end gap-2">
                    <Checkbox
                      className="mt-2"
                      onCheckedChange={() => {
                        setIsRetail(isRetail ? 0 : 1);
                      }}
                      checked={Boolean(isRetail)}
                    />
                    <Label className="col-span-2">Toko Retail</Label>
                  </div>

                  <div className="flex items-end gap-2">
                    <Checkbox
                      className="mt-2"
                      onCheckedChange={() => {
                        setIsKawasanBebas(isKawasanBebas ? 0 : 1);
                      }}
                      checked={Boolean(isKawasanBebas)}
                    />
                    <Label className="col-span-2">Kawasan Bebas</Label>
                  </div>

                  <div className="flex items-end gap-2">
                    <Checkbox
                      className="mt-2"
                      onCheckedChange={() => {
                        setIsKawasanKhusus(isKawasanKhusus ? 0 : 1);
                      }}
                      checked={Boolean(isKawasanKhusus)}
                    />
                    <Label>Kawasan Ekonomi Khusus</Label>
                  </div>

                  <div className="flex items-end gap-2">
                    <Checkbox
                      className="mt-2"
                      onCheckedChange={() => {
                        setIsPenimbun(isPenimbun ? 0 : 1);
                      }}
                      checked={Boolean(isPenimbun)}
                    />
                    <Label>Tempat Penimbun Berikat?</Label>
                  </div>
                </div>

                <InputVertical
                  name="nomor_surat"
                  placeholder="Nomor Surat Keputusan"
                  className="my-4"
                  value={String(input.nomor_surat)}
                  onChange={(e) => {
                    setInput({ ...input, nomor_surat: e.target.value });
                  }}
                />

                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-2">
                  <InputVertical
                    name="tanggal_awal_keputusan"
                    type="date"
                    title="Decree Number Date Valid From"
                    value={dateStrip(input.tanggal_awal_keputusan)}
                    onChange={(e) => {
                      setInput({
                        ...input,
                        tanggal_awal_keputusan: e.target.value,
                      });
                    }}
                  />

                  <InputVertical
                    name="tanggal_akhir_keputusan"
                    type="date"
                    title="Decree Number Date Valid To"
                    value={dateStrip(input.tanggal_akhir_keputusan)}
                    onChange={(e) => {
                      setInput({
                        ...input,
                        tanggal_akhir_keputusan: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="flex gap-2 mb-2 items-end">
                  <Checkbox
                    name="kantor_virtual"
                    className="mt-2"
                    onCheckedChange={() => {
                      setIsVirtual(isVirtual ? 0 : 1);
                    }}
                    checked={Boolean(input.kantor_virtual)}
                  />
                  <Label>Kantor Virtual</Label>
                </div>

                <div className="flex gap-2 mb-2 items-end">
                  <Checkbox
                    name="alamat_utama_kpk"
                    className="mt-2"
                    onCheckedChange={() => {
                      setIsUtama(isUtama ? 0 : 1);
                    }}
                    checked={Boolean(input.alamat_utama_pkp)}
                  />
                  <Label>Alamat Utama KPK</Label>
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
