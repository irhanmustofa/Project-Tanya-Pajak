import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect, useTransition } from "react";
import { useUser, useUserDispatch } from "../user-components/UserProvider";
import { userUpdate, userAll } from "../user-components/UserService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";
import { userLevel, statusActive } from "@/helpers/variables";

export default function UserUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const userDispatch = useUserDispatch();
  const { userAction, userState, permissions } = useUser();

  const { errors, handleChange } = useValidateInput({
    schema: {
      name: "required|string|min:3",
      email: "required|email",
      password: "string|min:6",
      role: "required",
      status: "required|number",
    },
  });

  useEffect(() => {
    const user = userState.data.find((item) => item._id === id);
    if (user) {
      setInput({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        status: user.status || "",
        password: "",
      });

      setSelectedRole(Number(user.role));

      if (user.permission && Array.isArray(user.permission)) {
        setSelectedPermissions(user.permission);
      }

      setIsOpen(true);
    }
  }, [id, userState.data]);

  const handleRoleChange = (value) => {
    const roleValue = Number(value);
    setSelectedRole(roleValue);
    setInput({ ...input, role: value });
    handleChange("role", roleValue);

    if (roleValue !== 1) {
      setSelectedPermissions([]);
    }
  };

  const handlePermissionChange = (permissionId, checked) => {
    setSelectedPermissions((prev) => {
      if (checked) {
        return [...prev, permissionId];
      } else {
        return prev.filter((id) => id !== permissionId);
      }
    });
  };

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("status", input.status);
      formData.append("role", Number(input.role));

      if (input.password && input.password.trim() !== "") {
        formData.append("password", input.password);
      }

      if (selectedRole === 1 && selectedPermissions.length > 0) {
        formData.append("permission", JSON.stringify(selectedPermissions));
      }

      try {
        const response = await userUpdate(id, formData);

        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Update User Success",
              message: "User updated successfully",
              status: "success",
            },
          });

          const updatedData = await userAll();
          if (updatedData.success) {
            userDispatch({
              type: userAction.SUCCESS,
              payload: updatedData.data,
            });
          }

          handleCloseDialog();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Update User Failed",
              message: response.message || "Failed to update user",
              status: "error",
            },
          });
        }
      } catch (error) {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            show: true,
            title: "Update User Error",
            message: "An unexpected error occurred",
            status: "error",
          },
        });
      }
    });
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setInput({});
    setSelectedRole(null);
    setSelectedPermissions([]);
    onClose();
  };

  return (
    <div className="relative">
      {dialogState.isOpen && <DialogInfo />}
      <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>
            Make changes to an existing account.
          </DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <InputHorizontal
                title="Name"
                type="text"
                name="name"
                value={input.name || ""}
                onChange={(e) => {
                  setInput({ ...input, name: e.target.value });
                  handleChange("name", e.target.value);
                }}
                error={errors.name}
              />

              <InputHorizontal
                title="Email"
                type="email"
                name="email"
                value={input.email || ""}
                onChange={(e) => {
                  setInput({ ...input, email: e.target.value });
                  handleChange("email", e.target.value);
                }}
                error={errors.email}
              />

              <InputHorizontal
                title="Password"
                type="password"
                name="password"
                placeholder="Leave empty to keep current password"
                value={input.password || ""}
                onChange={(e) => {
                  setInput({ ...input, password: e.target.value });
                  handleChange("password", e.target.value);
                }}
                error={errors.password}
              />

              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Role</Label>
                <Select
                  name="role"
                  value={Number(input.role)}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger className="col-span-3 rounded-md border">
                    <SelectValue placeholder="Select Role">
                      {console.log(Number(input.role))}
                      {userLevel.find(
                        (level) => level.code === Number(input.role)
                      )?.name || "Select Role"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {userLevel.map((level) => (
                      <SelectItem key={level.code} value={level.code}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && (
                  <span className="col-span-4 text-sm text-red-600">
                    {errors.role}
                  </span>
                )}
              </div>

              {selectedRole === 1 && (
                <div className="grid gap-4 p-4 border rounded-md bg-muted/50">
                  <Label className="text-sm font-medium">Permissions</Label>
                  <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto">
                    {permissions && permissions.length > 0 ? (
                      permissions.map((permission) => (
                        <div
                          key={permission.key}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`permission-${permission.key}`}
                            checked={selectedPermissions.includes(
                              permission.key
                            )}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(permission.key, checked)
                            }
                          />
                          <Label
                            htmlFor={`permission-${permission.key}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {permission.description}
                          </Label>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        No permissions available
                      </div>
                    )}
                  </div>
                  {selectedPermissions.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      Selected: {selectedPermissions.length} permission(s)
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Status</Label>
                <Select
                  name="status"
                  value={String(input.status)}
                  onValueChange={(value) => {
                    setInput({ ...input, status: value });
                    handleChange("status", Number(value));
                  }}
                >
                  <SelectTrigger className="col-span-3 rounded-md border">
                    <SelectValue placeholder="Select Status">
                      {statusActive.find(
                        (status) => status.code === Number(input.status)
                      )?.name || "Select Status"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {statusActive.map((status) => (
                      <SelectItem key={status.code} value={String(status.code)}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.status && (
                  <span className="col-span-4 text-sm text-red-600">
                    {errors.status}
                  </span>
                )}
              </div>
            </div>
            <DialogFooter className="pt-4 border-t">
              <Button type="submit" pending={isPending}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
