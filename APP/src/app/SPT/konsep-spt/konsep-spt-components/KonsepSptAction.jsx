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
import { sptAll, konsepSptEndpoint } from "./KonsepSptService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useKonsepSpt, useKonsepSptDispatch } from "./KonsepSptProvider";
import LoaderOverlay from "@/components/custom/loader-overlay";
import KonsepSptUpdateForm from "../konsep-spt-pages/KonsepSptUpdateForm";
import { usePermissions } from "@/hooks/use-permissions";

export default function KonsepSptAction({ row }) {
  const { checkPermission } = usePermissions();
  const dispatch = useDialogDispatch();
  const konsepSptDispatch = useKonsepSptDispatch();
  const { dialogState, dialogAction, DialogDelete } = useDialog();
  const { konsepSptAction } = useKonsepSpt();

  const [onUpdate, setOnUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    dispatch({
      type: dialogAction.DIALOG_DELETE,
      payload: {
        isOpen: true,
        title: "Delete Konsep SPT",
        message:
          "Are you sure you want to delete this Konsep SPT? This action cannot be undone.",
        status: "warning",
        url: konsepSptEndpoint.delete(id),
      },
    });
  };

  const handleOnCloseDelete = async (success) => {
    if (!success) return;

    setIsLoading(true);

    await sptAll().then((res) => {
      if (res.success) {
        konsepSptDispatch({ type: konsepSptAction.SUCCESS, payload: res.data });
      } else {
        konsepSptDispatch({
          type: konsepSptAction.ERROR,
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
          {checkPermission("konsep-spt.update") && (
            <DropdownMenuItem onClick={() => setOnUpdate(true)}>
              <LucideEdit className="mr-2 h-4 w-4" />
              <Label>Update</Label>
            </DropdownMenuItem>
          )}
          {checkPermission("konsep-spt.delete") && (
            <DropdownMenuItem onClick={() => handleDelete(item._id)}>
              <LucideTrash className="mr-2 h-4 w-4" />
              <Label>Delete</Label>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {dialogState.isOpen && <DialogDelete onClose={handleOnCloseDelete} />}
      {onUpdate && (
        <KonsepSptUpdateForm
          isOpen={onUpdate}
          onClose={() => setOnUpdate(false)}
          id={item._id}
        />
      )}
    </div>
  );
}
