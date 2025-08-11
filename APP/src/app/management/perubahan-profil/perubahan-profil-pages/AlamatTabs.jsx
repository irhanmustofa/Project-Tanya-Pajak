import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  useClient,
  useClientDispatch,
} from "../perubahan-profil-components/PerubahanProfilProvider";
import { useEffect, useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useValidateInput } from "@/hooks/use-validate-input";
import { InputVertical } from "@/components/custom/input-custom";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { CheckSquare } from "lucide-react";
import { jenisWpOption } from "@/helpers/variables";

export default function AlamatTabs() {
  const id = useLocalStorage.get("clientId") ?? "";
  const dialogDispatch = useDialogDispatch();
  const clientDispatch = useClientDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const { clientState, clientAction } = useClient();
  const [input, setInput] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const getData = clientState.data[0] ?? {};

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
    if (clientState.success) {
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
    }
    setIsOpen(true);
  }, [getData, isOpen]);

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
              title: "Update alamat Failed",
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
              message: "Profile updated successfully",
              status: "success",
            },
          });
          clientFirst(id)
            .then((res) => {
              if (res.success) {
                clientDispatch({
                  type: clientAction.SUCCESS,
                  payload: res.data,
                });
              }
            })
            .catch((err) => {
              console.log("err:", err);
            });

          handleCloseDialog();
        }
      });
    });
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setInput({});
  };

  return (
    <>
      {dialogState.isOpen && <DialogInfo />}
      <form onSubmit={inputHandler} className="px-6">
        <div className="grid xl:grid-cols-6 grid-cols-1 md:grid-cols-2 gap-6 my-2">
          <div className="col-span-4">
            {/* <Label>alamat</Label>
            <Textarea name="alamat" /> */}
            <InputVertical title="Alamat" name="alamat" />
          </div>
          <div className="col-span-1">
            <InputVertical title="RT" name="rt" />
          </div>
          <div className="col-span-1">
            <InputVertical title="RT" name="rt" type="number" />
          </div>
        </div>
        <div className="grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-6 my-2">
          <div>
            <h1 className="mb-2">Provinsi</h1>
            <Select
              name="provinsi"
              onValueChange={(e) => {
                handleChange("provinsi", e);
                setInput({ ...input, provinsi: e });
              }}
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
            <h1 className="mb-2">Kabupaten</h1>
            <Select
              name="kabupaten"
              onValueChange={(e) => {
                handleChange("kabupaten", e);
                setInput({ ...input, kabupaten: e });
              }}
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
            <h1 className="mb-2">Kecamatan</h1>
            <Select
              name="kecamatan"
              onValueChange={(e) => {
                handleChange("kecamatan", e);
                setInput({ ...input, kecamatan: e });
              }}
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
                setInput({ ...input, desa: e });
              }}
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
            <InputVertical
              name="kode_area"
              title="Kode Wilayah"
              onChange={(e) => {
                handleChange("kode_area", e.target.value);
                setInput({ ...input, kode_area: e.target.value });
              }}
            />
          </div>
          <div>
            <InputVertical
              name="kode_pos"
              title="Kode Pos"
              onChange={(e) => {
                handleChange("kode_pos", e.target.value);
                setInput({ ...input, kode_pos: e.target.value });
              }}
            />
          </div>
          <div>
            <InputVertical
              name="data_geometrik"
              title="Data Geometrik"
              onChange={(e) => {
                handleChange("data_geometrik", e.target.value);
                setInput({ ...input, data_geometrik: e.target.value });
              }}
            />
          </div>
          <div>
            <h1>Disewa</h1>
            <CheckSquare
              name="disewa"
              className="mt-2"
              onChange={(e) => {
                handleChange("disewa", e.target.value);
                setInput({ ...input, disewa: e.target.value });
              }}
            />
          </div>
          <div>
            <InputVertical
              name="tanggal_mulai"
              type="date"
              title="Tanggal Mulai"
              onChange={(e) => {
                handleChange("tanggal_mulai", e.target.value);
                setInput({ ...input, tanggal_mulai: e.target.value });
              }}
            />
          </div>
          <div>
            <InputVertical
              type="date"
              name="tanggal_berakhir"
              title="Tanggal Berakhir"
              onChange={(e) => {
                handleChange("tanggal_berakhir", e.target.value);
                setInput({ ...input, tanggal_berakhir: e.target.value });
              }}
            />
          </div>
          <div>
            <InputVertical
              type="text"
              name="kode_kpp"
              title="Kode Kantor Pelayanan Pajak"
              onChange={(e) => {
                handleChange("kode_kpp", e.target.value);
                setInput({ ...input, kode_kpp: e.target.value });
              }}
            />
          </div>
          <div>
            <h1>Kode Kantor Pelayanan Pajak</h1>
            <Select
              value={"" || undefined}
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
      </form>
    </>
  );
}
