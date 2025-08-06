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
import { useState } from "react";
import { serviceAll, serviceEndpoint } from "./ServiceService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useService, useServiceDispatch } from "./ServiceProvider";
import ServiceUpdateForm from "@/app/management/service/service-pages/ServiceUpdateForm";

export default function serviceAction({ row }) {
  const [onUpdate, setOnUpdate] = useState(false);
  const serviceDispatch = useServiceDispatch();
  const { serviceAction } = useService();

  const dispatch = useDialogDispatch();
  const { dialogState, dialogAction, DialogDelete } = useDialog();

  const handleDelete = (id) => {
    dispatch({
      type: dialogAction.DIALOG_DELETE,
      payload: {
        isOpen: true,
        title: "Delete Service",
        message:
          "Are you sure you want to delete this service? This action cannot be undone.",
        status: "warning",
        url: serviceEndpoint.delete(id),
      },
    });
  };

  const handleOnCloseDeelete = (success) => {
    if (!success) return;

<<<<<<< HEAD:APP/src/app/management/users/user-components/UserAction.jsx
    setIsLoading(true);

    await userAll().then((res) => {
      if (res.success) {
        userDispatch({ type: userAction.SUCCESS, payload: res.data });
      } else {
        userDispatch({ type: userAction.ERROR, payload: res.message });
      }
    });

    setIsLoading(false);
=======
    setTimeout(() => {
      serviceAll().then((res) => {
        if (res.success) {
          serviceDispatch({ type: serviceAction.SUCCESS, payload: res.data });
        }
      });
    }, 500);
>>>>>>> 2471785 (update-register):APP/src/app/management/service/service-components/ServiceAction.jsx
  };

  const item = row.original;
  return (
    <>
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
          <DropdownMenuItem onClick={() => handleDelete(item.id)}>
            <LucideTrash className="mr-2 h-4 w-4" />
            <Label>Delete</Label>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {onUpdate && (
<<<<<<< HEAD:APP/src/app/management/users/user-components/UserAction.jsx
        <UserUpdateForm id={item.id} onClose={() => setOnUpdate(false)} />
=======
        <ServiceUpdateForm id={item.id} onClose={() => setOnUpdate(false)} />
>>>>>>> 2471785 (update-register):APP/src/app/management/service/service-components/ServiceAction.jsx
      )}
      {dialogState.isOpen && <DialogDelete onClose={handleOnCloseDeelete} />}
    </>
  );
}
