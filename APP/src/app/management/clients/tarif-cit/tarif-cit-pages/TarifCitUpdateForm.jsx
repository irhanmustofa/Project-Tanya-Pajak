import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useTransition } from "react";
import {
  useTarifCit,
  useTarifCitDispatch,
} from "../tarif-cit-components/TarifCitProvider";
import { LucideUserPlus2 } from "lucide-react";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  InputHorizontal,
  InputVertical,
} from "@/components/custom/input-custom";
import { SelectOpt } from "@/components/custom/SelectOption";
import { useValidateInput } from "@/hooks/use-validate-input";
import {
  tarifCitAll,
  tarifCitUpdate,
} from "../tarif-cit-components/TarifCitService";
import { dateStrip } from "@/components/custom/DateFormatted";
import { sptTarifCit, tarifPph } from "@/helpers/variables";

export default function TarifCitUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const TarifCitDispatch = useTarifCitDispatch();
  const [file, setFile] = useState("");
  const { tarifCitAction, tarifCitGroup, tarifCitState } = useTarifCit();

  const { errors, handleChange } = useValidateInput({
    schema: {
      spt: "required|number",
      periode: "required",
      tarif_pph: "required|number",
    },
  });

  useEffect(() => {
    const tarifCit = tarifCitState.data.find((item) => item._id === id);
    setInput({
      spt: tarifCit.spt,
      periode: tarifCit.periode,
      tarif_pph: tarifCit.tarif_pph,
      view_spt: tarifCit.view_spt,
    });
    setIsOpen(true);
  }, [id, tarifCitState.data]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();

      formData.append("spt", event.target.spt.value);
      formData.append("periode", event.target.periode.value);
      formData.append("tarif_pph", event.target.tarif_pph.value);
      formData.append("view_spt", file);

      await tarifCitUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update Tarif Perhitungan CIT Failed",
              message: response.message,
              status: "error",
            },
          });

          handleCloseDialog();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update Tarif Perhitungan CIT Success",
              message: "COA updated successfully",
              status: "success",
            },
          });

          tarifCitAll().then((res) => {
            if (res.success) {
              TarifCitDispatch({
                type: tarifCitAction.SUCCESS,
                payload: res.data,
              });
            }
          });

          handleCloseDialog();
        }
      });
    });
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setInput({});
    onClose();
  };

  const loadFile = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <>
      {dialogState.isOpen && <DialogInfo />}
      {isOpen && (
        <Dialog onOpenChange={handleCloseDialog} open={isOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <LucideUserPlus2 className="mr-2 h-4 w-4" />
              Update Tarif Perhitungan CIT
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Update Tarif Perhitungan CIT</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-1 flex items-center">
                    <h1>SPT</h1>
                  </div>
                  <div className="col-span-3">
                    <Select
                      name="spt"
                      onChange={(e) => {
                        setInput({ spt: "10" });
                        handleChange("spt", e.target.value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={sptTarifCit[input.spt - 1]} />
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
                  title={"Periode"}
                  type="date"
                  name="periode"
                  value={dateStrip(new Date(input.periode))}
                  onChange={(e) => {
                    setInput({ ...input, periode: e.target.value });
                    handleChange("periode", e.target.value);
                  }}
                  error={errors.periode}
                />

                <div className="grid grid-cols-4 gap-2 mb-6">
                  <div className="col-span-1 flex items-center">
                    <h1>Tarif PPh</h1>
                  </div>
                  <div className="col-span-3">
                    <Select
                      name="tarif_pph"
                      onChange={(e) => {
                        setInput({ ...input, tarif_pph: e.target.value });
                        handleChange("tarif_pph", e.target.value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={tarifPph[input.tarif_pph - 1]}
                        />
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
                  title={"Dokumen SPT"}
                  type="file"
                  name="view_spt"
                  onChange={loadFile}
                />
              </div>
              <DialogFooter>
                <Button type="submit" pending={isPending}>
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
