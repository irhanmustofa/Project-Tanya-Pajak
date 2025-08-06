import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { InputHorizontal } from "@/components/custom/input-custom";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import {
  clientAll,
  clientCreate,
} from "@/app/management/clients/client-components/ClientService";
import {
  useClient,
  useClientDispatch,
} from "@/app/management/clients/client-components/ClientProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { clientType } from "@/helpers/variables";

export default function ClientAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction } = useClient();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      name: "required|string|min:3",
      pic: "required|string|min:3",
      address: "required|string|min:3",
      city: "required|string|min:3",
      phone: "required|string|min:8",
      email: "required|email",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("type", event.target.type.value);
      formData.append("name", event.target.name.value);
      formData.append("pic", event.target.pic.value);
      formData.append("address", event.target.address.value);
      formData.append("city", event.target.city.value);
      formData.append("company", event.target.company.value);
      formData.append("email", event.target.email.value);
      formData.append("phone", event.target.phone.value);
      formData.append("refferal", event.target.refferal.value);
      formData.append("admin", useLocalStorage.get("name"));

      await clientCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Client Success",
              message: "Client added successfully",
              status: "success",
            },
          });

          clientAll().then((res) => {
            clientDispatch({
              type: clientAction.SUCCESS,
              payload: res.data,
            });
          });
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Client Failed",
              message: response.message,
              status: "error",
            },
          });
        }

        handleOnClose();
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
          <DialogTitle>Input New Client</DialogTitle>
          <DialogDescription>Add a new client to the system.</DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-thin p-4">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Client Type</Label>
                  <Select
                    name="type"
                    onValueChange={(value) => {
                      handleChange("type", Number(value));
                    }}
                  >
                    <SelectTrigger className="col-span-3 rounded-md border">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientType.map((item) => (
                        <SelectItem key={item.code} value={String(item.code)}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <InputHorizontal
                  title="P I C"
                  type="text"
                  name="pic"
                  onChange={(e) => handleChange("pic", e.target.value)}
                  error={errors.pic}
                />
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Address</Label>
                  <Textarea
                    placeholder="Address"
                    className="col-span-3"
                    name="address"
                    onChange={(e) => handleChange("address", e.target.value)}
                    error={errors.address}
                  />
                </div>
                <InputHorizontal
                  title="City"
                  type="text"
                  name="city"
                  onChange={(e) => handleChange("city", e.target.value)}
                  error={errors.city}
                />
                <InputHorizontal
                  title="Company"
                  type="text"
                  name="company"
                  onChange={(e) => handleChange("company", e.target.value)}
                  error={errors.company}
                />
                <InputHorizontal
                  title="Director"
                  type="text"
                  name="name"
                  onChange={(e) => handleChange("name", e.target.value)}
                  error={errors.name}
                />

                <InputHorizontal
                  title="Phone"
                  type="text"
                  name="phone"
                  onChange={(e) => handleChange("phone", e.target.value)}
                  error={errors.phone}
                />
                <InputHorizontal
                  title="Email"
                  type="email"
                  name="email"
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={errors.email}
                />
                <InputHorizontal
                  title="Refference"
                  type="text"
                  name="refferal"
                  onChange={(e) => handleChange("refferal", e.target.value)}
                  error={errors.refferal}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={!valid} pending={isPending}>
                Save Data Client
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
