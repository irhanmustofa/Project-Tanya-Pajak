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
import {
  useDocument,
  useDocumentDispatch,
} from "../document-components/DocumentProvider";
import { LucideUserPlus2 } from "lucide-react";
import { documentUpdate } from "../document-components/DocumentService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";
import { documentAll } from "../document-components/DocumentService";

export default function DocumentUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const documentDispatch = useDocumentDispatch();
  const { documentAction, documentState } = useDocument();

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
    const document = documentState.data.find((item) => item._id === id);
    setInput({
      name: document.name,
      email: document.email,
      role: document.role,
      status: document.status,
    });

    setIsOpen(true);
  }, [id, documentState.data]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("status", input.status);
      formData.append("role", input.role);

      if (input.password) {
        formData.append("password", input.password);
      }

      await documentUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update Document Failed",
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
              title: "Update Document Success",
              message: "Document updated successfully",
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
              Update Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Update Document</DialogTitle>
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
                  title="Email"
                  type="email"
                  name="email"
                  value={input.email}
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
                  onChange={(e) => {
                    setInput({ ...input, password: e.target.value });
                    handleChange("password", e.target.value);
                  }}
                  error={errors.password}
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
