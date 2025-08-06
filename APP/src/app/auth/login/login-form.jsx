import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

import InputOTPControlled from "@/app/auth/login/input-otp";
import InputLogin from "@/app/auth/login/input-login";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/use-local-storage";

const LoginForm = ({ className, onLoginSuccess, ...props }) => {
  const [success, setSuccess] = useState(undefined);
  const [otp, setOtp] = useState("");
  const [valid, setValid] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const navigate = useNavigate();

  const handleSuccessInputOTP = (token) => {
    useLocalStorage.set("token", token);
    useLocalStorage.set("lastAccess", new Date().toISOString());
    dialogDispatch({
      type: dialogAction.DIALOG_INFO,
      payload: {
        isOpen: true,
        message: "Login successful",
        title: "Success",
        status: "success",
      },
    });

    setValid(true);
    setOpenOTP(false);
    if (onLoginSuccess) onLoginSuccess();
  };

  useEffect(() => {
    if (valid === true) {
      navigate("/dashboard", { replace: true });
    }
  }, [valid, navigate]);

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
