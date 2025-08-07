import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/app/auth/login/login-form";
import DialogProvider from "@/dialogs/DialogProvider";
import { useAuth } from "../AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <DialogProvider>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm onLoginSuccess={() => window.location.reload()} />
        </div>
      </div>
    </DialogProvider>
  );
}
