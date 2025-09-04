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
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { sptAll, sptCreate } from "../konsep-spt-components/KonsepSptService";
import {
  useKonsepSpt,
  useKonsepSptDispatch,
} from "../konsep-spt-components/KonsepSptProvider";

export default function KonsepSptAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();
  const [input, setInput] = useState({});
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const konsepSptDispatch = useKonsepSptDispatch();
  const { documentAction } = useKonsepSpt();
  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      jenis_pajak: "required",
      masa_pajak: "required",
      jenis_surat_pemberitahuan: "required",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("jenis_pajak", input.jenis_pajak);
      formData.append("masa_pajak", input.masa_pajak);
      formData.append(
        "jenis_surat_pemberitahuan",
        input.jenis_surat_pemberitahuan
      );

      await sptCreate(formData).then((response) => {
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

          sptAll().then((res) => {
            if (res.success) {
              konsepSptDispatch({
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Jenis Pajak</Label>
                    <Select
                      name="jenis_pajak"
                      onValueChange={(value) => {
                        handleChange("jenis_pajak", value);
                      }}
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue placeholder="Select Jenis Pajak" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PPN">PPN</SelectItem>
                        <SelectItem value="PPh Badan">PPh Badan</SelectItem>
                        <SelectItem value="PPh Final">PPh Final</SelectItem>
                        <SelectItem value="PPh 21/26">PPh 21/26</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
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
