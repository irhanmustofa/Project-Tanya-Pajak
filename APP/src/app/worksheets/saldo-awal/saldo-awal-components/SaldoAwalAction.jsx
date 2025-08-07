import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  MoreHorizontal,
  LucideEdit,
  LucideTrash,
  LucideEye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import LoaderOverlay from "@/components/custom/loader-overlay";
import { useSaldoAwal, useSaldoAwalDispatch } from "./SaldoAwalProvider";
import { saldoAwalEndpoint, saldoAwalGetBuku } from "./SaldoAwalService";
import SaldoAwalUpdateForm from "../saldo-awal-pages/SaldoAwalUpdateForm";
import SaldoAwalJurnalId from "../saldo-awal-pages/SaldoAwalJurnalId";

export default function SaldoAwalAction({ row }) {
  const dispatch = useDialogDispatch();
  const saldoAwalDispatch = useSaldoAwalDispatch();
  const { dialogState, dialogAction, DialogDelete } = useDialog();
  const { saldoAwalAction } = useSaldoAwal();

  const [onUpdate, setOnUpdate] = useState(false);
  const [onJurnal, setOnJurnal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    dispatch({
      type: dialogAction.DIALOG_DELETE,
      payload: {
        isOpen: true,
        title: "Delete Data",
        message:
          "Are you sure you want to delete this data? This action cannot be undone.",
        status: "warning",
        url: saldoAwalEndpoint.delete(id),
      },
    });
  };

  const handleOnCloseDelete = async (success) => {
    if (!success) return;

    setIsLoading(true);

    await saldoAwalGetBuku().then((res) => {
      if (res.success) {
        saldoAwalDispatch({ type: saldoAwalAction.SUCCESS, payload: res.data });
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
          <DropdownMenuItem onClick={() => setOnJurnal(true)}>
            <LucideEye className="mr-2 h-4 w-4" />
            <Label>View Jurnal</Label>
          </DropdownMenuItem>
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
        <SaldoAwalUpdateForm id={item._id} onClose={() => setOnUpdate(false)} />
      )}
      {onJurnal && (
        <SaldoAwalJurnalId id={item._id} onClose={() => setOnJurnal(false)} />
      )}

      {dialogState.isOpen && <DialogDelete onClose={handleOnCloseDelete} />}
    </div>
  );
}
