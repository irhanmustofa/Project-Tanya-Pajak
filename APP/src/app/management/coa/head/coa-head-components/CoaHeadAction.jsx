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
import { coaHeadAll, coaHeadEndpoint } from "./CoaHeadService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useCoaHead, useCoaHeadDispatch } from "./CoaHeadProvider";
import CoaHeadUpdateForm from "@/app/management/coa/head/coa-head-pages/CoaHeadUpdate";
import LoaderOverlay from "@/components/custom/loader-overlay";

export default function CoaHeadAction({ row }) {
  const dispatch = useDialogDispatch();
  const coaHeadDispatch = useCoaHeadDispatch();
  const { dialogState, dialogAction, DialogDelete } = useDialog();
  const { coaHeadAction } = useCoaHead();

  const [onUpdate, setOnUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    dispatch({
      type: dialogAction.DIALOG_DELETE,
      payload: {
        isOpen: true,
        title: "Delete COA Head",
        message:
          "Are you sure you want to delete this group? This action cannot be undone.",
        status: "warning",
        url: coaHeadEndpoint.delete(id),
      },
    });
  };

  const handleOnCloseDelete = async (success) => {
    if (!success) return;

    setIsLoading(true);

    await coaHeadAll().then((res) => {
      if (res.success) {
        coaHeadDispatch({ type: coaHeadAction.SUCCESS, payload: res.data });
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
        <CoaHeadUpdateForm id={item._id} onClose={() => setOnUpdate(false)} />
      )}

      {dialogState.isOpen && <DialogDelete onClose={handleOnCloseDelete} />}
    </div>
  );
}
