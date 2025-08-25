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
import {
  pajakKeluaranAll,
  pajakKeluaransEndpoint,
} from "./PajakKeluaranService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  usePajakKeluaran,
  usePajakKeluaranDispatch,
} from "./PajakKeluaranProvider";
import LoaderOverlay from "@/components/custom/loader-overlay";
import PajakKeluaranUpdateForm from "../pajak-keluaran-pages/PajakKeluaranUpdateForm";

export default function PajakKeluaranAction({ row }) {
  const dispatch = useDialogDispatch();
  const pajakKeluaranDispatch = usePajakKeluaranDispatch();
  const { dialogState, dialogAction, DialogDelete } = useDialog();
  const { pajakKeluaranAction } = usePajakKeluaran();

  const [onUpdate, setOnUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    dispatch({
      type: dialogAction.DIALOG_DELETE,
      payload: {
        isOpen: true,
        title: "Delete Pajak Keluaran",
        message:
          "Are you sure you want to delete this Pajak Keluaran? This action cannot be undone.",
        status: "warning",
        url: pajakKeluaransEndpoint.delete(id),
      },
    });
  };

  const handleOnCloseDelete = async (success) => {
    if (!success) return;

    setIsLoading(true);

    await pajakKeluaranAll().then((res) => {
      if (res.success) {
        pajakKeluaranDispatch({
          type: pajakKeluaranAction.SUCCESS,
          payload: res.data,
        });
      } else {
        pajakKeluaranDispatch({
          type: pajakKeluaranAction.ERROR,
          payload: res.message,
        });
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
        <PajakKeluaranUpdateForm
          id={item._id}
          onClose={() => setOnUpdate(false)}
        />
      )}

      {dialogState.isOpen && <DialogDelete onClose={handleOnCloseDelete} />}
    </div>
  );
}
