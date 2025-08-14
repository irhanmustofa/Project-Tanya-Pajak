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
import { useState, useTransition } from "react";
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

export default function ClientAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();
  const id = useLocalStorage.get("clientId") ?? "";
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction } = useClient();
  const [isCheck, setIsCheck] = useState(false);

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      negara: "required|min:3",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("clientId", id);
      formData.append("negara", event.target.negara.value);
      formData.append("jenis_alamat", event.target.jenis_alamat.value);
      formData.append("alamat", event.target.alamat.value);
      formData.append("rt", event.target.rt.value);
      formData.append("rw", event.target.rw.value);
      formData.append("provinsi", event.target.provinsi.value);
      formData.append("kabupaten", event.target.kabupaten.value);
      formData.append("kecamatan", event.target.kecamatan.value);
      formData.append("desa", event.target.desa.value);
      formData.append("kode_area", event.target.kode_area.value);
      formData.append("kode_pos", event.target.kode_pos.value);
      formData.append("data_geometrik", event.target.data_geometrik.value);
      formData.append("disewa", isCheck);
      formData.append("tanggal_mulai", event.target.tanggal_mulai.value);
      formData.append("tanggal_berakhir", event.target.tanggal_berakhir.value);
      formData.append("kode_kpp", event.target.kode_kpp.value);
      formData.append(
        "bagian_pengawasan",
        event.target.bagian_pengawasan.value
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

          clientFirst(id).then((res) => {
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
        <DialogContent className="sm:max-w-[850px]">
          <DialogTitle>Input New Client</DialogTitle>
          <DialogDescription>Add a new Client to the system.</DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 my-4  items-end">
              <div className="col-span-1">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h1 className="font-medium mb-2">Negara</h1>
                    <Select
                      name="negara"
                      onValueChange={(e) => {
                        handleChange("negara", e);
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
                  </div>
                  <div className="">
                    <h1 className="font-medium mb-2">Jenis Alamat</h1>
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
                  </div>
                </div>

                <div className="grid xl:grid-cols-6 grid-cols-4 gap-4 my-4">
                  <Textarea
                    placeholder="Alamat"
                    name="alamat"
                    className="xl:col-span-5 col-span-3"
                  />
                  <div className="">
                    <Input placeholder="RT" name="rt" className="mb-2" />
                    <Input placeholder="RW" name="rw" className="mt-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 my-2 gap-4">
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
                </div>

                <div className="grid grid-cols-2 gap-4 my-2">
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

                <div className="grid grid-cols-6 gap-4 my-4">
                  <div className="col-span-3 flex gap-4">
                    <Input
                      value={"" || undefined}
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
                  <div className="col-span-3 ">
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

                <div className="flex gap-4 my-2 items-center">
                  <Label>Disewa</Label>
                  <Checkbox
                    name="disewa"
                    className="mt-2"
                    onCheckedChange={(e) => {
                      handleChange("disewa", isCheck);
                      setIsCheck(isCheck ? false : true);
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 my-4">
                  <InputVertical
                    name="tanggal_mulai"
                    type="date"
                    title="Tanggal Mulai"
                    onChange={(e) => {
                      handleChange("tanggal_mulai", e.target.value);
                    }}
                  />

                  <InputVertical
                    type="date"
                    name="tanggal_berakhir"
                    title="Tanggal Berakhir"
                    className="my-2"
                    onChange={(e) => {
                      handleChange("tanggal_berakhir", e.target.value);
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 my-4">
                  <div>
                    <Label>Kode Kantor Pelayanan Pajak</Label>
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
                  </div>
                  <div>
                    <Label>Bagian Pengawasan</Label>
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
                  </div>
                </div>
              </div>
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
