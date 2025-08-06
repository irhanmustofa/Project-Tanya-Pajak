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
  useMasterAsset,
  useMasterAssetDispatch,
} from "../master-asset-components/MasterAssetProvider";
import { LucideUserPlus2 } from "lucide-react";
import {
  masterAssetUpdate,
  masterAssetAll,
} from "../master-asset-components/MasterAssetService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";
import { Textarea } from "@/components/ui/textarea";

export default function MasterAssetUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const masterAssetDispatch = useMasterAssetDispatch();
  const {
    masterAssetState,
    masterAssetAction,
    jenisAssetState,
    kategoriAssetState,
    golonganAssetState,
    metodePenyusutanState,
    jenisHartaState,
    coas,
  } = useMasterAsset();

  const [kodeAkun, setKodeAkun] = useState("");
  const [searchAkun, setSearchAkun] = useState("");
  const [kategoriAsset, setKategoriAsset] = useState("");
  const [jenisAsset, setJenisAsset] = useState("");
  const [golonganAsset, setGolonganAsset] = useState("");
  const [jenisHarta, setJenisHarta] = useState("");
  const [metodePenyusutan, setMetodePenyusutan] = useState("");

  const { errors, handleChange } = useValidateInput({
    schema: {
      buku: "required",
      jenis_asset: "required",
      kategori_asset: "required",
      golongan_asset: "required",
      jenis_harta: "required",
      nomor_fa: "required",
      nama_aktiva_tetap: "required",
      qty: "required|numeric",
      satuan: "required",
      kode_akun: "required",
      metode_penyusutan: "required",
    },
  });

  useEffect(() => {
    const data = masterAssetState.data.find((item) => item._id === id);
    if (data) {
      setInput({ ...data });
      setJenisAsset(data.jenis_asset || "");
      setKategoriAsset(data.kategori_asset || "");
      setGolonganAsset(data.golongan_asset || "");
      setJenisHarta(data.jenis_harta || "");
      setMetodePenyusutan(data.metode_penyusutan || "");
      setKodeAkun(data.kode_akun || "");
      setIsOpen(true);
    }
  }, [id, masterAssetState.data]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      for (let key in input) {
        if (input[key] !== undefined && input[key] !== null) {
          formData.append(key, input[key]);
        }
        if (input[key] === "kode_akun") {
          formData.append("kode_akun", kodeAkun);
        }
      }
      await masterAssetUpdate(id, formData).then((response) => {
        const successPayload = {
          isOpen: true,
          title: response.success ? "Update Success" : "Update Failed",
          message: response.message || "Update operation executed",
          status: response.success ? "success" : "error",
        };

        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: successPayload,
        });

        if (response.success) {
          masterAssetAll().then((res) => {
            if (res.success) {
              masterAssetDispatch({
                type: masterAssetAction.SUCCESS,
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
              Update Master Asset
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-5xl">
            <DialogTitle>Update Master Asset</DialogTitle>
            <DialogDescription>
              Update transaksi Master Asset yang ada.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full">
                  <div className="grid gap-4 py-4 w-full border border-gray-200 rounded-lg p-4 mb-3">
                    <InputHorizontal
                      title="Buku"
                      type="text"
                      name="buku"
                      value={input.buku || ""}
                      onChange={(e) => {
                        setInput({ ...input, buku: e.target.value });
                        handleChange("buku", e.target.value);
                      }}
                      error={errors.buku}
                    />
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Jenis Asset</Label>
                      <Select
                        name="jenis_asset"
                        value={jenisAsset || ""}
                        onValueChange={(value) => {
                          handleChange("jenis_asset", value);
                          setJenisAsset(value);
                          setInput({ ...input, jenis_asset: value });
                        }}
                      >
                        <SelectTrigger className="col-span-3 rounded-md border">
                          <SelectValue placeholder="Select Jenis Asset" />
                        </SelectTrigger>
                        <SelectContent>
                          {jenisAssetState.map((item) => (
                            <SelectItem key={item.code} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Kategori Asset</Label>
                      <Select
                        name="kategori_asset"
                        value={kategoriAsset || ""}
                        onValueChange={(value) => {
                          handleChange("kategori_asset", value);
                          setJenisAsset(value);
                          setInput({ ...input, kategori_asset: value });
                        }}
                      >
                        <SelectTrigger className="col-span-3 rounded-md border">
                          <SelectValue placeholder="Select Jenis Asset" />
                        </SelectTrigger>
                        <SelectContent>
                          {kategoriAssetState.map((item) => (
                            <SelectItem key={item.code} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Golongan Asset</Label>
                      <Select
                        name="golongan_asset"
                        value={golonganAsset || ""}
                        onValueChange={(value) => {
                          handleChange("golongan_asset", value);
                          setJenisAsset(value);
                          setInput({ ...input, golongan_asset: value });
                        }}
                      >
                        <SelectTrigger className="col-span-3 rounded-md border">
                          <SelectValue placeholder="Select Jenis Asset" />
                        </SelectTrigger>
                        <SelectContent>
                          {golonganAssetState.map((item) => (
                            <SelectItem key={item.code} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Jenis Harta</Label>
                      <Select
                        name="jenis_harta"
                        value={jenisHarta || ""}
                        onValueChange={(value) => {
                          handleChange("jenis_harta", value);
                          setJenisHarta(value);
                          setInput({ ...input, jenis_harta: value });
                        }}
                      >
                        <SelectTrigger className="col-span-3 rounded-md border">
                          <SelectValue placeholder="Select Jenis Harta" />
                        </SelectTrigger>
                        <SelectContent>
                          {jenisHartaState.map((item) => (
                            <SelectItem key={item.code} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 py-4 w-full border border-gray-200 rounded-lg p-4">
                    <InputHorizontal
                      title="Periode Manfaat (Komersial)"
                      type="number"
                      name="periode_manfaat_k"
                      value={input.periode_manfaat_k}
                      onChange={(e) => {
                        setInput({
                          ...input,
                          periode_manfaat_k: e.target.value,
                        });
                        handleChange("periode_manfaat_k", e.target.value);
                      }}
                      error={errors.periode_manfaat_k}
                    />
                    <InputHorizontal
                      title="Periode Manfaat (Fiskal)"
                      type="number"
                      name="periode_manfaat_f"
                      value={input.periode_manfaat_f}
                      onChange={(e) => {
                        setInput({
                          ...input,
                          periode_manfaat_f: e.target.value,
                        });
                        handleChange("periode_manfaat_f", e.target.value);
                      }}
                      error={errors.periode_manfaat_f}
                    />
                    <InputHorizontal
                      title="Tanggal Perolehan"
                      type="date"
                      name="tanggal_perolehan"
                      value={new Date(
                        input.tanggal_perolehan
                      ).toLocaleDateString("en-CA")}
                      onChange={(e) => {
                        setInput({
                          ...input,
                          tanggal_perolehan: e.target.value,
                        });
                        handleChange("tanggal_perolehan", e.target.value);
                      }}
                      error={errors.tanggal_perolehan}
                    />
                    <InputHorizontal
                      title="Harga Perolehan"
                      type="number"
                      name="harga_perolehan"
                      value={input.harga_perolehan || ""}
                      onChange={(e) => {
                        setInput({ ...input, harga_perolehan: e.target.value });
                        handleChange("harga_perolehan", e.target.value);
                      }}
                      error={errors.harga_perolehan}
                    />
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Metode Penyusutan</Label>
                      <Select
                        name="metode_penyusutan"
                        value={metodePenyusutan || ""}
                        onValueChange={(value) => {
                          handleChange("metode_penyusutan", value);
                          setMetodePenyusutan(value);
                        }}
                      >
                        <SelectTrigger className="col-span-3 rounded-md border">
                          <SelectValue placeholder="Select Metode Penyusutan" />
                        </SelectTrigger>
                        <SelectContent>
                          {metodePenyusutanState.map((item) => (
                            <SelectItem key={item.code} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <InputHorizontal
                      title="Tanggal Penjualan Aktiva Tetap"
                      type="date"
                      name="tanggal_penjualan_aktiva_tetap"
                      value={new Date(
                        input.tanggal_penjualan_aktiva_tetap
                      ).toLocaleDateString("en-CA")}
                      onChange={(e) => {
                        setInput({
                          ...input,
                          tanggal_penjualan_aktiva_tetap: e.target.value,
                        });
                        handleChange(
                          "tanggal_penjualan_aktiva_tetap",
                          e.target.value
                        );
                      }}
                      error={errors.tanggal_penjualan_aktiva_tetap}
                    />
                    <InputHorizontal
                      title="Tanggal Penyusutan Sebelumnya"
                      type="date"
                      name="tanggal_penyusutan_sebelumnya"
                      value={new Date(
                        input.tanggal_penyusutan_sebelumnya
                      ).toLocaleDateString("en-CA")}
                      onChange={(e) => {
                        setInput({
                          ...input,
                          tanggal_penyusutan_sebelumnya: e.target.value,
                        });
                        handleChange(
                          "tanggal_penyusutan_sebelumnya",
                          e.target.value
                        );
                      }}
                      error={errors.tanggal_penyusutan_sebelumnya}
                    />
                  </div>
                </div>

                <div className="w-full">
                  <div className="grid gap-4 py-4 w-full border border-gray-200 rounded-lg p-4 mb-3">
                    <InputHorizontal
                      title="Nomor FA"
                      type="text"
                      name="nomor_fa"
                      value={input.nomor_fa || ""}
                      onChange={(e) => {
                        setInput({ ...input, nomor_fa: e.target.value });
                        handleChange("nomor_fa", e.target.value);
                      }}
                      error={errors.nomor_fa}
                    />
                    <InputHorizontal
                      title="Nama Aktiva Tetap"
                      type="text"
                      name="nama_aktiva_tetap"
                      value={input.nama_aktiva_tetap || ""}
                      onChange={(e) => {
                        setInput({
                          ...input,
                          nama_aktiva_tetap: e.target.value,
                        });
                        handleChange("nama_aktiva_tetap", e.target.value);
                      }}
                      error={errors.nama_aktiva_tetap}
                    />
                    <InputHorizontal
                      title="Qty"
                      type="number"
                      name="qty"
                      value={input.qty || ""}
                      onChange={(e) => {
                        setInput({ ...input, qty: e.target.value });
                        handleChange("qty", e.target.value);
                      }}
                      error={errors.qty}
                    />
                    <InputHorizontal
                      title="Satuan"
                      type="text"
                      name="satuan"
                      value={input.satuan || ""}
                      onChange={(e) => {
                        setInput({ ...input, satuan: e.target.value });
                        handleChange("satuan", e.target.value);
                      }}
                      error={errors.satuan}
                    />
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Kode Akun</Label>
                      <Select
                        name="kode_akun"
                        value={kodeAkun || ""}
                        onValueChange={(value) => {
                          handleChange("kode_akun", value);
                          setKodeAkun(value);
                          setInput({
                            ...input,
                            kode_akun: value,
                          });
                        }}
                      >
                        <SelectTrigger className="col-span-3 rounded-md border">
                          <SelectValue placeholder="Select Akun" />
                        </SelectTrigger>
                        <SelectContent>
                          <div className="p-2">
                            <input
                              autoFocus
                              type="text"
                              placeholder="Cari akun..."
                              value={searchAkun}
                              onChange={(e) => e.target.value}
                              onPointerDown={(e) => e.stopPropagation()}
                              className="w-full border rounded px-2 py-1 mb-1 bg-gray-50 dark:bg-gray-800"
                            />
                          </div>
                          {coas
                            .filter(
                              (coa) =>
                                coa.kode_akun
                                  .toLowerCase()
                                  .includes(searchAkun.toLowerCase()) ||
                                coa.nama_akun
                                  .toLowerCase()
                                  .includes(searchAkun.toLowerCase())
                            )
                            .map((coa) => (
                              <SelectItem
                                key={coa.kode_akun}
                                value={coa.kode_akun}
                              >
                                {coa.kode_akun} -{" "}
                                {coa.nama_akun.length > 25
                                  ? coa.nama_akun.slice(0, 25) + "..."
                                  : coa.nama_akun}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 py-4 w-full border border-gray-200 rounded-lg p-4">
                    <InputHorizontal
                      title="Voucher Asset Terjual"
                      type="text"
                      name="voucher_asset_terjual"
                      value={input.voucher_asset_terjual || ""}
                      onChange={(e) => {
                        setInput({
                          ...input,
                          voucher_asset_terjual: e.target.value,
                        });
                        handleChange("voucher_asset_terjual", e.target.value);
                      }}
                      error={errors.voucher_asset_terjual}
                    />
                    <InputHorizontal
                      title="Harga Jual Aktiva Tetap"
                      type="number"
                      name="harga_jual_aktiva_tetap"
                      value={input.harga_jual_aktiva_tetap || ""}
                      onChange={(e) => {
                        setInput({
                          ...input,
                          harga_jual_aktiva_tetap: e.target.value,
                        });
                        handleChange("harga_jual_aktiva_tetap", e.target.value);
                      }}
                      error={errors.harga_jual_aktiva_tetap}
                    />
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
