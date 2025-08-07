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
import { bukuAll, bukusEndpoint } from "./BukuService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useBuku, useBukuDispatch } from "./BukuProvider";
import LoaderOverlay from "@/components/custom/loader-overlay";
import BukuUpdateForm from "../buku-pages/BukuUpdateForm";

export default function BukuAction({ row }) {
  const dispatch = useDialogDispatch();
  const bukuDispatch = useBukuDispatch();
  const { dialogState, dialogAction, DialogDelete, DialogInfo } = useDialog();
  const { bukuAction, params } = useBuku();

  const [onUpdate, setOnUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    dispatch({
      type: dialogAction.DIALOG_DELETE,
      payload: {
        isOpen: true,
        title: "Delete Buku",
        message:
          "Are you sure you want to delete this Buku? This action cannot be undone.",
        status: "warning",
        url: bukusEndpoint.delete(id),
      },
    });
  };

  const handleOnCloseDelete = async (success) => {
    if (!success) return;

    setIsLoading(true);

    await bukuAll(params).then((res) => {
      if (res.success) {
        bukuDispatch({ type: bukuAction.SUCCESS, payload: res.data || [] });
      } else {
        bukuDispatch({ type: bukuAction.SUCCESS, payload: [] });
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
        <BukuUpdateForm id={item._id} onClose={() => setOnUpdate(false)} />
      )}

      {dialogState.isOpen && <DialogDelete onClose={handleOnCloseDelete} />}
      {dialogState.isOpen && <DialogInfo />}
    </div>
  );
}
