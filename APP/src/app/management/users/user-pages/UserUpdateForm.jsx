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
import { useUser, useUserDispatch } from "../user-components/UserProvider";
import { LucideUserPlus2 } from "lucide-react";
import { userUpdate } from "../user-components/UserService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";
import { statusType } from "@/helpers/variables";
import { userAll } from "../user-components/UserService";

export default function UserUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const userDispatch = useUserDispatch();
  const { userAction, userGroup, userState } = useUser();

  const { errors, handleChange } = useValidateInput({
    schema: {
      name: "required|string|min:3",
      password: "required|password",
      role: "required|number",
      status: "required|number",
    },
  });

  useEffect(() => {
    const user = userState.data.find((item) => item._id === id);
    setInput({
      name: user.name,
      group_id: user.group_id,
      status: user.status,
    });

    setIsOpen(true);
  }, [id, userState.data]);
  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("status", input.status);
      formData.append("group_id", input.group_id);

      if (input.password) {
        formData.append("password", input.password);
      }

      await userUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update User Failed",
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
              title: "Update User Success",
              message: "User updated successfully",
              status: "success",
            },
          });

          userAll().then((res) => {
            if (res.success) {
              userDispatch({
                type: userAction.SUCCESS,
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
              Update User {input.name || ""}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Update User</DialogTitle>
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

                <InputHorizontal
                  title="Password"
                  type="password"
                  name="password"
                  onChange={(e) => {
                    setInput({ ...input, password: e.target.value });
                    handleChange("password", e.target.value);
                  }}
                  error={errors.password}
                />
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Group</Label>
                  <Select
                    name="group_id"
                    value={input.group_id || ""}
                    onValueChange={(value) => {
                      setInput({ ...input, group_id: value });
                      handleChange("group_id", value);
                    }}
                  >
                    <SelectTrigger className="col-span-3 rounded-md border">
                      <SelectValue
                        placeholder={
                          userGroup.find((team) => team._id === input.group_id)
                            ?.name || "Select Group"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {userGroup.map((team) => (
                        <SelectItem key={team._id} value={team._id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Status</Label>
                  <Select
                    name="status"
                    onValueChange={(value) => {
                      setInput({ ...input, status: value });
                      handleChange("status", value);
                    }}
                  >
                    <SelectTrigger className="col-span-3 rounded-md border">
                      <SelectValue
                        placeholder={
                          statusType.find(
                            (status) => status.code === Number(input.status)
                          ).name || "Select Status"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {statusType.map((status) => (
                        <SelectItem
                          key={status.code}
                          value={String(status.code)}
                        >
                          {status.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
