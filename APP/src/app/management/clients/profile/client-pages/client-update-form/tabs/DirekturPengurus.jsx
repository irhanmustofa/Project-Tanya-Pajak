import { InputHorizontal } from "@/components/custom/input-custom";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";

export default function DirekturPengurus({ formData, setFormData }) {
  const { errors, handleChange } = useValidateInput({
    schema: {
      director_name: "required | min:3",
      no_ktp_director: "required | min:3",
      address_director: "required | min:3",
    },
  });
  const handleDirectorChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    handleChange(name, value);
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
          value={formData.director_name}
          onChange={(e) =>
            handleDirectorChange("director_name", e.target.value)
          }
          error={errors.director_name}
        />
        <InputHorizontal
          title="No. KTP Direktur"
          name="no_ktp_director"
          value={formData.no_ktp_director}
          onChange={(e) =>
            handleDirectorChange("no_ktp_director", e.target.value)
          }
          error={errors.no_ktp_director}
        />
        <div>
          <Label>Alamat Direktur</Label>
          <Textarea
            name="address_director"
            value={formData.address_director}
            onChange={(e) =>
              handleDirectorChange("address_director", e.target.value)
            }
          />
          {errors.address_director && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address_director}
            </p>
          )}
        </div>
        <InputHorizontal
          title="RUPS Akhir Tahun"
          name="rups_akhir_tahun"
          value={formData.rups_akhir_tahun}
          onChange={(e) =>
            handlePengurusChange("rups_akhir_tahun", e.target.value)
          }
        />
      </div>
    </div>
  );
}
