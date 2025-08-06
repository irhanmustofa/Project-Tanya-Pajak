import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputVertical } from "@/components/custom/input-custom";
import { register as registerService } from "@/app/auth/auth-service";
import { useState, useContext, useEffect } from "react";
import { dialogContext } from "@/dialogs/DialogContext";
import { useValidateInput } from "@/hooks/use-validate-input";
import svgImage from "@/public/register.svg";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { EyeClosed, EyeIcon, RefreshCcw } from "lucide-react";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";

const generateCaptcha = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
=======
import { EyeClosed, EyeIcon } from "lucide-react";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
>>>>>>> 2cd1356 (update-register)

export function RegisterForm() {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
<<<<<<< HEAD
  const [captcha, setCaptcha] = useState(generateCaptcha());
=======
>>>>>>> 2cd1356 (update-register)

  const [register, setRegister] = useState({
    name: "",
    company_name: "",
    email: "",
    password: "",
    captcha: "",
  });

  const { errors, valid, handleChange } = useValidateInput({
    schema: {
      name: "required|min:3",
      company_name: "required|min:3",
      email: "required|email",
      password: "required|password",
      captcha: "required",
    },
  });

  const registerHandler = async (event) => {
    event.preventDefault();

    if (register.captcha !== captcha) {
      dialogDispatch({
        type: dialogAction.DIALOG_INFO,
        payload: {
          isOpen: true,
          message: "CAPTCHA code is incorrect. Please try again.",
          title: "Error",
          status: "error",
        },
      });
      // Refresh captcha
      setCaptcha(generateCaptcha());
      setRegister({ ...register, captcha: "" });
      handleChange("captcha", "");
      return;
    }

    setIsPending(true);

    const response = await registerService({
      name: register.name,
      company_name: register.company_name,
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

      setCaptcha(generateCaptcha());
      setRegister({ ...register, captcha: "" });
      handleChange("captcha", "");
    }
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setRegister({ ...register, captcha: "" });
    handleChange("captcha", "");
  };

  useEffect(() => {
    if (register.name) handleChange("name", register.name);
    if (register.company_name)
      handleChange("company_name", register.company_name);
    if (register.email) handleChange("email", register.email);
    if (register.password) handleChange("password", register.password);
    if (register.captcha) handleChange("captcha", register.captcha);
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
<<<<<<< HEAD
            refreshCaptcha={refreshCaptcha}
            captcha={captcha}
=======
>>>>>>> 2cd1356 (update-register)
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
<<<<<<< HEAD
  refreshCaptcha,
  captcha,
=======
>>>>>>> 2cd1356 (update-register)
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
            title="Company Name"
            name="company_name"
            type="text"
            placeholder="Company Name"
            error={errors.company_name}
            onChange={(e) =>
              setRegister({ ...register, company_name: e.target.value })
            }
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
<<<<<<< HEAD

          <div className="space-y-2 flex flex-col">
            <label className="text-sm font-medium">CAPTCHA</label>
            <div className="flex gap-3 items-center">
              <div
                className="bg-gray-100 border rounded px-4 py-2 font-mono text-lg font-bold tracking-wider select-none"
                style={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              >
                {captcha}
              </div>

              <button
                type="button"
                onClick={refreshCaptcha}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                title="Refresh CAPTCHA"
              >
                <RefreshCcw size={18} />
              </button>
            </div>

            <InputVertical
              title=""
              name="captcha"
              type="text"
              placeholder="Enter CAPTCHA code"
              value={register.captcha}
              onChange={(e) => {
                setRegister({ ...register, captcha: e.target.value });
                handleChange("captcha", e.target.value);
              }}
              error={errors.captcha}
            />
          </div>

=======
>>>>>>> 2cd1356 (update-register)
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
