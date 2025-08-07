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
  coaHeadImport,
  coaHeadAll,
} from "../coa-head-components/CoaHeadService";
import {
  useCoaHead,
  useCoaHeadDispatch,
} from "../coa-head-components/CoaHeadProvider";

export default function CoaHeadImportForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState("");
  const [excelContent, setExcelContent] = useState([]);
  const [isPending, startTrasition] = useTransition();

  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const dialogDispatch = useDialogDispatch();
  const { coaHeadAction } = useCoaHead();
  const coaHeadDispatch = useCoaHeadDispatch();

  const { content } = useExcelReader(file || undefined);

  const hanldeDownloadTemplate = () => {
    useExcelWriter(
      [
        ["Nama Head", "Kode Head", "Kode Group"],
        ["Kas dan Setara Kas", "1101", "1000"],
        ["Kas dan Setara Kas", "1101", "1000"],
        ["Kas dan Setara Kas", "1101", "1000"],
      ],
      "TemplateImportCOAHead.xlsx"
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
          title: "Import Data Head of COA",
          message: "Import Data Head of COA Failed! No Head of COA to import.",
          status: "error",
        },
      });
      return;
    }
    startTrasition(() => {
      const inputData = excelContent.map((item) => ({
        nama_head: item["nama head"] || item["Nama Head"] || "",
        kode_head: item["kode head"] || item["Kode Head"] || "",
        kode_group: item["kode group"] || item["Kode Group"] || "",
      }));

      coaHeadImport(inputData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Data Head of COA",
              message: "Import Data Head of COA Successfully",
              status: "success",
            },
          });

          coaHeadAll().then((res) => {
            if (res.success) {
              coaHeadDispatch({
                type: coaHeadAction.SUCCESS,
                payload: res.data,
              });
            }
          });
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Data Head of COA",
              message: "Import Data Head of COA Failed!\n" + response.message,
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
          <DialogTitle>Import New COA Head</DialogTitle>
          <DialogDescription>
            Add some COA Head to the system.
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
