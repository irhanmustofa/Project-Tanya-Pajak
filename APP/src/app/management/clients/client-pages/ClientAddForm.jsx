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
import ProfilTabs from "../client-tabs/ProfilTabs";

export default function ClientAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const clientDispatch = useClientDispatch();
  const { clientAction, clientState } = useClient();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      nama_group: "required|min:3",
      kode_group: "required|min:4",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("nama_group", event.target.nama_group.value);
      formData.append("kode_group", event.target.kode_group.value);

      await clientCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add COA Group Success",
              message: "COA Group added successfully",
              status: "success",
            },
          });

          clientAll().then((res) => {
            if (res.success) {
              clientDispatch({
                type: clientAction.SUCCESS,
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
              title: "Add COA Group Failed",
              message: response.message,
              status: "error",
            },
          });
          handleOnClose();
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
