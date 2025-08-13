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
  userAll,
  userCreate,
} from "@/app/management/users/user-components/UserService";
import {
  useUser,
  useUserDispatch,
} from "@/app/management/users/user-components/UserProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { userLevel } from "@/helpers/variables";

export default function UserAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const userDispatch = useUserDispatch();
  const { userAction } = useUser();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      name: "required|min:3",
      email: "required|email",
      password: "required|password",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("name", event.target.name.value);
      formData.append("email", event.target.email.value);
      formData.append("password", event.target.password.value);
      formData.append("role", event.target.role.value);

      await userCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add User Success",
              message: "User added successfully",
              status: "success",
            },
          });

          userAll().then((res) => {
            if (res.success) {
              userDispatch({ type: userAction.SUCCESS, payload: res.data });
            }
          });

          handleOnClose();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add User Failed",
              message: response.message,
              status: "error",
            },
          });
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
          <DialogTitle>Input New User</DialogTitle>
          <DialogDescription>Add a new user to the system.</DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid gap-4 py-4">
              <InputHorizontal
                title="Name"
                type="text"
                name="name"
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
              />
              <InputHorizontal
                title="Email"
                type="email"
                name="email"
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
              />
              <InputHorizontal
                title="Password"
                type="password"
                name="password"
                onChange={(e) => handleChange("password", e.target.value)}
                error={errors.password}
              />
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Role</Label>
                <Select
                  name="role"
                  onValueChange={(value) => {
                    handleChange("role", Number(value));
                  }}
                >
                  <SelectTrigger className="col-span-3 rounded-md border">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Admin</SelectItem>
                    <SelectItem value="1">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
