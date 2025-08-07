// ProfileUpdateForm.jsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { InputHorizontal } from "./custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";
import { updatePassword } from "@/app/management/users/user-components/UserService";

export default function ProfileUpdateForm({ open, onClose }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      password: "required|password",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setConfirmError("");

    if (password !== confirmPassword) {
      setConfirmError("Password and Confirm Password do not match.");
      return;
    }

    if (!valid) {
      setMessage("Please fix the errors above.");
      return;
    }

    setLoading(true);
    try {
      await updatePassword({ password });
      setLoading(false);
      setMessage("Profile updated successfully.");
      setTimeout(() => {
        handleOnClose();
      }, 1000);
    } catch (err) {
      setLoading(false);
      setMessage("Failed to update profile.");
    }
  };

  const handleOnClose = () => {
    setPassword("");
    setConfirmPassword("");
    setMessage("");
    setConfirmError("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOnClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <InputHorizontal
              title="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleChange("password", e.target.value);
              }}
              error={errors.password}
            />
          </div>
          <div>
            <InputHorizontal
              title="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmError ? confirmError : ""}
            />
          </div>
          {(message || confirmError) && (
            <div
              className={`text-sm text-center ${
                message && message.toLowerCase().includes("success")
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {confirmError || message}
            </div>
          )}
          <DialogFooter>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-3 py-1"
              disabled={!valid || loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded px-3 py-1"
              onClick={handleOnClose}
              disabled={loading}
            >
              Cancel
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
