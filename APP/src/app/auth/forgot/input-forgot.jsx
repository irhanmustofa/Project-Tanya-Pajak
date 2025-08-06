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
import { forgot as forgotService } from "@/app/auth/auth-service";

const InputForgot = ({ setSuccess }) => {
  const [isPending, startTrasition] = useTransition();

  const { errors, valid, handleChange } = useValidateInput({
    schema: {
      email: "required|email",
    },
  });

  const handleForgot = async (formData) => {
    startTrasition(async () => {
      const forgot = await forgotService(formData);

      if (!forgot.success) {
        setSuccess(false);
      } else {
        setSuccess(true);
      }
    });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <Card className="overflow-hidden w-[400px] min-w-sm p-4">
          <CardHeader className="mb-4">
            <CardTitle className="text-2xl">
              Recovery Password
              <CardDescription>
                Enter your email for recovery password
              </CardDescription>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <form action={handleForgot}>
              <div className="flex flex-col gap-6">
                <InputVertical
                  title="Email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={errors.email}
                />
                <Button
                  pending={isPending}
                  type="submit"
                  className="w-full mt-6"
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

export default InputForgot;
