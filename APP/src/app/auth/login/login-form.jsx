import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

import InputOTPControlled from "@/app/auth/login/input-otp";
import InputLogin from "@/app/auth/login/input-login";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ className, ...props }) => {
  const [success, setSuccess] = useState(undefined);
  const [otp, setOtp] = useState("");
  const [valid, setValid] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const navigate = useNavigate();

  const handleSuccessInputOTP = () => {
    dialogDispatch({
      type: dialogAction.DIALOG_INFO,
      payload: {
        isOpen: true,
        message: "Login successful",
        title: "Success",
        status: "success",
      },
    });
    setOpenOTP(false);
<<<<<<< HEAD
    if (onLoginSuccess) onLoginSuccess();

    setTimeout(() => {
      setValid(true);
    }, 1500);
=======
>>>>>>> 2cd1356 (update-register)
  };

  if (valid === true) {
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  }

  useEffect(() => {
    if (success?.success === true) {
      setOpenOTP(true);
    }
    if (success?.success === false) {
      setSuccess(undefined);

      dialogDispatch({
        type: dialogAction.DIALOG_INFO,
        payload: {
          isOpen: true,
          message: success.message,
          title: "Login failed",
          status: "error",
        },
      });
    }
  }, [success, dialogAction.DIALOG_INFO, dialogDispatch]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {dialogState.message && <DialogInfo />}
      {openOTP === true ? (
        <InputOTPControlled otp={otp} onValid={handleSuccessInputOTP} />
      ) : (
        <InputLogin setSuccess={setSuccess} setOtp={setOtp} />
      )}
    </div>
  );
};

export default LoginForm;
