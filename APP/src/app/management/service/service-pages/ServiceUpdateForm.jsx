import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import TextEditor from "@/components/custom/text-editor";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect, useTransition } from "react";
import { LucideUserCircle2 } from "lucide-react";
import { serviceUpdate } from "../service-components/ServiceService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  useService,
  useServiceDispatch,
} from "../service-components/ServiceProvider";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";
import { serviceDivision, serviceType, serviceUnit } from "@/helpers/variables";
import { serviceAll } from "../service-components/ServiceService";

export default function ServiceUpdateForm({ id, onClose }) {
  const [includes, setIncludes] = useState("");
  const [results, setResults] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const serviceDispatch = useServiceDispatch();
  const { serviceAction, serviceState } = useService();

  const { errors, handleChange } = useValidateInput({
    schema: {
      code: "required|string|min:3",
      name: "required|string|min:3",
      description: "required|string|min:3",
      includes: "required|string|min:3",
      results: "required|string|min:3",
      max_price: "required|number",
      min_price: "required|number",
    },
  });

  useEffect(() => {
    const service = serviceState.data.find((item) => item.id === id);
    setIncludes(service.includes);
    setResults(service.results);

    setInput({
      division: service.division,
      type: service.type,
      code: service.code,
      name: service.name,
      description: service.description,
      max_price: service.max_price,
      min_price: service.min_price,
      unit: service.unit,
      status: service.status,
    });

    setIsOpen(true);
  }, [id, serviceState.data]);

  const inputHandler = (event) => {
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      formData.append("division", input.division);
      formData.append("type", input.type);
      formData.append("code", input.code);
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("includes", includes);
      formData.append("results", results);
      formData.append("max_price", input.max_price);
      formData.append("min_price", input.min_price);
      formData.append("unit", input.unit);
      formData.append("status", input.status);

      const response = await serviceUpdate(id, formData);

      if (!response.success) {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Update Service Failed",
            message: response.message,
            status: "error",
          },
        });
      } else {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Update Service Success",
            message: "Service updated successfully",
            status: "success",
          },
        });
      }

      serviceAll().then((res) => {
        if (res.success) {
          serviceDispatch({ type: serviceAction.SUCCESS, payload: res.data });
        }
      });

      handleCloseDialog();
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
          <DialogTrigger asChild>
            <Button variant="outline">
              <LucideUserCircle2 className="mr-2 h-4 w-4" />
              Update Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:max-w-[90%]">
            <DialogTitle>Update Service</DialogTitle>
            <DialogDescription>
              Make changes an existing service.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="grid md:grid-cols-2 gap-4 py-4">
                <div className="col-span-1 grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Division</Label>
                    <Select
                      name="division"
                      onValueChange={(value) => {
                        setInput({ ...input, division: value });
                        handleChange("division", value);
                      }}
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue
                          placeholder={
                            serviceDivision.find(
                              (item) => item.code == input.division
                            )?.name || "Select Division"
                          }
                        />
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
                      onValueChange={(value) => {
                        setInput({ ...input, type: value });
                        handleChange("type", value);
                      }}
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue
                          placeholder={
                            serviceType.find((item) => item.code == input.type)
                              ?.name || "Select Type"
                          }
                        />
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
                    value={input.code}
                    onChange={(e) => {
                      setInput({ ...input, code: e.target.value });
                      handleChange("code", e.target.value);
                    }}
                    error={errors.code}
                  />
                  <InputHorizontal
                    title="Name"
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={(e) => {
                      setInput({ ...input, name: e.target.value });
                      handleChange("name", e.target.value);
                    }}
                    error={errors.name}
                  />
                </div>
                <div className="col-span-1 grid grid-cols-1 gap-4">
                  <InputHorizontal
                    title="Description"
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={(e) => {
                      setInput({ ...input, description: e.target.value });
                      handleChange("description", e.target.value);
                    }}
                    error={errors.description}
                  />
                  <InputHorizontal
                    title="Max Price"
                    type="number"
                    name="max_price"
                    value={input.max_price}
                    onChange={(e) => {
                      setInput({ ...input, max_price: e.target.value });
                      handleChange("max_price", e.target.value);
                    }}
                    error={errors.max_price}
                  />
                  <InputHorizontal
                    title="Min Price"
                    type="number"
                    name="min_price"
                    value={input.min_price}
                    onChange={(e) => {
                      setInput({ ...input, min_price: e.target.value });
                      handleChange("min_price", e.target.value);
                    }}
                    error={errors.min_price}
                  />
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Unit</Label>
                    <Select
                      name="unit"
                      onValueChange={(value) => {
                        setInput({ ...input, unit: value });
                        handleChange("unit", value);
                      }}
                    >
                      <SelectTrigger className="col-span-3 rounded-md border">
                        <SelectValue
                          placeholder={
                            serviceUnit.find((item) => item.code == input.unit)
                              ?.name || "Select Unit"
                          }
                        />
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
                  value={includes}
                  setValue={(value) => {
                    setIncludes(value);
                    handleChange("includes", value);
                  }}
                  error={errors.includes}
                />
                <TextEditor
                  title="Results"
                  placeholder="Service Results"
                  value={results}
                  setValue={(value) => {
                    setResults(value);
                    handleChange("results", value);
                  }}
                  error={errors.results}
                />
              </div>
              <DialogFooter>
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
