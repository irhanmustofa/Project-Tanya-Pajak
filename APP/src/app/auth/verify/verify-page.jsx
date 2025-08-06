import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { verify } from "@/app/auth/auth-service";

export default function VerifyPage() {
  console.log("VerifyPage rendered");
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const onCloseHandler = () => {
    success === true ? navigate("/register") : navigate("/");
  };

  return (
    <>
      <DialogVerify setSuccess={setSuccess} onClose={onCloseHandler} />
    </>
  );
}

export const DialogVerify = ({ setSuccess, onClose }) => {
  const hasVerified = useRef(false);
  const { token } = useParams();
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();

  useEffect(() => {
    if (hasVerified.current) return;

    const verifyToken = async () => {
      console.log("Starting verification for token:", token);

      if (!token) {
        setSuccess(false);
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            message: "Invalid verification link.",
            title: "Error",
            status: "error",
          },
        });
        return;
      }

      try {
        const response = await verify(token);
        console.log("Verify response:", response);

        if (response.success) {
          setSuccess(true);
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              message: "Your account has been verified.",
              title: "Success",
              status: "success",
            },
          });

          setTimeout(() => {
            onClose();
          }, 3000);
        } else {
          setSuccess(false);
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              message: response.message || "Verification failed.",
              title: "Error",
              status: "error",
            },
          });
          setTimeout(() => {
            onClose();
          }, 3000);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setSuccess(false);
      }
    };

    verifyToken();
    hasVerified.current = true;
  }, [token, setSuccess, dialogDispatch, dialogAction]);

  return <>{dialogState.isOpen && <DialogInfo />}</>;
};
