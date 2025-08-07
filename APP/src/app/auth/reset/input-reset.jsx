import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputVertical } from "@/components/custom/input-custom";
import { Link } from "react-router-dom";
import { useValidateInput } from "@/hooks/use-validate-input";
import { useTransition } from "react";
import { reset as resetService } from "@/app/auth/auth-service";

const InputReset = ({ setSuccess }) => {
  const [isPending, startTrasition] = useTransition();

  const { errors, valid, handleChange } = useValidateInput({
    schema: {
<<<<<<<< HEAD:APP/src/app/auth/reset/input-reset.jsx
      password: "required|password",
========
      email: "required|email",
>>>>>>>> db7b6ac (update files):APP/src/app/auth/forgot/input-forgot.jsx
    },
  });

  const handleReset = async (formData) => {
    startTrasition(async () => {
      const reset = await resetService(formData);

      if (!reset.success) {
        setSuccess(false);
      } else {
        setSuccess(true);
      }
    });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <Card className="overflow-hidden w-[400px] min-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">New Password</CardTitle>
            <CardDescription>Entry your new password</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <form action={handleReset}>
              <div className="grid gap-2">
                <InputVertical
                  title="Password"
                  name="password"
                  type="password"
                  placeholder="********"
                  onChange={(e) => handleChange("password", e.target.value)}
                  error={errors.email}
                />
                <Button
                  pending={isPending}
                  type="submit"
                  className="w-full mt-10"
                  disabled={!valid}
                >
                  Reset Password
                </Button>

                <div className="text-center text-sm">
                  Have an account?{" "}
                  <Link to="/" className="underline underline-offset-4">
                    Sign in
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

export default InputReset;
