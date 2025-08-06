import HttpRequest from "@/api/http-request";
import { authEndpoint } from "@/app/auth/auth-endpoint";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const register = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(authEndpoint.signup)
      .body(data)
      .send();
    return request;
  } catch (error) {
    console.error(error);
  }
};

export const verify = async (token) => {
  console.log("Verifying token:", token);
  try {
    const request = await HttpRequest.method("GET")
      .url(authEndpoint.verify(token))
      .send();
    return request;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (formData) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(authEndpoint.login)
      .body(formData)
      .send();

    return request;
  } catch (error) {
    console.error(error);
  }
};

export const verifyOtp = async (otp) => {
  const email = useLocalStorage.get("email");
  const device = useLocalStorage.get("device");
  try {
    const request = await HttpRequest.method("POST")
      .url(authEndpoint.setAuthentication)
      .headers({
        email: email,
        device: device,
      })
      .body({ otp })
      .send();

    return request;
  } catch (error) {
    console.error(error);
  }
};

export const resetPassword = async ({ data, token }) => {
  const password = data.get("password");
  const confirmPassword = data.get("confirmPassword");
  try {
    const request = await HttpRequest.method("PUT")
      .url(authEndpoint.setReset(token))
      .body({ password, confirmPassword })
      .send();
    return request;
  } catch (error) {
    console.error("Reset error:", error);
    throw error;
  }
};

export const forgot = async (formData) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(authEndpoint.forgot)
      .body(formData)
      .send();

    return request;
  } catch (error) {
    console.error(error);
  }
};
