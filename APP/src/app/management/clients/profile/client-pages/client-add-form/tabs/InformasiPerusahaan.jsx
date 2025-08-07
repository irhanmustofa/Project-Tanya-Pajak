import { InputHorizontal } from "@/components/custom/input-custom";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useRef, useEffect, use } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClient } from "../../../client-components/ClientProvider";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function InformasiPerusahaan({ formData, setFormData }) {
  const [preview, setPreview] = useState("");
  const { clientGroup } = useClient();
  const fileInputRef = useRef(null);

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

  const handleChange = (name, value) => {
    console.log("handleChange:", name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      handleChange("logo", file);
    } else {
      handleChange("logo", null);
    }
  };

  const removePreview = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview("");
    handleChange("logo", null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="grid gap-4">
      {useLocalStorage.get("groupId") == "ADM00" && (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label>Group</Label>
          <Select
            name="group_id"
            onValueChange={(value) => {
              handleChange("group_id", value);
            }}
          >
            <SelectTrigger className="col-span-3 rounded-md border">
              <SelectValue placeholder="Select Group" />
            </SelectTrigger>
            <SelectContent>
              {clientGroup.map((group) => (
                <SelectItem value={String(group.group_id)} key={group.group_id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <InputHorizontal
        title="Nama Perusahaan"
        name="company_name"
        value={formData.company_name}
        onChange={(e) => handleChange("company_name", e.target.value)}
      />
      <div>
        <Label>Alamat Perusahaan</Label>
        <Textarea
          name="address_company"
          value={formData.address_company}
          onChange={(e) => handleChange("address_company", e.target.value)}
        />
      </div>
      <InputHorizontal
        title="Nomor NPWP"
        name="no_npwp"
        value={formData.no_npwp}
        onChange={(e) => handleChange("no_npwp", e.target.value)}
      />
      <InputHorizontal
        title="Nomor PKP"
        name="no_pkp"
        value={formData.no_pkp}
        onChange={(e) => handleChange("no_pkp", e.target.value)}
      />

      <div className="border border-gray-200 p-4 rounded-lg">
        <InputHorizontal
          title="Logo Perusahaan"
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        <div className="mt-4">
          {preview ? (
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Preview Logo:</Label>
              <div className="flex items-start gap-4">
                <img
                  src={preview}
                  alt="Preview Logo"
                  className="w-32 h-32 object-cover rounded-md border border-gray-300"
                />
                <button
                  type="button"
                  onClick={removePreview}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          ) : (
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-500 text-sm">
              No Image Selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
