import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputHorizontal } from "@/components/custom/input-custom";
import TextEditor from "@/components/custom/text-editor";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState, useTransition, useEffect, useRef } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import {
  serviceAll,
  serviceCreate,
} from "@/app/management/service/service-components/ServiceService";
import {
  useService,
  useServiceDispatch,
} from "@/app/management/service/service-components/ServiceProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { serviceDivision, serviceType, serviceUnit } from "@/helpers/variables";

export default function ServiceAddForm({ onClose }) {
  const [isPending, startTransition] = useTransition();
  const [includes, setIncludes] = useState("");
  const [results, setResults] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const serviceDispatch = useServiceDispatch();
  const { serviceAction } = useService();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      division: "required|number",
      type: "required|number",
      code: "required|string|min:3",
      name: "required|string|min:10",
      description: "required|string|min:10",
      includes: "string|min:10",
      results: "string|min:10",
      max_price: "required|number",
      min_price: "required|number",
      unit: "required|number",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      formData.append("division", event.target.division.value);
      formData.append("type", event.target.type.value);
      formData.append("code", event.target.code.value);
      formData.append("name", event.target.name.value);
      formData.append("description", event.target.description.value);
      formData.append("includes", includes);
      formData.append("results", results);
      formData.append("max_price", event.target.max_price.value);
      formData.append("min_price", event.target.min_price.value);
      formData.append("unit", event.target.unit.value);

      await serviceCreate(formData).then((response) => {
        if (response.success) {
          serviceAll().then((res) => {
            if (res.success) {
              dialogDispatch({
                type: dialogAction.DIALOG_INFO,
                payload: {
                  show: true,
                  title: "Add Service Success",
                  message: "Service added successfully",
                  status: "success",
                },
              });

              serviceDispatch({
                type: serviceAction.SUCCESS,
                payload: res.data,
              });
            }
          });
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Service Failed",
              message: response.message,
              status: "error",
            },
          });
        }

        handleOnCloseDialog();
      });
    });
  };

  const handleOnCloseDialog = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <>
      {dialogState.isOpen && <DialogInfo />}
      <Dialog open={isOpen} onOpenChange={handleOnCloseDialog}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[90%]">
          <DialogTitle>Input New Service</DialogTitle>
          <DialogDescription>
            Add a new service to the system.
          </DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid md:grid-cols-2 gap-4 py-4">
              <div className="col-span-1 grid grid-cols-1 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Division</Label>
                  <Select
                    name="division"
                    onValueChange={(value) => handleChange("division", value)}
                  >
                    <SelectTrigger className="col-span-3 rounded-md border">
                      <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceDivision.map((division) => (
                        <SelectItem
                          key={division.code}
                          value={String(division.code)}
                        >
                          {division.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Type</Label>
                  <Select
                    name="type"
                    onValueChange={(value) => handleChange("type", value)}
                  >
                    <SelectTrigger className="col-span-3 rounded-md border">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceType.map((type) => (
                        <SelectItem key={type.code} value={String(type.code)}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <InputHorizontal
                  title="Code"
                  type="text"
                  name="code"
                  onChange={(e) => handleChange("code", e.target.value)}
                  error={errors.code}
                />
                <InputHorizontal
                  title="Name"
                  type="text"
                  name="name"
                  onChange={(e) => handleChange("name", e.target.value)}
                  error={errors.name}
                />
              </div>
              <div className="col-span-1 grid grid-cols-1 gap-4">
                <InputHorizontal
                  title="Description"
                  type="text"
                  name="description"
                  onChange={(e) => handleChange("description", e.target.value)}
                  error={errors.description}
                />
                <InputHorizontal
                  title="Max Price"
                  type="number"
                  name="max_price"
                  onChange={(e) => handleChange("max_price", e.target.value)}
                  error={errors.max_price}
                />
                <InputHorizontal
                  title="Min Price"
                  type="number"
                  name="min_price"
                  onChange={(e) => handleChange("min_price", e.target.value)}
                  error={errors.min_price}
                />
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Unit</Label>
                  <Select
                    name="unit"
                    onValueChange={(value) => handleChange("unit", value)}
                  >
                    <SelectTrigger className="col-span-3 rounded-md border">
                      <SelectValue placeholder="Select Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceUnit.map((unit) => (
                        <SelectItem key={unit.code} value={String(unit.code)}>
                          {unit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <TextEditor
                title="Includes"
                placeholder="Service Includes"
                setValue={(value) => {
                  setIncludes(value);
                  handleChange("includes", value);
                }}
                error={errors.includes}
              />
              <TextEditor
                title="Results"
                placeholder="Service Results"
                setValue={(value) => {
                  setResults(value);
                  handleChange("results", value);
                }}
                error={errors.results}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={!valid} pending={isPending}>
                Save Data Service
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
