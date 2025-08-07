import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputVertical } from "@/components/custom/input-custom";
import { register as registerService } from "@/app/auth/auth-service";
import { useState, useContext, useEffect } from "react";
import { dialogContext } from "@/dialogs/DialogContext";
import { useValidateInput } from "@/hooks/use-validate-input";
import svgImage from "@/public/vite.svg";
import { Link } from "react-router-dom";

export function RegisterForm() {
  const [isPending, setIsPending] = useState(false);
  const { DialogInfo } = useContext(dialogContext);

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

  const [flashState, setFlashState] = useState({
    title: "",
    message: "",
    status: "",
    show: false,
  });

  const registerHandler = async (event) => {
    event.preventDefault();
    setIsPending(true);

    const response = await registerService({
      name: register.name,
      email: register.email,
      password: register.password,
    });

    if (!response.success) {
      setFlashState({
        title: "Register Failed",
        message: response.message,
        status: "error",
        show: true,
      });
    } else {
      setFlashState({
        title: "Register Success",
        message: "Register success, please check your email",
        status: "success",
        show: true,
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
          />
        </BodyContent>
      </Card>
      {flashState.show && (
        <DialogInfo
          title={flashState.title}
          message={flashState.message}
          status={flashState.status}
          onClose={() => {
            setIsPending(false);
            setFlashState({});
          }}
        />
      )}
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
}) => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <form onSubmit={registerHandler} className="grid gap-6">
          <InputVertical
            title="Name"
            name="name"
            type="text"
            placeholder="Your Full Name"
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
          <InputVertical
            title="Password"
            name="password"
            type="password"
            placeholder="******"
            error={errors.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
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
