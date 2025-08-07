import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState, useEffect, useTransition } from "react";
import {
  useCoaHead,
  useCoaHeadDispatch,
} from "../coa-head-components/CoaHeadProvider";
import { LucideUserPlus2 } from "lucide-react";
import {
  coaHeadUpdate,
  coaHeadAll,
} from "../coa-head-components/CoaHeadService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { coaGroupAll } from "../../group/coa-group-components/CoaGroupService";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CoaHeadUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const coaHeadDispatch = useCoaHeadDispatch();
  const { coaHeadAction, coaHeadGroup, coaHeadState } = useCoaHead();
  const [coaGroupState, setCoaGroupState] = useState([]);
  const [retrieve, setRetrieve] = useState("");

  const { errors, handleChange } = useValidateInput({
    schema: {
      nama_head: "required|string|min:3",
      kode_head: "required|string|max:3",
    },
  });

  useEffect(() => {
    const singleData = coaHeadState.data.find((item) => item._id === id);
    setInput({
      nama_head: singleData.nama_head,
      kode_head: singleData.kode_head.substring(1),
      kode_group: singleData.kode_group,
    });
    setRetrieve(singleData.kode_group.charAt(0));
    coaGroupAll().then((res) => {
      if (res.success) {
        setCoaGroupState(res.data);
      }
    });

    setIsOpen(true);
  }, [id, coaHeadState.data]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("nama_head", input.nama_head);
      formData.append("kode_head", retrieve + input.kode_head);
      formData.append("kode_group", input.kode_group);

      await coaHeadUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update COA Head Failed",
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
              title: "Update COA Head Success",
              message: "COA Head updated successfully",
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

  return (
    <>
      {dialogState.isOpen && <DialogInfo />}
      {isOpen && (
        <Dialog onOpenChange={handleCloseDialog} open={isOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <LucideUserPlus2 className="mr-2 h-4 w-4" />
              Update COA Head
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Update COA Head</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-1 flex items-center">
                    <h1>Group</h1>
                  </div>
                  <div className="col-span-3">
                    <Select
                      name="kode_group"
                      defaultValue={input.kode_group ?? undefined}
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
                  <Label className="col-span-2">Kode Head {retrieve}</Label>
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
                    onChange={(e) => {
                      setInput({ ...input, kode_head: e.target.value });
                      handleChange("kode_head", e.target.value);
                    }}
                    value={input.kode_head}
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
                  value={input.nama_head}
                  onChange={(e) => {
                    setInput({ ...input, nama_head: e.target.value });
                    handleChange("nama_head", e.target.value);
                  }}
                  error={errors.nama_head}
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
