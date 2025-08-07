import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect, useTransition } from "react";
import { useGroup, useGroupDispatch } from "../group-components/GroupProvider";
import { LucideUserPlus2 } from "lucide-react";
import { groupUpdate } from "../group-components/GroupService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";
import { statusType, roles } from "@/helpers/variables";
import { groupAll } from "../group-components/GroupService";

export default function GroupUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const groupDispatch = useGroupDispatch();
  const { groupAction, groupGroup, groupState } = useGroup();

  const { errors, handleChange } = useValidateInput({
    schema: {
      name: "required|string|min:3",
      email: "required|email",
      password: "required|password",
      role: "required|number",
      status: "required|number",
    },
  });

  useEffect(() => {
    const group = groupState.data.find((item) => item._id === id);
    setInput({
      name: group.name,
    });

    setIsOpen(true);
  }, [id, groupState.data]);
  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", input.name);
      await groupUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update Group Failed",
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
              title: "Update Group Success",
              message: "Group updated successfully",
              status: "success",
            },
          });

          groupAll().then((res) => {
            if (res.success) {
              groupDispatch({
                type: groupAction.SUCCESS,
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
              Update Group {input.name || ""}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Update Group</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="grid gap-4 py-4">
                <InputHorizontal
                  title="Name"
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={(e) => {
                    setInput({ ...input, name: e.target.value });
                    handleChange("name", e.target.value);
                  }}
                  error={errors.name}
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
