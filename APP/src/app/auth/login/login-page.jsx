import LoginForm from "@/app/auth/login/login-form";
import DialogProvider from "@/dialogs/DialogProvider";

export default function LoginPage() {
  return (
    <DialogProvider>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </DialogProvider>
  );
}
