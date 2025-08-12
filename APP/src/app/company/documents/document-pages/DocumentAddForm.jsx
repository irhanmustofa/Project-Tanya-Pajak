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
  documentAll,
  documentCreate,
} from "@/app/company/documents/document-components/DocumentService";
import {
  useDocument,
  useDocumentDispatch,
} from "@/app/company/documents/document-components/DocumentProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";

export default function DocumentAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const documentDispatch = useDocumentDispatch();
  const { documentAction, permissions } = useDocument();
  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      name: "required|min:3",
      email: "required|email",
      password: "required|password",
    },
  });

  const handleRoleChange = (value) => {
    const roleValue = Number(value);
    setSelectedRole(roleValue);
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

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("name", event.target.name.value);
      formData.append("email", event.target.email.value);
      formData.append("password", event.target.password.value);
      formData.append("role", selectedRole);
      if (selectedRole === 1 && selectedPermissions.length > 0) {
        formData.append("permissions", JSON.stringify(selectedPermissions));
      }

      await documentCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Document Success",
              message: "Document added successfully",
              status: "success",
            },
          });

          documentAll().then((res) => {
            if (res.success) {
              documentDispatch({
                type: documentAction.SUCCESS,
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
              title: "Add Document Failed",
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
          <DialogTitle>Input New Document</DialogTitle>
          <DialogDescription>
            Add a new Document to the system.
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
