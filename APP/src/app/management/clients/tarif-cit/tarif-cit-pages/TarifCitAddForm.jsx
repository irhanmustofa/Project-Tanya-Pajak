import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  InputHorizontal,
  InputVertical,
} from "@/components/custom/input-custom";
import { useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import {
  tarifCitAll,
  tarifCitCreate,
  tarifCitEndpoint,
} from "@/app/management/clients/tarif-cit/tarif-cit-components/TarifCitService";
import {
  useTarifCit,
  useTarifCitDispatch,
} from "@/app/management/clients/tarif-cit/tarif-cit-components/TarifCitProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { sptTarifCit, tarifPph } from "@/helpers/variables";
import { SelectOpt } from "@/components/custom/SelectOption";

export default function TarifCitAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();
  const [fileSpt, setFileSpt] = useState("");

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const tarifCitDispatch = useTarifCitDispatch();
  const { tarifCitAction, tarifCitGroup } = useTarifCit();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      spt: "required|number",
      periode: "required",
      tarif_pph: "required|number",
      view_spt: "string",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();
    startTrasition(async () => {
      const formData = new FormData();
      formData.append("spt", event.target.spt.value);
      formData.append("periode", event.target.periode.value);
      formData.append("tarif_pph", event.target.tarif_pph.value);
      formData.append("view_spt", fileSpt);

      await tarifCitCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Tarif Perhitungan CIT Success",
              message: "Tarif Perhitungan CIT added successfully",
              status: "success",
            },
          });

          tarifCitAll().then((res) => {
            if (res.success) {
              tarifCitDispatch({
                type: tarifCitAction.SUCCESS,
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
              title: "Add Tarif Perhitungan CIT Failed",
              message: response.message,
              status: "error",
            },
          });
          handleOnClose();
        }
      });
    });
  };

  const handleOnClose = () => {
    setIsOpen(false);
    onClose();
  };

  const loadFile = (event) => {
    const fileTarget = event.target.files[0];
    setFileSpt(fileTarget);
  };

  return (
    <div className="relative">
      {dialogState.isOpen && <DialogInfo />}
      <Dialog open={isOpen} onOpenChange={handleOnClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Input New Tarif Perhitungan CIT</DialogTitle>
          <DialogDescription>
            Add a new Tarif Perhitungan CIT to the system.
          </DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-1 flex items-center">
                  <h1>SPT</h1>
                </div>
                <div className="col-span-3">
                  <Select
                    value={"" || undefined}
                    name="spt"
                    onChange={(e) => handleChange("spt", e.target.value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih SPT" />
                    </SelectTrigger>
                    <SelectContent>
                      {sptTarifCit.map((item, index) => {
                        return (
                          <SelectItem key={index} value={String(index + 1)}>
                            {item}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                {errors.spt}
              </div>

              <InputHorizontal
                title="Periode"
                type="date"
                name="periode"
                onChange={(e) => handleChange("periode", e.target.value)}
                error={errors.periode}
              />

              <div className="grid grid-cols-4 gap-2 mb-6">
                <div className="col-span-1 flex items-center">
                  <h1>Tarif PPh</h1>
                </div>
                <div className="col-span-3">
                  <Select
                    value={"" || undefined}
                    name="tarif_pph"
                    onChange={(e) => handleChange("tarif_pph", e.target.value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Tarif PPh" />
                    </SelectTrigger>
                    <SelectContent>
                      {tarifPph.map((item, key) => {
                        return (
                          <SelectItem key={key} value={String(key + 1)}>
                            {item}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                {errors.tarif_pph}
              </div>

              <InputVertical
                title="Dokumen SPT"
                type="file"
                name="view_spt"
                onChange={loadFile}
                error={errors.view_spt}
              />
            </div>
            <DialogFooter>
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
