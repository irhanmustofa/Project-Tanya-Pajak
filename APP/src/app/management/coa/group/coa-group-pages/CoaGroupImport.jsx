import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useTransition } from "react";
import { useExcelReader } from "@/hooks/use-excel-reader";
import { useExcelWriter } from "@/hooks/use-excel-writer";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  coaGroupImport,
  coaGroupAll,
} from "../coa-group-components/CoaGroupService";
import {
  useCoaGroup,
  useCoaGroupDispatch,
} from "../coa-group-components/CoaGroupProvider";

export default function CoaGroupImportForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState("");
  const [excelContent, setExcelContent] = useState([]);
  const [isPending, startTrasition] = useTransition();

  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const dialogDispatch = useDialogDispatch();
  const { coaGroupAction } = useCoaGroup();
  const coaGroupDispatch = useCoaGroupDispatch();

  const { content } = useExcelReader(file || undefined);

  const hanldeDownloadTemplate = () => {
    useExcelWriter(
      [
        ["Nama Group", "Kode Group"],
        ["HARTA", "1000"],
        ["KEWAJIBAN", "2000"],
        ["MODAL", "3000"],
      ],
      "TemplateImportCOAGroup.xlsx"
    );
  };

  useEffect(() => {
    if (file) {
      setDisabled(false);
      setExcelContent(content);
    } else {
      setDisabled(true);
    }
  }, [file, content]);

  const loadFile = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleImportData = (event) => {
    event.preventDefault();
    if (!excelContent || excelContent.length === 0) {
      dialogDispatch({
        type: dialogAction.DIALOG_INFO,
        payload: {
          isOpen: true,
          title: "Import Data Group of COA",
          message: "Import Data Group of COA Failed! No Head of COA to import.",
          status: "error",
        },
      });
      return;
    }
    startTrasition(() => {
      const inputData = excelContent.map((item) => ({
        nama_group: item["nama group"] || item["Nama Group"] || "",
        kode_group: item["kode group"] || item["Kode Group"] || "",
      }));

      coaGroupImport(inputData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Data Group of COA",
              message: "Import Data Group of COA Successfully",
              status: "success",
            },
          });

          coaGroupAll().then((res) => {
            if (res.success) {
              coaGroupDispatch({
                type: coaGroupAction.SUCCESS,
                payload: res.data,
              });
            }
          });
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Data Group of COA",
              message: "Import Data Group of COA Failed!\n" + response.message,
              status: "error",
            },
          });
        }
        handleOnClose();
      });
    });
  };

  const handleOnClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <>
      {dialogState.isOpen && <DialogInfo />}
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false), onClose();
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Import New COA Group</DialogTitle>
          <DialogDescription>
            Add some COA Group to the system.
          </DialogDescription>
          <form onSubmit={handleImportData}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Excel File</Label>
                <Input
                  type="file"
                  name="excel"
                  className="col-span-3 rounded-md border"
                  onChange={loadFile}
                />
              </div>
            </div>
            <div className="flex justify-between mt-10">
              <Button
                type="button"
                variant="outline"
                onClick={hanldeDownloadTemplate}
              >
                Template Excel
              </Button>
              <Button type="submit" pending={isPending}>
                Upload Data
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
