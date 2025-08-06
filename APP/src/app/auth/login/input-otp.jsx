import { Card, CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";

const InputOTPControlled = ({ otp, onValid }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value.length === 6) {
      if (value == otp) {
        onValid();
      } else {
        setValue("");
      }
    }
  }, [value, otp, onValid]);

  return (
    <>
      <Card className="mx-auto w-[400px] h-[500px] flex flex-col justify-center items-center shadow-xl">
        <CardContent>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-center">Enter Your OTP</h1>
            <div className="flex justify-center mt-5">
              <InputOTP
                maxLength={6}
                value={value}
                onChange={(value) => setValue(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    className="border border-black dark:border-white"
                    index={0}
                  />
                  <InputOTPSlot
                    className="border border-black dark:border-white"
                    index={1}
                  />
                  <InputOTPSlot
                    className="border border-black dark:border-white"
                    index={2}
                  />
                  <InputOTPSlot
                    className="border border-black dark:border-white"
                    index={3}
                  />
                  <InputOTPSlot
                    className="border border-black dark:border-white"
                    index={4}
                  />
                  <InputOTPSlot
                    className="border border-black dark:border-white"
                    index={5}
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="text-center text-sm">
              {value === "" ? (
                <>Check your email for the code.</>
              ) : (
                <>You entered: {value}</>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default InputOTPControlled;
