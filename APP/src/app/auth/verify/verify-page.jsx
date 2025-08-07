import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dialogContext } from "@/dialogs/DialogContext";
import { verify } from "@/app/auth/auth-service";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
        <div className="grid w-full h-screen items-start gap-4 justify-center bg-slate-400">
          <Alert variant="destructive" className="content-center">
            {/* <CheckCircle2Icon /> */}
            <AlertCircleIcon />
            <AlertTitle>
              {flashState.type == "success" ? "Success! " : "Failed! "}
              {flashState.message}
            </AlertTitle>
            <AlertDescription>
              This is an alert with icon, title and description.
            </AlertDescription>
          </Alert>
        </div>
        // <DialogInfo
        //   show={true}
        //   title={flashState.title}
        //   message={flashState.message}
        //   status={flashState.type}
        //   onClose={onClose}
        // />
      )}
    </>
  );
};
