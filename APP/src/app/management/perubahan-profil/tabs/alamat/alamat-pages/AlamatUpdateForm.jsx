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
import { InputHorizontal } from "@/components/custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";
import { Input } from "postcss";
import { dateStrip } from "@/components/custom/DateFormatted";
import { jenisAlamat } from "@/helpers/variables";

export default function AlamatUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction, clientState } = useClient();

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
    const user = clientState.data.find((item) => item._id === id);
    setInput({
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
  }, [id, clientState.data]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
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
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Update User</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="grid xl:grid-cols-3 grid-cols-1 gap-6 my-4  items-end">
                <div className="col-span-2">
                  <div className="grid grid-cols-4 my-2">
                    <div className="col-span-1">
                      <h1 className="font-medium mb-2">Negara</h1>
                    </div>
                    <div className="col-span-3">
                      <Select
                        name="Negara"
                        onValueChange={(e) => {
                          handleChange("negara", e);
                          setInput({ ...input, negara: e });
                          setCountry(e);
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
                  </div>

                  <div className="grid grid-cols-4 my-2">
                    <div className="col-span-1">
                      <h1 className="font-medium mb-2">Jenis Alamat</h1>
                    </div>
                    <div className="col-span-3">
                      <Select
                        name="jenis_alamat"
                        onValueChange={(e) => {
                          handleChange("jenis_alamat", e);
                          setInput({ ...input, jenis_alamat: e });
                          setCountry(e);
                        }}
                        value={String(input.jenis_alamat)}
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

                  <InputHorizontal
                    title="Alamat"
                    name="alamat"
                    value={input.alamat}
                  />

                  <div className="grid grid-cols-4 my-2">
                    <div className="col-span-1">
                      <h1>RT/RW</h1>
                    </div>
                    <div className="xl:col-span-1 col-span-3 flex">
                      <Input name="rt" value={input.rt} />
                      <h1 className="text-center mx-4 text-[20px]">/</h1>
                      <Input name="rw" value={input.rw} />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 my-2">
                    <div className="col-span-1">
                      <h1 className="mb-2">Provinsi</h1>
                    </div>
                    <div className="col-span-3">
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
                    </div>
                  </div>

                  <div className="grid grid-cols-4 my-2">
                    <div className="col-span-1">
                      <h1 className="mb-2">Kabupaten</h1>
                    </div>
                    <div className="col-span-3">
                      <Select
                        name="kabupaten"
                        onValueChange={(e) => {
                          handleChange("kabupaten", e);
                          setInput({ ...input, kabupaten: e });
                        }}
                        value={input.kabupaten}
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

                  <div className="grid grid-cols-4 my-2">
                    <div className="col-span-1">
                      <h1 className="mb-2">Kecamatan</h1>
                    </div>
                    <div className="col-span-3">
                      <Select
                        name="kecamatan"
                        onValueChange={(e) => {
                          handleChange("kecamatan", e);
                          setInput({ ...input, kecamatan: e });
                        }}
                        value={input.kecamatan}
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

                  <div className="grid grid-cols-4 my-2">
                    <div className="col-span-1">
                      <h1 className="mb-2">Desa</h1>
                    </div>
                    <div className="col-span-3">
                      <Select
                        name="desa"
                        onValueChange={(e) => {
                          handleChange("desa", e);
                          setInput({ ...input, desa: e });
                        }}
                        value={input.desa}
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

                  <div className="grid grid-cols-4 my-2">
                    <div className="col-span-1">
                      <h1 className="text-wrap">Kode Wilayah / Kode Pos</h1>
                    </div>
                    <div className="xl:col-span-1 col-span-3 flex">
                      <Input
                        name="kode_area"
                        onChange={(e) => {
                          handleChange("kode_area", e.target.value);
                          setInput({ ...input, kode_area: e.target.value });
                        }}
                        disabled={true}
                        placeholder="automatically"
                        value={input.kode_area}
                      />
                      <h1 className="px-4 text-[20px] text-center">/</h1>
                      <Input
                        name="kode_pos"
                        title="Kode Pos"
                        onChange={(e) => {
                          handleChange("kode_pos", e.target.value);
                          setInput({ ...input, kode_pos: e.target.value });
                        }}
                        value={input.kode_pos}
                      />
                    </div>
                  </div>

                  <InputHorizontal
                    name="data_geometrik"
                    title="Data Geometrik"
                    onChange={(e) => {
                      handleChange("data_geometrik", e.target.value);
                      setInput({ ...input, data_geometrik: e.target.value });
                    }}
                    value={input.data_geometrik}
                  />

                  <div className="grid grid-cols-4 my-2 items-center">
                    <Label>Disewa</Label>
                    <Checkbox
                      name="disewa"
                      className="mt-2"
                      onCheckedChange={(e) => {
                        handleChange("disewa", isCheck);
                        setIsCheck(input.disewa ? true : false);
                      }}
                    />
                  </div>

                  <InputHorizontal
                    name="tanggal_mulai"
                    type="date"
                    title="Tanggal Mulai"
                    onChange={(e) => {
                      handleChange("tanggal_mulai", e.target.value);
                      setInput({ ...input, tanggal_mulai: e.target.value });
                    }}
                    value={dateStrip(input.tanggal_mulai)}
                  />

                  <InputHorizontal
                    type="date"
                    name="tanggal_berakhir"
                    title="Tanggal Berakhir"
                    className="my-2"
                    onChange={(e) => {
                      handleChange("tanggal_berakhir", e.target.value);
                      setInput({ ...input, tanggal_berakhir: e.target.value });
                    }}
                    value={dateStrip(input.tanggal_berakhir)}
                  />

                  <InputHorizontal
                    type="text"
                    name="kode_kpp"
                    title="Kode Kantor Pelayanan Pajak"
                    onChange={(e) => {
                      handleChange("kode_kpp", e.target.value);
                      setInput({ ...input, kode_kpp: e.target.value });
                    }}
                    value={input.kode_kpp}
                  />

                  <div className="grid grid-cols-4 my-2">
                    <div className="col-span-1">
                      <Label>Kode Kantor Pelayanan Pajak</Label>
                    </div>
                    <div className="col-span-3">
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
                          <SelectItem key={1} value={"kode"}>
                            {"010"}
                          </SelectItem>
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
