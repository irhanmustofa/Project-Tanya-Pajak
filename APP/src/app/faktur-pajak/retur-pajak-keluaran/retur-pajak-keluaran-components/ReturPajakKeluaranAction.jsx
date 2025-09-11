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
  returPajakKeluaranAll,
  returPajakKeluaranEndpoint,
} from "./ReturPajakKeluaranService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  useReturPajakKeluaran,
  useReturPajakKeluaranDispatch,
} from "./ReturPajakKeluaranProvider";
import LoaderOverlay from "@/components/custom/loader-overlay";
// import PajakKeluaranUpdateForm from "../pajak-keluaran-pages/PajakKeluaranUpdateForm";

export default function ReturPajakKeluaranAction({ row }) {
  const dispatch = useDialogDispatch();
  const returPajakKeluaranDispatch = useReturPajakKeluaranDispatch();
  const { dialogState, dialogAction, DialogDelete } = useDialog();
  const { returPajakKeluaranAction } = useReturPajakKeluaran();

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
        url: returPajakKeluaranEndpoint.delete(id),
      },
    });
  };

  const handleOnCloseDelete = async (success) => {
    if (!success) return;

    setIsLoading(true);

    await returPajakKeluaranAll().then((res) => {
      if (res.success) {
        returPajakKeluaranDispatch({
          type: returPajakKeluaranAction.SUCCESS,
          payload: res.data,
        });
      } else {
        returPajakKeluaranDispatch({
          type: returPajakKeluaranAction.ERROR,
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
          {/* <DropdownMenuItem onClick={() => setOnUpdate(true)}>
            <LucideEdit className="mr-2 h-4 w-4" />
            <Label>Update</Label>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete(item._id)}>
            <LucideTrash className="mr-2 h-4 w-4" />
            <Label>Delete</Label>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* {onUpdate && (
        <PajakKeluaranUpdateForm
          id={item._id}
          onClose={() => setOnUpdate(false)}
        />
      )} */}

      {/* {dialogState.isOpen && <DialogDelete onClose={handleOnCloseDelete} />} */}
    </div>
  );
}
