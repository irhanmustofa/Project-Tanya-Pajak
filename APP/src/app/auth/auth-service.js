import HttpRequest from "@/api/http-request";
import { authEndpoint } from "@/app/auth/auth-endpoint";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const register = async (data = {}) => {
  const name = data.name;
  const company_name = data.company_name;
  const email = data.email;
  const password = data.password;

  try {
    const request = await HttpRequest.method("POST")
      .url(authEndpoint.signup)
      .body({ name, company_name, email, password })
      .send();
    console.log(request);
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
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const request = await HttpRequest.method("POST")
      .url(authEndpoint.login)
      .body({ email, password })
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
        device: device
      })
      .body({ otp })
      .send();

    return request;
  } catch (error) {
    console.error(error);
  }
}

export const resetPassword = async ({ data, token }) => {
  const password = data.get("password");
  const confirmPassword = data.get("password_confirmation");
  console.log("Resetting password with token:", token);
  console.log("Password:", password);
  console.log("Confirm Password:", confirmPassword);
  try {
    const request = await HttpRequest.method("PUT")
      .url(authEndpoint.setReset(token))
      .body({ password, confirmPassword })
      .send();
    console.log("Reset request:", request);
    return request;
  } catch (error) {
    console.error("Reset error:", error);
    throw error;
  }
};

export const forgot = async (formData) => {
  const email = formData.get("email");

  try {
    const request = await HttpRequest.method("POST")
      .url(authEndpoint.forgot)
      .body({ email })
      .send();

    return request;
  } catch (error) {
    console.error(error);
  }
};
