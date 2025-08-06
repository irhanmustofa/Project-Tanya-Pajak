import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dialogContext } from "@/dialogs/DialogContext";
import { verify } from "@/app/auth/auth-service";

export default function VerifyPage() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const onCloseHandler = () => {
    success === true ? navigate("/") : navigate("/register");
  };

  return (
    <>
      <DialogVerify setSuccess={setSuccess} onClose={onCloseHandler} />
    </>
  );
}

export const DialogVerify = ({ setSuccess, onClose }) => {
  const { token } = useParams();
  const { DialogInfo } = useContext(dialogContext);
  const [flashState, setFlashState] = useState({});

  useEffect(() => {
    try {
      (async () => {
        const response = await verify(token);
        if (response.success) {
          setSuccess(true);
          setFlashState({
            type: "success",
            title: "Success",
            message: "Your account has been verified.",
          });
        }

        if (!response.success) {
          setSuccess(false);
          setFlashState({
            type: "error",
            title: "Error",
            message: response.message || "Failed to verify account.",
          });
        }
      })();
    } catch (error) {
      setFlashState({
        type: "error",
        title: "Error",
        message: error.message || "Something went wrong.",
      });
    }
  }, [token, setSuccess]);

  return (
    <>
      {flashState.message && (
        <DialogInfo
          show={true}
          title={flashState.title}
          message={flashState.message}
          status={flashState.type}
          onClose={onClose}
        />
      )}
    </>
  );
};
