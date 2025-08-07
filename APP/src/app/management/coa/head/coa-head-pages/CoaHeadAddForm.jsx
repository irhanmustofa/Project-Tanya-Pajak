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
  coaHeadAll,
  coaHeadCreate,
} from "@/app/management/coa/head/coa-head-components/CoaHeadService";
import {
  useCoaHead,
  useCoaHeadDispatch,
} from "@/app/management/coa/head/coa-head-components/CoaHeadProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { coaGroupAll } from "../../group/coa-group-components/CoaGroupService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CoaHeadAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const coaHeadDispatch = useCoaHeadDispatch();
  const { coaHeadAction, coaHeadGroup } = useCoaHead();
  const [coaGroupState, setCoaGroupState] = useState([]);
  const [retrieve, setRetrieve] = useState("");

  useEffect(() => {
    coaGroupAll().then((res) => {
      if (res.success) {
        setCoaGroupState(res.data);
      }
    });
  }, []);

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      nama_head: "required|min:3",
      kode_head: "required|max:3",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("nama_head", event.target.nama_head.value);
      formData.append("kode_head", retrieve + event.target.kode_head.value);
      formData.append("kode_group", event.target.kode_group.value);

      await coaHeadCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add COA Head Success",
              message: "COA Head added successfully",
              status: "success",
            },
          });

          coaHeadAll().then((res) => {
            if (res.success) {
              coaHeadDispatch({
                type: coaHeadAction.SUCCESS,
                payload: res.data,
              });
            }
          });
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add COA Head Failed",
              message: response.message,
              status: "error",
            },
          });
        }
        handleOnClose();
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Input New COA Head</DialogTitle>
          <DialogDescription>Add a new coa to the system.</DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-1 flex items-center">
                  <h1>Group</h1>
                </div>
                <div className="col-span-3">
                  <Select
                    name="kode_group"
                    onValueChange={(e) => setRetrieve(e.charAt(0))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Group" />
                    </SelectTrigger>
                    <SelectContent>
                      {coaGroupState.map((item, key) => {
                        return (
                          <SelectItem
                            key={String(item.kode_group)}
                            value={String(item.kode_group)}
                          >
                            {item.kode_group + "-" + item.nama_group}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-8 items-center">
                <Label className="col-span-2">Kode Head</Label>
                <Input
                  type="text"
                  className="border col-span-1 rounded-none rounded-l-lg  border-slate-600 bg-slate-600"
                  disabled={true}
                  value={retrieve}
                />
                <Input
                  className="col-span-5 rounded-none rounded-r-lg"
                  type="text"
                  name="kode_head"
                  onChange={(e) => handleChange("kode_head", e.target.value)}
                />
                <p className="col-span-2"></p>
                <p className="col-span-6 text-[12px] text-red-500">
                  {errors.kode_head}
                </p>
              </div>
              <InputHorizontal
                title="Nama Head"
                type="text"
                name="nama_head"
                onChange={(e) => handleChange("nama_head", e.target.value)}
                error={errors.nama_head}
              />
            </div>
            <DialogFooter>
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
