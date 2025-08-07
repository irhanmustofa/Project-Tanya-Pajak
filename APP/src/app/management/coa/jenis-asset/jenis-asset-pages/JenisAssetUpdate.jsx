import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState, useEffect, useTransition } from "react";
import {
  useJenisAsset,
  useJenisAssetDispatch,
} from "../jenis-asset-components/JenisAssetProvider";
import { LucideUserPlus2 } from "lucide-react";
import {
  jenisAssetUpdate,
  jenisAssetAll,
} from "../jenis-asset-components/JenisAssetService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";

export default function JenisAssetUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const jenisAssetDispatch = useJenisAssetDispatch();
  const { jenisAssetAction, jenisAssetState } = useJenisAsset();

  const { errors, handleChange } = useValidateInput({
    schema: {
      jenis_asset: "required|string|min:5",
    },
  });

  useEffect(() => {
    const singleData = jenisAssetState.data.find((item) => item._id === id);
    setInput({
      jenis_asset: singleData.jenis_asset,
    });

    setIsOpen(true);
  }, [id, jenisAssetState.data]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("jenis_asset", input.jenis_asset);

      await jenisAssetUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update Jenis Asset Failed",
              message: response.message,
              status: "error",
            },
          });

          handleCloseDialog();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update Jenis Asset Success",
              message: "Jenis Asset updated successfully",
              status: "success",
            },
          });

          jenisAssetAll().then((res) => {
            if (res.success) {
              jenisAssetDispatch({
                type: jenisAssetAction.SUCCESS,
                payload: res.data,
              });
            }
          });

          handleCloseDialog();
        }
      });
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
              <LucideUserPlus2 className="mr-2 h-4 w-4" />
              Update Jenis Asset
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Update Jenis Asset</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="grid gap-4 py-4">
                <InputHorizontal
                  title="Jenis Asset"
                  type="text"
                  name="jenis_asset"
                  value={input.jenis_asset}
                  onChange={(e) => {
                    setInput({ ...input, jenis_asset: e.target.value });
                    handleChange("jenis_asset", e.target.value);
                  }}
                  error={errors.jenis_asset}
                />
              </div>
              <DialogFooter>
                <Button type="submit" pending={isPending}>
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
