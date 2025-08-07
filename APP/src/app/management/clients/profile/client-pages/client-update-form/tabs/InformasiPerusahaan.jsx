import { InputHorizontal } from "@/components/custom/input-custom";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useRef, useEffect } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import { base_url } from "@/api/http-endpoints";
import { useClient } from "../../../client-components/ClientProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InformasiPerusahaan({ formData, setFormData }) {
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);
  const [inputKey, setInputKey] = useState(0);
  const { clientGroup } = useClient();

  const { errors, handleChange } = useValidateInput({
    schema: {
      company_name: "required | min:3",
      address_company: "required | min:3",
      no_npwp: "required | min:3",
      no_pkp: "required | min:3",
    },
  });

  // Effect untuk restore preview dari formData.logo
  useEffect(() => {
    if (formData.logo && formData.logo instanceof File) {
      const previewUrl = URL.createObjectURL(formData.logo);
      setPreview(previewUrl);

      return () => {
        if (previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(previewUrl);
        }
      };
    } else {
      setPreview("");
    }
  }, [formData.logo]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    handleChange(name, value);
  };

  const loadImage = (event) => {
    const image = event.target.files[0];
    setFile(image);

    if (image) {
      setFormData((prev) => ({ ...prev, logo: image }));
      handleChange("logo", image);
      // Preview akan di-set oleh useEffect
    }
  };

  const cleanupPreview = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
  };

  const removePreview = () => {
    cleanupPreview();
    setPreview("");
    setFile("");
    setFormData((prev) => ({ ...prev, logo: "" }));

    // Force re-render input file untuk clear value
    setInputKey((prev) => prev + 1);
  };

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label>Group</Label>
        <Select
          name="group_id"
          value={String(formData.group_id || "")}
          onValueChange={(value) => {
            handleInputChange("group_id", value);
          }}
        >
          <SelectTrigger className="col-span-3 rounded-md border">
            <SelectValue placeholder="Select Group" />
          </SelectTrigger>
          <SelectContent>
            {clientGroup.map((group) => (
              <SelectItem value={String(group._id)} key={group._id}>
                {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <InputHorizontal
        title="Nama Perusahaan"
        name="company_name"
        value={formData.company_name}
        onChange={(e) => handleInputChange("company_name", e.target.value)}
        error={errors.company_name}
      />
      <div>
        <Label>Alamat Perusahaan</Label>
        <Textarea
          name="address_company"
          value={formData.address_company}
          onChange={(e) => handleInputChange("address_company", e.target.value)}
        />
        {errors.address_company && (
          <p className="text-red-500 text-sm mt-1">{errors.address_company}</p>
        )}
      </div>
      <InputHorizontal
        title="Nomor NPWP"
        name="no_npwp"
        value={formData.no_npwp}
        onChange={(e) => handleInputChange("no_npwp", e.target.value)}
        error={errors.no_npwp}
      />
      <InputHorizontal
        title="Nomor PKP"
        name="no_pkp"
        value={formData.no_pkp}
        onChange={(e) => handleInputChange("no_pkp", e.target.value)}
        error={errors.no_pkp}
      />

      <div className="border border-gray-200 p-4 rounded-lg">
        <InputHorizontal
          key={inputKey}
          title="Logo Perusahaan"
          type="file"
          name="logo"
          accept="image/*"
          onChange={loadImage}
          ref={fileInputRef}
        />

        <div className="mt-4">
          {preview ? (
            <div className="relative">
              <Label className="text-sm text-gray-600 mb-2 block">
                Preview Logo Baru:
              </Label>
              <div className="flex items-start gap-4">
                <img
                  src={preview}
                  alt="Preview Logo"
                  className="w-32 h-32 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={removePreview}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          ) : formData.logo && typeof formData.logo === "string" ? (
            <div className="relative">
              <Label className="text-sm text-gray-600 mb-2 block">
                Logo Saat Ini:
              </Label>
              <img
                src={base_url + "/public" + formData.logo}
                alt="Logo Perusahaan"
                className="w-32 h-32 object-cover rounded-md border"
              />
            </div>
          ) : (
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-500 text-sm">
              No Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
