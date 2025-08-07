import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import InputForgot from "@/app/auth/forgot/input-forgot";

const ForgotForm = ({ className, ...props }) => {
  const [success, setSuccess] = useState(undefined);
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();

  useEffect(() => {
    if (success === true) {
      dialogDispatch({
        type: dialogAction.DIALOG_INFO,
        payload: {
          isOpen: true,
          message: "Request success, check your email",
          title: "Success",
          status: "success",
        },
      });

      setSuccess(undefined);
    }

    if (success === false) {
      dialogDispatch({
        type: dialogAction.DIALOG_INFO,
        payload: {
          isOpen: true,
          message: "Request failed, check your entry email",
          title: "Failed",
          status: "error",
        },
      });

      setSuccess(undefined);
    }
  }, [success]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {dialogState.message && <DialogInfo />}
      <InputForgot setSuccess={setSuccess} />
    </div>
  );
};

export default ForgotForm;
