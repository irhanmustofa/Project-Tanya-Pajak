import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { LucideTrash } from "lucide-react";
import {
  usePajakKeluaran,
  usePajakKeluaranDispatch,
} from "../retur-pajak-keluaran-components/ReturPajakKeluaranProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useState, useTransition } from "react";
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
import {
  pajakKeluaranAll,
  pajakKeluaranCreate,
} from "../retur-pajak-keluaran-components/ReturPajakKeluaranService";

export default function PajakKeluaranAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();
  const [input, setInput] = useState({});
  const [items, setItems] = useState([]);
  const [tipeTransaksi, setTipeTransaksi] = useState(null);
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const pajakKeluaranDispatch = usePajakKeluaranDispatch();
  const { pajakKeluaranAction } = usePajakKeluaran();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      nomor_faktur: "required|string|min:3",
      kode_transaksi: "required|string|min:3",
      tanggal_faktur: "required|date",
      jenis_faktur: "required|string|min:3",
      referensi_faktur: "string|nullable",
      alamat: "required|string|min:3",
      idtku: "required|string|min:3",
      description: "string|nullable",
      "lawan_transaksi.npwp": "required|string|min:3",
      "lawan_transaksi.nama": "required|string|min:3",
    },
  });

  const handleAddItem = (newItem) => {
    setItems((prev) => {
      const updated = [...prev, newItem];
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
  };

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
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
      formData.append("description", input.description);
      formData.append("lawan_transaksi", JSON.stringify(input.lawan_transaksi));
      formData.append("items", JSON.stringify(items));

      await pajakKeluaranCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Pajak Keluaran Success",
              message: "Pajak Keluaran added successfully",
              status: "success",
            },
          });

          pajakKeluaranAll().then((res) => {
            if (res.success) {
              pajakKeluaranDispatch({
                type: pajakKeluaranAction.SUCCESS,
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
              title: "Add Pajak Keluaran Failed",
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
          />
          <InputHorizontal
            title="Nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <InputHorizontal
            title="Kode"
            type="text"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
          />
          <InputHorizontal
            title="Qty"
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
          <InputHorizontal
            title="Satuan"
            type="text"
            value={satuan}
            onChange={(e) => setSatuan(e.target.value)}
          />
          <InputHorizontal
            title="Harga Satuan"
            type="number"
            value={hargaSatuan}
            onChange={(e) => setHargaSatuan(Number(e.target.value))}
          />
          <InputHorizontal
            title="Total Harga"
            type="number"
            value={totalHarga}
            onChange={(e) => setTotalHarga(Number(e.target.value))}
          />
        </div>

        <div className="space-y-3 flex flex-col h-full">
          <InputHorizontal
            title="Diskon"
            type="number"
            value={diskon}
            onChange={(e) => setDiskon(Number(e.target.value))}
          />
          <InputHorizontal
            title="Tarif PPN"
            type="number"
            value={tarifPpn}
            onChange={(e) => setTarifPpn(Number(e.target.value))}
          />
          <InputHorizontal
            title="DPP"
            type="number"
            value={dpp}
            onChange={(e) => setDpp(Number(e.target.value))}
          />
          <InputHorizontal
            title="PPn"
            type="number"
            value={ppn}
            onChange={(e) => setPpn(Number(e.target.value))}
          />
          <InputHorizontal
            title="DPP Nilai Lain"
            type="number"
            value={dppNilaiLain}
            onChange={(e) => setDppNilaiLain(Number(e.target.value))}
          />
          <InputHorizontal
            title="Tarif PPnBM"
            type="number"
            value={tarifPpnbm}
            onChange={(e) => setTarifPpnbm(Number(e.target.value))}
          />
          <InputHorizontal
            title="PPnBM"
            type="number"
            value={ppnbm}
            onChange={(e) => setPpnbm(Number(e.target.value))}
          />

          <div className="flex justify-end mt-auto">
            <Button type="button" onClick={handleAdd}>
              Tambah
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {dialogState.isOpen && <DialogInfo />}
      <Dialog open={isOpen} onOpenChange={handleOnClose}>
        <DialogContent className="sm:max-w-[1000px]">
          <DialogTitle>Input New Pajak Keluaran</DialogTitle>
          <DialogDescription>
            Add a new Pajak Keluaran to the system.
          </DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-h-[60vh] overflow-y-auto">
              <div className="col-span-1 md:col-span-2 border border-gray-300 rounded-md shadow-sm p-4">
                <Label className="text-lg font-semibold">
                  Dokumen Transaksi
                </Label>
                <div className="space-y-2 mt-4">
                  <Label className="block text-sm font-medium">
                    Tipe Transaksi
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="tipe_transaksi"
                        id="tipe_uang_muka"
                        value="0"
                        checked={tipeTransaksi === 0}
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
                        htmlFor="tipe_uang_muka"
                        className="text-sm font-normal cursor-pointer"
                      >
                        Uang Muka
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="tipe_transaksi"
                        id="tipe_pelunasan"
                        value="1"
                        checked={tipeTransaksi === 1}
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
                        htmlFor="tipe_pelunasan"
                        className="text-sm font-normal cursor-pointer"
                      >
                        Pelunasan
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500 mt-1">
                      {tipeTransaksi === 0 && "Transaksi pembayaran uang muka"}
                      {tipeTransaksi === 1 && "Transaksi pelunasan pembayaran"}
                      {tipeTransaksi === null && "Pilih tipe transaksi"}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-4">
                    <InputHorizontal
                      title="Nomor Faktur"
                      name="nomor_faktur"
                      type="text"
                      value={input.nomor_faktur}
                      onChange={(e) => {
                        handleChange("nomor_faktur", e.target.value);
                        setInput({ ...input, nomor_faktur: e.target.value });
                      }}
                      error={errors.nomor_faktur}
                    />
                    <InputHorizontal
                      title="Kode Transaksi"
                      name="kode_transaksi"
                      type="text"
                      value={input.kode_transaksi}
                      onChange={(e) => {
                        handleChange("kode_transaksi", e.target.value);
                        setInput({ ...input, kode_transaksi: e.target.value });
                      }}
                      error={errors.kode_transaksi}
                    />
                    <InputHorizontal
                      title="Tanggal Faktur"
                      name="tanggal_faktur"
                      type="date"
                      value={input.tanggal_faktur}
                      onChange={(e) => {
                        handleChange("tanggal_faktur", e.target.value);
                        setInput({ ...input, tanggal_faktur: e.target.value });
                      }}
                      error={errors.tanggal_faktur}
                    />
                    <InputHorizontal
                      title="Jenis Faktur"
                      name="jenis_faktur"
                      type="text"
                      value={input.jenis_faktur}
                      onChange={(e) => {
                        handleChange("jenis_faktur", e.target.value);
                        setInput({ ...input, jenis_faktur: e.target.value });
                      }}
                      error={errors.jenis_faktur}
                    />
                  </div>

                  <div className="space-y-4">
                    <InputHorizontal
                      title="Referensi Faktur"
                      name="referensi_faktur"
                      type="text"
                      value={input.referensi_faktur}
                      onChange={(e) => {
                        handleChange("referensi_faktur", e.target.value);
                        setInput({
                          ...input,
                          referensi_faktur: e.target.value,
                        });
                      }}
                      error={errors.referensi_faktur}
                    />
                    <InputHorizontal
                      title="Alamat"
                      name="alamat"
                      type="text"
                      value={input.alamat}
                      onChange={(e) => {
                        handleChange("alamat", e.target.value);
                        setInput({ ...input, alamat: e.target.value });
                      }}
                      error={errors.alamat}
                    />
                    <InputHorizontal
                      title="IDTKU"
                      name="idtku"
                      type="text"
                      value={input.idtku}
                      onChange={(e) => {
                        handleChange("idtku", e.target.value);
                        setInput({ ...input, idtku: e.target.value });
                      }}
                      error={errors.idtku}
                    />
                    <InputHorizontal
                      title="Description"
                      name="description"
                      type="text"
                      value={input.description}
                      onChange={(e) => {
                        handleChange("description", e.target.value);
                        setInput({ ...input, description: e.target.value });
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
                  value={input.lawan_transaksi?.npwp}
                  onChange={(e) => {
                    handleChange("lawan_transaksi.npwp", e.target.value);
                    setInput({
                      ...input,
                      lawan_transaksi: {
                        ...input.lawan_transaksi,
                        npwp: e.target.value,
                      },
                    });
                  }}
                  error={errors["lawan_transaksi.npwp"]}
                />

                <InputHorizontal
                  title="Nama"
                  name="nama"
                  type="text"
                  value={input.lawan_transaksi?.nama}
                  onChange={(e) => {
                    handleChange("lawan_transaksi.nama", e.target.value);
                    setInput({
                      ...input,
                      lawan_transaksi: {
                        ...input.lawan_transaksi,
                        nama: e.target.value,
                      },
                    });
                  }}
                  error={errors["lawan_transaksi.nama"]}
                />

                <InputHorizontal
                  title="Alamat"
                  name="alamat"
                  type="text"
                  value={input.lawan_transaksi?.alamat}
                  onChange={(e) => {
                    handleChange("lawan_transaksi.alamat", e.target.value);
                    setInput({
                      ...input,
                      lawan_transaksi: {
                        ...input.lawan_transaksi,
                        alamat: e.target.value,
                      },
                    });
                  }}
                  error={errors["lawan_transaksi.alamat"]}
                />
                <InputHorizontal
                  title="IDTKU"
                  name="idtku"
                  type="text"
                  value={input.lawan_transaksi?.idtku}
                  onChange={(e) => {
                    handleChange("lawan_transaksi.idtku", e.target.value);
                    setInput({
                      ...input,
                      lawan_transaksi: {
                        ...input.lawan_transaksi,
                        idtku: e.target.value,
                      },
                    });
                  }}
                  error={errors["lawan_transaksi.idtku"]}
                />
                <InputHorizontal
                  title="Email"
                  name="email"
                  type="text"
                  value={input.lawan_transaksi?.email}
                  onChange={(e) => {
                    handleChange("lawan_transaksi.email", e.target.value);
                    setInput({
                      ...input,
                      lawan_transaksi: {
                        ...input.lawan_transaksi,
                        email: e.target.value,
                      },
                    });
                  }}
                  error={errors["lawan_transaksi.email"]}
                />
              </div>

              <div className="col-span-1 md:col-span-2 border border-gray-300 rounded-md p-3 space-y-3">
                <Label className="text-lg font-semibold">Items</Label>
                <ItemInputForm />
                <Table>
                  <TableHeader>
                    <TableRow>
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
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((it, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{it.tipe}</TableCell>
                        <TableCell>{it.nama}</TableCell>
                        <TableCell>{it.kode}</TableCell>
                        <TableCell>{it.qty}</TableCell>
                        <TableCell>{it.satuan}</TableCell>
                        <TableCell>{it.harga_satuan}</TableCell>
                        <TableCell>{it.total_harga}</TableCell>
                        <TableCell>{it.diskon}</TableCell>
                        <TableCell>{it.tarifPpn}</TableCell>
                        <TableCell>{it.dpp}</TableCell>
                        <TableCell>{it.ppn}</TableCell>
                        <TableCell>{it.dpp_nilai_lain}</TableCell>
                        <TableCell>{it.tarif_ppnbm}</TableCell>
                        <TableCell>{it.ppnbm}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            type="button"
                            onClick={() => handleRemoveItem(idx)}
                          >
                            <LucideTrash className="w-4 h-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <DialogFooter className="pt-4 border-t">
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
