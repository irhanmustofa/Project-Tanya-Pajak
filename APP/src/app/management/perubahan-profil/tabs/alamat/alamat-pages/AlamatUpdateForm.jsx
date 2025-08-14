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
import {
  clientUpdate,
  clientFirst,
} from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { InputVertical } from "@/components/custom/input-custom";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useValidateInput } from "@/hooks/use-validate-input";
import { dateStrip } from "@/components/custom/DateFormatted";
import {
  jenisAlamat,
  jenisWpOption,
  kppOption,
  pengawasOption,
} from "@/helpers/variables";
import { countryList } from "../../../data/country";
import { provinceList } from "../../../data/province";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function AlamatUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isCheck, setIsCheck] = useState(false);
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction, clientState } = useClient();
  const clientId = useLocalStorage.get("clientId");

  const { errors, handleChange } = useValidateInput({
    schema: {
      alamat: "string|min:5",
      rt: "string|min:3|max:3",
      rw: "string|min:3|max:3",
      provinsi: "number",
      kabupaten: "number",
      kecamatan: "number",
      desa: "number",
      kode_area: "number",
      kode_pos: "number",
      data_geometrik: "string",
      disewa: "number",
      tanggal_mulai: "string",
      tanggal_berakhir: "string",
      kode_kpp: "number",
      bagian_pengawasan: "number",
    },
  });

  useEffect(() => {
    const getData = clientState.data[0].alamat.find(
      (item) => item.alamat_id === id
    );
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
      tanggal_mulai: getData.tanggal_mulai,
      tanggal_berakhir: getData.tanggal_berakhir,
      kode_kpp: getData.kode_kpp,
      bagian_pengawasan: getData.bagian_pengawasan,
    });

    setIsOpen(true);
  }, [id, clientState.data[0].alamat]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("clientId", clientId);
      formData.append("alamat", input.alamat);
      formData.append("rt", input.rt);
      formData.append("rw", input.rw);
      formData.append("provinsi", input.provinsi);
      formData.append("kabupaten", input.kabupaten);
      formData.append("kecamatan", input.kecamatan);
      formData.append("desa", input.desa);
      formData.append("kode_area", input.kode_area);
      formData.append("kode_pos", input.kode_pos);
      formData.append("data_geometrik", input.data_geometrik);
      formData.append("disewa", input.disewa);
      formData.append("tanggal_mulai", input.tanggal_mulai);
      formData.append("tanggal_berakhir", input.tanggal_berakhir);
      formData.append("kode_kpp", input.kode_kpp);
      formData.append("bagian_pengawasan", input.bagian_pengawasan);

      await clientUpdate(id, formData).then((response) => {
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

          clientFirst().then((res) => {
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
          <DialogContent className="sm:max-w-[850px]">
            <DialogTitle>Update User</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="grid grid-cols-1 my-4  items-end">
                <div className="col-span-1">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h1 className="font-medium mb-2">Negara</h1>
                      <Select
                        name={input.negara + "negara"}
                        onValueChange={(e) => {
                          handleChange("negara", e);
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
                    </div>
                    <div className="">
                      <h1 className="font-medium mb-2">Jenis Alamat</h1>
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
                    </div>
                  </div>

                  <div className="grid xl:grid-cols-6 grid-cols-4 gap-4 my-4">
                    <Textarea
                      placeholder="Alamat"
                      name="alamat"
                      className="xl:col-span-5 col-span-3"
                      value={input.alamat}
                      onChange={(e) => {
                        handleChange("alamat", e.target, value);
                        setInput({
                          ...input,
                          alamat: e.target.value,
                        });
                      }}
                    />
                    <div className="">
                      <Input
                        placeholder="RT"
                        name="rt"
                        className="mb-2"
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
                        className="mt-2"
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
                  </div>

                  <div className="grid grid-cols-2 my-2 gap-4">
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

                  <div className="grid grid-cols-2 gap-4 my-2">
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

                  <div className="grid grid-cols-6 gap-4 my-4">
                    <div className="col-span-3 flex gap-4">
                      <Input
                        value={input.kode_area}
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
                    <div className="col-span-3 ">
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

                  <div className="flex gap-4 my-2 items-center">
                    <Label>Disewa</Label>
                    <Checkbox
                      name="disewa"
                      className="mt-2"
                      onCheckedChange={(e) => {
                        handleChange("disewa", isCheck);
                        setIsCheck(isCheck ? false : true);
                        setInput({ ...input, disewa: isCheck });
                      }}
                      checked={input.disewa}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 my-4">
                    <InputVertical
                      name="tanggal_mulai"
                      type="date"
                      title="Tanggal Mulai"
                      onChange={(e) => {
                        handleChange("tanggal_mulai", e.target.value);
                        setInput({ ...input, tanggal_mulai: e.target.value });
                      }}
                      value={dateStrip(input.tanggal_mulai)}
                    />

                    <InputVertical
                      type="date"
                      name="tanggal_berakhir"
                      title="Tanggal Berakhir"
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

                  <div className="grid grid-cols-2 gap-4 my-4">
                    <div>
                      <Label>Kode Kantor Pelayanan Pajak</Label>
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
                    </div>
                    <div>
                      <Label>Bagian Pengawasan</Label>
                      <Select
                        value={input.bagian_pegawasan}
                        name="bagian_pengawasan"
                        onValueChange={(e) => {
                          handleChange("bagian_pengawasan", e);
                          setInput({ ...input, bagian_pegawasan: e });
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
