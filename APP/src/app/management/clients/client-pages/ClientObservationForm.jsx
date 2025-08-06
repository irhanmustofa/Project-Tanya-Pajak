import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect, useTransition } from "react";
import {
  clientObservationGet,
  clientObservationSet,
} from "../client-components/ClientService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useValidateInput } from "@/hooks/use-validate-input";
import DatePicker from "@/components/date-picker";
import { InputHorizontal } from "@/components/custom/input-custom";

export default function ClientObservationForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();

  const { errors, handleChange } = useValidateInput({
    schema: {
      established: "required|number",
      type: "required|number",
      business: "required|string|min:5",
      turnover: "required|number",
      online: "required|number",
      booked: "required|number",
      monthly_taxed: "required|number",
      last_year_taxed: "required|number",
      service_needed: "required|string|min:3",
      note: "string",
    },
  });

  useEffect(() => {
    const fetchingData = async () => {
      try {
        clientObservationGet(id).then((response) => {
          if (response.success) {
            setInput({
              established: new Date(response.data[0].established),
              type: response.data[0].type,
              business: response.data[0].business,
              turnover: response.data[0].turnover,
              online: response.data[0].online,
              booked: response.data[0].booked,
              monthly_taxed: response.data[0].monthly_taxed,
              last_year_taxed: response.data[0].last_year_taxed,
              service_needed: response.data[0].service_needed,
              note: response.data[0].note,
            });
          }
        });

        setIsOpen(true);
      } catch (error) {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Error Fetching Data",
            message: error.message,
            status: "error",
          },
        });
      }
    };

    fetchingData();
  }, []);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("client_id", id);
      formData.append(
        "established",
        input.established.toLocaleDateString("en-CA")
      );
      formData.append("type", input.type);
      formData.append("business", input.business);
      formData.append("turnover", input.turnover);
      formData.append("online", input.online);
      formData.append("booked", input.booked);
      formData.append("monthly_taxed", input.monthly_taxed);
      formData.append("last_year_taxed", input.last_year_taxed);
      formData.append("service_needed", input.service_needed);
      formData.append("note", input.note);

      const response = await clientObservationSet(id, formData);

      if (!response.success) {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Update Client Failed",
            message: response.message,
            status: "error",
          },
        });
      } else {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Update Client Success",
            message: "Client updated successfully",
            status: "success",
          },
        });
      }

      if (!dialogState.isOpen) handleCloseDialog();

      setTimeout(() => {
        handleCloseDialog();
      }, 1000);
    });
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setInput({});
    onClose();
  };

  return (
    <>
      {dialogState.isOpen && <DialogInfo />}
      {isOpen && (
        <Dialog onOpenChange={handleCloseDialog} open={isOpen}>
          <DialogContent className="md:min-w-[80%] sm:max-w-[425px]">
            <div className="space-y-1">
              <DialogTitle>Client Observation</DialogTitle>
              <DialogDescription>Collecting data Client.</DialogDescription>
            </div>
            <form onSubmit={inputHandler}>
              <div className="max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-thin p-4">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Tahun Pendirian</Label>
                    <DatePicker
                      placeholder="Establish Date..."
                      name="established"
                      value={input.established}
                      onChange={(valiue) => {
                        setInput({ ...input, established: valiue });
                        handleChange("established", valiue);
                      }}
                      error={errors.established}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>PMA / PMDN</Label>
                    <Select
                      name="type"
                      onValueChange={(value) =>
                        setInput({ ...input, type: value })
                      }
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue
                          placeholder={
                            input.type == 0
                              ? "PMDN"
                              : input.type == 1
                              ? "PMA"
                              : "Select Client Type"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0"> PMDN </SelectItem>
                        <SelectItem value="1"> PMA </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Bidang Pekerjaan</Label>
                    <Textarea
                      className="col-span-3"
                      placeholder="Bidang Pekerjaan"
                      rows={3}
                      name="business"
                      value={input.business}
                      onChange={(e) => {
                        setInput({ ...input, business: e.target.value });
                        handleChange("business", e.target.value);
                      }}
                      error={errors.business}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Target Market</Label>
                    <Select
                      name="online"
                      onValueChange={(value) =>
                        setInput({ ...input, online: value })
                      }
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue
                          placeholder={
                            input.online == 0
                              ? "Offline"
                              : input.online == 1
                              ? "Online"
                              : input.online == 2
                              ? "Online and Offline"
                              : "Select Market Type"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0"> Offline </SelectItem>
                        <SelectItem value="1"> Online </SelectItem>
                        <SelectItem value="2"> Online and Offline </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Ada Pembukuan</Label>
                    <Select
                      name="booked"
                      onValueChange={(value) =>
                        setInput({ ...input, booked: value })
                      }
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue
                          placeholder={
                            input.booked == 0
                              ? "No"
                              : input.booked == 1
                              ? "Yes"
                              : "Select Booked"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0"> No </SelectItem>
                        <SelectItem value="1"> Yes </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Ada Pajak Bulanan</Label>
                    <Select
                      name="monthly_taxed"
                      onValueChange={(value) =>
                        setInput({ ...input, monthly_taxed: value })
                      }
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue
                          placeholder={
                            input.monthly_taxed == 0
                              ? "No"
                              : input.monthly_taxed == 1
                              ? "Yes"
                              : "Select Monthly Taxed"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0"> No </SelectItem>
                        <SelectItem value="1"> Yes </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Laporan Pajak Tahunan Terakhir</Label>
                    <Select
                      onValueChange={(value) =>
                        setInput({ ...input, last_year_taxed: value })
                      }
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue
                          placeholder={
                            input.last_year_taxed == 0
                              ? "No"
                              : input.last_year_taxed == 1
                              ? "Yes"
                              : "Last Year Taxed"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0"> No </SelectItem>
                        <SelectItem value="1"> Yes </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <InputHorizontal
                    type="text"
                    name="turnover"
                    title="Omset / Tahun"
                    placeholder="0"
                    value={
                      input.turnover
                        ? input.turnover.toLocaleString("id-ID")
                        : ""
                    }
                    onChange={(e) => {
                      const realPrice = Number(
                        e.target.value.replace(/\D/g, "")
                      );
                      setInput({ ...input, turnover: realPrice });
                    }}
                    error={errors.turnover}
                  />
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Jasa yang dibutuhkan</Label>
                    <Textarea
                      className="col-span-3"
                      placeholder="Service Needed"
                      rows={3}
                      name="service"
                      value={input.service_needed}
                      onChange={(e) => {
                        setInput({ ...input, service_needed: e.target.value });
                        handleChange("service_needed", e.target.value);
                      }}
                      error={errors.service}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Notes</Label>
                    <Textarea
                      className="col-span-3"
                      placeholder="Notes"
                      rows={3}
                      name="note"
                      value={input.note}
                      onChange={(e) => {
                        setInput({ ...input, note: e.target.value });
                        handleChange("note", e.target.value);
                      }}
                      error={errors.notes}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="pt-3">
                <Button type="submit" pending={isPending}>
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
