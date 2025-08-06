import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import InputReset from "@/app/auth/reset/input-reset";

const ResetForm = ({ className, ...props }) => {
  const [success, setSuccess] = useState(undefined);
  const [valid, setValid] = useState(false);
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const navigate = useNavigate();

  if (valid === true) {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  useEffect(() => {
    if (success === true) {
      dialogDispatch({
        type: dialogAction.DIALOG_INFO,
        payload: {
          isOpen: true,
          message: "Request success, please login with your new password",
          title: "Success",
          status: "success",
        },
      });

      setValid(true);
      setSuccess(undefined);
    }

    if (success === false) {
      dialogDispatch({
        type: dialogAction.DIALOG_INFO,
        payload: {
          isOpen: true,
          message: "Invalid link, please resubmit request!",
          title: "Failed",
          status: "error",
        },
      });

      setValid(false);
      setSuccess(undefined);
    }
  }, [success, valid]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {dialogState.isOpen && <DialogInfo />}
      <InputReset setSuccess={setSuccess} />
    </div>
  );
};

export default ResetForm;
