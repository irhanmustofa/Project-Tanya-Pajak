import { InputHorizontal } from "@/components/custom/input-custom";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function PemegangSahamModal({
  isOpen,
  onClose,
  onSave,
  data,
  isEdit,
}) {
  const [formData, setFormData] = useState({
    nama: "",
    no_ktp: "",
    npwp: "",
    address: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jabatan: "",
    jumlah_saham: "",
    persentase: "",
  });

  useEffect(() => {
    if (isEdit && data) {
      setFormData(data);
    } else {
      setFormData({
        nama: "",
        no_ktp: "",
        npwp: "",
        address: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jabatan: "",
        jumlah_saham: "",
        persentase: "",
      });
    }
  }, [isEdit, data, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.jabatan) {
      return;
    }
    onSave(formData);
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          {isEdit ? "Edit Pemegang Saham" : "Tambah Pemegang Saham"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Nama dan No KTP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputHorizontal
              title="Nama *"
              value={formData.nama}
              onChange={(e) => handleChange("nama", e.target.value)}
              required
            />

            <InputHorizontal
              title="No KTP"
              value={formData.no_ktp}
              onChange={(e) => handleChange("no_ktp", e.target.value)}
            />
          </div>

          {/* Row 2: NPWP dan Jabatan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputHorizontal
              title="NPWP"
              value={formData.npwp}
              onChange={(e) => handleChange("npwp", e.target.value)}
            />

            <InputHorizontal
              title="Jabatan *"
              value={formData.jabatan}
              onChange={(e) => handleChange("jabatan", e.target.value)}
            />
          </div>

          {/* Row 3: Tempat Lahir dan Tanggal Lahir */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputHorizontal
              title="Tempat Lahir"
              value={formData.tempat_lahir}
              onChange={(e) => handleChange("tempat_lahir", e.target.value)}
            />

            <InputHorizontal
              title="Tanggal Lahir"
              type="date"
              value={formData.tanggal_lahir}
              onChange={(e) => handleChange("tanggal_lahir", e.target.value)}
            />
          </div>

          {/* Row 4: Jumlah Saham dan Persentase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputHorizontal
              title="Jumlah Saham"
              type="number"
              value={formData.jumlah_saham}
              onChange={(e) => handleChange("jumlah_saham", e.target.value)}
            />

            <InputHorizontal
              title="Persentase (%)"
              type="number"
              value={formData.persentase}
              onChange={(e) => handleChange("persentase", e.target.value)}
            />
          </div>

          {/* Row 5: Alamat (Full Width) */}
          <div>
            <Label>Alamat</Label>
            <Textarea
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Alamat lengkap"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {isEdit ? "Update" : "Tambah"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Batal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
