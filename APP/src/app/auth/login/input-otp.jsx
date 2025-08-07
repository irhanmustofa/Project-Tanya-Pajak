import { Card, CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { verifyOtp } from "../auth-service";
import { useLocalStorage } from "@/hooks/use-local-storage";

const InputOTPControlled = ({ otp, onValid }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleOtp = async () => {
      if (value.length === 6) {
        setLoading(true);
        setError("");

        try {
          const response = await verifyOtp(value);

          if (response?.success) {
            if (response.data?.token) {
              useLocalStorage.set("token", response.data.token);
            }
            onValid();
          } else {
            setError(response?.message || "Invalid OTP code");
            setValue("");
          }
        } catch (error) {
          setError("Verification failed. Please try again.");
          setValue("");
        } finally {
          setLoading(false);
        }
      }
    };

    handleOtp();
  }, [value, onValid]);

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
                disabled={loading}
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
            <div className="text-center text-sm min-h-6 flex items-center justify-center">
              {loading ? (
                <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Memverifikasi kode...
                </span>
              ) : error ? (
                <span className="text-red-600">{error}</span>
              ) : value === "" ? (
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
