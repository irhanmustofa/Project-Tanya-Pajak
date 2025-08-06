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
  groupAll,
  groupCreate,
} from "@/app/management/groups/group-components/GroupService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useGroupDispatch } from "../group-components/GroupProvider";
import { useAppReducer } from "@/hooks/use-app-reducer";

export default function GroupAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const groupDispatch = useGroupDispatch();
  const { actionReducer } = useAppReducer();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      name: "required|string|min:3",
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
              title: "Add Client Group Success",
              message: "Client Group added successfully",
              status: "success",
            },
          });

          groupAll().then((res) => {
            groupDispatch({
              type: actionReducer.SUCCESS,
              payload: res.data,
            });
          });

          handleOnClose();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Client Group Failed",
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
    <>
      {dialogState.isOpen && <DialogInfo />}
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false), onClose();
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Input New Client Group</DialogTitle>
          <DialogDescription>
            Add a new client group to the system.
          </DialogDescription>
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
                Save Data
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
