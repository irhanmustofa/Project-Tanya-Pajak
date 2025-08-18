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
  usePajakKeluaran,
  usePajakKeluaranDispatch,
} from "@/app/faktur-pajak/pajak-keluaran/pajak-keluaran-components/PajakKeluaranProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  pajakKeluaranAll,
  pajakKeluaranCreate,
} from "../pajak-keluaran-components/PajakKeluaranService";

export default function PajakKeluaranAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();
  const [file, setFile] = useState("");
  const [input, setInput] = useState({});
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const pajakKeluaranDispatch = usePajakKeluaranDispatch();
  const { pajakKeluaranAction } = usePajakKeluaran();
  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      nomor_faktur: "required|string|min:3",
      tanggal_faktur: "required|date",
      dpp: "required|number",
      ppn: "required|number",
      description: "string|nullable",
      "lawan_transaksi.npwp": "required|string|min:3",
      "lawan_transaksi.nama": "required|string|min:3",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("nomor_faktur", input.nomor_faktur);
      formData.append(
        "tanggal_faktur",
        new Date(input.tanggal_faktur).toLocaleDateString("en-CA")
      );
      formData.append("dpp", input.dpp);
      formData.append("ppn", input.ppn);
      formData.append("description", input.description);
      formData.append("lawan_transaksi", JSON.stringify(input.lawan_transaksi));

      await pajakKeluaranCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Pajak Keluaran Success",
              message: "Pajak Keluaran added successfully",
              status: "success",
            },
          });

          pajakKeluaranAll().then((res) => {
            if (res.success) {
              pajakKeluaranDispatch({
                type: pajakKeluaranAction.SUCCESS,
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
              title: "Add Pajak Keluaran Failed",
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
          <DialogTitle>Input New Pajak Keluaran</DialogTitle>
          <DialogDescription>
            Add a new Pajak Keluaran to the system.
          </DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-h-[60vh] overflow-y-auto">
              <div className="col-span-1 md:col-span-2 flex lg:flex-row flex-col items-center border border-gray-300 rounded-md p-3">
                <div className="space-y-4 mx-3">
                  <InputHorizontal
                    title="Nomor Faktur"
                    name="nomor_faktur"
                    type="text"
                    value={input.nomor_faktur || ""}
                    onChange={(e) => {
                      handleChange("nomor_faktur", e.target.value);
                      setInput({ ...input, nomor_faktur: e.target.value });
                    }}
                    error={errors.nomor_faktur}
                  />
                  <InputHorizontal
                    title="Tanggal Faktur"
                    name="tanggal_faktur"
                    type="date"
                    value={input.tanggal_faktur || ""}
                    onChange={(e) => {
                      handleChange("tanggal_faktur", e.target.value);
                      setInput({ ...input, tanggal_faktur: e.target.value });
                    }}
                    error={errors.tanggal_faktur}
                  />
                  <InputHorizontal
                    title="DPP"
                    name="dpp"
                    type="number"
                    value={input.dpp || ""}
                    onChange={(e) => {
                      handleChange("dpp", e.target.value);
                      setInput({ ...input, dpp: e.target.value });
                    }}
                    error={errors.dpp}
                  />
                  <InputHorizontal
                    title="PPN"
                    name="ppn"
                    type="number"
                    value={input.ppn || ""}
                    onChange={(e) => {
                      handleChange("ppn", e.target.value);
                      setInput({ ...input, ppn: e.target.value });
                    }}
                    error={errors.ppn}
                  />
                  <InputHorizontal
                    title="Description"
                    name="description"
                    type="text"
                    value={input.description || ""}
                    onChange={(e) => {
                      handleChange("description", e.target.value);
                      setInput({ ...input, description: e.target.value });
                    }}
                    error={errors.description}
                  />
                  <InputHorizontal
                    title="NPWP Lawan Transaksi"
                    name="npwp"
                    type="text"
                    value={input.lawan_transaksi?.npwp || ""}
                    onChange={(e) => {
                      handleChange("lawan_transaksi.npwp", e.target.value);
                      setInput({
                        ...input,
                        lawan_transaksi: {
                          ...input.lawan_transaksi,
                          npwp: e.target.value,
                        },
                      });
                    }}
                    error={errors["lawan_transaksi.npwp"]}
                  />

                  <InputHorizontal
                    title="Nama Lawan Transaksi"
                    name="nama"
                    type="text"
                    value={input.lawan_transaksi?.nama || ""}
                    onChange={(e) => {
                      handleChange("lawan_transaksi.nama", e.target.value);
                      setInput({
                        ...input,
                        lawan_transaksi: {
                          ...input.lawan_transaksi,
                          nama: e.target.value,
                        },
                      });
                    }}
                    error={errors["lawan_transaksi.nama"]}
                  />

                  <InputHorizontal
                    title="Alamat Lawan Transaksi"
                    name="alamat"
                    type="text"
                    value={input.lawan_transaksi?.alamat || ""}
                    onChange={(e) => {
                      handleChange("lawan_transaksi.alamat", e.target.value);
                      setInput({
                        ...input,
                        lawan_transaksi: {
                          ...input.lawan_transaksi,
                          alamat: e.target.value,
                        },
                      });
                    }}
                    error={errors["lawan_transaksi.alamat"]}
                  />
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
