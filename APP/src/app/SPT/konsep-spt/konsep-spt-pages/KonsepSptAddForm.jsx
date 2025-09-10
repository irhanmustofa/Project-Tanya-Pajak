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
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const konsepSptDispatch = useKonsepSptDispatch();
  const { konsepSptAction } = useKonsepSpt();
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
      formData.append("jenis_pajak", event.target.jenis_pajak.value);
      formData.append("masa_pajak", event.target.masa_pajak.value);
      formData.append(
        "jenis_surat_pemberitahuan",
        event.target.jenis_surat_pemberitahuan.value
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
                type: konsepSptAction.SUCCESS,
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
              title: "Add Konsep SPT Failed",
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
          <DialogTitle>Tambah Konsep SPT Baru</DialogTitle>
          <DialogDescription>
            Silahkan isi form di bawah ini untuk menambahkan konsep SPT baru.
          </DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 gap-4 p-4 max-h-[60vh] overflow-y-auto">
              <div className="border border-gray-300 rounded-md p-3 w-full">
                <div className="space-y-4 mx-3">
                  <div className="grid grid-cols-4 items-center gap-4 w-full">
                    <Label className="col-span-1">Jenis Pajak</Label>
                    <Select
                      name="jenis_pajak"
                      onValueChange={(value) =>
                        handleChange("jenis_pajak", value)
                      }
                    >
                      <SelectTrigger className="col-span-3 rounded-md border w-full">
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
                  <InputHorizontal
                    title="Masa Pajak (Bulan)"
                    type="month"
                    name="masa_pajak"
                    onChange={(e) => handleChange("masa_pajak", e.target.value)}
                    error={errors.masa_pajak}
                  />
                  <div className="grid grid-cols-4 items-center gap-4 w-full">
                    <Label className="col-span-1">Pilih Jenis SPT</Label>
                    <Select
                      name="jenis_surat_pemberitahuan"
                      onValueChange={(value) =>
                        handleChange("jenis_surat_pemberitahuan", value)
                      }
                    >
                      <SelectTrigger className="col-span-3 rounded-md border w-full">
                        <SelectValue placeholder="Select Jenis SPT" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Normal">SPT Normal</SelectItem>
                        <SelectItem value="Pembetulan">
                          SPT Pembetulan
                        </SelectItem>
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
