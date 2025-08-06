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
<<<<<<<< HEAD:APP/src/app/management/service/service-components/ServiceAction.jsx
import { serviceAll, serviceEndpoint } from "./ServiceService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useService, useServiceDispatch } from "./ServiceProvider";
import ServiceUpdateForm from "@/app/management/service/service-pages/ServiceUpdateForm";
========
import { groupAll, groupEndpoint } from "./GroupService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useGroup, useGroupDispatch } from "./GroupProvider";
import GroupUpdateForm from "@/app/management/groups/group-pages/GroupUpdateForm";
import LoaderOverlay from "@/components/custom/loader-overlay";

export default function GroupAction({ row }) {
  const dispatch = useDialogDispatch();
  const groupDispatch = useGroupDispatch();
  const { groupAction } = useGroup();
  const { dialogState, dialogAction, DialogDelete } = useDialog();
>>>>>>>> 2cd1356 (update-register):APP/src/app/management/groups/group-components/GroupAction.jsx

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
<<<<<<<< HEAD:APP/src/app/management/service/service-components/ServiceAction.jsx
        url: serviceEndpoint.delete(id),
========
        url: groupEndpoint.delete(id),
>>>>>>>> 2cd1356 (update-register):APP/src/app/management/groups/group-components/GroupAction.jsx
      },
    });
  };

  const handleOnCloseDeelete = (success) => {
    if (!success) return;

<<<<<<<< HEAD:APP/src/app/management/service/service-components/ServiceAction.jsx
    setTimeout(() => {
      serviceAll().then((res) => {
        if (res.success) {
          serviceDispatch({ type: serviceAction.SUCCESS, payload: res.data });
        }
      });
    }, 500);
========
    setIsLoading(true);
    await groupAll().then((res) => {
      if (res.success) {
        groupDispatch({ type: groupAction.SUCCESS, payload: res.data });
      }
    });
    setIsLoading(false);
>>>>>>>> 2cd1356 (update-register):APP/src/app/management/groups/group-components/GroupAction.jsx
  };

  const item = row.original;
  return (
<<<<<<<< HEAD:APP/src/app/management/service/service-components/ServiceAction.jsx
    <>
========
    <div className="relative">
      {isLoading && <LoaderOverlay />}
>>>>>>>> 2cd1356 (update-register):APP/src/app/management/groups/group-components/GroupAction.jsx
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
<<<<<<<< HEAD:APP/src/app/management/service/service-components/ServiceAction.jsx
        <ServiceUpdateForm id={item.id} onClose={() => setOnUpdate(false)} />
      )}
      {dialogState.isOpen && <DialogDelete onClose={handleOnCloseDeelete} />}
    </>
========
        <GroupUpdateForm id={item.id} onClose={() => setOnUpdate(false)} />
      )}
      {dialogState.isOpen && <DialogDelete onClose={handleOnCloseDelete} />}
    </div>
>>>>>>>> 2cd1356 (update-register):APP/src/app/management/groups/group-components/GroupAction.jsx
  );
}
