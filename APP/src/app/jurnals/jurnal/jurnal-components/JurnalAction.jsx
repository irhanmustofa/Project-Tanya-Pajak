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
import { jurnalAll, jurnalsEndpoint } from "./JurnalService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useJurnal, useJurnalDispatch } from "./JurnalProvider";
import LoaderOverlay from "@/components/custom/loader-overlay";
import JurnalUpdateForm from "../jurnal-pages/JurnalUpdateForm";

export default function JurnalAction({ row }) {
  const dispatch = useDialogDispatch();
  const jurnalDispatch = useJurnalDispatch();
  const { dialogState, dialogAction, DialogDelete, DialogInfo } = useDialog();
  const { jurnalAction, params } = useJurnal();

  const [onUpdate, setOnUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    dispatch({
      type: dialogAction.DIALOG_DELETE,
      payload: {
        isOpen: true,
        title: "Delete Jurnal",
        message:
          "Are you sure you want to delete this Jurnal? This action cannot be undone.",
        status: "warning",
        url: jurnalsEndpoint.delete(id),
      },
    });
  };

  const handleOnCloseDelete = async (success) => {
    if (!success) return;

    setIsLoading(true);

    await jurnalAll(params).then((res) => {
      if (res.success) {
        jurnalDispatch({ type: jurnalAction.SUCCESS, payload: res.data || [] });
      } else {
        jurnalDispatch({ type: jurnalAction.SUCCESS, payload: [] });
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
        <JurnalUpdateForm id={item._id} onClose={() => setOnUpdate(false)} />
      )}

      {dialogState.isOpen && <DialogDelete onClose={handleOnCloseDelete} />}
      {dialogState.isOpen && <DialogInfo />}
    </div>
  );
}
