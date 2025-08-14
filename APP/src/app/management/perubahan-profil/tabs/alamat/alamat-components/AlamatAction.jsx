import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MoreHorizontal, LucideEdit, LucideTrash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { clientFirst } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilService";

import { alamatClientEndpoint } from "./AlamatService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  useClient,
  useClientDispatch,
} from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import AlamatUpdateForm from "@/app/management/perubahan-profil/tabs/alamat/alamat-pages/AlamatUpdateForm";
import LoaderOverlay from "@/components/custom/loader-overlay";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function AlamatAction({ row }) {
  const dispatch = useDialogDispatch();
  const clientDispatch = useClientDispatch();
  const { dialogState, dialogAction, DialogDelete } = useDialog();
  const { clientAction } = useClient();

  const [onUpdate, setOnUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const clientId = useLocalStorage.get("clientId");

  const handleDelete = (id) => {
    dispatch({
      type: dialogAction.DIALOG_DELETE,
      payload: {
        isOpen: true,
        title: "Delete Alamat",
        message:
          "Are you sure you want to delete this user? This action cannot be undone.",
        status: "warning",
        url: alamatClientEndpoint.delete(id, clientId),
      },
    });
  };

  const handleOnCloseDelete = async (success) => {
    if (!success) return;

    setIsLoading(true);

    await clientFirst(clientId).then((res) => {
      if (res.success) {
        clientDispatch({ type: clientAction.SUCCESS, payload: res.data });
      } else {
        clientDispatch({ type: clientAction.ERROR, payload: res.message });
      }
    });

    setIsLoading(false);
  };

  const item = row.original;
  return (
    <div className="relative">
      {isLoading && <LoaderOverlay />}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOnUpdate(true)}>
            <LucideEdit className="mr-2 h-4 w-4" />
            <Label>Update</Label>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete(item._id)}>
            <LucideTrash className="mr-2 h-4 w-4" />
            <Label>Delete</Label>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {onUpdate && (
        <AlamatUpdateForm
          id={item.alamat_id}
          onClose={() => setOnUpdate(false)}
        />
      )}

      {dialogState.isOpen && <DialogDelete onClose={handleOnCloseDelete} />}
    </div>
  );
}
