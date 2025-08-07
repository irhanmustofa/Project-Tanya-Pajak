import { InputHorizontal } from "@/components/custom/input-custom";
import { Label } from "@/components/ui/label";
import { base_url } from "@/api/http-endpoints";

export default function LogoUploadSection({
  formData,
  onImageLoad,
  onRemovePreview,
  preview,
  inputKey,
}) {
  const handleRemoveLogo = () => {
    onRemovePreview();
  };

  return (
    <div className="border border-gray-200 p-4 rounded-lg">
      <InputHorizontal
        key={inputKey}
        title="Upload Logo"
        type="file"
        name="logo"
        accept="image/*"
        onChange={onImageLoad}
      />

      <div className="mt-4">
        {preview ? (
          <div className="relative">
            <Label className="text-sm text-gray-600 mb-2 block">
              Preview Logo Baru:
            </Label>
            <div className="flex flex-col items-center gap-4">
              <img
                src={preview}
                alt="Preview Logo"
                className="w-48 h-48 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Hapus Preview
              </button>
            </div>
          </div>
        ) : formData.logo && typeof formData.logo === "string" ? (
          <div className="relative">
            <Label className="text-sm text-gray-600 mb-2 block">
              Logo Saat Ini:
            </Label>
            <div className="flex flex-col items-center gap-4">
              <img
                src={base_url + "/public" + formData.logo}
                alt="Logo Perusahaan"
                className="w-48 h-48 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Hapus Logo
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-500 text-sm">
            <div className="text-center">
              <p>No Image</p>
              <p className="text-xs mt-1">Upload logo perusahaan</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
