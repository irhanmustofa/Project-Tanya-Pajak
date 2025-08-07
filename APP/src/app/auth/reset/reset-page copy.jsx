import { InputVertical } from "@/components/custom/input-custom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DialogProvider, {
  useDialog,
  useDialogDispatch,
} from "@/dialogs/DialogProvider";
import { useValidateInput } from "@/hooks/use-validate-input";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../auth-service";

const ResetPage = () => {
  const [isPending, startTransition] = useTransition();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();

  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
    token: token || "",
  });

  const { errors, valid, handleChange } = useValidateInput({
    schema: {
      password: "required|password",
      password_confirmation: "required|password",
    },
  });

  const handleInputChange = (name, value) => {
    try {
      setFormData((prev) => ({ ...prev, [name]: value }));
      handleChange(name, value);
    } catch (error) {
      console.error("Error in handleInputChange:", error);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("Reset token is missing");
      dialogDispatch({
        type: dialogAction.DIALOG_INFO,
        payload: {
          isOpen: true,
          dialog: "info",
          message: "Invalid or missing reset token.",
          title: "Error",
          status: "error",
        },
      });
      return;
    }

    try {
      startTransition(async () => {
        try {
          const resetFormData = new FormData();
          resetFormData.append("password", formData.password);
          resetFormData.append(
            "password_confirmation",
            formData.password_confirmation
          );
          resetFormData.append("token", token);

          console.log("Sending reset data:", {
            password: formData.password,
            password_confirmation: formData.password_confirmation,
            token: token,
          });

          const response = await resetPassword({ data: resetFormData, token });
          console.log("Reset response Page:", response);

          if (response?.success) {
            dialogDispatch({
              type: dialogAction.DIALOG_INFO,
              payload: {
                isOpen: true,
                dialog: "info",
                message:
                  "Password reset successful! Redirecting to login page...",
                title: "Success",
                status: "success",
              },
            });

            setTimeout(() => {
              dialogDispatch({ type: dialogAction.RESET });
              navigate("/");
            }, 2500);
          } else {
            console.log("Reset failed:", response?.message);
            dialogDispatch({
              type: dialogAction.DIALOG_INFO,
              payload: {
                isOpen: true,
                message:
                  response?.message ||
                  "Password reset failed. Please try again.",
                title: "Reset Failed",
                status: "error",
              },
            });
          }
        } catch (error) {
          console.error("Reset password error:", error);
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              message: "Something went wrong. Please try again.",
              title: "Error",
              status: "error",
            },
          });
        }
      });
    } catch (error) {
      console.error("Error in handleReset:", error);
      dialogDispatch({
        type: dialogAction.DIALOG_INFO,
        payload: {
          isOpen: true,
          message: "An unexpected error occurred.",
          title: "Error",
          status: "error",
        },
      });
    }
  };

  return (
    <DialogProvider>
      {dialogState.message && <DialogInfo />}
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <div className="flex justify-center items-center">
            <Card className="overflow-hidden w-[400px] min-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl">New Password</CardTitle>
                <CardDescription>Entry your new password</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <form onSubmit={handleReset}>
                  <div className="flex flex-col gap-6">
                    <div className="relative">
                      <InputVertical
                        title="New Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        error={errors.password}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeClosed /> : <EyeIcon />}
                      </button>
                    </div>

                    <div className="relative">
                      <InputVertical
                        title="Confirm New Password"
                        name="password_confirmation"
                        type={showPasswordConfirmation ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={formData.password_confirmation}
                        onChange={(e) =>
                          handleInputChange(
                            "password_confirmation",
                            e.target.value
                          )
                        }
                        error={errors.password_confirmation}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswordConfirmation(!showPasswordConfirmation)
                        }
                        className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
                      >
                        {showPasswordConfirmation ? <EyeClosed /> : <EyeIcon />}
                      </button>
                    </div>

                    <Button
                      pending={isPending}
                      type="submit"
                      className="w-full mt-6"
                      disabled={!valid || !token}
                    >
                      Reset Password
                    </Button>

                    <div className="text-center text-sm">
                      Remember your password?{" "}
                      <Link to="/" className="underline underline-offset-4">
                        Sign in
                      </Link>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DialogProvider>
  );
};

export default ResetPage;
