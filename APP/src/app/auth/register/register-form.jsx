import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputVertical } from "@/components/custom/input-custom";
import { register as registerService } from "@/app/auth/auth-service";
import { useState, useContext, useEffect } from "react";
import { dialogContext } from "@/dialogs/DialogContext";
import { useValidateInput } from "@/hooks/use-validate-input";
import svgImage from "@/public/register.svg";
import { Link, useNavigate } from "react-router-dom";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";

export function RegisterForm() {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { errors, valid, handleChange } = useValidateInput({
    schema: {
      name: "required|min:3",
      email: "required|email",
      password: "required|password",
    },
  });

  const registerHandler = async (event) => {
    event.preventDefault();
    setIsPending(true);

    const response = await registerService({
      name: register.name,
      email: register.email,
      password: register.password,
    });
    console.log("response", response);
    if (response.success) {
      setIsPending(false);
      dialogDispatch({
        type: dialogAction.DIALOG_INFO,
        payload: {
          isOpen: true,
          message: response.message || "Register successful",
          title: "Success",
          status: "success",
        },
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setIsPending(false);
      dialogDispatch({
        type: dialogAction.DIALOG_INFO,
        payload: {
          isOpen: true,
          message: response.message || "Register failed",
          title: "Error",
          status: "error",
        },
      });
    }
  };

  useEffect(() => {
    if (register.name) handleChange("name", register.name);
    if (register.email) handleChange("email", register.email);
    if (register.password) handleChange("password", register.password);
  }, [register]);

  return (
    <>
      <Card className="overflow-hidden">
        <BodyContent>
          <FormInput
            register={register}
            setRegister={setRegister}
            registerHandler={registerHandler}
            isPending={isPending}
            valid={valid}
            errors={errors}
            handleChange={handleChange}
          />
        </BodyContent>
      </Card>
      {dialogState.message && <DialogInfo />}
    </>
  );
}

const BodyContent = ({ children }) => {
  return (
    <>
      <CardContent className="grid p-0 md:grid-cols-2">
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Sign Up Account</h1>
              <p className="text-balance text-muted-foreground">
                Entry your details for register
              </p>
            </div>

            {children}

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:block p-10">
          <img src={svgImage} alt="logo" className="h-full object-cover" />
        </div>
      </CardContent>
    </>
  );
};

const FormInput = ({
  register,
  setRegister,
  registerHandler,
  isPending,
  errors,
  valid,
  handleChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-6">
        <form onSubmit={registerHandler} className="grid gap-6">
          <InputVertical
            title="Name"
            name="name"
            type="text"
            placeholder="Your Name"
            error={errors.name}
            onChange={(e) => setRegister({ ...register, name: e.target.value })}
          />
          <InputVertical
            title="Email"
            name="email"
            type="email"
            placeholder="email@example.com"
            error={errors.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
          <div className="relative">
            <InputVertical
              title="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              onChange={(e) => {
                setRegister({ ...register, password: e.target.value });
                handleChange("password", e.target.value);
              }}
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
            type="submit"
            className="w-full mt-4"
            disabled={!valid}
            pending={isPending}
            onClick={registerHandler}
          >
            Register
          </Button>
        </form>
      </div>
    </>
  );
};
