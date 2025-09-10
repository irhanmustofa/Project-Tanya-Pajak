import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useEffect, useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import {
  useKonsepSpt,
  useKonsepSptDispatch,
} from "@/app/SPT/konsep-spt/konsep-spt-components/KonsepSptProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { base_url } from "@/api/http-endpoints";
import { sptAll, sptUpdate } from "../konsep-spt-components/KonsepSptService";
import { statusType } from "@/helpers/variables";
import { Label } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function KonsepSptUpdateForm({ onClose, id }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();
  const [input, setInput] = useState({});
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const konsepSptDispatch = useKonsepSptDispatch();
  const { konsepSptAction, konsepSptState } = useKonsepSpt();
  const { handleChange, errors } = useValidateInput({
    schema: {
      jenis_pajak: "required",
      jenis_surat_pemberitahuan: "required",
      masa_pajak: "required",
      nop: "required",
      nama_object_pajak: "required",
      model_spt: "required",
      tanggal_jatuh_tempo: "required",
      tanggal_dibuat: "required",
      status_spt: "required",
    },
  });

  useEffect(() => {
    const konsepSpt = konsepSptState.data.find((item) => item._id === id);
    setInput({
      jenis_pajak: konsepSpt.jenis_pajak,
      jenis_surat_pemberitahuan: konsepSpt.jenis_surat_pemberitahuan,
      masa_pajak: konsepSpt.masa_pajak,
      nop: konsepSpt.nop,
      nama_object_pajak: konsepSpt.nama_object_pajak,
      model_spt: konsepSpt.model_spt,
      tanggal_jatuh_tempo: new Date(
        konsepSpt.tanggal_jatuh_tempo
      ).toLocaleDateString("en-CA"),
      tanggal_dibuat: new Date(konsepSpt.tanggal_dibuat).toLocaleDateString(
        "en-CA"
      ),
      status_spt: konsepSpt.status_spt,
      submission_progress: konsepSpt.submission_progress,
    });
    handleChange("file", base_url + konsepSpt.file);
    setIsOpen(true);
  }, [id, konsepSptState.data]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("jenis_pajak", input.jenis_pajak);
      formData.append(
        "jenis_surat_pemberitahuan",
        input.jenis_surat_pemberitahuan
      );
      formData.append("masa_pajak", input.masa_pajak);
      formData.append("nop", input.nop);
      formData.append("nama_object_pajak", input.nama_object_pajak);
      formData.append("model_spt", input.model_spt);
      formData.append(
        "tanggal_jatuh_tempo",
        new Date(input.tanggal_jatuh_tempo).toLocaleDateString("en-CA")
      );
      formData.append(
        "tanggal_dibuat",
        new Date(input.tanggal_dibuat).toLocaleDateString("en-CA")
      );
      formData.append("status_spt", input.status_spt);
      formData.append("submission_progress", input.submission_progress);

      await sptUpdate(id, formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add konsepSpt Success",
              message: "konsepSpt added successfully",
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
              title: "Add konsepSpt Failed",
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
          <DialogTitle>Input New konsepSpt</DialogTitle>
          <DialogDescription>
            Add a new konsepSpt to the system.
          </DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-h-[60vh] overflow-y-auto">
              <div className="col-span-1 md:col-span-2 flex lg:flex-row flex-col items-center border border-gray-300 rounded-md p-3">
                <div className="space-y-4 mx-3">
                  <InputHorizontal
                    title="Jenis Pajak"
                    name="jenis_pajak"
                    type="text"
                    value={input.jenis_pajak}
                    onChange={(e) => {
                      handleChange("jenis_pajak", e.target.value);
                      setInput({
                        ...input,
                        jenis_pajak: e.target.value,
                      });
                    }}
                    error={errors.jenis_pajak}
                  />
                  <InputHorizontal
                    title="Jenis Surat Pemberitahuan"
                    name="jenis_surat_pemberitahuan"
                    type="text"
                    value={input.jenis_surat_pemberitahuan}
                    onChange={(e) => {
                      handleChange("jenis_surat_pemberitahuan", e.target.value);
                      setInput({
                        ...input,
                        jenis_surat_pemberitahuan: e.target.value,
                      });
                    }}
                    error={errors.jenis_surat_pemberitahuan}
                  />
                </div>
                <div className="space-y-4 mx-3">
                  <InputHorizontal
                    title="Masa Pajak"
                    name="masa_pajak"
                    type="text"
                    value={input.masa_pajak}
                    onChange={(e) => {
                      setInput({ ...input, masa_pajak: e.target.value });
                      handleChange("masa_pajak", e.target.value);
                    }}
                    error={errors.masa_pajak}
                  />
                  <InputHorizontal
                    title="NOP"
                    name="nop"
                    type="text"
                    value={input.nop}
                    onChange={(e) => {
                      setInput({ ...input, nop: e.target.value });
                      handleChange("nop", e.target.value);
                    }}
                    error={errors.nop}
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 flex lg:flex-row flex-col items-center border border-gray-300 rounded-md p-3">
                <div className="space-y-4 mx-3">
                  <InputHorizontal
                    title="Nama Object Pajak"
                    name="nama_object_pajak"
                    type="text"
                    value={input.nama_object_pajak}
                    onChange={(e) => {
                      handleChange("nama_object_pajak", e.target.value);
                      setInput({ ...input, nama_object_pajak: e.target.value });
                    }}
                    error={errors.nama_object_pajak}
                  />
                  <InputHorizontal
                    title="Model SPT"
                    name="model_spt"
                    type="text"
                    value={input.model_spt}
                    onChange={(e) => {
                      handleChange("model_spt", e.target.value);
                      setInput({ ...input, model_spt: e.target.value });
                    }}
                    error={errors.model_spt}
                  />
                  <InputHorizontal
                    title="Tanggal Jatuh Tempo"
                    name="tanggal_jatuh_tempo"
                    type="date"
                    value={input.tanggal_jatuh_tempo}
                    onChange={(e) => {
                      setInput({
                        ...input,
                        tanggal_jatuh_tempo: e.target.value,
                      });
                      handleChange("tanggal_jatuh_tempo", e.target.value);
                    }}
                    error={errors.tanggal_jatuh_tempo}
                  />
                  <InputHorizontal
                    title="Tanggal Dibuat"
                    name="tanggal_dibuat"
                    type="date"
                    value={input.tanggal_dibuat}
                    onChange={(e) => {
                      setInput({
                        ...input,
                        tanggal_dibuat: e.target.value,
                      });
                      handleChange("tanggal_dibuat", e.target.value);
                    }}
                    error={errors.tanggal_dibuat}
                  />

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Status</Label>
                    <Select
                      name="status"
                      value={
                        input.status_spt !== undefined &&
                        input.status_spt !== null
                          ? String(input.status_spt)
                          : ""
                      }
                      onValueChange={(value) => {
                        setInput({ ...input, status_spt: value });
                        handleChange("status_spt", Number(value));
                      }}
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue placeholder="Select Status">
                          {statusType.find(
                            (status) =>
                              String(status.code) === String(input.status_spt)
                          )?.name || "Select Status"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {statusType.map((status) => (
                          <SelectItem
                            key={status.code}
                            value={String(status.code)}
                          >
                            {status.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.status_spt && (
                      <span className="col-span-4 text-sm text-red-600">
                        {errors.status_spt}
                      </span>
                    )}
                  </div>
                  <InputHorizontal
                    title="Sumbission Progress"
                    name="submission_progress"
                    type="number"
                    value={input.submission_progress}
                    onChange={(e) => {
                      setInput({
                        ...input,
                        submission_progress: e.target.value,
                      });
                      handleChange("submission_progress", e.target.value);
                    }}
                    error={errors.submission_progress}
                  />
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
