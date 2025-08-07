import { Button } from "@/components/ui/button";
import { useValidateInput } from "@/hooks/use-validate-input";
import { useDialog } from "@/dialogs/DialogProvider";
import ClientProvider from "./client-components/ClientProvider";
import MainPage from "@/layouts/MainPage";
import LegalitasModal from "./profile-perusahaan/components/LegalitasModal";
import { useLegalitasData } from "./profile-perusahaan/hooks/useLegalitasData";
import CompanyInfoSection from "./profile-perusahaan/components/CompanyInfoSection";
import DirectorInfoSection from "./profile-perusahaan/components/DirectorInfoSection";
import LegalitasTable from "./profile-perusahaan/components/LegalitasTable";
import { useCompanyProfile } from "./profile-perusahaan/hooks/useCompanyProfile";
import { useLogoUpload } from "./profile-perusahaan/hooks/useLogoUpload";
import DeleteConfirmModal from "./profile-perusahaan/components/DeleteConfirmModal";

function ProfilePerusahaanContent() {
  const { formData, setFormData, loading, handleInputChange, handleSave } =
    useCompanyProfile();
  const { file, preview, inputKey, loadImage, removePreview } = useLogoUpload(
    formData,
    setFormData
  );

  const {
    legalitasData,
    modalOpen,
    setModalOpen,
    editingLegalitas,
    isEditMode,
    deleteConfirmModal,
    handleAddLegalitas,
    handleEditLegalitas,
    handleSaveLegalitas,
    handleDeleteLegalitas,
    confirmDeleteLegalitas,
    cancelDeleteLegalitas,
    getDeleteItem,
  } = useLegalitasData(formData.legalitas);

  const { dialogState, DialogInfo } = useDialog();

  const { errors, handleChange } = useValidateInput({
    schema: {
      company_name: "required | min:3",
      address_company: "required | min:3",
      no_npwp: "required | min:3",
      no_pkp: "required | min:3",
    },
  });

  const handleInputChangeWithValidation = (name, value) => {
    handleInputChange(name, value);
    handleChange(name, value);
  };

  const handleSaveData = () => {
    handleSave(legalitasData);
  };

  return (
    <>
      {dialogState.isOpen && <DialogInfo />}
      <LegalitasModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveLegalitas}
        data={editingLegalitas}
        isEdit={isEditMode}
      />
      <DeleteConfirmModal
        isOpen={deleteConfirmModal}
        onConfirm={confirmDeleteLegalitas}
        onCancel={cancelDeleteLegalitas}
        title="Konfirmasi Hapus Data Akta"
        message="Apakah Anda yakin ingin menghapus data akta berikut?"
        itemInfo={getDeleteItem()}
      />

      <div className="row row-span-12">
        <div className="row row-span-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Kolom Kiri - Informasi Perusahaan */}
            <CompanyInfoSection
              formData={formData}
              errors={errors}
              onInputChange={handleInputChangeWithValidation}
              onImageLoad={loadImage}
              onRemovePreview={removePreview}
              preview={preview}
              inputKey={inputKey}
            />

            {/* Kolom Kanan - Kuasa Wajib Pajak */}
            <DirectorInfoSection
              formData={formData}
              errors={errors}
              onInputChange={handleInputChangeWithValidation}
            />
          </div>

          {/* Tabel Legalitas/Akta Perusahaan - Full Width */}
          <LegalitasTable
            legalitasData={legalitasData}
            onAddLegalitas={handleAddLegalitas}
            onEditLegalitas={handleEditLegalitas}
            onDeleteLegalitas={handleDeleteLegalitas}
          />

          <div className="flex justify-end mt-6">
            <Button
              onClick={handleSaveData}
              disabled={loading}
              className="px-6 py-2"
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProfilePerusahaan() {
  return (
    <MainPage>
      <ClientProvider>
        <ProfilePerusahaanContent />
      </ClientProvider>
    </MainPage>
  );
}
