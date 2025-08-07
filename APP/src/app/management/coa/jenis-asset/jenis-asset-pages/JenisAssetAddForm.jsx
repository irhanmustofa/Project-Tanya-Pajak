import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import {
  jenisAssetAll,
  jenisAssetCreate,
} from "@/app/management/coa/jenis-asset/jenis-asset-components/JenisAssetService";
import {
  useJenisAsset,
  useJenisAssetDispatch,
} from "@/app/management/coa/jenis-asset/jenis-asset-components/JenisAssetProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";

export default function JenisAssetAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const jenisAssetDispatch = useJenisAssetDispatch();
  const { jenisAssetAction } = useJenisAsset();

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      jenis_asset: "required|min:3",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("jenis_asset", event.target.jenis_asset.value);

      await jenisAssetCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Jenis Asset Success",
              message: "Jenis Asset added successfully",
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

          handleOnClose();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Jenis Asset Failed",
              message: response.message,
              status: "error",
            },
          });
          handleOnClose();
        }
      });
    });
  };

  const handleOnClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div className="relative">
      {dialogState.isOpen && <DialogInfo />}
      <Dialog open={isOpen} onOpenChange={handleOnClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Input New Jenis Asset</DialogTitle>
          <DialogDescription>Add a new coa to the system.</DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid gap-4 py-4">
              <InputHorizontal
                title="Jenis Asset"
                type="text"
                name="jenis_asset"
                onChange={(e) => handleChange("jenis_asset", e.target.value)}
                error={errors.jenis_asset}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={!valid} pending={isPending}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
