import { InputHorizontal } from "@/components/custom/input-custom";

export default function DirectorInfoSection({
  formData,
  errors,
  onInputChange,
}) {
  return (
    <div className="space-y-4 border border-gray-200 p-4 rounded-lg">
      <h3 className="text-lg font-semibold border-b pb-2">Kuasa Wajib Pajak</h3>

      <InputHorizontal
        title="Nama Direktur"
        name="director_name"
        value={formData.director_name || ""}
        onChange={(e) => onInputChange("director_name", e.target.value)}
        error={errors.director_name}
      />

      <InputHorizontal
        title="Nomor KTP Direktur"
        name="no_ktp_director"
        value={formData.no_ktp_director || ""}
        onChange={(e) => onInputChange("no_ktp_director", e.target.value)}
        error={errors.no_ktp_director}
      />

      <InputHorizontal
        title="Alamat Direktur"
        name="address_director"
        value={formData.address_director || ""}
        onChange={(e) => onInputChange("address_director", e.target.value)}
        error={errors.address_director}
      />

      <InputHorizontal
        title="RUPS Akhir Tahun"
        type="date"
        name="rups_akhir_tahun"
        value={formData.rups_akhir_tahun || ""}
        onChange={(e) => onInputChange("rups_akhir_tahun", e.target.value)}
        error={errors.rups_akhir_tahun}
      />
    </div>
  );
}
