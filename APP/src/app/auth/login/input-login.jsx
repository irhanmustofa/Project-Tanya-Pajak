import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputVertical } from "@/components/custom/input-custom";
import { Link } from "react-router-dom";
import { useValidateInput } from "@/hooks/use-validate-input";
import { useTransition, useState } from "react";
import { login as loginService } from "@/app/auth/auth-service";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { EyeClosed, EyeIcon } from "lucide-react";

const InputLogin = ({ setSuccess, setOtp }) => {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [company_npwp, setCompanyNpwp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { errors, valid, handleChange } = useValidateInput({
    schema: {
      email: "required|email",
      company_npwp: "required|min:3",
      password: "required|password",
    },
  });

  const handleLogin = async (formData) => {
    startTransition(async () => {
      const login = await loginService(formData);

      if (!login.success) {
        setSuccess({
          success: false,
          message:
            login.message === "Data Not Found"
              ? "User not found"
              : login.message,
        });
      } else {
        useLocalStorage.set("clientId", login.data.client_id);
        useLocalStorage.set("email", formData.get("email"));
        useLocalStorage.set("name", login.data.name);
        useLocalStorage.set("role", login.data.role);
        useLocalStorage.set("sb", "true");
        useLocalStorage.set(
          "lastAccess",
          new Date(new Date().getTime() + 30 * 60 * 1000).toLocaleString()
        );

        setOtp(login.otp);
        setSuccess({ success: true, message: login.message });
      }
    });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <Card className="overflow-hidden w-[400px] min-w-sm p-4">
          <CardHeader className="mb-10">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Entry your details for login</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <form action={handleLogin}>
              <div className="grid gap-6">
                <InputVertical
                  title="Email"
                  name="email"
                  type="email"
                  value={email.toLowerCase()}
                  placeholder="email@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleChange("email", e.target.value);
                  }}
                  error={errors.email}
                />
                <InputVertical
                  title="Company NPWP"
                  name="company_npwp"
                  type="number"
                  value={company_npwp}
                  placeholder="Company NPWP"
                  onChange={(e) => {
                    setCompanyNpwp(e.target.value);
                    handleChange("company_npwp", e.target.value);
                  }}
                  error={errors.company_npwp}
                />
                <div className="relative">
                  <InputVertical
                    title="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    onChange={(e) => handleChange("password", e.target.value)}
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
                <Button
                  pending={isPending}
                  type="submit"
                  className="w-full mt-10"
                  disabled={!valid}
                >
                  Login
                </Button>

                <div className="text-center text-sm">
                  Forgot your password?{" "}
                  <Link to="/forgot" className="underline underline-offset-4">
                    Reset Password
                  </Link>
                </div>
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4">
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default InputLogin;
