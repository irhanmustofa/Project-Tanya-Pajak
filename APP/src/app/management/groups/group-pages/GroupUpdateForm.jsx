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
import { LucideUserCircle2 } from "lucide-react";
import { groupAll, groupUpdate } from "../group-components/GroupService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useGroup, useGroupDispatch } from "../group-components/GroupProvider";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";
import { statusType } from "@/helpers/variables";

export default function GroupUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();

  const groupDispatch = useGroupDispatch();
  const { groupAction, groupState } = useGroup();

  const { errors, handleChange } = useValidateInput({
    schema: {
      name: "required|string|min:3",
    },
  });

  useEffect(() => {
    const group = groupState.data.find((group) => group.id === id);
    setInput({
      name: group.name,
      status: group.status,
    });
    setIsOpen(true);
  }, [id, groupState.data]);

  const inputHandler = (event) => {
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("status", input.status);

      const response = await groupUpdate(id, formData);

      if (!response.success) {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Update Client Group Failed",
            message: response.message,
            status: "error",
          },
        });
      } else {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Update Client Group Success",
            message: "Client Group updated successfully",
            status: "success",
          },
        });

        groupAll().then((res) => {
          if (res.success) {
            groupDispatch({ type: groupAction.SUCCESS, payload: res.data });
          }
        });
      }
      handleCloseDialog();
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
              <LucideUserCircle2 className="mr-2 h-4 w-4" />
              Update Client Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Update Client Group</DialogTitle>
            <DialogDescription>
              Make changes an existing client group.
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
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Client Status</Label>
                  <Select
                    name="status"
                    onValueChange={(value) => {
                      setInput({ ...input, status: Number(value) });
                    }}
                  >
                    <SelectTrigger className="col-span-3 rounded-md border">
                      <SelectValue
                        placeholder={
                          statusType.find((item) => item.code === input.status)
                            .name || "Select Status"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {statusType.map((item) => (
                        <SelectItem key={item.code} value={String(item.code)}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" pending={isPending}>
                  Save Data
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
