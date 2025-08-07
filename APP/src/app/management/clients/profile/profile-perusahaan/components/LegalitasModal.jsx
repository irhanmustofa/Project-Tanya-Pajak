import { InputHorizontal } from "@/components/custom/input-custom";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import PemegangSahamModal from "./PemegangSaham";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function LegalitasModal({
  isOpen,
  onClose,
  onSave,
  data,
  isEdit,
}) {
  const [formData, setFormData] = useState({
    jenis_akta: "Pendirian",
    nomor_akta: "",
    tanggal: "",
    alamat_perusahaan: "",
    total_saham: "",
    jumlah_saham: "",
    harga_saham: "",
    link_akta: "",
    nomor_nib: "",
    nomor_sk: "",
    pemegang_saham: [],
    pengurus: [],
  });

  // State untuk pemegang saham modal
  const [pemegangSahamModalOpen, setPemegangSahamModalOpen] = useState(false);
  const [editingPemegangSaham, setEditingPemegangSaham] = useState(null);
  const [isPemegangSahamEditMode, setIsPemegangSahamEditMode] = useState(false);

  // State untuk konfirmasi delete pemegang saham
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState(null);

  useEffect(() => {
    if (isEdit && data) {
      setFormData(data);
    } else {
      setFormData({
        jenis_akta: "Pendirian",
        nomor_akta: "",
        tanggal: "",
        alamat_perusahaan: "",
        total_saham: "",
        jumlah_saham: "",
        harga_saham: "",
        link_akta: "",
        nomor_nib: "",
        nomor_sk: "",
        pemegang_saham: [],
        pengurus: [],
      });
    }
  }, [isEdit, data, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.jenis_akta || !formData.nomor_akta) {
      return;
    }
    onSave(formData);
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Functions untuk pemegang saham
  const handleAddPemegangSaham = () => {
    setIsPemegangSahamEditMode(false);
    setEditingPemegangSaham(null);
    setPemegangSahamModalOpen(true);
  };

  const handleEditPemegangSaham = (item, index) => {
    setIsPemegangSahamEditMode(true);
    setEditingPemegangSaham({ ...item, index });
    setPemegangSahamModalOpen(true);
  };

  const handleSavePemegangSaham = (data) => {
    if (isPemegangSahamEditMode && editingPemegangSaham) {
      // Update existing
      const updated = [...formData.pemegang_saham];
      updated[editingPemegangSaham.index] = data;
      setFormData((prev) => ({ ...prev, pemegang_saham: updated }));
    } else {
      // Add new
      setFormData((prev) => ({
        ...prev,
        pemegang_saham: [...prev.pemegang_saham, data],
      }));
    }
    setPemegangSahamModalOpen(false);
    setEditingPemegangSaham(null);
  };

  // Update handleDeletePemegangSaham untuk menggunakan modal konfirmasi
  const handleDeletePemegangSaham = (index) => {
    setPendingDeleteIndex(index);
    setDeleteConfirmModal(true);
  };

  const confirmDeletePemegangSaham = () => {
    if (pendingDeleteIndex !== null) {
      const updated = formData.pemegang_saham.filter(
        (_, i) => i !== pendingDeleteIndex
      );
      setFormData((prev) => ({ ...prev, pemegang_saham: updated }));
      setPendingDeleteIndex(null);
    }
    setDeleteConfirmModal(false);
  };

  const cancelDeletePemegangSaham = () => {
    setPendingDeleteIndex(null);
    setDeleteConfirmModal(false);
  };

  // Get the pemegang saham item that will be deleted for display in modal
  const getDeletePemegangSahamItem = () => {
    if (
      pendingDeleteIndex !== null &&
      formData.pemegang_saham[pendingDeleteIndex]
    ) {
      return formData.pemegang_saham[pendingDeleteIndex];
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <>
      <PemegangSahamModal
        isOpen={pemegangSahamModalOpen}
        onClose={() => setPemegangSahamModalOpen(false)}
        onSave={handleSavePemegangSaham}
        data={editingPemegangSaham}
        isEdit={isPemegangSahamEditMode}
      />
      <DeleteConfirmModal
        isOpen={deleteConfirmModal}
        onConfirm={confirmDeletePemegangSaham}
        onCancel={cancelDeletePemegangSaham}
        title="Konfirmasi Hapus Pemegang Saham"
        message="Apakah Anda yakin ingin menghapus data pemegang saham berikut?"
        itemInfo={getDeletePemegangSahamItem()}
        itemType="pemegang_saham"
      />

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white border border-gray-200 dark:border-gray-700 text-black dark:bg-black dark:bg-opacity-100 dark:text-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">
            {isEdit ? "Edit Akta Perusahaan" : "Tambah Akta Perusahaan"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-row items-center gap-2">
                <Label>Jenis Akta *</Label>
                <div className="mt-2 space-x-4 flex flex-row items-center">
                  <div className="flex">
                    <input
                      id="pendirian"
                      name="jenis_akta"
                      type="radio"
                      value="Pendirian"
                      checked={formData.jenis_akta === "Pendirian"}
                      onChange={(e) =>
                        handleChange("jenis_akta", e.target.value)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      required
                    />
                    <label htmlFor="pendirian" className="ml-2 text-sm">
                      Pendirian
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      id="perubahan"
                      name="jenis_akta"
                      type="radio"
                      value="Perubahan"
                      checked={formData.jenis_akta === "Perubahan"}
                      onChange={(e) =>
                        handleChange("jenis_akta", e.target.value)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="perubahan" className="ml-2 text-sm ">
                      Perubahan
                    </label>
                  </div>
                </div>
              </div>

              <InputHorizontal
                title="Nomor Akta *"
                value={formData.nomor_akta}
                onChange={(e) => handleChange("nomor_akta", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputHorizontal
                title="Tanggal"
                type="date"
                value={formData.tanggal}
                onChange={(e) => handleChange("tanggal", e.target.value)}
              />

              <InputHorizontal
                title="Total Saham"
                type="number"
                value={formData.total_saham}
                onChange={(e) => handleChange("total_saham", e.target.value)}
              />
            </div>

            <div>
              <Label>Alamat Perusahaan</Label>
              <Textarea
                value={formData.alamat_perusahaan}
                onChange={(e) =>
                  handleChange("alamat_perusahaan", e.target.value)
                }
                placeholder="Alamat perusahaan sesuai akta"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputHorizontal
                title="Jumlah Saham"
                type="number"
                value={formData.jumlah_saham}
                onChange={(e) => handleChange("jumlah_saham", e.target.value)}
              />

              <InputHorizontal
                title="Harga Saham"
                type="number"
                value={formData.harga_saham}
                onChange={(e) => handleChange("harga_saham", e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm border-b pb-1">
                Link Dokumen
              </h4>

              <InputHorizontal
                title="Link Akta"
                value={formData.link_akta}
                onChange={(e) => handleChange("link_akta", e.target.value)}
                placeholder="URL atau path file akta"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputHorizontal
                  title="Nomor NIB"
                  value={formData.nomor_nib}
                  onChange={(e) => handleChange("nomor_nib", e.target.value)}
                />

                <InputHorizontal
                  title="Nomor SK"
                  value={formData.nomor_sk}
                  onChange={(e) => handleChange("nomor_sk", e.target.value)}
                />
              </div>
            </div>

            {/* Section Pemegang Saham */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">Pemegang Saham</h4>
                <Button
                  type="button"
                  onClick={handleAddPemegangSaham}
                  size="sm"
                  variant="outline"
                >
                  + Tambah
                </Button>
              </div>

              {formData.pemegang_saham?.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">
                  Belum ada pemegang saham
                </p>
              ) : (
                <div className="space-y-2">
                  {formData.pemegang_saham?.map((item, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 p-3 rounded-md"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium text-sm">{item.nama}</h5>
                          <p className="text-xs text-gray-600">
                            {item.jabatan} - {item.persentase}% (
                            {item.jumlah_saham} saham)
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditPemegangSaham(item, index)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded text-xs"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePemegangSaham(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded text-xs"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
    </>
  );
}
