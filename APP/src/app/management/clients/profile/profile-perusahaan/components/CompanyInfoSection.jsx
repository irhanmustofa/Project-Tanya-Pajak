import { InputHorizontal } from "@/components/custom/input-custom";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import LogoUploadSection from "./LogoUploadSection";

export default function CompanyInfoSection({
  formData,
  errors,
  onInputChange,
  onImageLoad,
  onRemovePreview,
  preview,
  inputKey,
}) {
  return (
    <div className="space-y-4 border border-gray-200 p-4 rounded-lg">
      <h3 className="text-lg font-semibold border-b pb-2">
        Informasi Perusahaan
      </h3>

      <InputHorizontal
        title="Nama Perusahaan"
        name="company_name"
        value={formData.company_name || ""}
        onChange={(e) => onInputChange("company_name", e.target.value)}
        error={errors.company_name}
      />

      <div>
        <Label>Alamat Perusahaan</Label>
        <Textarea
          name="address_company"
          value={formData.address_company || ""}
          onChange={(e) => onInputChange("address_company", e.target.value)}
        />
        {errors.address_company && (
          <p className="text-red-500 text-sm mt-1">{errors.address_company}</p>
        )}
      </div>

      <InputHorizontal
        title="Nomor NPWP"
        name="no_npwp"
        value={formData.no_npwp || ""}
        onChange={(e) => onInputChange("no_npwp", e.target.value)}
        error={errors.no_npwp}
      />

      <InputHorizontal
        title="Nomor PKP"
        name="no_pkp"
        value={formData.no_pkp || ""}
        onChange={(e) => onInputChange("no_pkp", e.target.value)}
        error={errors.no_pkp}
      />

      <LogoUploadSection
        formData={formData}
        onImageLoad={onImageLoad}
        onRemovePreview={onRemovePreview}
        preview={preview}
        inputKey={inputKey}
      />
    </div>
  );
}
