import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  FileUploadInput,
  InputHorizontal,
} from "@/components/custom/input-custom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import {
  documentAll,
  documentCreate,
} from "@/app/company/documents/document-components/DocumentService";
import {
  useDocument,
  useDocumentDispatch,
} from "@/app/company/documents/document-components/DocumentProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";

export default function DocumentAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();
  const [file, setFile] = useState("");
  const [input, setInput] = useState({});
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const documentDispatch = useDocumentDispatch();
  const { documentAction, permissions } = useDocument();
  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      nama_jenis_dokumen: "required|string|min:3",
      nomor_dokumen: "required|string|min:3",
      nik_npwp: "required|string|min:3",
      paspor: "string",
      tanggal_dokumen: "required|date",
      tanda_terima_dokumen: "required|date",
      perihal_dokumen: "required|string|min:3",
      pengirim_dokumen: "required|string|min:3",
      keaslian_dokumen: "required|string",
      deskripsi_dokumen: "string",
      penerima: "string",
      catatan_komentar: "string",
      tag_dokumen: "string",
      klasifikasi: "required|string",
      bahasa: "required|string",
      jenis_pajak: "string",
      tahun_pajak: "number",
      bulan_pajak: "number",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("nama_jenis_dokumen", input.nama_jenis_dokumen);
      formData.append("nomor_dokumen", input.nomor_dokumen);
      formData.append("nik_npwp", input.nik_npwp);
      formData.append("paspor", input.paspor);
      formData.append(
        "tanggal_dokumen",
        new Date(input.tanggal_dokumen).toLocaleDateString("en-CA")
      );
      formData.append(
        "tanda_terima_dokumen",
        new Date(input.tanda_terima_dokumen).toLocaleDateString("en-CA")
      );
      formData.append("perihal_dokumen", input.perihal_dokumen);
      formData.append("pengirim_dokumen", input.pengirim_dokumen);
      formData.append("keaslian_dokumen", input.keaslian_dokumen);
      formData.append("deskripsi_dokumen", input.deskripsi_dokumen);
      formData.append("penerima", input.penerima);
      formData.append("catatan_komentar", input.catatan_komentar);
      formData.append("tag_dokumen", input.tag_dokumen);
      formData.append("klasifikasi", input.klasifikasi);
      formData.append("bahasa", input.bahasa);
      formData.append("jenis_pajak", input.jenis_pajak);
      formData.append("tahun_pajak", input.tahun_pajak);
      formData.append("bulan_pajak", input.bulan_pajak);
      formData.append("file", file);

      await documentCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Document Success",
              message: "Document added successfully",
              status: "success",
            },
          });

          documentAll().then((res) => {
            if (res.success) {
              documentDispatch({
                type: documentAction.SUCCESS,
                payload: res.data,
              });
            }
          });

          handleOnClose();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Document Failed",
              message: response.message,
              status: "error",
            },
          });
        }
      });
    });
  };

  const handleOnClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div className="relative">
      {dialogState.isOpen && <DialogInfo />}
      <Dialog open={isOpen} onOpenChange={handleOnClose}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogTitle>Input New Document</DialogTitle>
          <DialogDescription>
            Add a new Document to the system.
          </DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-h-[60vh] overflow-y-auto">
              <div className="col-span-1 md:col-span-2 flex lg:flex-row flex-col items-center border border-gray-300 rounded-md p-3">
                <div className="space-y-4 mx-3">
                  <InputHorizontal
                    title="Nama Jenis Dokumen"
                    name="nama_jenis_dokumen"
                    type="text"
                    value={input.nama_jenis_dokumen}
                    onChange={(e) => {
                      handleChange("nama_jenis_dokumen", e.target.value);
                      setInput({
                        ...input,
                        nama_jenis_dokumen: e.target.value,
                      });
                    }}
                    error={errors.nama_jenis_dokumen}
                  />
                  <InputHorizontal
                    title="Nomor Dokumen"
                    name="nomor_dokumen"
                    type="text"
                    value={input.nomor_dokumen}
                    onChange={(e) => {
                      handleChange("nomor_dokumen", e.target.value);
                      setInput({ ...input, nomor_dokumen: e.target.value });
                    }}
                    error={errors.nomor_dokumen}
                  />
                </div>
                <div className="space-y-4 mx-3">
                  <InputHorizontal
                    title="Pengirim Dokumen"
                    name="pengirim_dokumen"
                    type="text"
                    value={input.pengirim_dokumen}
                    onChange={(e) => {
                      setInput({ ...input, pengirim_dokumen: e.target.value });
                      handleChange("pengirim_dokumen", e.target.value);
                    }}
                    error={errors.pengirim_dokumen}
                  />
                  <InputHorizontal
                    title="Penerima Dokumen"
                    name="penerima"
                    type="text"
                    value={input.penerima}
                    onChange={(e) => {
                      setInput({ ...input, penerima: e.target.value });
                      handleChange("penerima", e.target.value);
                    }}
                    error={errors.penerima}
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 flex lg:flex-row flex-col items-center border border-gray-300 rounded-md p-3">
                <div className="space-y-4 mx-3">
                  <InputHorizontal
                    title="NPWP / NIK"
                    name="nik_npwp"
                    type="text"
                    value={input.nik_npwp}
                    onChange={(e) => {
                      handleChange("nik_npwp", e.target.value);
                      setInput({ ...input, nik_npwp: e.target.value });
                    }}
                    error={errors.nik_npwp}
                  />
                  <InputHorizontal
                    title="Paspor"
                    name="paspor"
                    type="text"
                    value={input.paspor}
                    onChange={(e) => {
                      handleChange("paspor", e.target.value);
                      setInput({ ...input, paspor: e.target.value });
                    }}
                    error={errors.paspor}
                  />
                  <InputHorizontal
                    title="Tanggal Dokumen"
                    name="tanggal_dokumen"
                    type="date"
                    value={input.tanggal_dokumen}
                    onChange={(e) => {
                      setInput({ ...input, tanggal_dokumen: e.target.value });
                      handleChange("tanggal_dokumen", e.target.value);
                    }}
                    error={errors.tanggal_dokumen}
                  />
                  <InputHorizontal
                    title="Tanda Terima Dokumen"
                    name="tanda_terima_dokumen"
                    type="date"
                    value={input.tanda_terima_dokumen}
                    onChange={(e) => {
                      setInput({
                        ...input,
                        tanda_terima_dokumen: e.target.value,
                      });
                      handleChange("tanda_terima_dokumen", e.target.value);
                    }}
                    error={errors.tanda_terima_dokumen}
                  />
                  <InputHorizontal
                    title="Perihal Dokumen"
                    name="perihal_dokumen"
                    type="text"
                    value={input.perihal_dokumen}
                    onChange={(e) => {
                      setInput({ ...input, perihal_dokumen: e.target.value });
                      handleChange("perihal_dokumen", e.target.value);
                    }}
                    error={errors.perihal_dokumen}
                  />
                  <InputHorizontal
                    title="Keaslian Dokumen"
                    name="keaslian_dokumen"
                    type="text"
                    value={input.keaslian_dokumen}
                    onChange={(e) => {
                      setInput({ ...input, keaslian_dokumen: e.target.value });
                      handleChange("keaslian_dokumen", e.target.value);
                    }}
                    error={errors.keaslian_dokumen}
                  />
                  <InputHorizontal
                    title="Deskripsi Dokumen"
                    name="deskripsi_dokumen"
                    type="text"
                    value={input.deskripsi_dokumen}
                    onChange={(e) => {
                      setInput({ ...input, deskripsi_dokumen: e.target.value });
                      handleChange("deskripsi_dokumen", e.target.value);
                    }}
                    error={errors.deskripsi_dokumen}
                  />
                </div>
                <div className="space-y-4 mx-3">
                  <InputHorizontal
                    title="Catatan / Komentar"
                    name="catatan_komentar"
                    type="text"
                    value={input.catatan_komentar}
                    onChange={(e) => {
                      setInput({ ...input, catatan_komentar: e.target.value });
                      handleChange("catatan_komentar", e.target.value);
                    }}
                    error={errors.catatan_komentar}
                  />
                  <InputHorizontal
                    title="Tag Dokumen"
                    name="tag_dokumen"
                    type="text"
                    value={input.tag_dokumen}
                    onChange={(e) => {
                      setInput({ ...input, tag_dokumen: e.target.value });
                      handleChange("tag_dokumen", e.target.value);
                    }}
                    error={errors.tag_dokumen}
                  />
                  <InputHorizontal
                    title="Klasifikasi Dokumen"
                    name="klasifikasi"
                    type="text"
                    value={input.klasifikasi}
                    onChange={(e) => {
                      setInput({ ...input, klasifikasi: e.target.value });
                      handleChange("klasifikasi", e.target.value);
                    }}
                    error={errors.klasifikasi}
                  />
                  <InputHorizontal
                    title="Bahasa Dokumen"
                    name="bahasa"
                    type="text"
                    value={input.bahasa}
                    onChange={(e) => {
                      setInput({ ...input, bahasa: e.target.value });
                      handleChange("bahasa", e.target.value);
                    }}
                    error={errors.bahasa}
                  />
                  <InputHorizontal
                    title="Jenis Pajak"
                    name="jenis_pajak"
                    type="text"
                    value={input.jenis_pajak}
                    onChange={(e) => {
                      setInput({ ...input, jenis_pajak: e.target.value });
                      handleChange("jenis_pajak", e.target.value);
                    }}
                    error={errors.jenis_pajak}
                  />
                  <InputHorizontal
                    title="Tahun Pajak"
                    name="tahun_pajak"
                    type="number"
                    value={input.tahun_pajak}
                    onChange={(e) => {
                      handleChange("tahun_pajak", e.target.value);
                      setInput({ ...input, tahun_pajak: e.target.value });
                    }}
                    error={errors.tahun_pajak}
                  />
                  <InputHorizontal
                    title="Bulan Pajak"
                    name="bulan_pajak"
                    type="number"
                    value={input.bulan_pajak}
                    onChange={(e) => {
                      handleChange("bulan_pajak", e.target.value);
                      setInput({ ...input, bulan_pajak: e.target.value });
                    }}
                    error={errors.bulan_pajak}
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2">
                <FileUploadInput
                  title="Document File"
                  name="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg"
                  maxSize={10}
                  value={file}
                  onChange={(e) => {
                    const selectedFile = e.target.value;
                    setFile(selectedFile);
                    handleChange("file", selectedFile);
                  }}
                  error={errors.file}
                  required
                  showPreview={true}
                />
              </div>
            </div>

            <DialogFooter className="pt-4 border-t">
              <Button type="submit" disabled={!valid} pending={isPending}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
