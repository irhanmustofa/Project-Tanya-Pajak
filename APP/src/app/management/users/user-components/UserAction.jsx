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
import { userAll, usersEndpoint } from "./UserService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useUser, useUserDispatch } from "./UserProvider";
import UserUpdateForm from "@/app/management/users/user-pages/UserUpdateForm";
import LoaderOverlay from "@/components/custom/loader-overlay";

export default function UserAction({ row }) {
  const dispatch = useDialogDispatch();
  const userDispatch = useUserDispatch();
  const { dialogState, dialogAction, DialogDelete } = useDialog();
  const { userAction } = useUser();

  const [onUpdate, setOnUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    dispatch({
      type: dialogAction.DIALOG_DELETE,
      payload: {
        isOpen: true,
        title: "Delete User",
        message:
          "Are you sure you want to delete this user? This action cannot be undone.",
        status: "warning",
        url: usersEndpoint.delete(id),
      },
    });
  };

  const handleOnCloseDelete = async (success) => {
    if (!success) return;

    setIsLoading(true);

    await userAll().then((res) => {
      if (res.success) {
        userDispatch({ type: userAction.SUCCESS, payload: res.data });
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
        <UserUpdateForm id={item._id} onClose={() => setOnUpdate(false)} />
      )}

      {dialogState.isOpen && <DialogDelete onClose={handleOnCloseDelete} />}
    </div>
  );
}
