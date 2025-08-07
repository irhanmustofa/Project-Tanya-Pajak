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
  groupAll,
  groupCreate,
} from "@/app/management/groups/group-components/GroupService";
import {
  useGroup,
  useGroupDispatch,
} from "@/app/management/groups/group-components/GroupProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { roles } from "@/helpers/variables";

export default function GroupAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const groupDispatch = useGroupDispatch();
  const { groupAction, groupGroup } = useGroup();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      name: "required|min:3",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("name", event.target.name.value);

      await groupCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Group Success",
              message: "Group added successfully",
              status: "success",
            },
          });

          groupAll().then((res) => {
            if (res.success) {
              groupDispatch({ type: groupAction.SUCCESS, payload: res.data });
            }
          });

          handleOnClose();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add group Failed",
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
          <DialogTitle>Input New Group</DialogTitle>
          <DialogDescription>Add a new group to the system.</DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid gap-4 py-4">
              <InputHorizontal
                title="Name"
                type="text"
                name="name"
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
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
