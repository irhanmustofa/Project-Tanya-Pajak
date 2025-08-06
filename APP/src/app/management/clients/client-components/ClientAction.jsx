import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  MoreHorizontal,
  LucideEdit,
  LucideTrash,
  LucideFileCheck,
  LucideUserRoundPen,
  LucideFileClock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useClient, useClientDispatch } from "./ClientProvider";
import { clientAll, clientEndpoint } from "./ClientService";
import ClientUpdateForm from "@/app/management/clients/client-pages/ClientUpdateForm";
import ClientObservationForm from "@/app/management/clients/client-pages/ClientObservationForm";
import QuotationAddForm from "@/app/marketing/quotation/quotation-pages/QuotationAddForm";
import ClientHistory from "../client-pages/ClientHistory";

export default function ClientAction({ row }) {
  const [openQuotation, setOpenQuotation] = useState(false);
  const [onUpdate, setOnUpdate] = useState(false);
  const [onHistory, setOnHistory] = useState(false);
  const [onObservation, setOnObservation] = useState(false);

  const { clientAction, clientState, services } = useClient();
  const clientDispatch = useClientDispatch();

  const { dialogState, dialogAction, DialogDelete } = useDialog();
  const dispatch = useDialogDispatch();

  const handleDelete = (id) => {
    dispatch({
      type: dialogAction.DIALOG_DELETE,
      payload: {
        isOpen: true,
        title: "Delete Client",
        message:
          "Are you sure you want to delete this client? This action cannot be undone.",
        status: "warning",
        url: clientEndpoint.delete(id),
      },
    });
  };

  const handleOnCloseDelete = (success) => {
    if (!success) return;

    setTimeout(() => {
      clientAll().then((res) => {
        if (res.success) {
          clientDispatch({ type: clientAction.SUCCESS, payload: res.data });
        }
      });
    }, 500);
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
          <DropdownMenuItem onClick={() => setOnObservation(true)}>
            <LucideUserRoundPen className="mr-2 h-4 w-4" />
            <Label>Observation</Label>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOnUpdate(true)}>
            <LucideEdit className="mr-2 h-4 w-4" />
            <Label>Update</Label>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOnHistory(true)}>
            <LucideFileClock className="mr-2 h-4 w-4" />
            <Label>History</Label>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenQuotation(true)}>
            <LucideFileCheck className="mr-2 h-4 w-4" />
            <Label>Quotation</Label>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete(item.id)}>
            <LucideTrash className="mr-2 h-4 w-4" />
            <Label>Delete</Label>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {openQuotation && (
        <QuotationAddForm
          onClose={() => setOpenQuotation(false)}
          client={clientState.data.find((client) => client.id === item.id)}
          service={services}
        />
      )}
      {onUpdate && (
        <ClientUpdateForm id={item.id} onClose={() => setOnUpdate(false)} />
      )}
      {onHistory && (
        <ClientHistory id={item.id} onClose={() => setOnHistory(false)} />
      )}
      {onObservation && (
        <ClientObservationForm
          id={item.id}
          onClose={() => setOnObservation(false)}
        />
      )}
      {dialogState.isOpen && <DialogDelete onClose={handleOnCloseDelete} />}
    </>
  );
}
