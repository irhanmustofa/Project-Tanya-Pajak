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
<<<<<<< HEAD

=======
import { InputHorizontal } from "@/components/custom/input-custom";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
>>>>>>> 2cd1356 (update-register)
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
<<<<<<< HEAD
import ProfilTabs from "../client-tabs/ProfilTabs";
=======
import { useLocalStorage } from "@/hooks/use-local-storage";
import { clientType } from "@/helpers/variables";
>>>>>>> 2cd1356 (update-register)

export default function ClientAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
<<<<<<< HEAD
  const { clientAction, clientState } = useClient();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      nama_group: "required|min:3",
      kode_group: "required|min:4",
=======
  const { clientAction } = useClient();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      name: "required|string|min:3",
      pic: "required|string|min:3",
      address: "required|string|min:3",
      city: "required|string|min:3",
      phone: "required|string|min:8",
      email: "required|email",
>>>>>>> 2cd1356 (update-register)
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
<<<<<<< HEAD
      formData.append("nama_group", event.target.nama_group.value);
      formData.append("kode_group", event.target.kode_group.value);
=======
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
>>>>>>> 2cd1356 (update-register)

      await clientCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
<<<<<<< HEAD
              title: "Add COA Group Success",
              message: "COA Group added successfully",
=======
              title: "Add Client Success",
              message: "Client added successfully",
>>>>>>> 2cd1356 (update-register)
              status: "success",
            },
          });

          clientAll().then((res) => {
<<<<<<< HEAD
            if (res.success) {
              clientDispatch({
                type: clientAction.SUCCESS,
                payload: res.data,
              });
            }
          });

          handleOnClose();
=======
            clientDispatch({
              type: clientAction.SUCCESS,
              payload: res.data,
            });
          });
>>>>>>> 2cd1356 (update-register)
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
<<<<<<< HEAD
              title: "Add COA Group Failed",
=======
              title: "Add Client Failed",
>>>>>>> 2cd1356 (update-register)
              message: response.message,
              status: "error",
            },
          });
<<<<<<< HEAD
          handleOnClose();
        }
=======
        }

        handleOnClose();
>>>>>>> 2cd1356 (update-register)
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
<<<<<<< HEAD
        <DialogContent className="sm:max-w-[800px]">
          <DialogTitle>Input New Client</DialogTitle>
          <DialogDescription>Add a new client to the system.</DialogDescription>
          <TabsRoot defaultValue="profil">
            <TabsList className="justify-between">
              <TabsTrigger value="profil">Profil Wajib Pajak</TabsTrigger>
              <TabsTrigger value="alamat">Alamat</TabsTrigger>
              <TabsTrigger value="kontak">Kontak</TabsTrigger>
            </TabsList>
            <TabsContent value="profil">
              <ProfilTabs data={clientState.data} />
            </TabsContent>
            <TabsContent value="alamat">
              <h1>Alamat</h1>
            </TabsContent>
            <TabsContent value="kontak">
              <h1>Kontak</h1>
            </TabsContent>
          </TabsRoot>
=======
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
>>>>>>> 2cd1356 (update-register)
        </DialogContent>
      </Dialog>
    </div>
  );
}
