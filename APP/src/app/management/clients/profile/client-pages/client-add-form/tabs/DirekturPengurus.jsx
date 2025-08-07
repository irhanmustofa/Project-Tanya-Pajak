import { InputHorizontal } from "@/components/custom/input-custom";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function DirekturPengurus({ formData, setFormData }) {
  const director = {
    director_name: formData.director_name || "",
    no_ktp_director: formData.no_ktp_director || "",
    address_director: formData.address_director || "",
    rups_akhir_tahun: formData.rups_akhir_tahun || "",
  };

  const pengurus = formData.pengurus || {
    name: "",
    no_ktp: "",
    npwp: "",
    address: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jabatan: "",
    lembar_kepemilikan: "",
    persen_kepemilikan: "",
  };

  const handleDirectorChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePengurusChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      pengurus: {
        ...prev.pengurus,
        [name]: value,
      },
    }));
  };

  return (
    <div className="grid gap-6">
      {/* Bagian Direktur */}
      <div className="grid gap-4 border border-gray-200 p-4 rounded-lg">
        <h3 className="font-semibold text-lg text-center">Kuasa Wajib Pajak</h3>
        <InputHorizontal
          title="Nama Direktur"
          name="director_name"
          value={director.director_name}
          onChange={(e) =>
            handleDirectorChange("director_name", e.target.value)
          }
        />
        <InputHorizontal
          title="No. KTP Direktur"
          name="no_ktp_director"
          value={director.no_ktp_director}
          onChange={(e) =>
            handleDirectorChange("no_ktp_director", e.target.value)
          }
        />
        <div>
          <Label>Alamat Direktur</Label>
          <Textarea
            name="address_director"
            value={director.address_director}
            onChange={(e) =>
              handleDirectorChange("address_director", e.target.value)
            }
          />
        </div>
        <InputHorizontal
          title="RUPS Akhir Tahun"
          name="rups_akhir_tahun"
          value={director.rups_akhir_tahun}
          onChange={(e) =>
            handleDirectorChange("rups_akhir_tahun", e.target.value)
          }
        />
      </div>
    </div>
  );
}
