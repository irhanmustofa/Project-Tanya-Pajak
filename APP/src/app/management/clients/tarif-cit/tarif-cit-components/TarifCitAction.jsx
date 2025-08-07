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
import { tarifCitAll, tarifCitEndpoint } from "./TarifCitService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useTarifCit, useTarifCitDispatch } from "./TarifCitProvider";
import TarifCitUpdateForm from "@/app/management/clients/tarif-cit/tarif-cit-pages/TarifCitUpdateForm";
import LoaderOverlay from "@/components/custom/loader-overlay";

export default function TarifCitAction({ row }) {
  const dispatch = useDialogDispatch();
  const tarifCitDispatch = useTarifCitDispatch();
  const { dialogState, dialogAction, DialogDelete } = useDialog();
  const { tarifCitAction } = useTarifCit();

  const [onUpdate, setOnUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    dispatch({
      type: dialogAction.DIALOG_DELETE,
      payload: {
        isOpen: true,
        title: "Delete Periode Laporan",
        message:
          "Are you sure you want to delete this Periode Laporan? This action cannot be undone.",
        status: "warning",
        url: tarifCitEndpoint.delete(id),
      },
    });
  };

  const handleOnCloseDelete = async (success) => {
    if (!success) return;

    setIsLoading(true);

    await tarifCitAll().then((res) => {
      if (res.success) {
        tarifCitDispatch({
          type: tarifCitAction.SUCCESS,
          payload: res.data,
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
        <TarifCitUpdateForm id={item._id} onClose={() => setOnUpdate(false)} />
      )}

      {dialogState.isOpen && <DialogDelete onClose={handleOnCloseDelete} />}
    </div>
  );
}
