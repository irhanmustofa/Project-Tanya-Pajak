import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useEffect, useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  usePajakKeluaran,
  usePajakKeluaranDispatch,
} from "../pajak-keluaran-components/PajakKeluaranProvider";
import {
  pajakKeluaranAll,
  pajakKeluaranUpdate,
} from "../pajak-keluaran-components/PajakKeluaranService";

export default function PajakKeluaranUpdateForm({ onClose, id }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();
  const [input, setInput] = useState({
    nomor_faktur: "",
    tanggal_faktur: "",
    dpp: "",
    ppn: "",
    description: "",
    lawan_transaksi: {
      npwp: "",
      nama: "",
      alamat: "",
    },
  });
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const pajakKeluaranDispatch = usePajakKeluaranDispatch();
  const { pajakKeluaranAction, pajakKeluaranState } = usePajakKeluaran();
  const { handleChange, errors } = useValidateInput({
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

  useEffect(() => {
    const data = pajakKeluaranState.data.find((item) => item._id === id);
    setInput({
      nomor_faktur: data.nomor_faktur,
      tanggal_faktur: new Date(data.tanggal_faktur).toISOString().split("T")[0],
      dpp: data.dpp,
      ppn: data.ppn,
      description: data.description,
      lawan_transaksi: {
        npwp: data.lawan_transaksi.npwp,
        nama: data.lawan_transaksi.nama,
        alamat: data.lawan_transaksi.alamat,
      },
    });
    setIsOpen(true);
  }, [id, pajakKeluaranState.data]);

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

      await pajakKeluaranUpdate(id, formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add data Success",
              message: "data added successfully",
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
              title: "Add data Failed",
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
          <DialogTitle>Input New data</DialogTitle>
          <DialogDescription>Add a new data to the system.</DialogDescription>
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
                      setInput({
                        ...input,
                        nomor_faktur: e.target.value,
                      });
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
                      setInput({
                        ...input,
                        tanggal_faktur: e.target.value,
                      });
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
                      setInput({
                        ...input,
                        description: e.target.value,
                      });
                    }}
                    error={errors.description}
                  />
                  <InputHorizontal
                    title="NPWP"
                    name="npwp"
                    type="text"
                    value={input.lawan_transaksi.npwp || ""}
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
                    title="Nama"
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
                    title="Alamat"
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
                  />{" "}
                </div>
              </div>
            </div>
            <DialogFooter className="pt-4 border-t">
              <Button type="submit" pending={isPending}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
