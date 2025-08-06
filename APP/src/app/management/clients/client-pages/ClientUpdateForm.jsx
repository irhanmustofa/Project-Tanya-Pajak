<<<<<<< HEAD
import ClientProvider from "@/app/management/clients/client-components/ClientProvider";
import MainPage from "@/layouts/MainPage";

import {
  TabsRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { AppWindowIcon, CodeIcon } from "lucide-react";
import ProfilTabs from "../client-tabs/ProfilTabs";

export default function ClientUpdateForm() {
  return (
    <>
      <MainPage>
        <ClientProvider>
          <h1 className="text-2xl font-medium mb-10">PROFIL WAJIB PAJAK</h1>
          <TabsRoot defaultValue="profil">
            <TabsList className="p-4 border-0">
              <TabsTrigger className="border rounded-full" value="profil">
                Profil Wajib Pajak
              </TabsTrigger>
              <TabsTrigger className="border rounded-full" value="alamat">
                Alamat
              </TabsTrigger>
              <TabsTrigger className="border rounded-full" value="kontak">
                Kontak
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profil">
              <div className=" px-6">
                <ProfilTabs data={[]} />
              </div>
            </TabsContent>
            <TabsContent value="alamat">
              <h1>Alamat</h1>
            </TabsContent>
            <TabsContent value="kontak">
              <h1>Kontak</h1>
            </TabsContent>
          </TabsRoot>
        </ClientProvider>
      </MainPage>
=======
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect, useTransition } from "react";
import { LucideUserCircle2 } from "lucide-react";
import { clientUpdate } from "../client-components/ClientService";
import { clientAll } from "../client-components/ClientService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  useClient,
  useClientDispatch,
} from "../client-components/ClientProvider";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";
import { clientType, clientStatus } from "@/helpers/variables";

export default function ClientUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction, clientState, clientGroup } = useClient();

  const { errors, handleChange } = useValidateInput({
    schema: {
      name: "required|string|min:3",
      pic: "required|string|min:3",
      address: "required|string|min:3",
      city: "required|string|min:3",
      company: "required|string|min:3",
      email: "required|email",
      phone: "required|string|min:5",
      whatsapp: "required|string|min:10",
      status: "required|number",
    },
  });

  useEffect(() => {
    const input = clientState.data.find((item) => item.id === id);
    setInput({
      type: input.type,
      team: input.team,
      name: input.name,
      pic: input.pic,
      address: input.address,
      city: input.city,
      company: input.company,
      email: input.email,
      phone: input.phone,
      whatsapp: input.whatsapp,
      refferal: input.refferal,
      status: input.status,
    });

    setIsOpen(true);
  }, []);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("type", input.type);
      formData.append("team", input.team);
      formData.append("name", input.name);
      formData.append("pic", input.pic);
      formData.append("address", input.address);
      formData.append("city", input.city);
      formData.append("company", input.company);
      formData.append("email", input.email);
      formData.append("phone", input.phone);
      formData.append("whatsapp", input.whatsapp);
      formData.append("refferal", input.refferal);
      formData.append("status", input.status);

      const response = await clientUpdate(id, formData);

      if (!response.success) {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Update Client Failed",
            message: response.message,
            status: "error",
          },
        });
      } else {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Update Client Success",
            message: "Client updated successfully",
            status: "success",
          },
        });

        clientAll().then((res) => {
          if (res.success) {
            clientDispatch({ type: clientAction.SUCCESS, payload: res.data });
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
              Update Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Update Client</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-thin p-4">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Client Type</Label>
                    <Select
                      name="type"
                      onValueChange={(value) =>
                        setInput({ ...input, type: value })
                      }
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue
                          placeholder={
                            clientType.find(
                              (item) => item.code == Number(input.type)
                            ).name || "Select Client Type"
                          }
                        />
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
                    name="team"
                    value={input.pic}
                    onChange={(e) => {
                      setInput({ ...input, pic: e.target.value });
                      handleChange("pic", e.target.value);
                    }}
                    error={errors.pic}
                  />
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Address</Label>
                    <Textarea
                      placeholder="Address"
                      className="col-span-3"
                      name="address"
                      value={input.address}
                      onChange={(e) => {
                        setInput({ ...input, address: e.target.value });
                        handleChange("address", e.target.value);
                      }}
                      error={errors.address}
                    ></Textarea>
                  </div>
                  <InputHorizontal
                    title="City"
                    type="text"
                    name="city"
                    value={input.city}
                    onChange={(e) => {
                      setInput({ ...input, city: e.target.value });
                      handleChange("city", e.target.value);
                    }}
                    error={errors.city}
                  />
                  <InputHorizontal
                    title="Company"
                    type="text"
                    name="company"
                    value={input.company}
                    onChange={(e) => {
                      setInput({ ...input, company: e.target.value });
                      handleChange("company", e.target.value);
                    }}
                    error={errors.company}
                  />
                  <InputHorizontal
                    title="Director"
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
                    title="Phone"
                    type="text"
                    name="phone"
                    value={input.phone}
                    onChange={(e) => {
                      setInput({ ...input, phone: e.target.value });
                      handleChange("phone", e.target.value);
                    }}
                    error={errors.phone}
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
                    title="Refference"
                    type="text"
                    name="refferal"
                    value={input.refferal}
                    onChange={(e) => {
                      setInput({ ...input, refferal: e.target.value });
                      handleChange("refferal", e.target.value);
                    }}
                    error={errors.refferal}
                  />
                  <InputHorizontal
                    title="Whats App"
                    type="text"
                    name="whatsapp"
                    value={input.whatsapp}
                    onChange={(e) => {
                      setInput({ ...input, whatsapp: e.target.value });
                      handleChange("whatsapp", e.target.value);
                    }}
                    error={errors.whatsapp}
                  />
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Group</Label>
                    <Select
                      name="team"
                      onValueChange={(value) => {
                        setInput({ ...input, team: value });
                      }}
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue
                          placeholder={
                            clientGroup.find((group) => group.id === input.team)
                              ?.name || "Select Client Group"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {clientGroup.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.name}
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
                            clientStatus.find(
                              (item) => item.code === Number(input.status)
                            ).name || "Select Client Type"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {clientStatus.map((item) => (
                          <SelectItem key={item.code} value={String(item.code)}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" pending={isPending}>
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
>>>>>>> 2cd1356 (update-register)
    </>
  );
}
