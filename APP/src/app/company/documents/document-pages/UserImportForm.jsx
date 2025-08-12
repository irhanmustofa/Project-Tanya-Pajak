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
import { userImport, userAll } from "../document-components/DocumentService";
import {
  useUser,
  useUserDispatch,
} from "../document-components/DocumentProvider";

export default function UserImportForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState("");
  const [excelContent, setExcelContent] = useState([]);
  const [isPending, startTrasition] = useTransition();

  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const dialogDispatch = useDialogDispatch();
  const { userAction } = useUser();
  const userDispatch = useUserDispatch();

  const { content } = useExcelReader(file || undefined);

  const hanldeDownloadTemplate = () => {
    useExcelWriter(
      [
        ["Email", "Name", "Password"],
        ["test@test.com", "Test User", "password123"],
        ["jibril@gmail.com", "Test User", "password123"],
      ],
      "TemplateImportUsers.xlsx"
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
          title: "Import Data User",
          message: "Import Data User Failed! No users to import.",
          status: "error",
        },
      });
      return;
    }
    startTrasition(() => {
      const inputData = excelContent.map((item) => ({
        name: item["name"] || item["Name"] || "",
        email: item["email"] || item["Email"] || "",
        password: item["password"] || item["Password"] || "",
      }));

      userImport(inputData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Data User",
              message: "Import Data User Successfully",
              status: "success",
            },
          });

          userAll().then((res) => {
            userDispatch({ type: userAction.SUCCESS, payload: res.data });
          });
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Import Data User",
              message: "Import Data User Failed!\n" + response.message,
              status: "error",
            },
          });
        }
      });
    });

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
          <DialogTitle>Import New User</DialogTitle>
          <DialogDescription>Add some user to the system.</DialogDescription>
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
