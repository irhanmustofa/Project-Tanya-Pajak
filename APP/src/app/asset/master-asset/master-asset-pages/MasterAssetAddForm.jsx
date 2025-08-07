import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputHorizontal } from "@/components/custom/input-custom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import {
  masterAssetAll,
  masterAssetCreate,
} from "@/app/asset/master-asset/master-asset-components/MasterAssetService";
import {
  useMasterAsset,
  useMasterAssetDispatch,
} from "@/app/asset/master-asset/master-asset-components/MasterAssetProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { Textarea } from "@/components/ui/textarea";

export default function MasterAssetAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const masterAssetDispatch = useMasterAssetDispatch();
  const {
    masterAssetAction,
    coas,
    jenisAssetState,
    kategoriAssetState,
    golonganAssetState,
    metodePenyusutanState,
    jenisHartaState,
  } = useMasterAsset();
  const [kodeAkun, setKodeAkun] = useState("");
  const [searchAkun, setSearchAkun] = useState("");
  const [kategoriAsset, setKategoriAsset] = useState("");
  const [jenisAsset, setJenisAsset] = useState("");
  const [golonganAsset, setGolonganAsset] = useState("");
  const [jenisHarta, setJenisHarta] = useState("");
  const [metodePenyusutan, setMetodePenyusutan] = useState("");

  const { valid, handleChange, errors, values } = useValidateInput({
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

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("buku", event.target.buku.value);
      formData.append("jenis_asset", jenisAsset);
      formData.append("kategori_asset", kategoriAsset);
      formData.append("golongan_asset", golonganAsset);
      formData.append("jenis_harta", jenisHarta);
      formData.append("nomor_fa", event.target.nomor_fa.value);
      formData.append(
        "nama_aktiva_tetap",
        event.target.nama_aktiva_tetap.value
      );
      formData.append("qty", event.target.qty.value);
      formData.append("satuan", event.target.satuan.value);
      formData.append("kode_akun", kodeAkun);
      formData.append(
        "periode_manfaat_k",
        event.target.periode_manfaat_k.value
      );
      formData.append(
        "periode_manfaat_f",
        event.target.periode_manfaat_f.value
      );
      formData.append(
        "tanggal_perolehan",
        new Date(event.target.tanggal_perolehan.value).toLocaleDateString(
          "en-CA"
        )
      );
      formData.append("harga_perolehan", event.target.harga_perolehan.value);
      formData.append("metode_penyusutan", metodePenyusutan);
      formData.append(
        "tanggal_penjualan_aktiva_tetap",
        new Date(
          event.target.tanggal_penjualan_aktiva_tetap.value
        ).toLocaleDateString("en-CA")
      );
      formData.append(
        "tanggal_penyusutan_sebelumnya",
        new Date(
          event.target.tanggal_penyusutan_sebelumnya.value
        ).toLocaleDateString("en-CA")
      );
      formData.append(
        "voucher_asset_terjual",
        event.target.voucher_asset_terjual.value
      );
      formData.append(
        "harga_jual_aktiva_tetap",
        event.target.harga_jual_aktiva_tetap.value
      );

      await masterAssetCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Success",
              message: "Data added successfully",
              status: "success",
            },
          });

          masterAssetAll().then((res) => {
            if (res.success) {
              masterAssetDispatch({
                type: masterAssetAction.SUCCESS,
                payload: res.data,
              });
            }
          });

          handleOnClose();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Failed",
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
        <DialogContent className="sm:max-w-5xl h-[95vh] overflow-y-auto">
          <DialogTitle>Input New Data</DialogTitle>
          <DialogDescription>Isi data sesuai transaksi</DialogDescription>
          <form
            onSubmit={inputHandler}
            className="flex-1 overflow-y-auto scrollbar-thin"
          >
            <div className="flex flex-col lg:flex-row gap-4 h-[100%]">
              <div className="w-full">
                <div className="grid gap-4 py-4 w-full border border-gray-200 rounded-lg p-4 mb-3">
                  <InputHorizontal
                    title="Buku"
                    type="text"
                    name="buku"
                    onChange={(e) => handleChange("buku", e.target.value)}
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
                        setKategoriAsset(value);
                      }}
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue placeholder="Select Kategori Asset" />
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
                        setGolonganAsset(value);
                      }}
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue placeholder="Select Golongan Asset" />
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
                    onChange={(e) =>
                      handleChange("periode_manfaat_k", e.target.value)
                    }
                    error={errors.periode_manfaat_k}
                  />
                  <InputHorizontal
                    title="Periode Manfaat (Fiskal)"
                    type="number"
                    name="periode_manfaat_f"
                    onChange={(e) =>
                      handleChange("periode_manfaat_f", e.target.value)
                    }
                    error={errors.periode_manfaat_f}
                  />
                  <InputHorizontal
                    title="Tanggal Perolehan"
                    type="date"
                    name="tanggal_perolehan"
                    onChange={(e) =>
                      handleChange("tanggal_perolehan", e.target.value)
                    }
                    error={errors.tanggal_perolehan}
                  />
                  <InputHorizontal
                    title="Harga Perolehan"
                    type="number"
                    name="harga_perolehan"
                    onChange={(e) =>
                      handleChange("harga_perolehan", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleChange(
                        "tanggal_penjualan_aktiva_tetap",
                        e.target.value
                      )
                    }
                    error={errors.tanggal_penjualan_aktiva_tetap}
                  />
                  <InputHorizontal
                    title="Tanggal Penyusutan Sebelumnya"
                    type="date"
                    name="tanggal_penyusutan_sebelumnya"
                    onChange={(e) =>
                      handleChange(
                        "tanggal_penyusutan_sebelumnya",
                        e.target.value
                      )
                    }
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
                    onChange={(e) => handleChange("nomor_fa", e.target.value)}
                    error={errors.nomor_fa}
                  />
                  <InputHorizontal
                    title="Nama Aktiva Tetap"
                    type="text"
                    name="nama_aktiva_tetap"
                    onChange={(e) =>
                      handleChange("nama_aktiva_tetap", e.target.value)
                    }
                    error={errors.nama_aktiva_tetap}
                  />
                  <InputHorizontal
                    title="Qty"
                    type="number"
                    name="qty"
                    onChange={(e) => handleChange("qty", e.target.value)}
                    error={errors.qty}
                  />
                  <InputHorizontal
                    title="Satuan"
                    type="text"
                    name="satuan"
                    onChange={(e) => handleChange("satuan", e.target.value)}
                    error={errors.satuan}
                  />
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Kode Akun</Label>
                    <Select
                      name="akun_debet_1"
                      value={kodeAkun || ""}
                      onValueChange={(value) => {
                        handleChange("kode_akun", value);
                        setKodeAkun(value);
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
                            onChange={(e) => setSearchAkun(e.target.value)}
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
                    onChange={(e) =>
                      handleChange("voucher_asset_terjual", e.target.value)
                    }
                    error={errors.voucher_asset_terjual}
                  />
                  <InputHorizontal
                    title="Harga Jual Aktiva Tetap"
                    type="number"
                    name="harga_jual_aktiva_tetap"
                    onChange={(e) =>
                      handleChange("harga_jual_aktiva_tetap", e.target.value)
                    }
                    error={errors.harga_jual_aktiva_tetap}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className={"mt-4"}>
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
