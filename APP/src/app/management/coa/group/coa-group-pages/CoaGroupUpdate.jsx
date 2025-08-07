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
  useCoaGroup,
  useCoaGroupDispatch,
} from "../coa-group-components/CoaGroupProvider";
import { LucideUserPlus2 } from "lucide-react";
import {
  coaGroupUpdate,
  coaGroupAll,
} from "../coa-group-components/CoaGroupService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";

export default function CoaGroupUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const coaGroupDispatch = useCoaGroupDispatch();
  const { coaGroupAction, coaGroupState } = useCoaGroup();

  const { errors, handleChange } = useValidateInput({
    schema: {
      nama_group: "required|string|min:5",
      kode_group: "required|string|min:4",
    },
  });

  useEffect(() => {
    const singleData = coaGroupState.data.find((item) => item._id === id);
    setInput({
      nama_group: singleData.nama_group,
      kode_group: singleData.kode_group,
    });

    setIsOpen(true);
  }, [id, coaGroupState.data]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("nama_group", input.nama_group);
      formData.append("kode_group", input.kode_group);

      await coaGroupUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update COA Group Failed",
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
              title: "Update COA Group Success",
              message: "COA Group updated successfully",
              status: "success",
            },
          });

          coaGroupAll().then((res) => {
            if (res.success) {
              coaGroupDispatch({
                type: coaGroupAction.SUCCESS,
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
              Update COA Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Update COA Group</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="grid gap-4 py-4">
                <InputHorizontal
                  title="Nama Group"
                  type="text"
                  name="nama_group"
                  value={input.nama_group}
                  onChange={(e) => {
                    setInput({ ...input, nama_group: e.target.value });
                    handleChange("nama_group", e.target.value);
                  }}
                  error={errors.nama_group}
                />

                <InputHorizontal
                  title="Kode Group"
                  type="text"
                  name="kode_group"
                  value={input.kode_group}
                  onChange={(e) => {
                    setInput({ ...input, kode_group: e.target.value });
                    handleChange("kode_group", e.target.value);
                  }}
                  error={errors.kode_group}
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
