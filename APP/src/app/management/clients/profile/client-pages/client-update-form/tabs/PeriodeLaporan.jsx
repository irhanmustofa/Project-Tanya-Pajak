import { InputHorizontal } from "@/components/custom/input-custom";
import { useState } from "react";

export default function PeriodeLaporan({ formData, setFormData }) {
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid gap-4">
      <InputHorizontal
        title="Tahun Buku"
        name="tahun_buku"
        type="number"
        value={formData.tahun_buku}
        onChange={(e) => handleChange("tahun_buku", e.target.value)}
      />
      <InputHorizontal
        title="Periode Awal"
        name="periode_awal"
        type="date"
        value={formData.periode_awal}
        onChange={(e) => handleChange("periode_awal", e.target.value)}
      />
      <InputHorizontal
        title="Periode Akhir"
        name="periode_akhir"
        type="date"
        value={formData.periode_akhir}
        onChange={(e) => handleChange("periode_akhir", e.target.value)}
      />
      <InputHorizontal
        title="Tanggal Tanda Tangan"
        name="tanggal_ttd"
        type="text"
        placeholder="Contoh: 31 Desember 2025"
        value={formData.tanggal_ttd}
        onChange={(e) => handleChange("tanggal_ttd", e.target.value)}
      />
      <InputHorizontal
        title="Tempat Tanda Tangan"
        name="tempat_ttd"
        value={formData.tempat_ttd}
        onChange={(e) => handleChange("tempat_ttd", e.target.value)}
      />
    </div>
  );
}
