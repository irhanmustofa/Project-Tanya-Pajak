import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { LucideTrash, LucideTrash2 } from "lucide-react";
import {
  usePajakKeluaran,
  usePajakKeluaranDispatch,
} from "../pajak-keluaran-components/PajakKeluaranProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useState, useTransition, useEffect } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import { InputHorizontal } from "@/components/custom/input-custom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  pajakKeluaranAll,
  pajakKeluaranUpdate,
} from "../pajak-keluaran-components/PajakKeluaranService";

export default function PajakKeluaranUpdateForm({ onClose, id }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState({
    nomor_faktur: "",
    kode_transaksi: "",
    jenis_faktur: "",
    referensi_faktur: "",
    alamat: "",
    idtku: "",
    tanggal_faktur: "",
    description: "",
    lawan_transaksi: {
      npwp: "",
      nama: "",
      alamat: "",
      idtku: "",
      email: "",
    },
  });
  const [items, setItems] = useState([]);
  const [tipeTransaksi, setTipeTransaksi] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const pajakKeluaranDispatch = usePajakKeluaranDispatch();
  const { pajakKeluaranAction, pajakKeluaranState } = usePajakKeluaran();

  const { valid, handleChange, errors, setFieldsValue } = useValidateInput({
    schema: {
      nomor_faktur: "required|string|min:3",
      kode_transaksi: "required|string|min:3",
      tanggal_faktur: "required|date",
      jenis_faktur: "required|string",
      referensi_faktur: "string|nullable",
      alamat: "required|string|min:3",
      idtku: "required|string|min:3",
      description: "string|nullable",
      "lawan_transaksi.npwp": "required|string|min:3",
      "lawan_transaksi.nama": "required|string|min:3",
      "lawan_transaksi.alamat": "string|nullable",
      "lawan_transaksi.idtku": "string|nullable",
      "lawan_transaksi.email": "string|nullable",
    },
  });

  useEffect(() => {
    const data = pajakKeluaranState.data.find((item) => item._id === id);

    if (data && !dataLoaded) {
      const inputData = {
        nomor_faktur: data.nomor_faktur || "",
        kode_transaksi: data.kode_transaksi || "",
        jenis_faktur: data.jenis_faktur || "",
        referensi_faktur: data.referensi_faktur || "",
        alamat: data.alamat || "",
        idtku: data.idtku || "",
        tanggal_faktur: new Date(data.tanggal_faktur).toLocaleDateString(
          "en-CA"
        ),
        description: data.description || "",
        lawan_transaksi: {
          npwp: data.lawan_transaksi?.npwp || "",
          nama: data.lawan_transaksi?.nama || "",
          alamat: data.lawan_transaksi?.alamat || "",
          idtku: data.lawan_transaksi?.idtku || "",
          email: data.lawan_transaksi?.email || "",
        },
      };

      setInput(inputData);

      const itemsWithIds = (data.items || []).map((item, index) => ({
        ...item,
        id: item.id || `existing-${index}-${Date.now()}`,
      }));
      setItems(itemsWithIds);

      const tipeValue = Number(data.tipe_transaksi);
      setTipeTransaksi(tipeValue);

      const validationData = {
        tipe_transaksi: tipeValue,
        ...inputData,
      };

      if (setFieldsValue) {
        setFieldsValue(validationData);
      } else {
        Object.keys(validationData).forEach((key) => {
          if (key.includes(".")) {
            const [parent, child] = key.split(".");
            if (
              validationData[parent] &&
              validationData[parent][child] !== undefined
            ) {
              handleChange(key, validationData[parent][child]);
            }
          } else {
            handleChange(key, validationData[key]);
          }
        });
      }

      setDataLoaded(true);
    }
  }, [id, pajakKeluaranState.data, dataLoaded, handleChange, setFieldsValue]);

  const handleAddItem = (newItem) => {
    setItems((prev) => {
      const itemWithId = { ...newItem, id: Date.now() + Math.random() };
      const updated = [...prev, itemWithId];
      setInput((inp) => ({ ...inp, items: updated }));
      handleChange("items", updated);
      return updated;
    });
  };

  const handleRemoveItem = (idx) => {
    setItems((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      setInput((inp) => ({ ...inp, items: updated }));
      handleChange("items", updated);
      return updated;
    });
    setSelectedItems((prev) =>
      prev.filter((selectedIdx) => selectedIdx !== idx)
    );
  };

  const handleSelectItem = (idx, checked) => {
    setSelectedItems((prev) => {
      if (checked) {
        return [...prev, idx];
      } else {
        return prev.filter((selectedIdx) => selectedIdx !== idx);
      }
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(items.map((_, idx) => idx));
    } else {
      setSelectedItems([]);
    }
  };

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;

    const updatedItems = items.filter((_, idx) => !selectedItems.includes(idx));
    setItems(updatedItems);
    setInput((inp) => ({ ...inp, items: updatedItems }));
    handleChange("items", updatedItems);
    setSelectedItems([]);
  };

  const handleClearAll = () => {
    setItems([]);
    setInput((inp) => ({ ...inp, items: [] }));
    handleChange("items", []);
    setSelectedItems([]);
  };

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("tipe_transaksi", Number(tipeTransaksi));
        formData.append("kode_transaksi", input.kode_transaksi);
        formData.append("jenis_faktur", input.jenis_faktur);
        formData.append("referensi_faktur", input.referensi_faktur || "");
        formData.append("alamat", input.alamat);
        formData.append("idtku", input.idtku);
        formData.append("nomor_faktur", input.nomor_faktur);
        formData.append(
          "tanggal_faktur",
          new Date(input.tanggal_faktur).toLocaleDateString("en-CA")
        );
        formData.append("description", input.description || "");
        formData.append(
          "lawan_transaksi",
          JSON.stringify(input.lawan_transaksi)
        );
        formData.append("items", JSON.stringify(items));

        const response = await pajakKeluaranUpdate(id, formData);

        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Update Pajak Keluaran Success",
              message: "Pajak Keluaran updated successfully",
              status: "success",
            },
          });

          const updatedData = await pajakKeluaranAll();
          if (updatedData.success) {
            pajakKeluaranDispatch({
              type: pajakKeluaranAction.SUCCESS,
              payload: updatedData.data,
            });
          }

          handleOnClose();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Update Pajak Keluaran Failed",
              message: response.message,
              status: "error",
            },
          });
        }
      } catch (error) {
        console.error("Error:", error);
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            show: true,
            title: "Error",
            message: "Terjadi kesalahan yang tidak terduga",
            status: "error",
          },
        });
      }
    });
  };

  const handleOnClose = () => {
    setIsOpen(false);
    onClose();
  };

  function ItemInputForm() {
    const [tipe, setTipe] = useState("");
    const [nama, setNama] = useState("");
    const [kode, setKode] = useState("");
    const [qty, setQty] = useState(1);
    const [satuan, setSatuan] = useState("");
    const [hargaSatuan, setHargaSatuan] = useState(null);
    const [totalHarga, setTotalHarga] = useState(null);
    const [diskon, setDiskon] = useState(null);
    const [tarifPpn, setTarifPpn] = useState(null);
    const [ppn, setPpn] = useState(null);
    const [dpp, setDpp] = useState(null);
    const [dppNilaiLain, setDppNilaiLain] = useState(null);
    const [tarifPpnbm, setTarifPpnbm] = useState(null);
    const [ppnbm, setPpnbm] = useState(null);

    const handleAdd = () => {
      if (!tipe || !nama || !kode) {
        alert("Tipe, Nama, dan Kode wajib diisi!");
        return;
      }

      handleAddItem({
        tipe,
        nama,
        kode,
        qty,
        satuan,
        harga_satuan: hargaSatuan,
        total_harga: totalHarga,
        diskon,
        tarif_ppn: tarifPpn,
        ppn,
        dpp,
        dpp_nilai_lain: dppNilaiLain,
        tarif_ppnbm: tarifPpnbm,
        ppnbm,
      });

      setTipe("");
      setNama("");
      setKode("");
      setQty(1);
      setSatuan("");
      setHargaSatuan(null);
      setTotalHarga(null);
      setDiskon(null);
      setTarifPpn(null);
      setPpn(null);
      setDpp(null);
      setDppNilaiLain(null);
      setTarifPpnbm(null);
      setPpnbm(null);
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-200 p-4 rounded-lg shadow-sm">
        <div className="space-y-3">
          <InputHorizontal
            title="Tipe"
            type="text"
            value={tipe}
            onChange={(e) => setTipe(e.target.value)}
            placeholder="Wajib diisi"
          />
          <InputHorizontal
            title="Nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Wajib diisi"
          />
          <InputHorizontal
            title="Kode"
            type="text"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            placeholder="Wajib diisi"
          />
          <InputHorizontal
            title="Qty"
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            min="1"
          />
          <InputHorizontal
            title="Satuan"
            type="text"
            value={satuan}
            onChange={(e) => setSatuan(e.target.value)}
            placeholder="Contoh: PCS, KG, dll"
          />
          <InputHorizontal
            title="Harga Satuan"
            type="number"
            value={hargaSatuan}
            onChange={(e) => setHargaSatuan(Number(e.target.value))}
            min="0"
          />
          <InputHorizontal
            title="Total Harga"
            type="number"
            value={totalHarga}
            onChange={(e) => setTotalHarga(Number(e.target.value))}
            min="0"
          />
        </div>

        <div className="space-y-3 flex flex-col h-full">
          <InputHorizontal
            title="Diskon"
            type="number"
            value={diskon}
            onChange={(e) => setDiskon(Number(e.target.value))}
            min="0"
          />
          <InputHorizontal
            title="Tarif PPN"
            type="number"
            value={tarifPpn}
            onChange={(e) => setTarifPpn(Number(e.target.value))}
            min="0"
            max="100"
            placeholder="%"
          />
          <InputHorizontal
            title="DPP"
            type="number"
            value={dpp}
            onChange={(e) => setDpp(Number(e.target.value))}
            min="0"
          />
          <InputHorizontal
            title="PPN"
            type="number"
            value={ppn}
            onChange={(e) => setPpn(Number(e.target.value))}
            min="0"
          />
          <InputHorizontal
            title="DPP Nilai Lain"
            type="number"
            value={dppNilaiLain}
            onChange={(e) => setDppNilaiLain(Number(e.target.value))}
            min="0"
          />
          <InputHorizontal
            title="Tarif PPnBM"
            type="number"
            value={tarifPpnbm}
            onChange={(e) => setTarifPpnbm(Number(e.target.value))}
            min="0"
            max="100"
            placeholder="%"
          />
          <InputHorizontal
            title="PPnBM"
            type="number"
            value={ppnbm}
            onChange={(e) => setPpnbm(Number(e.target.value))}
            min="0"
          />

          <div className="flex justify-end mt-auto">
            <Button type="button" onClick={handleAdd}>
              Tambah Item
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isAllSelected =
    items.length > 0 && selectedItems.length === items.length;
  const isIndeterminate =
    selectedItems.length > 0 && selectedItems.length < items.length;

  return (
    <div className="relative">
      {dialogState.isOpen && <DialogInfo />}
      <Dialog open={isOpen} onOpenChange={handleOnClose}>
        <DialogContent className="sm:max-w-[1200px]">
          <DialogTitle>Update Pajak Keluaran</DialogTitle>
          <DialogDescription>
            Edit Pajak Keluaran yang sudah ada.
          </DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-h-[70vh] overflow-y-auto">
              <div className="col-span-1 md:col-span-2 border border-gray-300 rounded-md p-4 shadow-sm">
                <Label className="text-lg font-semibold">
                  Dokumen Transaksi
                </Label>

                <div className="space-y-2 mt-4">
                  <Label className="block text-sm font-medium text-gray-700">
                    Tipe Transaksi
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="tipe_transaksi"
                        id="tipe_uang_muka_update"
                        value="0"
                        checked={Number(tipeTransaksi) === 0}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setTipeTransaksi(value);
                          handleChange("tipe_transaksi", value);
                          setInput((prev) => ({
                            ...prev,
                            tipe_transaksi: value,
                          }));
                        }}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <Label
                        htmlFor="tipe_uang_muka_update"
                        className="text-sm font-normal cursor-pointer"
                      >
                        Uang Muka
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="tipe_transaksi"
                        id="tipe_pelunasan_update"
                        value="1"
                        checked={Number(tipeTransaksi) === 1}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setTipeTransaksi(value);
                          handleChange("tipe_transaksi", value);
                          setInput((prev) => ({
                            ...prev,
                            tipe_transaksi: value,
                          }));
                        }}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <Label
                        htmlFor="tipe_pelunasan_update"
                        className="text-sm font-normal cursor-pointer"
                      >
                        Pelunasan
                      </Label>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    {Number(tipeTransaksi) === 0 &&
                      "Transaksi pembayaran uang muka"}
                    {Number(tipeTransaksi) === 1 &&
                      "Transaksi pelunasan pembayaran"}
                    {tipeTransaksi === null && "Pilih tipe transaksi"}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-4">
                    <InputHorizontal
                      title="Nomor Faktur"
                      name="nomor_faktur"
                      type="text"
                      value={input.nomor_faktur || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleChange("nomor_faktur", value);
                        setInput((prev) => ({ ...prev, nomor_faktur: value }));
                      }}
                      error={errors.nomor_faktur}
                    />
                    <InputHorizontal
                      title="Kode Transaksi"
                      name="kode_transaksi"
                      type="text"
                      value={input.kode_transaksi || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleChange("kode_transaksi", value);
                        setInput((prev) => ({
                          ...prev,
                          kode_transaksi: value,
                        }));
                      }}
                      error={errors.kode_transaksi}
                    />
                    <InputHorizontal
                      title="Tanggal Faktur"
                      name="tanggal_faktur"
                      type="date"
                      value={input.tanggal_faktur || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleChange("tanggal_faktur", value);
                        setInput((prev) => ({
                          ...prev,
                          tanggal_faktur: value,
                        }));
                      }}
                      error={errors.tanggal_faktur}
                    />
                    <InputHorizontal
                      title="Jenis Faktur"
                      name="jenis_faktur"
                      type="text"
                      value={input.jenis_faktur || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleChange("jenis_faktur", value);
                        setInput((prev) => ({ ...prev, jenis_faktur: value }));
                      }}
                      error={errors.jenis_faktur}
                    />
                  </div>

                  <div className="space-y-4">
                    <InputHorizontal
                      title="Referensi Faktur"
                      name="referensi_faktur"
                      type="text"
                      value={input.referensi_faktur || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleChange("referensi_faktur", value);
                        setInput((prev) => ({
                          ...prev,
                          referensi_faktur: value,
                        }));
                      }}
                      error={errors.referensi_faktur}
                    />
                    <InputHorizontal
                      title="Alamat"
                      name="alamat"
                      type="text"
                      value={input.alamat || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleChange("alamat", value);
                        setInput((prev) => ({ ...prev, alamat: value }));
                      }}
                      error={errors.alamat}
                    />
                    <InputHorizontal
                      title="IDTKU"
                      name="idtku"
                      type="text"
                      value={input.idtku || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleChange("idtku", value);
                        setInput((prev) => ({ ...prev, idtku: value }));
                      }}
                      error={errors.idtku}
                    />
                    <InputHorizontal
                      title="Description"
                      name="description"
                      type="text"
                      value={input.description || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleChange("description", value);
                        setInput((prev) => ({ ...prev, description: value }));
                      }}
                      error={errors.description}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 col-span-1 md:col-span-2 border border-gray-300 rounded-md p-3 space-y-3">
                <Label className="text-lg font-semibold">Lawan Transaksi</Label>
                <InputHorizontal
                  title="NPWP"
                  name="npwp"
                  type="text"
                  value={input.lawan_transaksi?.npwp || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleChange("lawan_transaksi.npwp", value);
                    setInput((prev) => ({
                      ...prev,
                      lawan_transaksi: {
                        ...prev.lawan_transaksi,
                        npwp: value,
                      },
                    }));
                  }}
                  error={errors["lawan_transaksi.npwp"]}
                />

                <InputHorizontal
                  title="Nama"
                  name="nama"
                  type="text"
                  value={input.lawan_transaksi?.nama || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleChange("lawan_transaksi.nama", value);
                    setInput((prev) => ({
                      ...prev,
                      lawan_transaksi: {
                        ...prev.lawan_transaksi,
                        nama: value,
                      },
                    }));
                  }}
                  error={errors["lawan_transaksi.nama"]}
                />

                <InputHorizontal
                  title="Alamat"
                  name="alamat"
                  type="text"
                  value={input.lawan_transaksi?.alamat || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleChange("lawan_transaksi.alamat", value);
                    setInput((prev) => ({
                      ...prev,
                      lawan_transaksi: {
                        ...prev.lawan_transaksi,
                        alamat: value,
                      },
                    }));
                  }}
                  error={errors["lawan_transaksi.alamat"]}
                />
                <InputHorizontal
                  title="IDTKU"
                  name="idtku"
                  type="text"
                  value={input.lawan_transaksi?.idtku || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleChange("lawan_transaksi.idtku", value);
                    setInput((prev) => ({
                      ...prev,
                      lawan_transaksi: {
                        ...prev.lawan_transaksi,
                        idtku: value,
                      },
                    }));
                  }}
                  error={errors["lawan_transaksi.idtku"]}
                />
                <InputHorizontal
                  title="Email"
                  name="email"
                  type="text"
                  value={input.lawan_transaksi?.email || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleChange("lawan_transaksi.email", value);
                    setInput((prev) => ({
                      ...prev,
                      lawan_transaksi: {
                        ...prev.lawan_transaksi,
                        email: value,
                      },
                    }));
                  }}
                  error={errors["lawan_transaksi.email"]}
                />
              </div>

              <div className="col-span-1 md:col-span-2 border border-gray-300 rounded-md p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">Items</Label>
                </div>

                <ItemInputForm />

                {items.length > 0 ? (
                  <div className="overflow-x-auto">
                    {items.length > 0 && (
                      <div className="flex items-center float-end gap-2">
                        <span className="text-sm text-gray-600">
                          {selectedItems.length} dari {items.length} dipilih
                        </span>

                        {selectedItems.length > 0 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleBulkDelete}
                          >
                            <LucideTrash2 className="w-4 h-4 mr-1" />
                            Hapus Terpilih ({selectedItems.length})
                          </Button>
                        )}

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleClearAll}
                        >
                          <LucideTrash className="w-4 h-4 mr-1" />
                          Hapus Semua
                        </Button>
                      </div>
                    )}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">
                            <Checkbox
                              checked={isAllSelected}
                              indeterminate={isIndeterminate}
                              onCheckedChange={handleSelectAll}
                              aria-label="Select all items"
                            />
                          </TableHead>
                          <TableHead>Tipe</TableHead>
                          <TableHead>Nama</TableHead>
                          <TableHead>Kode</TableHead>
                          <TableHead>Qty</TableHead>
                          <TableHead>Satuan</TableHead>
                          <TableHead>Harga Satuan</TableHead>
                          <TableHead>Total Harga</TableHead>
                          <TableHead>Diskon</TableHead>
                          <TableHead>Tarif PPN</TableHead>
                          <TableHead>DPP</TableHead>
                          <TableHead>PPN</TableHead>
                          <TableHead>DPP Lain</TableHead>
                          <TableHead>Tarif PPnBM</TableHead>
                          <TableHead>PPnBM</TableHead>
                          <TableHead className="w-[80px]">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item, idx) => (
                          <TableRow key={item.id || idx}>
                            <TableCell>
                              <Checkbox
                                checked={selectedItems.includes(idx)}
                                onCheckedChange={(checked) =>
                                  handleSelectItem(idx, checked)
                                }
                                aria-label={`Select item ${item.nama}`}
                              />
                            </TableCell>
                            <TableCell>{item.tipe}</TableCell>
                            <TableCell>{item.nama}</TableCell>
                            <TableCell>{item.kode}</TableCell>
                            <TableCell>{item.qty}</TableCell>
                            <TableCell>{item.satuan}</TableCell>
                            <TableCell>
                              {item.harga_satuan?.toLocaleString("id-ID")}
                            </TableCell>
                            <TableCell>
                              {item.total_harga?.toLocaleString("id-ID")}
                            </TableCell>
                            <TableCell>
                              {item.diskon?.toLocaleString("id-ID")}
                            </TableCell>
                            <TableCell>
                              {item.tarif_ppn ? `${item.tarif_ppn}%` : "-"}
                            </TableCell>
                            <TableCell>
                              {item.dpp?.toLocaleString("id-ID")}
                            </TableCell>
                            <TableCell>
                              {item.ppn?.toLocaleString("id-ID")}
                            </TableCell>
                            <TableCell>
                              {item.dpp_nilai_lain?.toLocaleString("id-ID")}
                            </TableCell>
                            <TableCell>
                              {item.tarif_ppnbm ? `${item.tarif_ppnbm}%` : "-"}
                            </TableCell>
                            <TableCell>
                              {item.ppnbm?.toLocaleString("id-ID")}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                type="button"
                                size="sm"
                                onClick={() => handleRemoveItem(idx)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <LucideTrash className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                    <p>Belum ada item. Tambahkan item terlebih dahulu.</p>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="pt-4 border-t">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-gray-600">
                  Items: {items.length} | Valid: {valid ? "✅" : "❌"} | Loaded:{" "}
                  {dataLoaded ? "✅" : "⏳"} | Selected: {selectedItems.length}
                </span>
                <Button type="submit" pending={isPending}>
                  Update
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
