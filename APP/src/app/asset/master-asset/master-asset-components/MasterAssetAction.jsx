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
import { masterAssetAll, masterAssetsEndpoint } from "./MasterAssetService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useMasterAsset, useMasterAssetDispatch } from "./MasterAssetProvider";
import LoaderOverlay from "@/components/custom/loader-overlay";
import MasterAssetUpdateForm from "@/app/asset/master-asset/master-asset-pages/masterAssetUpdateForm";

export default function MasterAssetAction({ row }) {
  const dispatch = useDialogDispatch();
  const masterAssetDispatch = useMasterAssetDispatch();
  const { dialogState, dialogAction, DialogDelete } = useDialog();
  const { masterAssetAction } = useMasterAsset();

  const [onUpdate, setOnUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    dispatch({
      type: dialogAction.DIALOG_DELETE,
      payload: {
        isOpen: true,
        title: "Delete Master Asset",
        message:
          "Are you sure you want to delete this Master Asset? This action cannot be undone.",
        status: "warning",
        url: masterAssetsEndpoint.delete(id),
      },
    });
  };

  const handleOnCloseDelete = async (success) => {
    if (!success) return;

    setIsLoading(true);

    const res = await masterAssetAll();
    if (res.success) {
      masterAssetDispatch({
        type: masterAssetAction.SUCCESS,
        payload: res.data,
      });
    }
    // jika data kosong, dispatch dengan payload kosong
    else {
      masterAssetDispatch({ type: masterAssetAction.SUCCESS, payload: [] });
    }

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
        <MasterAssetUpdateForm
          id={item._id}
          onClose={() => setOnUpdate(false)}
        />
      )}

      {dialogState.isOpen && <DialogDelete onClose={handleOnCloseDelete} />}
    </div>
  );
}
