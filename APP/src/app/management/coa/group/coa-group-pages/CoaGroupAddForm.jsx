import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import {
  coaGroupAll,
  coaGroupCreate,
} from "@/app/management/coa/group/coa-group-components/CoaGroupService";
import {
  useCoaGroup,
  useCoaGroupDispatch,
} from "@/app/management/coa/group/coa-group-components/CoaGroupProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";

export default function CoaGroupAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const coaGroupDispatch = useCoaGroupDispatch();
  const { coaGroupAction } = useCoaGroup();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      nama_group: "required|min:3",
      kode_group: "required|min:4",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("nama_group", event.target.nama_group.value);
      formData.append("kode_group", event.target.kode_group.value);

      await coaGroupCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add COA Group Success",
              message: "COA Group added successfully",
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

          handleOnClose();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add COA Group Failed",
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

  return (
    <div className="relative">
      {dialogState.isOpen && <DialogInfo />}
      <Dialog open={isOpen} onOpenChange={handleOnClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Input New COA Group</DialogTitle>
          <DialogDescription>Add a new coa to the system.</DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid gap-4 py-4">
              <InputHorizontal
                title="Nama Head"
                type="text"
                name="nama_group"
                onChange={(e) => handleChange("nama_group", e.target.value)}
                error={errors.nama_group}
              />
              <InputHorizontal
                title="Kode Head"
                type="text"
                name="kode_group"
                onChange={(e) => handleChange("kode_group", e.target.value)}
                error={errors.kode_group}
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
